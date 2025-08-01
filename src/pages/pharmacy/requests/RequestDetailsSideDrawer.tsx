import SideDrawer from "@/components/SideDrawer";
import React, { useMemo, useState } from "react";
import StatusTimeline from "./details/StatusTimeline";
import Loading from "@/components/common/Loading";
import ThemeButton from "@/components/common/ThemeButton";
import { FiPlus } from "react-icons/fi";
import FileUploadSection from "./details/FileUploadSection";
import { useFileUploadProgressNotes } from "@/hooks/useFileUploadProgressNotes";
import { useRequestData } from "@/hooks/useRequestData";
import CommentsWidget from "./details/CommentsWidget";
import ProgressNotesModal from "@/components/ProgressNotesModal";
import { getRequestStatuses } from "@/services/pharmacyService";
import { useDispatch } from "react-redux";

const RequestDetailsSideDrawer: React.FC<any> = ({ 
    openSideDrawer, setOpenSideDrawer, reqId, 
    inviteCode, handleOpenReqDetails 
}) => {
    const [requestDetails, setRequestDetails] = useState<any>(null);
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const fileUploadsObj = useFileUploadProgressNotes(reqId || "", requestDetails);
    const { setIsAnalysisStarted, setIsAnalysisComplete } = fileUploadsObj;
    const dispatch = useDispatch();

    useRequestData({
        reqId,
        setRequestDetails,
        setUploadedFiles,
        setIsLoading,
        setIsAnalysisStarted,
        setIsAnalysisComplete,
    });

    const handleAddStatus = () => {
        console.log("handle add status");
    };

    const handleOpenProgressNotesModal = () => {
        setIsModalOpen(true);
    };

    const memoizedChartNotes = useMemo(() => requestDetails?.chartNotes, [requestDetails?.chartNotes.length]);

    if (!openSideDrawer) return;
    return (
        <SideDrawer
            className="max-w-[700px] min-w-[700px]"
            position="right"
            arrowClass="rotate-0"
            isOpen={openSideDrawer}
            title={isLoading ? "Loading..." : (
                <div className="inline-flex items-center gap-2">
                    <h2 className="text-lg font-medium text-primary-black">{requestDetails?.patientName}</h2>
                    <p className="text-xs py-2 px-4 text-secondary-navy-blue bg-quaternary-navy-blue rounded-full">{requestDetails?.medication}</p>
                </div>
            )}
            handleOpenReqDetails={() => handleOpenReqDetails(requestDetails?.id)}
            onClose={() => setOpenSideDrawer(false)}
        >
            <ProgressNotesModal
                isOpen={isModalOpen}
                onClose={(isAdded?: boolean) => {
                    setIsModalOpen(false);
                    if (isAdded) getRequestStatuses(dispatch, reqId);
                }}
                chartNotes={memoizedChartNotes || []}
            />
            {isLoading ? <Loading /> : (
                <div className="p-4 flex gap-4 w-full flex-col">
                    <div className="p-4 rounded-xl border border-navy-blue-500 grid grid-cols-2 gap-4">
                        {[
                            { label: "Last Modified", value: "5/5/2025" },
                            { label: "Submitted on", value: 5 / 5 / 2025 },
                            { label: "Prescriber", value: "VIERA, RUBIA" },
                            { label: "FORM", value: "_" },
                        ].map((item: any, index: number) => {
                            if (typeof item === 'object') {
                                return (
                                    <div key={index}>
                                        <p className="text-sm text-secondary-black">
                                            {item.label}
                                        </p>
                                        <p className="text-[12px] sm:text-sm font-medium text-gray-900 mt-1">{item.value}</p>
                                    </div>
                                );
                            }
                            return item;
                        })}
                    </div>

                    <div className="inline-flex gap-2 flex-col">
                        <div className="inline-flex gap-2 justify-between items-center">
                            <h2 className="text-base font-medium text-primary-black">Status</h2>
                            {!inviteCode && (
                                <ThemeButton
                                    onClick={handleAddStatus}
                                    variant="secondary"
                                    className="text-xs sm:text-sm"
                                >
                                    <span className="flex items-center gap-1">
                                        Add Status
                                        <FiPlus size={16} />
                                    </span>
                                </ThemeButton>
                            )}
                        </div>
                        <div className="rounded-xl border border-navy-blue-500">
                            <StatusTimeline
                                isAdmin={false}
                                showCheckNotesBtn={false}
                            />
                        </div>
                    </div>

                    <div className="inline-flex gap-2 flex-col">
                        <div className="inline-flex gap-2 justify-between items-center">
                            <h2 className="text-base font-medium text-primary-black">Progress Notes</h2>
                        </div>
                        <FileUploadSection
                            inviteCode={inviteCode}
                            uploadedFiles={uploadedFiles}
                            setUploadedFiles={setUploadedFiles}
                            reqId={reqId || ""}
                            {...fileUploadsObj}
                            handleOpenProgressNotesModal={handleOpenProgressNotesModal}
                        />
                    </div>

                    <div className="inline-flex gap-2 flex-col">
                        <div className="inline-flex gap-2 justify-between items-center">
                            <h2 className="text-base font-medium text-primary-black">Comments ({requestDetails?.comments?.length})</h2>
                        </div>
                        <CommentsWidget showTwo={true} showActions={false} />
                    </div>
                </div>
            )}
            <div className="flex items-center bg-primary-white space-x-2 justify-between p-4 border-t border-light-stroke w-full fixed bottom-0">
                <ThemeButton variant="tertiary" type="button" className="flex-1" 
                    onClick={() => setOpenSideDrawer(false)}>Close</ThemeButton>
                <ThemeButton variant="primary" type="button" className="flex-1" 
                    onClick={handleOpenReqDetails(requestDetails?.id)}>View Details</ThemeButton>
            </div>
        </SideDrawer>
    )
}

export default RequestDetailsSideDrawer;