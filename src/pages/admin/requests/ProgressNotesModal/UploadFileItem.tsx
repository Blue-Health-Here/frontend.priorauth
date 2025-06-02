// UploadFileItem.tsx
import { UploadedFile } from "../../../../utils/types";

interface UploadFileItemProps {
    file: UploadedFile;
    removeFile: (id: string) => void;
}

const UploadFileItem: React.FC<UploadFileItemProps> = ({ file, removeFile }) => {
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    return (
        <div className="border border-gray-200 rounded-lg p-2 shadow-sm">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-3">
                    <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                </div>
                <button className="text-[#1E1E1E] cursor-pointer" onClick={() => removeFile(file.id)}>
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={file.status === "uploading" ? "M6 18L18 6M6 6l12 12" : "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"}
                        />
                    </svg>
                </button>
            </div>
            {file.status === "uploading" && (
                <>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full bg-blue-500" style={{ width: `${file.progress}%` }} />
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Uploading...</span>
                        <span className="text-xs font-medium text-gray-700">{Math.round(file.progress)}%</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default UploadFileItem;
