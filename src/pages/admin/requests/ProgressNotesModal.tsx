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
  status: 'uploading' | 'completed' | 'error';
}

const ProgressNotesModal: React.FC<ProgressNotesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isOpen || !uploadedFiles.some(file => file.status === 'uploading')) return;
    
    const interval = setInterval(() => {
      setUploadedFiles(prevFiles => 
        prevFiles.map(file => {
          if (file.status === 'uploading') {
            const newProgress = Math.min(file.progress + Math.random() * 20, 100);
            return {
              ...file,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' : 'uploading'
            };
          }
          return file;
        })
      );
    }, 500);
    return () => clearInterval(interval);
  }, [uploadedFiles, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        progress: 0,
        status: 'uploading' as const
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
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
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        progress: 0,
        status: 'uploading' as const
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-lg shadow-xl border border-gray-300 w-full max-w-8xl h-[90vh] mx-4 overflow-hidden z-50"
        style={{ maxHeight: "calc(100vh - 4rem)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">AI Analysis</h3>
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

        {/* Content Area */}
        <div className="relative p-6 h-[calc(100%-72px)] overflow-hidden">
          {/* Gray Sidebar - fixed behind everything */}
          <div className="absolute top-0 left-0 w-1/4 h-full bg-[#F8FAFF] z-0 flex flex-col">
            {/* Add this button container at the bottom of the sidebar */}
            <div className="mt-auto mb-4 ml-5 mr-5">
              <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B]">
                <div className="bg-white rounded-lg p-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]">
                      Start AI Analysis
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                className="bg-white rounded-full w-full h-full flex items-center justify-center p-8"
                style={{
                  boxShadow: "inset 0 0 30px #A16CF9",
                }}
              >
                <h2 className="text-3xl font-bold text-center">
                  <span className="bg-gradient-to-r from-[#F66568] to-[#A163F9] bg-clip-text text-transparent">
                    Upload Progress
                  </span>
                  <br />
                  <span className="bg-gradient-to-r to-[#A163F9] from-[#F66568] bg-clip-text text-transparent">
                    Notes for AI Analysis
                  </span>
                </h2>
              </div>
            </div>
          </div>

          {/* White container for both upload and files sections */}
          <div 
            className="bg-white rounded-xl border border-gray-200"
            style={{
              width: "340px",
              position: "absolute",
              left: "1rem",
              top: "1rem",
              padding: "0.7rem",
              zIndex: 10
            }}
          >
            {/* Upload File Section */}
            <div
              className={`flex justify-center px-6 py-10 border-2 border-dashed rounded-lg ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-[#a8ddf3] bg-[#F2FBFF]'
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
                  (Max File size: 25 MB)
                </p>
              </div>
            </div>

            {/* Uploaded Files Section */}
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
                          {file.status === 'uploading' ? (
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
                      
                      {/* Progress bar - only shown during upload */}
                      {file.status === 'uploading' && (
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
        </div>
      </div>
    </div>
  );
};

export default ProgressNotesModal;