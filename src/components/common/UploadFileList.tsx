// UploadFileList.tsx
import { useParams } from "react-router-dom";
import { UploadedFile } from "../../utils/types";
import UploadFileItem from "./UploadFileItem";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { handleDownloadReqFile } from "@/services/pharmacyService";
import { RootState } from "@/store";

interface UploadFileListProps {
    files: UploadedFile[];
    removeFile: (id: string) => void;
    handleAddTag?: any;
    isAddTags?: boolean;
    showDownload?: boolean;
    className?: string;
}

const UploadFileList: React.FC<UploadFileListProps> = ({ files, removeFile, showDownload, handleAddTag, isAddTags = true, className }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { id: reqId } = useParams();
    const handleDownloadFile = async (file?: any) => {
        try {
            await handleDownloadReqFile(reqId, file.id, user?.token, file);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <div className={`max-h-96 ${className}`}>
            {files.map((file) => (
                <UploadFileItem 
                    key={file.id} showDownload={showDownload} downloadFile={(id) => handleDownloadFile(id)}
                    file={file} removeFile={(id) => removeFile(id)} 
                    handleAddTag={handleAddTag} isAddTags={isAddTags} />
            ))}
        </div>
    )
};

export default UploadFileList;
