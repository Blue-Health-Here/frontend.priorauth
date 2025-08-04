import React, { useState, useEffect, useRef } from "react";
import RenderFilePreview from "./RenderFilePreview";
import { UploadedFile } from "@/utils/types";
import ModalWrapper from "@/components/common/ModalWrapper";
import ModalHeader from "@/components/common/ModalHeader";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAiAnalysis } from "@/services/pharmacyService";
import ProgressNotesAnalysis from "./ProgressNotesAnalysis";

interface ProgressNotesModalProps {
  isOpen: boolean;
  onClose: (isAdded?: boolean) => void;
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
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [analysisStarted, setAnalysisStarted] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const { id: requestId } = useParams();
  const [analysisDetails, setAnalysisDetails] = useState<any>(null);

  useEffect(() => {
    if (chartNotes?.length > 0 && isOpen) {
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
      handleFetchAiAnalysis();
    } else {
      setUploadedFiles([]);
    }
  }, [chartNotes]);

  const handleFetchAiAnalysis = async () => {
    const response = await fetchAiAnalysis(dispatch, requestId);
    if (response) {
      setAnalysisDetails(response);
      setAnalysisStarted(true);
      setSelectedFile(chartNotes[0]);
    }
  }

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

  if (!isOpen) return null;

  const handleSelectFile = (file: any) => setSelectedFile(file);

  return (
    <ModalWrapper>
      <ModalHeader title="AI Analysis" onClose={() => onClose(analysisDetails ? true : false)} />
      <div
        className="w-[1536px] overflow-hidden z-50 flex"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className="relative h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 flex-1">
          {/* Left Sidebar */}
          <div className="order-1 md:order-1 col-span-1 bg-[#F8FAFF] z-0 flex flex-col justify-between gap-4 p-4 md:p-6 relative md:w-[401px] h-full overflow-y-auto">
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
