import Loading from "@/components/common/Loading";
import PrescriberCard from "@/components/PrescriberCard";
import { getAllUserPrescribers } from "@/services/adminService";
import { getAllPrescribers } from "@/services/pharmacyService";
import { RootState } from "@/store";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchField from "@/components/common/SearchField";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import FilterField from "@/components/common/FilterField";
import ThemeButton from "@/components/common/ThemeButton";
import InviteLinkModal from "./InviteLinkModal";
import { Formik, Form } from "formik";
import FormField from "./FormField";
import { modifyPrescriberSchema } from "@/utils/validationSchema";
import axios from "axios";
import toast from "react-hot-toast";

const Prescribers: React.FC<any> = ({ isAdmin }) => {
  const [selectedPrescriber, setSelectedPrescriber] = useState<any>(null);
  const [isModifying, setIsModifying] = useState(false);
  const { prescribersData } = useSelector((state: RootState) => state.prescribers);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const isFetchedPrescribers = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [updatedPresData, setUpdatedPresData] = useState<any[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortDirection, setSortDirection] = useState<any>("asc");
  const [activeTab, setActiveTab] = useState("Active List");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const isArchiveTab = activeTab === "Archives";
  const [loadingGenerateCPA, setLoadingGenerateCPA] = useState<boolean>(false);

  const filterOptions = [
    { field: "asc", filterable: true, header: "Name: A → Z" },
    { field: "desc", filterable: true, header: "Name: Z → A" },
  ];

  const fetchAllPrescribers = async () => {
    setIsLoading(true);
    const fetchFn = isAdmin ? getAllUserPrescribers : () => getAllPrescribers(dispatch, user?.id);
    await fetchFn(dispatch);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isFetchedPrescribers.current) {
      fetchAllPrescribers();
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

  const sortedPresData = useMemo(() => {
    let data = [...updatedPresData];

    if (sortDirection) {
      data.sort((a, b) => {
        const nameA = a.prescriber?.toLowerCase() || "";
        const nameB = b.prescriber?.toLowerCase() || "";
    
        const result = nameA.localeCompare(nameB);
        return sortDirection === "asc" ? result : -result;
      });
    }
  
    return data;
  }, [updatedPresData, sortDirection]);
  
  const filteredPresData = useMemo(() => {
    const filterValue = globalFilter.toLowerCase();
  
    return sortedPresData.filter((item) =>
      item.prescriber?.toLowerCase().includes(filterValue)
    );
  }, [sortedPresData, globalFilter]);

  const displayedPrescribers = useMemo(() => {
    return filteredPresData.filter(item => item.isArchived === isArchiveTab);
  }, [filteredPresData, isArchiveTab]);

  const handleArchiveToggle = (name: string, archiveStatus: boolean) => {
    setUpdatedPresData(prev => {
      const updated = [...prev];
      const index = updated.findIndex(item => item.prescriber === name);
      if (index !== -1) {
        updated[index] = { ...updated[index], isArchived: archiveStatus };
      }
      return updated;
    });
  };

  const handleInviteClick = () => setIsInviteModalOpen(true);

  const handleModifyPrescriber = (prescriber: any) => {
    setSelectedPrescriber(prescriber);
    setIsModifying(true);
  };

  const handleSavePrescriber = (values: any) => {
    setUpdatedPresData((prev) =>
      prev.map((item) =>
        item.id === selectedPrescriber.id ? { ...item, ...values } : item
      )
    );
    setIsModifying(false);
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
        axios.post("https://backend.bluehealthhere.com/service-agreement", formData, {
          responseType: 'blob',
        })
          .then((response) => {
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = pharmacy_name + '.pdf';
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

  return (
    <div className="bg-white rounded-lg theme-shadow p-4 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium tracking-tighter">
          {isModifying ? "Modify Prescribers" : "Prescribers List"}
        </h1>
        {isModifying ? (
          <div className="flex gap-2">
            <ThemeButton
              variant="primary"
              type="submit"
              form="modifyPrescriberForm"
              className="min-w-[120px]"
            >
              Save Details
            </ThemeButton>
            <ThemeButton
              variant="secondary"
              onClick={() => setIsModifying(false)}
              className="min-w-[78px] bg-white"
            >
              Cancel
            </ThemeButton>
          </div>
        ) : (
          <ThemeButton variant="primary" onClick={handleInviteClick}>
            Invite Link
          </ThemeButton>
        )}
      </div>

      {!isModifying && (
        <div className="flex flex-col gap-3 mb-4">
          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-3">
            <div className="flex justify-between items-center gap-2">
              <SearchField
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                placeholder="Search"
                className="flex-1"
              />
              <FilterField
                label="Sort By"
                columns={filterOptions}
                selectedValue={sortDirection}
                onChange={setSortDirection}
                className="w-[100px]"
              />

            </div>
            <ThemeButtonTabs
              data={["Active List", "Archives"]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              className="w-full"
            />
          </div>

          {/* Desktop */}
          <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-4">
              <ThemeButtonTabs
                data={["Active List", "Archives"]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                className="md:min-w-[200px]"
              />
            </div>
            <div className="flex gap-2">
              <SearchField
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                placeholder="Search prescribers here"
                className="min-w-[200px]"
              />
              <FilterField
                label="Sort By"
                columns={filterOptions}
                selectedValue={sortDirection}
                onChange={setSortDirection}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {isModifying ? (
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Form (2/3 width) */}
          <div className="w-full lg:w-2/3 space-y-2 pr-0 lg:pr-4">
            <h2 className="text-md font-medium">Basic Information</h2>
            <Formik
              initialValues={{
                prescriber: selectedPrescriber?.prescriber || "",
                prescriberPhone: selectedPrescriber?.prescriberPhone || "",
                prescriberCity: selectedPrescriber?.prescriberCity || "",
                npi: selectedPrescriber?.npi || "",
                fax: selectedPrescriber?.fax || "",
                prescriberAddress: selectedPrescriber?.prescriberAddress || "",
              }}
              validationSchema={modifyPrescriberSchema}
              onSubmit={handleSavePrescriber}
            >
              {({ values }) => (
                <Form id="modifyPrescriberForm" className="space-y-2 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      iconSrc="/prescriber (2).svg"
                      iconAlt="Name"
                      label="Prescriber Name"
                      name="prescriber"
                      value={values.prescriber}
                    />

                    <FormField
                      iconSrc="/npi.svg"
                      iconAlt="NPI"
                      label="NPI"
                      name="npi"
                      value={values.npi}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      iconSrc="/phone.svg"
                      iconAlt="Phone"
                      label="Phone"
                      name="prescriberPhone"
                      value={values.prescriberPhone}
                    />

                    <FormField
                      iconSrc="/phone.svg"
                      iconAlt="Fax"
                      label="Fax"
                      name="fax"
                      value={values.fax}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      iconSrc="/city.svg"
                      iconAlt="City"
                      label="City"
                      name="prescriberCity"
                      value={values.prescriberCity}
                    />

                    <FormField
                      iconSrc="/address.svg"
                      iconAlt="Address"
                      label="Address"
                      name="prescriberAddress"
                      value={values.prescriberAddress}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Vertical Separator - Tight against the form */}
          <div className="hidden lg:block w-px bg-[#EBEBEB] flex-shrink-0"></div>

          {/* Right Side - Picture (1/3 width) */}
          <div className="w-full lg:w-1/3 space-y-6 pl-6">
            <h2 className="text-md font-medium">Display Picture</h2>
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200">
                <img
                  src={
                    selectedPrescriber?.pharmacyLogo ||
                    "/images/Abstergo Ltd..png"
                  }
                  alt="Prescriber Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 w-full max-w-[280px]">
                <ThemeButton
                  variant="secondary"
                  className="flex-1 border border-[#CBDAFF] bg-transparent hover:bg-[#CBDAFF]/10 text-primary-navy-blue"
                >
                  Change Picture
                </ThemeButton>
                <ThemeButton
                  variant="danger"
                  className="flex-1 border border-[#FF2E37] bg-[#FFE0E2] text-[#FF2E37] hover:bg-[#FFE0E2]/90"
                >
                  Delete Picture
                </ThemeButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-8">
              <Loading />
            </div>
          ) : displayedPrescribers.length > 0 ? (
            displayedPrescribers.map((item) => (
              <PrescriberCard
                key={item.prescriber}
                prescriber={item}
                isAdmin={isAdmin}
                onArchiveToggle={handleArchiveToggle}
                showUnarchiveButton={activeTab === "Archives"}
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
