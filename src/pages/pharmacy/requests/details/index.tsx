import React, { useEffect, useRef, useState } from "react";
import CardHeader from "@/components/common/CardHeader";
import { UploadedFile } from "@/utils/types";
import ProgressNotesModal from "@/components/ProgressNotesModal";
import PageHeader from "./PageHeader";
import InfoDetails from "./InfoDetails";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getRequestDetails,
  getRequestStatuses,
  postRequestUploadFiles,
  deleteReqUploadedFile,
  postStartAiAnalysis,
} from "@/services/pharmacyService";
import Loading from "@/components/common/Loading";
import StatusTimeline from "./StatusTimeline";
import SideDrawer from "@/components/SideDrawer";
import RequestDetailsContent from "./SideDrawerReqDetailsContent";
import LetterOfMedicalNecessity from "./LetterOfMedicalNecessity";
import FileUploadSection from "./FileUploadSection";
import FileDropzone from "@/components/common/FileDropzone";
import UploadFileList from "@/components/common/UploadFileList";
import { setRequestComments } from "@/store/features/pharmacy/requests/requestsSlice";
import toast from "react-hot-toast";

const PharmacyRequestDetails: React.FC<any> = ({ isAdmin }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const canvasRef = useRef(null);
  const [requestDetails, setRequestDetails] = useState<any>(null);
  const isFetchedReqDetails = useRef(false);
  const dispatch = useDispatch();
  const { id: reqId } = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAnalysisStarted, setIsAnalysisStarted] = useState<boolean>(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [isAnalysisFailed, setIsAnalysisFailed] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const startAnalysis = async () => {
    setIsAnalysisStarted(true);
    setIsAnalysisComplete(false);
    setIsAnalysisFailed(false);

    const response = await postStartAiAnalysis(dispatch, reqId);
    if (response) {
      setIsAnalysisComplete(true);
      setIsAnalysisFailed(false);
    } else {
      setIsAnalysisComplete(false);
      setIsAnalysisFailed(true);
    }
  };

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

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const detailsRes = await getRequestDetails(dispatch, reqId);

      if (detailsRes) {
        setRequestDetails(detailsRes);
        setUploadedFiles(detailsRes?.files.map((item: any) => ({ ...item, name: item.fileName, type: item.mimeType })))
        dispatch(setRequestComments(detailsRes.comments));
        if (detailsRes?.chartNotes?.length > 0) {
          setIsAnalysisComplete(true);
          setIsAnalysisStarted(true);
        }
      } else {
        setRequestDetails(null);
        setUploadedFiles([]);
        dispatch(setRequestComments([]));
      }

      setIsLoading(false);
    };

    if (!isFetchedReqDetails.current) {
      fetchData();
      isFetchedReqDetails.current = true;
    }
  }, [dispatch, reqId]);

  const handleCheckNotes = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <ProgressNotesModal
        isOpen={isModalOpen}
        onClose={(isAdded?: boolean) => {
          setIsModalOpen(false);
          if (isAdded) getRequestStatuses(dispatch, reqId);
        }}
        chartNotes={requestDetails?.chartNotes || []}
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
            <PageHeader requestDetails={requestDetails} isAdmin={isAdmin} />
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
                <FileUploadSection
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
                        <h3 className="text-sm font-medium text-secondary-black">
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
                        <button className="flex items-center justify-center gap-2 mx-auto mt-2 px-3 py-1.5 border border-[#CBDAFF] rounded-lg text-primary-navy-blue hover:bg-[#F5F8FF] transition-colors text-sm font-medium">
                          <span>View All</span>
                          <img
                            src="/view-all.svg"
                            alt="View All"
                            className="h-3.5 w-3.5"
                          />
                        </button>
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