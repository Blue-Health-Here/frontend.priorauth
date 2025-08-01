import React, { useRef } from "react";
import CardHeader from "@/components/common/CardHeader";
import { UploadedFile } from "@/utils/types";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteReqUploadedFile, postChartNotesFiles } from "@/services/pharmacyService";
import ThemeButton from "@/components/common/ThemeButton";

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
  handleDownload: () => void;
  title?: string;
  inviteCode?: any;
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
  handleDownload, title
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const analysisTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    try {
      const formData = new FormData();
      fileArray.forEach((file: any) => {
        formData.append("chartNotes", file);
      });
      const response = await postChartNotesFiles(dispatch, reqId, formData)
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
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = () => { };

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
    <div className="bg-primary-white rounded-xl overflow-hidden border border-quaternary-navy-blue">
      {title && <CardHeader title={title} />}
      {!isAnalysisComplete && !isAnalysisStarted && uploadedFiles.length === 0 && (
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
        className="flex flex-col w-full items-center justify-center cursor-pointer gap-1 py-3 sm:py-4 px-3 bg-gradient-to-r from-[#F7F1FF] to-[#FFEFEF] rounded-xl"
      >
        <img 
          src="/upload1.svg" 
          alt="upload new img" 
          className="w-6 h-6 sm:w-auto sm:h-auto mb-0 sm:mb-1" 
        />
        <p className="text-xs sm:text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9] whitespace-nowrap sm:whitespace-normal">
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
)}
      {uploadedFiles.length > 0 && (
        <div className="p-4">
          {isAnalysisStarted ? (
            <div className="rounded-lg p-4 sm:p-6 flex justify-center">
              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md w-full">
                {/* Icon container with overlay */}
                <div className="relative">
                  {isAnalysisComplete ? (
                    <div className="relative">
                      <img
                        src="/analysis-completed.svg"
                        alt="Analysis Complete"
                        className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0"
                      />
                      <img
                        src="/Speciality.svg"
                        alt="Speciality"
                        className="absolute inset-0 m-auto w-8 h-8 sm:w-12 sm:h-12"
                      />
                    </div>
                  ) : isAnalysisFailed ? (
                    <div className="relative">
                      <img
                        src="/failed-analysis.png"
                        alt="Analysis Failed"
                        className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                      />
                      <img
                        src="/failed.svg"
                        alt="Failed"
                        className="absolute inset-0 m-auto w-5 h-5 sm:w-8 sm:h-8"
                      />
                    </div>
                  ) : (
                    <img
                      src="/current-stage.svg"
                      alt="Current Stage"
                      className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0"
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
                    className={`text-lg sm:text-2xl font-semibold ${isAnalysisComplete
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
                    <p className="text-secondary-black text-xs sm:text-sm">
                      Due to an unexpected error, the analysis could not be
                      completed.
                    </p>
                  )}

                  {/* Buttons section */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                    {isAnalysisComplete ? (
                      <>
                        <ThemeButton 
                          variant="primary" 
                          onClick={handleDownload}
                          className="text-xs sm:text-sm"
                        >
                          <span className="flex items-center gap-1 sm:gap-2">
                            Download
                            <img src="/download.svg" alt="Download" className="w-3 h-3 sm:w-4 sm:h-4" />
                          </span>
                        </ThemeButton>
                        <ThemeButton 
                          onClick={handleOpenProgressNotesModal} 
                          variant="secondary"
                          className="text-xs sm:text-sm"
                        >
                          <span className="flex items-center gap-1 sm:gap-2">
                            View
                            <img src="/view-analysis.svg" alt="View" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </span>
                        </ThemeButton>
                        <ThemeButton 
                          onClick={restartAnalysis} 
                          variant="tertiary"
                          className="text-xs sm:text-sm"
                        >
                          <span className="flex items-center gap-1 sm:gap-2">
                            Restart
                            <img src="/restart.svg" alt="Restart" className="w-3 h-3 sm:w-4 sm:h-4" />
                          </span>
                        </ThemeButton>
                      </>
                    ) : isAnalysisFailed ? (
                      <button
                        onClick={restartAnalysis}
                        className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B] hover:shadow-md transition-shadow w-full sm:max-w-[200px]"
                      >
                        <div className="rounded-lg bg-primary-white group flex items-center justify-center gap-2 px-3 sm:px-4 py-2 w-full">
                          <span className="bg-gradient-to-r from-[#F66568] to-[#A16CF9] bg-clip-text text-transparent text-xs sm:text-sm font-medium">
                            Restart AI Analysis
                          </span>
                          <img
                            src="/Group (2).svg"
                            alt="AI Icon"
                            className="w-4 h-4 sm:w-5 sm:h-5"
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
                          className="flex items-center gap-2 text-[#FF2E37] bg-[#FFE0E2] hover:bg-[#ffd5d6] rounded-sm px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium transition-colors"
                        >
                          Stop Analysis
                        </button>
                        <button className="flex items-center gap-2 text-[#163066] bg-[#EBF1FF] hover:bg-[#d9e4ff] rounded-sm px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium transition-colors">
                          View Live
                          <img
                            src="/view-analysis.svg"
                            alt="View Live"
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                        <span className="text-xs sm:text-sm font-medium truncate">
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
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
                  className="border border-quaternary-navy-blue-dark text-primary-navy-blue rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 sm:gap-2 font-medium"
                >
                  Upload Files
                  <img
                    src="/upload-files.svg"
                    alt="Upload icon"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                </button>

                <button
                  type="button"
                  onClick={startAnalysis}
                  className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B] hover:shadow-md transition-shadow w-full sm:w-auto"
                >
                  <div className="rounded-lg bg-primary-white group flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 w-full">
                    <span className="bg-gradient-to-r from-[#F66568] to-[#A16CF9] bg-clip-text text-transparent text-xs sm:text-sm font-medium">
                      Start AI Analysis
                    </span>
                    <img
                      src="/Group (2).svg"
                      alt="AI Icon"
                      className="w-4 h-4 sm:w-5 sm:h-5"
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