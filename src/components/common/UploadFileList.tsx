// UploadFileList.tsx
import { UploadedFile } from "../../utils/types";
import UploadFileItem from "./UploadFileItem";

interface UploadFileListProps {
    files: UploadedFile[];
    removeFile: (id: string) => void;
    handleAddTag?: any;
}

const UploadFileList: React.FC<UploadFileListProps> = ({ files, removeFile, handleAddTag }) => (
    <div className="space-y-3 overflow-y-auto max-h-96">
        {files.map((file) => (
            <UploadFileItem key={file.id} file={file} removeFile={(id) => removeFile(id)} handleAddTag={handleAddTag} />
        ))}
    </div>
);

export default UploadFileList;
