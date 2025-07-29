import Loading from "@/components/common/Loading";
import PrescriberCard from "@/components/PrescriberCard";
import { getAllUserPrescribers } from "@/services/adminService";
import { fetchPrescriberDetails, getAllPrescribers, updatePrescriberDetails } from "@/services/pharmacyService";
import { RootState } from "@/store";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchField from "@/components/common/SearchField";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
// import FilterField from "@/components/common/FilterField";
import ThemeButton from "@/components/common/ThemeButton";
import InviteLinkModal from "./InviteLinkModal";
import axios from "axios";
import toast from "react-hot-toast";
import EditPrescriberForm from "./EditPrescriberForm";
import { updatePrescriberInitialVals } from "@/utils/initialVals";
import { FormikValues } from "formik";
// import { filterOptions } from "@/utils/constants";

const Prescribers: React.FC<any> = ({ isAdmin }) => {
  const [selectedPrescriber, setSelectedPrescriber] = useState<any>(updatePrescriberInitialVals);
  const [isModifying, setIsModifying] = useState(false);
  const { prescribersData } = useSelector(
    (state: RootState) => state.prescribers
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const isFetchedPrescribers = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [updatedPresData, setUpdatedPresData] = useState<any[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  // const [sortDirection, setSortDirection] = useState<any>("asc");
  const [activeTab, setActiveTab] = useState("Active List");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const isArchiveTab = activeTab === "Archives";
  const [loadingGenerateCPA, setLoadingGenerateCPA] = useState<boolean>(false);

  const fetchAllPrescribers = async () => {
    const fetchFn = isAdmin
      ? getAllUserPrescribers
      : () => getAllPrescribers(dispatch, user?.id);
    await fetchFn(dispatch);
  };
  
  useEffect(() => {
    if (!isFetchedPrescribers.current) {
      setIsLoading(true);
      fetchAllPrescribers().then(() => setIsLoading(false));
      isFetchedPrescribers.current = true;
    }
  }, []);

  useEffect(() => {
    const transformed = prescribersData.map((item: any) => ({
      ...item,
      prescriber: item.prescriber || `${item.firstName} ${item.lastName}`,
      prescriberPhone: item.prescriberPhone || item.phone,
      prescriberAddress: item.prescriberAddress || item.address,
      prescriberCity: item.prescriberCity || item.city,
      isArchived: item.isArchived || false,
    }));
    setUpdatedPresData(transformed);
  }, [prescribersData]);

  // const sortedPresData = useMemo(() => {
  //   let data = [...updatedPresData];

    // if (sortDirection) {
    //   data.sort((a, b) => {
    //     const nameA = a.prescriber?.toLowerCase() || "";
    //     const nameB = b.prescriber?.toLowerCase() || "";

    //     const result = nameA.localeCompare(nameB);
    //     return sortDirection === "asc" ? result : -result;
    //   });
    // }

  //   return data;
  // }, [updatedPresData]);

  const filteredPresData = useMemo(() => {
    const filterValue = globalFilter.toLowerCase();

    return updatedPresData.filter((item) =>
      item.prescriber?.toLowerCase().includes(filterValue)
    );
  }, [updatedPresData, globalFilter]);

  const displayedPrescribers = useMemo(() => {
    return filteredPresData.filter((item) => isArchiveTab ? item.isArchived || !item.isActive : item.active || item.isActive);
  }, [filteredPresData, isArchiveTab]);

  const handleArchiveToggle = async (prescriber: any, status: boolean) => {
    const response = await updatePrescriberDetails(dispatch, { id: prescriber.id, isActive: status });
    if (response) {
      await fetchAllPrescribers();
    }
  };

  // const handleInviteClick = () => setIsInviteModalOpen(true);

  const handleModifyPrescriber = async (prescriber: any) => {
    const response = await fetchPrescriberDetails(dispatch, prescriber?.id);

    if (response) {
      const formValues = {
        id: response.id,
        prescriber: response.prescriber || "",
        prescriberPhone: response.prescriberPhone || "",
        prescriberAddress: response.prescriberAddress || "",
        prescriberCity: response.prescriberCity || "",
        prescriberZipCode: response.prescriberZipCode || "",
        prescriberFax: response.prescriberFax || "",
        npi: response.npi || "",
        dea: response.dea || "",
        isActive: response.isActive || false,
        pictureUrl: response.pictureUrl
      };
      setSelectedPrescriber(formValues);
      setIsModifying(true);
    } else {
      setSelectedPrescriber(updatePrescriberInitialVals);
    }
  };

  const handleGenerateCPA = (item: any) => {
    console.log(item, "item");
    if (user) {
      const pharmacy_name = user.firstName + " " + user.lastName;
      const values: any = {
        prescriber_name: item.prescriber,
        practice_address: item.prescriberAddress,
        prescriber_fax: item.prescriberFax,
        prescriber_phone: item.prescriberPhone,
        pharmacy_name,
        prescriber_npi: item.npi,
      };
      const formData = new FormData();
      Object.keys(values).forEach((item: any) => {
        formData.append(item, values[item]);
      });

      try {
        setLoadingGenerateCPA(true);
        axios
          .post(
            "https://backend.bluehealthhere.com/service-agreement",
            formData,
            {
              responseType: "blob",
            }
          )
          .then((response) => {
            const file = new Blob([response.data], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(file);
            const a = document.createElement("a");
            a.href = fileURL;
            a.download = pharmacy_name + ".pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();

            setLoadingGenerateCPA(false);
          })
          .catch((error: any) => toast.error(error));
      } catch (error) {
        toast.error("An error occurred while searching for criteria.");
      }
    }
  };

  const handleSavePrescriber = async (values: any) => {
    const response = await updatePrescriberDetails(dispatch, values);
    if (response) {
      setIsModifying(false);
      await fetchAllPrescribers();
    }
  };

  return (
    <div className="bg-primary-white rounded-lg theme-shadow p-4 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium tracking-tighter">
          {isModifying ? "Modify Prescribers" : "Prescribers List"}
        </h1>
        {isModifying && <div className="flex gap-2">
          <ThemeButton
            variant="primary"
            type="submit"
            form="modifyPrescriberForm"
            className="min-w-[120px]"
            onClick={() => {
              // @ts-ignore
              document.querySelector('#prescriber-form button[type="submit"]')?.click();
            }}
          >
            Save Details
          </ThemeButton>
          <ThemeButton
            variant="secondary"
            onClick={() => setIsModifying(false)}
            className="min-w-[78px] bg-primary-white"
          >
            Cancel
          </ThemeButton>
        </div>}
      </div>

      {!isModifying && (
        <div className="flex flex-col gap-3 mb-4">
          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-3">
            <SearchField
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              placeholder="Search"
              className="flex-1"
            />
            <ThemeButtonTabs
              data={["Active List", "Archives"]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              className="w-full border-quaternary-navy-blue-dark"
            />
          </div>

          {/* Desktop */}
          <div className="hidden md:flex flex-row items-center w-full gap-3">
            {/* Left side - Tabs */}
            <div>
              <ThemeButtonTabs
                data={["Active List", "Archives"]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                className="md:min-w-[200px] border-quaternary-navy-blue-dark"
              />
            </div>
            <div className="ml-auto">
              <SearchField
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                placeholder="Search for request here"
                className="min-w-[200px] max-w-[400px]"
                parentClassName=""
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {isModifying ? (
        <EditPrescriberForm 
          selectedPrescriber={selectedPrescriber} 
          handleSavePrescriber={(values: FormikValues) => handleSavePrescriber(values)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-8">
              <Loading />
            </div>
          ) : displayedPrescribers.length > 0 ? (
            displayedPrescribers.map((item, index) => (
              <PrescriberCard
                key={index}
                prescriber={item}
                isAdmin={isAdmin}
                onArchiveToggle={handleArchiveToggle}
                onModify={() => handleModifyPrescriber(item)}
                onGenerateCPA={() => handleGenerateCPA(item)}
                loadingGenerateCPA={loadingGenerateCPA}
              />
            ))
          ) : (
            <div className="col-span-full text-left text-gray-500 text-sm">
              No prescribers found
            </div>
          )}
        </div>
      )}

      {isInviteModalOpen && (
        <InviteLinkModal
          onClose={() => setIsInviteModalOpen(false)}
          prescribers={updatedPresData.map((p) => ({
            id: p.id,
            name: p.prescriber,
          }))}
        />
      )}
    </div>
  );
};

export default Prescribers;
