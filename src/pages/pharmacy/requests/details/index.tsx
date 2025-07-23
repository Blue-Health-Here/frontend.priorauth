import React, { useCallback, useEffect, useRef, useState } from "react";
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
} from "@/services/pharmacyService";
import Loading from "@/components/common/Loading";
import StatusTimeline from "./StatusTimeline";
import SideDrawer from "@/components/SideDrawer";
import RequestDetailsContent from "./SideDrawerReqDetailsContent";
import LetterOfMedicalNecessity from "./LetterOfMedicalNecessity";
import { loadPdfJs } from "@/services/pdfService";
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
  const analysisTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (analysisTimerRef.current) {
        clearTimeout(analysisTimerRef.current);
      }
    };
  }, []);

  const startAnalysis = () => {
    setIsAnalysisStarted(true);
    setIsAnalysisComplete(false);
    setIsAnalysisFailed(false);

    if (analysisTimerRef.current) {
      clearTimeout(analysisTimerRef.current);
    }

    // Simulate analysis that randomly succeeds or fails
    analysisTimerRef.current = setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        setIsAnalysisComplete(true);
      } else {
        setIsAnalysisFailed(true);
      }
    }, 5000);
  };

  const restartAnalysis = () => {
    startAnalysis();
  };

  const handleOpenProgressNotesModal = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      try {
        const formData = new FormData();
        fileArray.forEach((file: any) => {
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
      const newFiles = await Promise.all(
        fileArray.map(async (file) => {
          if (file.type === "application/pdf") {
            const response: any = await convertPdfToImage(file);
            return response;
          } else {
            return {
              id: Math.random().toString(36).substring(2, 9),
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
              progress: 0,
              status: "uploading" as const,
              file: file,
              url: URL.createObjectURL(file),
              fileTags: [],
            };
          }
        })
      );
      setUploadedFiles((prev: any) => [...prev, ...newFiles]);
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

  const convertPdfToImage = useCallback(async (file: any) => {
    try {
      const pdfjsLib: any = await loadPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas: any = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      const imageDataUrl = canvas.toDataURL("image/png", 0.9);
      return {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        progress: 0,
        status: "uploading" as const,
        file: file,
        url: imageDataUrl,
        fileTags: [],
      };
    } catch (err) {
      console.error("Error converting PDF to image:", err);
    }
  }, []);

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
      <div className="p-4 bg-white rounded-xl theme-shadow relative">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <PageHeader requestDetails={requestDetails} isAdmin={isAdmin} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 lg:col-span-2 space-y-4">
                <div className="bg-white rounded-xl overflow-hidden border border-quaternary-navy-blue">
                  <CardHeader title="Status" />
                  <StatusTimeline
                    isAdmin={isAdmin}
                    onCheckNotes={handleCheckNotes}
                    showCheckNotesBtn={true}
                  />
                </div>
                {/* <div className="bg-white rounded-xl overflow-hidden border border-quaternary-navy-blue">
                  <CardHeader title="Progress Notes" />
                  <div className="p-4">
                    <div className="relative rounded-lg p-[2px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B] overflow-hidden">
                      <button
                        type="button"
                        onClick={handleOpenProgressNotesModal}
                        className="flex w-full items-center justify-center cursor-pointer gap-2 py-4 px-3 bg-white rounded-lg"
                      >
                        <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]">
                          {requestDetails?.chartNotes?.length > 0
                            ? "View Progress Notes"
                            : "Upload Progress Notes"}
                        </p>
                        <img
                          src="/upload-new.svg"
                          alt="upload new img"
                          className=""
                        />
                      </button>
                    </div>
                  </div>
                </div> */}
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
                  restartAnalysis={restartAnalysis}
                  handleOpenProgressNotesModal={handleOpenProgressNotesModal}
                  convertPdfToImage={convertPdfToImage}
                />
                <div className="bg-white rounded-xl border border-quaternary-navy-blue relative overflow-hidden">
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