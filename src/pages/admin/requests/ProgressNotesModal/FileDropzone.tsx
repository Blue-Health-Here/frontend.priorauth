import React from "react";

interface FileDropzoneProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragging,
}) => (
  <div
    className={`flex justify-center px-4 sm:px-6 py-6 sm:py-10 border-2 border-dashed rounded-lg overflow-hidden ${
      isDragging
        ? "border-blue-500 bg-blue-50"
        : "border-[#a8ddf3] bg-[#F2FBFF]"
    }`}
    style={{ minHeight: "196px" }}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    <div className="space-y-1 text-center flex flex-col justify-center items-center w-full">
      <svg
        className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 flex-shrink-0"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
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
      
      <p className="mt-2 text-xs sm:text-sm text-gray-500 flex-shrink-0">
        (Max File size: 25 MB)
      </p>
    </div>
  </div>
);

export default FileDropzone;