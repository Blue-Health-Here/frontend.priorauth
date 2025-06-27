// UploadFileItem.tsx
import { UploadedFile } from "../../utils/types";

interface UploadFileItemProps {
    file: UploadedFile;
    removeFile: (id: string) => void;
    handleAddTag?: any;
}

const UploadFileItem: React.FC<UploadFileItemProps> = ({ file, removeFile, handleAddTag }) => {
    // const formatFileSize = (bytes: number) => {
    //     if (bytes === 0) return "0 Bytes";
    //     const k = 1024;
    //     const sizes = ["Bytes", "KB", "MB", "GB"];
    //     const i = Math.floor(Math.log(bytes) / Math.log(k));
    //     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    // };
    return (
        <div className="border border-quaternary-navy-blue rounded-xl p-2">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2">
                    <img src="/uploading_state.svg" alt="uploading state" className="" />
                    <div className="inline-flex gap-1 flex-col">
                        <p className="text-xs sm:text-sm font-medium text-primary-black truncate">{file.name}</p>
                        <div className={`px-4 py-1 rounded-lg line-clamp-1 text-xs sm:text-sm lg:text-base font-medium w-max bg-quaternary-navy-blue text-secondary-navy-blue`}>
                            {file.fileStatus}
                        </div>
                    </div>
                </div>
                <div className="inline-flex justify-between items-end flex-col gap-2">
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
                    <button type="button" onClick={handleAddTag} className="text-blue-navigation-link-button cursor-pointer font-medium text-base underline">Add Tags</button>
                </div>
            </div>
            {file.status === "uploading" && (
                <>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="h-2.5 rounded-full bg-blue-500" style={{ width: `${file.progress}%`, background: 'linear-gradient(297deg, #79A4FF 16.66%, #C6D9FF 83.34%)' }} />
                    </div>
                    {/* <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Uploading...</span>
                        <span className="text-xs font-medium text-gray-700">{Math.round(file.progress)}%</span>
                    </div> */}
                </>
            )}
        </div>
    );
};

export default UploadFileItem;
