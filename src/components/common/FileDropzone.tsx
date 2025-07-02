import React from "react";

interface FileDropzoneProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  descriptionText?: any;
  className?: string;
  files?: File[]; // To show uploaded files
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragging,
  descriptionText,
  className,
  files = [], // Default empty array
}) => (
  <div
    className={`relative px-4 py-4 border-2 border-dashed rounded-xl overflow-hidden ${className} ${
      isDragging
        ? "border-blue-500 bg-blue-50"
        : "border-[#a8ddf3] bg-[#F2FBFF]"
    }`}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    {/* Upload section (fixed height, no expansion) */}
    <div className="space-y-1 text-center">
      <img src="/upload_file.svg" alt="upload file icon" className="mx-auto" />
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