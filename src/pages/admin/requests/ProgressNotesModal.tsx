import React, { useState, useEffect } from "react";

interface ProgressNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  progress: number;
  status: "uploading" | "completed" | "error";
  url?: string;
  file?: File;
}

interface AnalysisResult {
  diagnosis: string;
  treatmentNotes: string;
  currentMedications: Medication[];
  previousMedications: Medication[];
  summary?: string;
  lastUpdated?: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  purpose?: string;
  startDate?: string;
  endDate?: string;
}

const ProgressNotesModal: React.FC<ProgressNotesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock AI analysis function - in a real app, this would call an API
  const performAIAnalysis = (files: UploadedFile[]): Promise<AnalysisResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // This is mock data - replace with actual API call
        const mockResult: AnalysisResult = {
          diagnosis: "Type 2 Diabetes Mellitus with mild peripheral neuropathy\nHypertension, stage 1\nHyperlipidemia",
          treatmentNotes: "Patient presents with elevated HbA1c (8.2%) and reports occasional tingling in extremities. Blood pressure is controlled with current medications. Recommend:\n- Increase metformin to 1000mg BID\n- Start low-dose aspirin therapy\n- Referral to nutritionist for diabetic diet education\n- Schedule follow-up in 3 months for repeat labs",
          currentMedications: [
            {
              name: "Metformin",
              dosage: "500mg",
              frequency: "Twice daily",
              purpose: "Blood sugar control",
              startDate: "01/15/2022"
            },
            {
              name: "Lisinopril",
              dosage: "10mg",
              frequency: "Daily",
              purpose: "Hypertension",
              startDate: "03/10/2021"
            },
            {
              name: "Atorvastatin",
              dosage: "20mg",
              frequency: "At bedtime",
              purpose: "Cholesterol management",
              startDate: "06/05/2022"
            }
          ],
          previousMedications: [
            {
              name: "Glipizide",
              dosage: "5mg",
              frequency: "Daily",
              purpose: "Blood sugar control",
              startDate: "08/12/2020",
              endDate: "01/10/2022"
            },
            {
              name: "Hydrochlorothiazide",
              dosage: "12.5mg",
              frequency: "Daily",
              purpose: "Hypertension",
              startDate: "02/05/2020",
              endDate: "03/05/2021"
            }
          ],
          summary: "Patient with well-controlled hypertension and hyperlipidemia, but suboptimal diabetes control. Needs medication adjustment and lifestyle modifications.",
          lastUpdated: new Date().toLocaleString()
        };
        resolve(mockResult);
      }, 3000); // Simulate API delay
    });
  };

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
            const status: "uploading" | "completed" = 
              newProgress >= 100 ? "completed" : "uploading";
            
            const updatedFile = {
              ...file,
              progress: newProgress,
              status: status,
            };
            
            if (newProgress >= 100 && !file.url) {
              return {
                ...updatedFile,
                url: URL.createObjectURL(file.file || new Blob([], { type: file.type }))
              };
            }
            return updatedFile;
          }
          return file;
        })
      );
    }, 500);
    return () => clearInterval(interval);
  }, [uploadedFiles, isOpen]);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => {
        if (file.url) URL.revokeObjectURL(file.url);
      });
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        progress: 0,
        status: "uploading" as const,
        file: file,
        url: URL.createObjectURL(file)
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        progress: 0,
        status: "uploading" as const,
        file: file,
        url: URL.createObjectURL(file)
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = uploadedFiles.find(file => file.id === id);
    if (fileToRemove?.url) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const startAnalysis = async () => {
    if (uploadedFiles.length === 0) return;
    
    setAnalysisStarted(true);
    setIsAnalyzing(true);
    
    try {
      const result = await performAIAnalysis(uploadedFiles);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Handle error state
    } finally {
      setIsAnalyzing(false);
    }
  };

  const redoAnalysis = () => {
    setAnalysisStarted(false);
    setAnalysisResult(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const renderFilePreview = (file: UploadedFile, isLarge: boolean = false) => {
    if (!file.url) return null;
    
    const containerClass = isLarge 
      ? 'w-full h-full bg-gray-50 rounded-md overflow-hidden flex items-center justify-center border border-gray-200'
      : 'w-full h-60 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center border border-gray-200';
    
    if (file.type.startsWith('image/')) {
      return (
        <div className={containerClass}>
          <img 
            src={file.url} 
            alt={file.name} 
            className="max-h-full max-w-full object-contain"
          />
        </div>
      );
    } else if (file.type === 'application/pdf') {
      return (
        <div className={`${containerClass} relative`}>
          <iframe 
            src={`${file.url}#toolbar=0&navpanes=0&view=fitH`}
            className="w-full h-full"
            title={file.name}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white text-gray-800 text-xs p-1 truncate border-t border-gray-200">
            {file.name}
          </div>
        </div>
      );
    } else if (file.type.startsWith('text/') || 
               file.type === 'application/msword' || 
               file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return (
        <div className={`${containerClass} relative`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-12 w-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white text-gray-800 text-xs p-1 truncate border-t border-gray-200">
            {file.name}
          </div>
        </div>
      );
    } else {
      return (
        <div className={`${containerClass} relative`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white text-gray-800 text-xs p-1 truncate border-t border-gray-200">
            {file.name}
          </div>
        </div>
      );
    }
  };

  const renderMedicationItem = (med: Medication, isCurrent: boolean = true) => (
    <div key={med.name} className="p-3 border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900">{med.name}</h4>
          <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
          {med.purpose && <p className="text-xs text-gray-500 mt-1">Purpose: {med.purpose}</p>}
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${isCurrent ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {isCurrent ? 'Current' : 'Previous'}
        </span>
      </div>
      <div className="flex text-xs text-gray-500 mt-2 space-x-4">
        {med.startDate && <span>Start: {med.startDate}</span>}
        {!isCurrent && med.endDate && <span>End: {med.endDate}</span>}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-lg shadow-xl border border-gray-300 w-full max-w-8xl h-[90vh] mx-4 overflow-hidden z-50"
        style={{ maxHeight: "calc(100vh - 4rem)" }}
      >
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">Medical Report AI Analysis</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="relative p-6 h-[calc(100%-72px)] overflow-hidden">
          <div className="absolute top-0 left-0 w-1/4 h-full bg-[#F8FAFF] z-0 flex flex-col">
            {analysisStarted && (
              <div className="p-4 flex-1 overflow-hidden flex flex-col">
                <h4 className="text-sm font-medium text-gray-700 mb-4">
                  Uploaded Documents
                </h4>
                <div className={`${uploadedFiles.length === 1 ? 'flex justify-center flex-1' : 'grid grid-cols-2 gap-4 flex-1 overflow-y-auto'}`}>
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`rounded-lg ${uploadedFiles.length === 1 ? 'w-full max-w-md' : ''}`}
                    >
                      {renderFilePreview(file, uploadedFiles.length === 1)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-auto mb-4 ml-5 mr-5">
              <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B]">
                <div className="bg-white rounded-lg p-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    {!analysisStarted ? (
                      <button
                        onClick={startAnalysis}
                        disabled={uploadedFiles.length === 0}
                        className={`text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9] ${
                          uploadedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Start AI Analysis
                      </button>
                    ) : (
                      <button
                        onClick={redoAnalysis}
                        className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]"
                      >
                        Redo Analysis
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!analysisStarted && (
            <div className="absolute top-[8rem] left-[8rem] w-full flex justify-center z-10">
              <div
                className="relative flex items-center justify-center rounded-full p-1"
                style={{
                  background: "linear-gradient(to right, #F66568, #A16CF9)",
                  width: "400px",
                  height: "400px",
                }}
              >
                <div
                  className="bg-white rounded-full w-full h-full flex items-center justify-center p-8 relative"
                  style={{
                    boxShadow: `
                    inset 0 4px 12px rgba(166, 108, 249, 0.5),
                    inset 0 -2px 6px rgba(246, 101, 104, 0.3)
                  `,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(
                      circle at 50% 80%,
                      transparent 65%,
                      rgba(166, 108, 249, 0.15) 70%,
                      rgba(166, 108, 249, 0.3) 75%,
                      rgba(166, 108, 249, 0.1) 85%,
                      transparent 90%
                    )`,
                      filter: "blur(1px)",
                    }}
                  ></div>

                  <div
                    className="absolute inset-0 rounded-full opacity-70"
                    style={{
                      background: `radial-gradient(
                      circle at 50% 20%,
                      transparent 85%,
                      rgba(246, 101, 104, 0.1) 90%,
                      transparent 95%
                    )`,
                      mixBlendMode: "overlay",
                    }}
                  ></div>

                  <h2 className="text-3xl font-bold text-center relative z-10">
                    <span className="bg-gradient-to-r from-[#F66568] to-[#A163F9] bg-clip-text text-transparent">
                      Upload Medical
                    </span>
                    <br />
                    <span className="bg-gradient-to-r to-[#A163F9] from-[#F66568] bg-clip-text text-transparent">
                      Reports for Analysis
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          )}

          {analysisStarted && (
            <div className="absolute top-0 left-[25%] w-[75%] h-full p-6 overflow-y-auto">
              <div className="bg-white rounded-lg border border-gray-200 h-full p-4">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600">Analyzing medical reports...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                  </div>
                ) : analysisResult ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Diagnosis
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line">
                        {analysisResult.diagnosis}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Treatment Notes
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line">
                        {analysisResult.treatmentNotes}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                          Current Medications
                        </h3>
                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          {analysisResult.currentMedications.length > 0 ? (
                            analysisResult.currentMedications.map(med => renderMedicationItem(med, true)))
                            : (
                              <div className="p-4 text-center text-gray-500">
                                No current medications found
                              </div>
                            )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                          <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Previous Medications
                        </h3>
                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          {analysisResult.previousMedications.length > 0 ? (
                            analysisResult.previousMedications.map(med => renderMedicationItem(med, false))
                          ) : (
                            <div className="p-4 text-center text-gray-500">
                              No previous medications found
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {analysisResult.summary && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                          <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          Clinical Summary
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line">
                          {analysisResult.summary}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 text-right mt-4">
                      Analysis completed: {analysisResult.lastUpdated}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 h-[calc(100%-3rem)] flex items-center justify-center">
                    <p className="text-gray-600">No analysis results available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {!analysisStarted && (
            <div
              className="bg-white rounded-xl border border-gray-200"
              style={{
                width: "340px",
                position: "absolute",
                left: "1rem",
                top: "1rem",
                padding: "0.7rem",
                zIndex: 10,
              }}
            >
              <div
                className={`flex justify-center px-6 py-10 border-2 border-dashed rounded-lg ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-[#a8ddf3] bg-[#F2FBFF]"
                }`}
                style={{
                  height: "196px",
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-[#1594CC] hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 text-base"
                    >
                      <span>Click to Upload</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                    <p className="pl-1 text-[#1E1E1E] font-medium text-base">
                      or drag and drop
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    (Supports PDF, DOCX, JPG, PNG)
                  </p>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <div className="px-2 py-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Uploaded Files
                    </h4>
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="border border-gray-200 rounded-lg p-2 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-7 w-7 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="text-[#1E1E1E]"
                            onClick={() => removeFile(file.id)}
                          >
                            {file.status === "uploading" ? (
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            )}
                          </button>
                        </div>

                        {file.status === "uploading" && (
                          <>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full bg-blue-500"
                                style={{ width: `${file.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-gray-500">
                                Uploading...
                              </span>
                              <span className="text-xs font-medium text-gray-700">
                                {Math.round(file.progress)}%
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressNotesModal;