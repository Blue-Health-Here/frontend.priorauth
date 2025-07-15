import React, { useState, useEffect, useCallback, useRef } from "react";
import GradientSidebarButton from "./GradientSidebarButton";
import RenderFilePreview from "./RenderFilePreview";
import { UploadedFile } from "@/utils/types";
import ModalWrapper from "@/components/common/ModalWrapper";
import ModalHeader from "@/components/common/ModalHeader";
import FileDropzone from "@/components/common/FileDropzone";
import UploadFileList from "../common/UploadFileList";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteUploadedProgressNote } from "@/store/features/pharmacy/requests/requestProgressNotesSlice";
import { postChartNotesFiles, postStartAiAnalysis } from "@/services/pharmacyService";
import ProgressNotesAnalysis from "./ProgressNotesAnalysis";
import Loading from "../common/Loading";

interface ProgressNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartNotes?: any[];
  requestDetails?: any;
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

const ProgressNotesModal: React.FC<ProgressNotesModalProps> = ({
  isOpen,
  onClose,
  chartNotes = []
}) => {
  // const { reqsProgressNotesUploaded } = useSelector((state: RootState) => state.pharmacyRequestProgressNotes);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [previouslyUploadedFiles, setPreviouslyUploadedFiles] = useState<
    UploadedFile[]
  >([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [analysisStarted, setAnalysisStarted] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const { id: requestId } = useParams();
  const [analysisDetails, setAnalysisDetails] = useState<any>(null);
  const [isLoadingStartAnalysis, setIsLoadingStartAnalysis] = useState<boolean>(false);
  const [isLoadingForUploadFiles, setIsLoadingForUploadFiles] = useState<boolean>(false);

  useEffect(() => {
    if (chartNotes?.length > 0) {
      setUploadedFiles(
        chartNotes.map((item: any) => {
          return {
            ...item,
            name: item.fileName,
            type: item.mimeType,
            status: "completed"
          }
        })
      );
    } else {
      setUploadedFiles([]);
    }
  }, [chartNotes]);

  useEffect(() => {
    if (!isOpen || !uploadedFiles.some((file) => file.status === "uploading"))
      return;

    const interval = setInterval(() => {
      setUploadedFiles((prevFiles) =>
        prevFiles.map((file) => {
          if (file.status === "uploading") {
            const newProgress = Math.min(
              file.progress + Math.random() * 20,
              100
            );
            return {
              ...file,
              progress: newProgress,
              status: newProgress >= 100 ? "completed" : "uploading",
            };
          }
          return file;
        })
      );
    }, 500);
    return () => clearInterval(interval);
  }, [uploadedFiles, isOpen]);

  const loadPdfJs = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib);
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js"));
      document.head.appendChild(script);
    });
  }, []);

  const convertPdfToImage = useCallback(
    async (file: any) => {
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
        };
      } catch (err) {
        console.error("Error converting PDF to image:", err);
      }
    },
    [loadPdfJs]
  );

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingForUploadFiles(true);
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      try {
        const formData = new FormData();
        fileArray.forEach((file: any) => {
          formData.append("chartNotes", file);
        });
        const response = await postChartNotesFiles(dispatch, requestId, formData)
        if (response) {
          setUploadedFiles((prev: any) => [...prev, ...response?.chartNotes?.map((item: any) => {
            return {
              ...item,
              name: item.fileName,
              type: item.mimeType,
            }
          })]);
        }
      } catch (error: any) {
        console.log(error?.message);
        setUploadedFiles([]);
      } finally {
        setIsLoadingForUploadFiles(false);
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

  const startAnalysis = async () => {
    setIsLoadingStartAnalysis(true)
    const updatedFiles = [...uploadedFiles, ...previouslyUploadedFiles];
    try {
      const response = await postStartAiAnalysis(dispatch, requestId);
      if (response) {
        setAnalysisStarted(true);
        setAnalysisDetails(response);
        setSelectedFile(updatedFiles[0]);
        setUploadedFiles(updatedFiles);
      }
    } catch (error: any) {
      console.log(error?.message);
      setAnalysisDetails([]);
      setAnalysisStarted(false);
    } finally {
      setIsLoadingStartAnalysis(false);
    }
  };

  const redoAnalysis = () => {
    setPreviouslyUploadedFiles((prev) => [...prev, ...uploadedFiles]);
    setUploadedFiles([]);
    setAnalysisStarted(false);
    setSelectedFile(null);
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
            };
          }
        })
      );
      setUploadedFiles((prev: any) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string, requestId?: string) => {
    setUploadedFiles((prevFiles) => {
      const updated = prevFiles.filter((file) => file.id !== id);

      if (requestId) {
        dispatch(deleteUploadedProgressNote({
          requestId,
          fileName: prevFiles.find(file => file.id === id)?.name || ''
        }));
      }

      return updated;
    });
  };

  const handleSelectFile = (file: any) => setSelectedFile(file);

  console.log(uploadedFiles, analysisDetails, "uploadedFiles");
  return (
    <ModalWrapper>
      <ModalHeader title="AI Analysis" onClose={onClose} />
      <div
        className="w-[1536px] overflow-hidden z-50 flex"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className="relative h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 flex-1">
          {/* Left Sidebar */}
          <div className="order-1 md:order-1 col-span-1 bg-[#F8FAFF] z-0 flex flex-col justify-between gap-4 p-4 md:p-6 relative md:w-[401px] h-full overflow-y-auto">
            {!analysisStarted && (
              <div className="space-y-4">
                {/* Upload File Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-2.5">
                  <FileDropzone
                    isDragging={isDragging}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onFileChange={handleFileChange}
                  />

                  {uploadedFiles.length > 0 && !isLoadingForUploadFiles ? (
                    <div className="mt-4">
                      <div className="px-2 py-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          {uploadedFiles.some(
                            (file) => file.status === "uploading"
                          )
                            ? `${uploadedFiles.filter(
                              (file) => file.status === "uploading"
                            ).length
                            } file${uploadedFiles.filter(
                              (file) => file.status === "uploading"
                            ).length > 1
                              ? "s"
                              : ""
                            } uploading`
                            : "Uploaded Files"}
                        </h4>
                      </div>
                      <UploadFileList
                        isAddTags={false}
                        files={uploadedFiles}
                        removeFile={removeFile}
                      />
                    </div>
                  ): isLoadingForUploadFiles ? (
                    <Loading />
                  ) : null}
                </div>

                {/* Previously Uploaded Files Section */}
                {previouslyUploadedFiles.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-2.5">
                    <div className="px-2 py-2">
                      <h4 className="text-sm font-medium text-gray-700">
                        Previously Uploaded Files
                      </h4>
                    </div>
                    <UploadFileList
                      isAddTags={false}
                      files={previouslyUploadedFiles}
                      removeFile={(id: any) =>
                        setPreviouslyUploadedFiles((prev) =>
                          prev.filter((file) => file.id !== id)
                        )
                      }
                    />
                  </div>
                )}
              </div>
            )}

            {analysisStarted && (
              <div className="flex-1">
                <h4 className="text-base font-medium text-[#1E1E1E] mb-4">
                  Your Uploads
                </h4>
                <div
                  className={`${uploadedFiles.length === 1
                    ? "flex justify-center flex-1"
                    : "grid grid-cols-2 gap-4 flex-1"
                    }`}
                >
                  {uploadedFiles.map((file) => (
                    <RenderFilePreview
                      key={file.id}
                      file={file}
                      isLarge={uploadedFiles.length === 1}
                      selectedItem={selectedFile}
                      handleSelectFile={handleSelectFile}
                    />
                  ))}
                </div>
              </div>
            )}

            <GradientSidebarButton
              disabled={
                uploadedFiles.length === 0 && previouslyUploadedFiles.length === 0
              }
              analysisStarted={analysisStarted}
              redoAnalysis={redoAnalysis}
              startAnalysis={startAnalysis}
              isLoadingStartAnalysis={isLoadingStartAnalysis}
            />
          </div>

          {/* Main Content */}
          <div className="order-2 md:order-2 col-span-1 md:col-span-2 lg:col-span-3 flex flex-col h-full overflow-hidden">
            {!analysisStarted ? (
              <div className="flex items-center justify-center h-full p-4">
                <img
                  src="/radial-color-ai.png"
                  alt="radial color ai"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-none md:w-[30rem] lg:w-[60rem] custom-bounce"
                />
              </div>
            ) : (
              <ProgressNotesAnalysis analysisDetails={analysisDetails} />
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProgressNotesModal;
