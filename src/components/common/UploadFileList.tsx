// UploadFileList.tsx
import { UploadedFile } from "../../utils/types";
import UploadFileItem from "./UploadFileItem";

interface UploadFileListProps {
    files: UploadedFile[];
    removeFile: (id: string) => void;
    handleAddTag?: any;
    isAddTags?: boolean;
    className?: string;
}

const UploadFileList: React.FC<UploadFileListProps> = ({ files, removeFile, handleAddTag, isAddTags = true, className }) => (
    <div className={`max-h-96 ${className}`}>
        {files.map((file) => (
            <UploadFileItem 
                key={file.id} 
                file={file} removeFile={(id) => removeFile(id)} 
                handleAddTag={handleAddTag} isAddTags={isAddTags} />
        ))}
    </div>
);

export default UploadFileList;
