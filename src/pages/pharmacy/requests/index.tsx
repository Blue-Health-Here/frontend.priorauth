import ThemeDataTable from "@/components/common/ThemeDataTable";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FilterField from "@/components/common/FilterField";
import ToggleColumnsField from "@/components/common/ToggleColumnsField";
import ThemeButton from "@/components/common/ThemeButton";
import { useLocation, useNavigate } from "react-router-dom";
import AddRequestModal from "./AddRequestModal";
import {
  getAllPharmacyReqs,
  getAllReqStatuses,
  updateRequestNotes,
  updateRequestStatus,
} from "@/services/pharmacyService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  filterRequestsByStatus,
  getStatusClass,
  groupByField,
  transformPharmacyRequest,
} from "@/utils/helper";
import RequestStatusDropdownField from "./RequestStatusDropdownField";
import SearchField from "@/components/common/SearchField";
import Loading from "@/components/common/Loading";
import RequestStatusDropdown from "@/components/RequestStatusDropdown";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import NameBadge from "@/components/NameBadge";
import NotesCell from "./NotesCell";
import { FaPlus } from "react-icons/fa6";
import RequestTitle from "./RequestTitle";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import FiltersDropdown from "./FiltersDropdown";
import { VncSession } from "@/utils/types";
import PortalSession from "./PortalSession";
import { handleFetchPortalStatus, handleSessionCleanup, handleStartPortal } from "@/services/portalService";

const PharmacyRequests: React.FC<any> = ({ isAdmin, prescriberId }) => {

  const { reqStatusesData } = useSelector(
    (state: RootState) => state.reqStatuses
  );
  const { reqsData } = useSelector((state: RootState) => state.pharmacyReqs);
  const { user } = useSelector((state: RootState) => state.auth);
  const [requestsData, setRequestsData] = useState<any>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const prescriberName = location.state?.prescriberName || null;
  console.log(prescriberName)
  // New state for status filter
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<
    string | null
  >(null);

  const columns = useMemo(
    () => [
      {
        field: "patient",
        header: "Name",
        visible: true,
        filterable: true,
        sortable: true,
        customTemplate: true,
        render: (rowData: any, field: any) => (
          <div className="flex items-center justify-between group w-full">
            <NameBadge data={rowData[field]} />
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                      text-secondary-navy-blue bg-quaternary-navy-blue 
                      px-2 py-1 rounded text-xs ml-2 whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`${location.pathname}/${rowData.id}/request-details`);
              }}
            >
              Open
            </button>
          </div>
        ),
      },
      {
        field: "medication",
        header: "Medication",
        visible: true,
        filterable: true,
        sortable: true,
      },
      {
        field: "prescriber",
        header: "Prescriber",
        visible: true,
        filterable: true,
        sortable: true,
        customTemplate: true,
        render: (rowData: any, field: any) => (
          <NameBadge data={rowData[field]} />
        ),
      },
      {
        field: "submittedOn",
        header: "Submitted On",
        visible: true,
        filterable: true,
        sortable: true,
        className: "!min-w-12 !max-w-12",
      },
      {
        field: "statusName",
        header: "Status",
        visible: true,
        filterable: true,
        sortable: true,
        customTemplate: true,
        render: (rowData: any, field: any) =>
          requestStatusTemplate(rowData, field),
      },
      {
        field: "notes",
        header: "Notes",
        visible: true,
        filterable: true,
        sortable: true,
        customTemplate: true,
        render: (rowData: any, field: any) => {
          if (rowData.isEditing) {
            return (
              <Input
                type="text"
                className="w-full"
                value={rowData[field] || ""}
                onKeyDown={(e) => handleKeyDown(e, rowData)}
                onChange={(e) => handleChangeNotes(e.target.value, rowData)}
              />
            );
          }
          return (
            <NotesCell
              note={rowData[field] || "-"}
              handleEditNote={(e: any) => handleEditNote(e, rowData)}
            />
          );
        },
      },
      {
        field: "lastModified",
        header: "Last Modified",
        visible: true,
        filterable: true,
        sortable: true,
      },
    ],
    [requestsData, location.pathname, navigate]
  );

  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce(
      (acc: any, col: any) => ({ ...acc, [col.field]: col.visible !== false }),
      {}
    )
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeRequestTab, setActiveRequestTab] =
    useState<string>("Active Requests");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isFetchedStatuses = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredStatuses, setFilteredStatuses] = useState([]);
  const [selectedFilterField, setSelectedFilterField] = useState("");
  const [filteredRequests, setFilteredRequests] = useState<any[]>([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Portal States
  const [isStartingRequest, setIsStartingRequest] = useState(false);
  const [vncSession, setVncSession] = useState<VncSession | null>(null);
  const [isClosingSession, setIsClosingSession] = useState(false);
  const [isVncLoading, setIsVncLoading] = useState(false);
  const [firefoxStatusMsg, setFirefoxStatusMsg] = useState('');

  // Get unique statuses for the filters dropdown
  const uniqueStatuses = useMemo(() => {
    const statuses = new Set<string>();
    requestsData.forEach((req: any) => {
      if (req.statusName) statuses.add(req.statusName);
    });
    return Array.from(statuses).sort();
  }, [requestsData]);
  // console.log(requestsData);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      if (isAdmin) {
        await Promise.all([
          getAllReqStatuses(dispatch),
          getAllPharmacyReqs(dispatch, prescriberId),
        ]);
      } else {
        await getAllPharmacyReqs(dispatch, prescriberId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetchedStatuses.current) {
      fetchInitialData();
      isFetchedStatuses.current = true;
    }
  }, []);

  useEffect(() => {
    if (reqsData.length > 0) {
      // const filteredData = reqsData;
      const updatedArr = reqsData.map((item: any) =>
        transformPharmacyRequest(item, isAdmin)
      );
      setRequestsData(updatedArr);
      setFilteredStatuses(
        reqsData.map((item: any) => ({
          id: item.request_status,
          name: item.paStatus,
          statusClass: getStatusClass(item.paStatus),
        }))
      );
    }
  }, [reqsData]);

  useEffect(() => {
    let filtered = [...requestsData];

    if (selectedStatusFilter) {
      filtered = filtered.filter(
        (req) => req.statusName === selectedStatusFilter
      );
    }
    if (globalFilter && selectedFilterField) {
      filtered = filtered.filter((item) => {
        if (selectedFilterField === "patient") {
          return item.patient?.name
            ?.toLowerCase()
            .includes(globalFilter.toLowerCase());
        } else if (selectedFilterField === "prescriber") {
          return item.prescriber?.name
            ?.toLowerCase()
            .includes(globalFilter.toLowerCase());
        } else if (typeof item[selectedFilterField] === "string") {
          return item[selectedFilterField]
            ?.toLowerCase()
            .includes(globalFilter.toLowerCase());
        }
        return true;
      });
    }
    if (!selectedFilterField) {
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(groupByField(filtered, selectedFilterField));
    }
  }, [requestsData, selectedStatusFilter, globalFilter, selectedFilterField]);

  const handleSubmitStatusChange = async (value: any, rowData: any) => {
    try {
      await updateRequestStatus(dispatch, rowData?.id, {
        statusId: value.code,
        paStatus: value.name,
        notes: null,
      });
      await getAllPharmacyReqs(dispatch, prescriberId);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleChangeNotes = (value: string, rowData: any) => {
    const updatedRequests = requestsData.map((item: any) => {
      if (item.id === rowData.id) {
        return {
          ...item,
          notes: value,
        };
      }
      return item;
    });

    setRequestsData(updatedRequests);
  };

  const handleEditNote = (e: any, rowData: any) => {
    e?.preventDefault();

    const updatedRequests = requestsData.map((item: any) => {
      if (item.id === rowData.id) {
        return {
          ...item,
          isEditing: true,
        };
      }
      return item;
    });

    setRequestsData(updatedRequests);
  };

  const handleSubmitNote = async (data: any) => {
    if (!data.notes || !data.notes.trim()) return;

    try {
      await updateRequestNotes(dispatch, data.id, { notes: data.notes });
      await getAllPharmacyReqs(dispatch, prescriberId);

      setRequestsData((prevData: any[]) =>
        prevData.map((item: any) =>
          item.id === data.id ? { ...item, isEditing: false } : item
        )
      );
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: any
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSubmitNote(item);
    }
  };

  const requestStatusTemplate = (rowData: any, field: any) => {
    if (isAdmin) {
      return (
        <RequestStatusDropdown
          className={`!border-0 max-w-48 !text-sm status-dropdown`}
          selectedValue={rowData[field]}
          handleChange={(value: any) =>
            handleSubmitStatusChange(value, rowData)
          }
          data={reqStatusesData.map((item: any) => ({
            name: item.name,
            code: item.id,
          }))}
        />
      );
    } else {
      const statusClass = getStatusClass(rowData[field]);
      return (
        <div
          className={`text-sm font-medium truncate px-4 py-2 rounded-full max-w-58 ${statusClass}`}
        >
          {rowData[field]}
        </div>
      );
    }
  };

  const toggleColumn = (columnField: any) => {
    setVisibleColumns((prev: any) => ({
      ...prev,
      [columnField]: !prev[columnField],
    }));
  };

  const clearSelection = () => {
    setVisibleColumns(
      columns.reduce(
        (acc: any, col: any) => ({ ...acc, [col.field]: false }),
        {}
      )
    );
    setIsChecked(false);
  };

  const selectAll = (value: any) => {
    setVisibleColumns(
      columns.reduce(
        (acc: any, col: any) => ({ ...acc, [col.field]: value }),
        {}
      )
    );
  };

  const handleStatusChange = (status: any) => {
    if (status?.length > 0) {
      const filteredData = filterRequestsByStatus(
        groupByField(requestsData, selectedFilterField),
        status
      );
      setFilteredRequests(filteredData);
    } else {
      setFilteredRequests(groupByField(requestsData, selectedFilterField));
    }
  };

  const handleFilterChange = (field: string) => {
    setSelectedFilterField(field);
  };

  const tableHeader = (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex flex-col gap-3 w-full">
        <div className="flex justify-between items-center">
          <RequestTitle 
    isAdmin={isAdmin} 
    prescriber={prescriberName || (prescriberId ? "Prescriber Requests" : null)} 
  />
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-7 h-7 flex items-center justify-center bg-[#EBF1FF] rounded-md"
          >
            <FaPlus className="w-3 h-3 text-primary-blue" />
          </button>
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex-1">
            <SearchField
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="h-full px-3 py-2 border border-[#EBEBEB] rounded-xl text-[#525252] text-sm font-medium bg-primary-white"
            >
              Actions
            </button>
          </div>
        </div>

        <ThemeButtonTabs
          data={["All Requests", "Active Requests"]}
          activeTab={activeRequestTab}
          setActiveTab={setActiveRequestTab}
        />
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="inline-flex gap-2 items-center h-12 flex-wrap w-full">
          <ThemeButtonTabs
            data={["Active Requests", "All Requests"]}
            className="min-w-[300px] max-w-[300px]"
            activeTab={activeRequestTab}
            setActiveTab={setActiveRequestTab}
          />
          <div className="inline-flex h-full items-center gap-2 ml-auto">
            <SearchField
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />

            <FiltersDropdown
              options={uniqueStatuses}
              selectedOption={selectedStatusFilter}
              onChange={setSelectedStatusFilter}
              getStatusClass={getStatusClass}
            />

            <FilterField
              columns={columns.filter((item: any) => item.field !== "notes")}
              selectedValue={selectedFilterField}
              onChange={handleFilterChange}
            />

            <RequestStatusDropdownField
              data={filteredStatuses}
              onChange={(selected) => handleStatusChange(selected)}
            />
            <ToggleColumnsField
              clearSelection={clearSelection}
              selectAll={selectAll}
              setIsChecked={setIsChecked}
              isChecked={isChecked}
              columns={columns}
              visibleColumns={visibleColumns}
              toggleColumn={toggleColumn}
            />
          </div>
        </div>
      </div>
    </>
  );

  useEffect(() => {
    if (
      Object.keys(visibleColumns).filter((item) => visibleColumns[item])
        .length === columns.length
    ) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [visibleColumns]);

  const handleOpenPortal = async () => {
    if (!user) {
      alert('Authentication error. Please login again.');
      return;
    }

    setIsStartingRequest(true);
    try {
      const response = await handleStartPortal(dispatch, { id: user.id, roleCode: user.roleCode });
      if (response) {
        // const data = await response.json();
        setVncSession({
          sessionId: response.session_id,
          vncUrl: response.vnc_url,
          entityName: response.entity_name
        });
        setIsVncLoading(true);
        setFirefoxStatusMsg('Initializing Firefox driver...');
      } else {
        alert(`Error starting request: ${'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error starting VNC session:', error);
      alert('Failed to start request. Please try again.');
    } finally {
      setIsStartingRequest(false);
    }
  };

  const handleCloseSession = async () => {
    if (!vncSession) return;

    setIsClosingSession(true);
    try {
      const response = await handleSessionCleanup(dispatch, vncSession.sessionId);
      if (response) {
        setVncSession(null);
      } else {
        console.error('Error closing session');
      }
    } catch (error) {
      console.error('Error closing VNC session:', error);
    } finally {
      setIsClosingSession(false);
    }
  };

  // Poll session status when VNC session starts
  useEffect(() => {
    let pollInterval: number | any;
    const pollSessionStatus = async () => {
      if (!vncSession || !user) return;

      try {
        // Check VNC session status by account type and ID
        // const res = await fetch(`/api/vnc/status/pharmacy/${user.id}`);
        // const data = await res.json();
        const data = await handleFetchPortalStatus(dispatch, user.id);

        if (data.status === 'active') {
          // VNC session is active
          if (data.browser_status === 'ready') {
            setFirefoxStatusMsg('Firefox driver ready!');
            setIsVncLoading(false);
            return; // Stop polling
          } else if (data.browser_status === 'failed') {
            setFirefoxStatusMsg('Failed to initialize Firefox driver.');
            setIsVncLoading(false);
            return; // Stop polling
          } else {
            setFirefoxStatusMsg(data.browser_message || 'Firefox driver initializing...');
          }
        } else if (data.status === 'processing') {
          setFirefoxStatusMsg(data.message || 'Setting up VNC session...');
        } else if (data.status === 'queued') {
          // Session is in queue
          const queueInfo = data.queue_info;
          if (queueInfo && queueInfo.position > 0) {
            setFirefoxStatusMsg(`Waiting in queue (Position ${queueInfo.position})`);
          } else {
            setFirefoxStatusMsg('Waiting in queue...');
          }
        } else if (data.status === 'not_found') {
          // Check if session is in queue
          const concurrency = data.concurrency_status;
          if (concurrency && concurrency.pending_queue > 0) {
            setFirefoxStatusMsg(`Waiting in queue... (Position: ${concurrency.pending_queue}, Active: ${concurrency.active_sessions}/${concurrency.max_concurrent})`);
          } else {
            setFirefoxStatusMsg('Session not found. Please try starting again.');
            setIsVncLoading(false);
            return;
          }
        } else {
          setFirefoxStatusMsg('Session status unknown. Please try starting again.');
          setIsVncLoading(false);
          return;
        }

        // Continue polling
        pollInterval = setTimeout(pollSessionStatus, 2000);
      } catch (error) {
        console.error('Error polling session status:', error);
        pollInterval = setTimeout(pollSessionStatus, 2000);
      }
    };

    if (isVncLoading && vncSession) {
      pollSessionStatus();
    }
    return () => { if (pollInterval) clearTimeout(pollInterval); };
  }, [isVncLoading, vncSession, user]);

  return (
    <div className="bg-primary-white rounded-lg theme-datatable theme-shadow px-4 py-4">
      {vncSession && (
        <PortalSession
          vncSession={vncSession}
          handleCloseSession={handleCloseSession}
          isClosingSession={isClosingSession}
          isVncLoading={isVncLoading}
          firefoxStatusMsg={firefoxStatusMsg}
        />
      )}

      {isModalOpen && (
        <AddRequestModal
          isOpen={isModalOpen}
          onClose={(isAdded?: boolean) => {
            setIsModalOpen(false);
            if (isAdded) fetchInitialData();
          }}
        />
      )}

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-100 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gray-50 bg-opacity-50"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>

          {/* Sidebar Content */}
          <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm bg-primary-white shadow-lg p-4 overflow-y-auto flex flex-col">
            <div className="flex-1">
              <div className="flex items-center px-4 pl-0 pt-1 gap-3">
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="bg-[#F5F5F5] p-2 rounded-md"
                >
                  <img
                    src="/Vector (15).svg"
                    alt="Close sidebar"
                    className="w-4 h-4"
                  />
                </button>
                <h3 className="text-lg font-semibold text-[#1E1E1E]">
                  Filters
                </h3>
              </div>

              <div className="h-px bg-gray-200 -mx-4 w-[calc(100%+2rem)] my-4"></div>

              <div className="space-y-2">
                <div>
                  <RequestStatusDropdownField
                    data={filteredStatuses}
                    onChange={(selected) => {
                      handleStatusChange(selected);
                    }}
                    className="w-full"
                  />
                </div>

                <div className="h-[1px] w-full bg-gray-200 mb-4"></div>
                <FiltersDropdown
                  options={uniqueStatuses}
                  selectedOption={selectedStatusFilter}
                  onChange={setSelectedStatusFilter}
                  getStatusClass={getStatusClass}
                />
                <div className="h-[1px] w-full bg-gray-200 mb-4"></div>

                <div>
                  <FilterField
                    columns={columns}
                    selectedValue={selectedFilterField}
                    onChange={(field) => {
                      handleFilterChange(field);
                    }}
                    className="w-full"
                  />
                </div>

                <div className="h-[1px] w-full bg-gray-200 mb-4"></div>

                <div>
                  <ToggleColumnsField
                    clearSelection={clearSelection}
                    selectAll={selectAll}
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                    columns={columns}
                    visibleColumns={visibleColumns}
                    toggleColumn={toggleColumn}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 bg-primary-white">
              <button
                onClick={() => {
                  setSelectedFilterField("patient");
                  setGlobalFilter("");
                  clearSelection();
                  setSelectedStatusFilter(null);
                }}
                className="flex-1 py-3  rounded-lg bg-[#EBF1FF] text-[#163066] text-sm font-medium"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="flex-1 py-2 rounded-lg bg-[#163066] text-white text-sm "
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:flex justify-between gap-4 items-center pb-2 h-14 flex-wrap">
         <RequestTitle 
    isAdmin={isAdmin} 
    prescriber={prescriberName || (prescriberId ? "Prescriber Requests" : null)} 
  />
        {!prescriberId && (
          <div className="inline-flex h-full gap-2 sm:ml-auto">
            <ThemeButton
              type="button"
              className="!h-full min-w-max rounded-lg"
              variant="secondary"
              onClick={handleOpenPortal}
              disabled={isStartingRequest}
            >
              {isStartingRequest ? (
                <>
                  <Loading />
                  Starting...
                </>
              ) : 'Open Portal'}
            </ThemeButton>
            <ThemeButton
              className="w-full !h-full rounded-lg"
              variant="primary"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Add Request
            </ThemeButton>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-4 w-10 text-gray-500">
          <Loading />
        </div>
      ) : (
        <ThemeDataTable
          header={tableHeader}
          data={
            selectedStatusFilter || selectedFilterField
              ? filteredRequests
              : requestsData.sort(
                (a: any, b: any) =>
                  new Date(b.submittedOn).getTime() -
                  new Date(a.submittedOn).getTime()
              )
          }
          columns={columns}
          pageSize={10}
          selectedFilterField={selectedFilterField}
          visibleColumns={visibleColumns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          themeDataTableClass={"theme-table"}
          globalFilterFields={[
            "patient.name",
            "medication",
            "prescriber.name",
            "submittedOn",
            "statusName",
            "notes",
            "lastModified",
          ]}
          onRowClick={(row: any) =>
            navigate(location.pathname + "/" + row.data.id + "/request-details")
          }
        />
      )}
    </div>
  );
};

export default PharmacyRequests;
