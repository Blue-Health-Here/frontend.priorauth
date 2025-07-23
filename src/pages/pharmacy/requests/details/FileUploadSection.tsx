import React, { useRef } from "react";
import CardHeader from "@/components/common/CardHeader";
import { UploadedFile } from "@/utils/types";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteReqUploadedFile, postRequestUploadFiles } from "@/services/pharmacyService";

interface FileUploadSectionProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  reqId: string;
  isAnalysisStarted: boolean;
  setIsAnalysisStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isAnalysisComplete: boolean;
  setIsAnalysisComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isAnalysisFailed: boolean;
  setIsAnalysisFailed: React.Dispatch<React.SetStateAction<boolean>>;
  startAnalysis: () => void;
  restartAnalysis: () => void;
  handleOpenProgressNotesModal: () => void;
  convertPdfToImage: (file: any) => Promise<any>;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  uploadedFiles,
  setUploadedFiles,
  reqId,
  isAnalysisStarted,
  setIsAnalysisStarted,
  isAnalysisComplete,
  isAnalysisFailed,
  startAnalysis,
  restartAnalysis,
  handleOpenProgressNotesModal,
  convertPdfToImage,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const analysisTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    try {
      // First create local preview of files
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

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      // Then upload to server
      const formData = new FormData();
      fileArray.forEach((file: any) => {
        formData.append("files", file);
      });

      const response = await postRequestUploadFiles(dispatch, reqId, formData);

      if (response) {
        // Update the files with server response
        setUploadedFiles((prev) =>
          prev.map((localFile) => {
            const serverFile = response.files.find(
              (f: any) => f.fileName === localFile.name
            );
            if (serverFile) {
              return {
                ...serverFile,
                name: serverFile.fileName,
                type: serverFile.mimeType,
                progress: 100,
                status: "completed" as const,
                url: localFile.url, 
              };
            }
            return localFile;
          })
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to upload files");
      // Remove files that failed to upload
      setUploadedFiles((prev) =>
        prev.filter((file) => !fileArray.some((f) => f.name === file.name))
      );
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {};

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
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

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-quaternary-navy-blue">
      <CardHeader title="Progress Notes" />
      <div className="p-4">
        <div
          className="relative rounded-lg border border-dashed border-[#FF512B] overflow-hidden"
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <button
            type="button"
            className="flex flex-col w-full items-center justify-center cursor-pointer gap-1 py-4 px-3 bg-gradient-to-r from-[#F7F1FF] to-[#FFEFEF] rounded-xl"
          >
            <img src="/upload1.svg" alt="upload new img" className="mb-1 w-8 md:w-auto" />
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]">
              Click to upload or drag and drop
            </p>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            multiple
          />
        </div>
      </div>
      {uploadedFiles.length > 0 && (
        <div className="p-4 pt-0">
          {isAnalysisStarted ? (
            <div className="border border-quaternary-navy-blue rounded-lg p-4 sm:p-6 flex justify-center">
              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md w-full">
                {/* Icon container with overlay */}
                <div className="sm:ml-6 relative">
                  {isAnalysisComplete ? (
                    <div className="relative">
                      <img
                        src="/analysis-completed.svg"
                        alt="Analysis Complete"
                        className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0"
                      />
                      <img
                        src="/Speciality.svg"
                        alt="Speciality"
                        className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12"
                      />
                    </div>
                  ) : isAnalysisFailed ? (
                    <div className="relative">
                      <img
                        src="/failed-analysis.png"
                        alt="Analysis Failed"
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                      />
                      <img
                        src="/failed.svg"
                        alt="Failed"
                        className="absolute inset-0 m-auto w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </div>
                  ) : (
                    <img
                      src="/current-stage.svg"
                      alt="Current Stage"
                      className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0"
                    />
                  )}
                </div>

                {/* Content section */}
                <div className="space-y-3 text-center sm:text-left">
                  {!isAnalysisComplete && !isAnalysisFailed && (
                    <div className="space-y-1">
                      <p className="text-sm text-quaternary-white">
                        Current Stage
                      </p>
                    </div>
                  )}

                  <h3
                    className={`text-xl sm:text-2xl font-semibold ${
                      isAnalysisComplete
                        ? "text-[#19AD4B]"
                        : isAnalysisFailed
                        ? "text-[#FF2E37] sm:text-lg"
                        : "text-transparent bg-clip-text bg-gradient-to-r from-[#F66568] via-[#C0489D] via-50% to-[#A16CF9]"
                    }`}
                  >
                    {isAnalysisComplete
                      ? "Analysis Completed"
                      : isAnalysisFailed
                      ? "Analysis Failed"
                      : "Analysing..."}
                  </h3>

                  {isAnalysisFailed && (
                    <p className="text-secondary-black text-sm">
                      Due to an unexpected error, the analysis could not be
                      completed.
                    </p>
                  )}

                  {/* Buttons section */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                    {isAnalysisComplete ? (
                      <>
                        <button className="flex items-center gap-1 text-white bg-[#163066] hover:bg-[#1a3a8a] rounded-sm px-2 py-1 text-xs font-medium transition-colors min-w-[85px] h-7">
                          Download
                          <img
                            src="/download.svg"
                            alt="Download"
                            className="w-3 h-3"
                          />
                        </button>
                        <button
                          onClick={handleOpenProgressNotesModal}
                          className="flex items-center gap-1 text-[#163066] bg-[#EBF1FF] hover:bg-[#d9e4ff] rounded-sm px-2 py-1 text-xs font-medium transition-colors min-w-[70px] h-7"
                        >
                          View
                          <img
                            src="/view-analysis.svg"
                            alt="View"
                            className="w-3 h-3"
                          />
                        </button>
                        <button
                          onClick={restartAnalysis}
                          className="flex items-center gap-1 text-primary-navy-blue border border-[#CBDAFF] hover:bg-[#f5f8ff] rounded-sm px-2 py-1 text-xs font-medium transition-colors min-w-[80px] h-7"
                        >
                          Restart
                          <img
                            src="/restart.svg"
                            alt="Restart"
                            className="w-3 h-3"
                          />
                        </button>
                      </>
                    ) : isAnalysisFailed ? (
                      <button
                        onClick={restartAnalysis}
                        className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B] hover:shadow-md transition-shadow max-w-[200px] w-full"
                      >
                        <div className="rounded-lg bg-white group flex items-center justify-center gap-2 px-4 py-2 w-full">
                          <span className="bg-gradient-to-r from-[#F66568] to-[#A16CF9] bg-clip-text text-transparent text-sm font-medium">
                            Restart AI Analysis
                          </span>
                          <img
                            src="/Group (2).svg"
                            alt="AI Icon"
                            className="w-5 h-5"
                          />
                        </div>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsAnalysisStarted(false);
                            if (analysisTimerRef.current) {
                              clearTimeout(analysisTimerRef.current);
                            }
                          }}
                          className="flex items-center gap-2 text-[#FF2E37] bg-[#FFE0E2] hover:bg-[#ffd5d6] rounded-sm px-3 py-1.5 text-sm font-medium transition-colors"
                        >
                          Stop Analysis
                        </button>
                        <button className="flex items-center gap-2 text-[#163066] bg-[#EBF1FF] hover:bg-[#d9e4ff] rounded-sm px-3 py-1.5 text-sm font-medium transition-colors">
                          View Live Analysis
                          <img
                            src="/view-analysis.svg"
                            alt="View Live"
                            className="w-3 h-3"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="border border-quaternary-navy-blue rounded-lg p-2 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src="/uploaded-files.svg"
                          alt="uploaded file"
                          className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                        />
                        <span className="text-sm font-medium truncate">
                          {file.name}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <img
                          src="/file-delete.svg"
                          alt="delete file"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                    {file.status === "uploading" && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-between mt-4 gap-3 sm:gap-0">
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="border border-quaternary-navy-blue-dark text-primary-navy-blue rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  Upload Files
                  <img
                    src="/upload-files.svg"
                    alt="Upload icon"
                    className="w-4 h-4"
                  />
                </button>

                <button
                  type="button"
                  onClick={startAnalysis}
                  className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B] hover:shadow-md transition-shadow w-full sm:w-auto"
                >
                  <div className="rounded-lg bg-white group flex items-center justify-center gap-2 px-4 py-2 w-full">
                    <span className="bg-gradient-to-r from-[#F66568] to-[#A16CF9] bg-clip-text text-transparent text-sm font-medium">
                      Start AI Analysis
                    </span>
                    <img
                      src="/Group (2).svg"
                      alt="AI Icon"
                      className="w-5 h-5"
                    />
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;