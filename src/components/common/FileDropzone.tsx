import React from "react";

interface FileDropzoneProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  descriptionText?: any;
  className?: string;
  minHeight?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragging,
  descriptionText, className, minHeight = "100%"
}) => (
  <div
    className={`flex justify-center px-4 py-6 border-2 border-dashed rounded-lg overflow-hidden ${className} ${
      isDragging
        ? "border-blue-500 bg-blue-50"
        : "border-[#a8ddf3] bg-[#F2FBFF]"
    }`}
    style={{ minHeight: minHeight }}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    <div className="space-y-1 text-center flex flex-col justify-center items-center w-full">
      <img src="/upload_file.svg" alt="upload file icon" className="" />
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
      {descriptionText && <p className="mt-2 text-xs sm:text-sm text-gray-500 flex-shrink-0" dangerouslySetInnerHTML={{ __html: descriptionText }}></p>}
    </div>
  </div>
);

export default FileDropzone;