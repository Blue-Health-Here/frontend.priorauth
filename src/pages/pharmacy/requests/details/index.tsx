import React, { useMemo, useRef, useState } from "react";
import CardHeader from "@/components/common/CardHeader";
import { UploadedFile } from "@/utils/types";
import ProgressNotesModal from "@/components/ProgressNotesModal";
import PageHeader from "./PageHeader";
import InfoDetails from "./InfoDetails";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getRequestStatuses,
  postRequestUploadFiles,
  deleteReqUploadedFile,
} from "@/services/pharmacyService";
import Loading from "@/components/common/Loading";
import StatusTimeline from "./StatusTimeline";
import SideDrawer from "@/components/SideDrawer";
import RequestDetailsContent from "./SideDrawerReqDetailsContent";
import LetterOfMedicalNecessity from "./LetterOfMedicalNecessity";
import FileUploadSection from "./FileUploadSection";
import FileDropzone from "@/components/common/FileDropzone";
import UploadFileList from "@/components/common/UploadFileList";
import toast from "react-hot-toast";
import ThemeButton from "@/components/common/ThemeButton";
import { useRequestData } from "@/hooks/useRequestData";
import { useFileUploadProgressNotes } from "@/hooks/useFileUploadProgressNotes";

const PharmacyRequestDetails: React.FC<any> = ({ isAdmin, prescriberId, inviteCode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const canvasRef = useRef(null);
  const [requestDetails, setRequestDetails] = useState<any>(null);
  const dispatch = useDispatch();
  const { id: reqId } = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileUploadsObj = useFileUploadProgressNotes(reqId || "", requestDetails);
  const { setIsAnalysisStarted, setIsAnalysisComplete } = fileUploadsObj;

  useRequestData({
    reqId,
    setRequestDetails,
    setUploadedFiles,
    setIsLoading,
    setIsAnalysisStarted,
    setIsAnalysisComplete,
  });

  const handleOpenProgressNotesModal = () => {
    setIsModalOpen(true);
  };

  const handleUploadFiles = async (files: any) => {
    try {
      const formData = new FormData();
      files.forEach((file: any) => {
        formData.append("files", file);
      });
      const response = await postRequestUploadFiles(
        dispatch,
        reqId,
        formData
      );
      if (response) {
        setUploadedFiles(
          response?.files?.map((item: any) => {
            return {
              ...item,
              name: item.fileName,
              type: item.mimeType,
            };
          })
        );
      }
    } catch (error: any) {
      setUploadedFiles([]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      handleUploadFiles(fileArray);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      handleUploadFiles(fileArray);
    }
  };

  const removeFile = async (id: string) => {
    try {
      const response = await deleteReqUploadedFile(dispatch, reqId, id);
      if (response.success) {
        setUploadedFiles((prev: any) =>
          prev.filter((file: any) => file.id !== id)
        );
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleAddTag = (updateFn: (prev: UploadedFile[]) => UploadedFile[]) => {
    setUploadedFiles(updateFn);
  };

  useRequestData({
    reqId,
    setRequestDetails,
    setUploadedFiles,
    setIsLoading,
    setIsAnalysisStarted,
    setIsAnalysisComplete,
  });
  
  const handleCheckNotes = () => {
    setIsDrawerOpen(true);
  };
  
  const memoizedChartNotes = useMemo(() => requestDetails?.chartNotes, [requestDetails?.chartNotes.length]);
  return (
    <>
      <ProgressNotesModal
        isOpen={isModalOpen}
        onClose={(isAdded?: boolean) => {
          setIsModalOpen(false);
          if (isAdded) getRequestStatuses(dispatch, reqId);
        }}
        chartNotes={memoizedChartNotes || []}
      />
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title=""
        width="w-[500px]"
        position="right"
      >
        <RequestDetailsContent initialTab="Status & Notes"
          onClose={() => setIsDrawerOpen(false)} isAdmin={isAdmin} />
      </SideDrawer>
      <div className="p-4 bg-primary-white rounded-xl theme-shadow relative">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <PageHeader requestDetails={requestDetails} isAdmin={isAdmin} 
              prescriberId={prescriberId} inviteCode={inviteCode} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 lg:col-span-2 space-y-4">
                <div className="bg-primary-white rounded-xl overflow-hidden border border-quaternary-navy-blue">
                  <CardHeader title="Status" />
                  <StatusTimeline
                    isAdmin={isAdmin}
                    onCheckNotes={handleCheckNotes}
                    showCheckNotesBtn={true}
                  />
                </div>
                {/* <FileUploadSection
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  reqId={reqId || ""}
                  isAnalysisStarted={isAnalysisStarted}
                  setIsAnalysisStarted={setIsAnalysisStarted}
                  isAnalysisComplete={isAnalysisComplete}
                  setIsAnalysisComplete={setIsAnalysisComplete}
                  isAnalysisFailed={isAnalysisFailed}
                  setIsAnalysisFailed={setIsAnalysisFailed}
                  startAnalysis={startAnalysis}
                  restartAnalysis={startAnalysis}
                  handleOpenProgressNotesModal={handleOpenProgressNotesModal}
                  handleDownload={handleDownloadReport}
                /> */}
                <FileUploadSection
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  reqId={reqId || ""}
                  {...fileUploadsObj}
                  inviteCode={inviteCode}
                  title="Progress Notes"
                  handleOpenProgressNotesModal={handleOpenProgressNotesModal}
                />
                <div className="bg-primary-white rounded-xl border border-quaternary-navy-blue relative overflow-hidden">
                  <CardHeader title="Other Files" />
                  <div className="p-4 flex flex-col gap-4 relative">
                    <div className="inline-flex flex-col gap-2">
                      <h3 className="text-base font-medium text-primary-black">
                        Generate File
                      </h3>
                      <LetterOfMedicalNecessity
                        requestDetails={requestDetails}
                      />
                    </div>
                    <div className="inline-flex flex-col gap-2">
                      <h3 className="text-base font-medium text-primary-black">
                        Upload Files
                      </h3>
                      <FileDropzone
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onFileChange={handleFileChange}
                        className="!p-3"
                        isPharmacyRequest={true}
                      />
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="inline-flex flex-col gap-2">
                        <h3 className="text-sm font-medium text-secondary-black ">
                          {uploadedFiles.some(
                            (item: any) => item.status === "uploading"
                          ) ? (
                            <span>
                              {
                                uploadedFiles.filter(
                                  (item: any) => item.status === "uploading"
                                ).length
                              }{" "}
                              files uploading...
                            </span>
                          ) : (
                            <span>Uploaded Files</span>
                          )}
                        </h3>
                        <UploadFileList
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          files={uploadedFiles}
                          removeFile={(id: any) => removeFile(id)}
                          handleAddTag={handleAddTag}
                        />
                        <ThemeButton className="flex items-center justify-center gap-2 sm:mx-auto mt-2" variant="tertiary">
                          <span className="flex items-center gap-2 text-xs">
                            View All
                            <img src="/view-all.svg" alt="View All" className="w-4 h-4" />
                          </span>
                        </ThemeButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <InfoDetails requestDetails={requestDetails} isAdmin={isAdmin} />
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}
      </div>
    </>
  );
};

export default PharmacyRequestDetails;