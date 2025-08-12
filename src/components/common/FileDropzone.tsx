import React from "react";

interface FileDropzoneProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  descriptionText?: any;
  className?: string;
  files?: File[];
  isPharmacyRequest?: boolean;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragging,
  descriptionText,
  className,
  files = [],
  isPharmacyRequest = false,
}) => (
  <div
    className={`relative px-3 sm:px-4 py-3 sm:py-4 border-2 border-dashed rounded-xl overflow-hidden ${className} ${
      isDragging ? "border-blue-500" : "border-[#1594CC]"
    } ${isPharmacyRequest ? "bg-transparent" : "bg-navy-blue-400"}`}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    {isPharmacyRequest ? (
      <div className="flex flex-col gap-0.5 w-full">
        <div className="flex items-center gap-2">
          <img 
            src="/upload_file.svg" 
            alt="upload file icon" 
            className="h-6 w-6 sm:h-10 sm:w-10 flex-shrink-0"
          />
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer font-medium text-[#1594CC] hover:text-blue-500 underline text-xs sm:text-base whitespace-nowrap"
          >
            Upload Files
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              onChange={onFileChange}
              multiple
            />
          </label>
        </div>
        <p className="text-[9px] sm:text-xs text-tertiary-black ml-8 sm:ml-[52px] -mt-0.5 sm:-mt-2 leading-tight">
          Denial Letter, Appeal, Fax Form, LMN
        </p>
      </div>
    ) : (
      <div className="space-y-1 text-center">
        <img src="/upload_file.svg" alt="upload file icon" className="mx-auto h-8 w-8 sm:h-10 sm:w-10" />
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center text-xs sm:text-sm text-gray-600 gap-1">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-medium text-[#1594CC] hover:text-blue-500 flex-shrink-0"
          >
            <span>Click to Upload</span>
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              onChange={onFileChange}
              multiple
            />
          </label>
          <span className="text-[#1E1E1E] font-medium text-xs sm:text-sm flex-shrink-0">
            or drag and drop
          </span>
        </div>
        {descriptionText && (
          <p
            className="mt-2 text-xs sm:text-sm text-gray-500 flex-shrink-0"
            dangerouslySetInnerHTML={{ __html: descriptionText }}
          />
        )}
      </div>
    )}

    {/* File list (inside same container, scrollable) */}
    {files.length > 0 && (
      <div className="mt-2 max-h-[60px] overflow-y-auto">
        <h4 className="text-xs font-medium text-gray-700 mb-1">Uploaded Files:</h4>
        <ul className="space-y-1">
          {files.map((file, index) => (
            <li key={index} className="flex items-center text-xs text-gray-600">
              <span className="truncate">{file.name}</span>
              <span className="ml-2 text-xs text-gray-500">
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default FileDropzone;