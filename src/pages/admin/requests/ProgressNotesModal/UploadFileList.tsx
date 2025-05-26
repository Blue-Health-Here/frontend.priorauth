// UploadFileList.tsx
import { UploadedFile } from "../../../../utils/types";
import UploadFileItem from "./UploadFileItem";

interface UploadFileListProps {
    files: UploadedFile[];
    removeFile: (id: string) => void;
}

const UploadFileList: React.FC<UploadFileListProps> = ({ files, removeFile }) => (
    <div className="space-y-3">
        {files.map((file) => (
            <UploadFileItem key={file.id} file={file} removeFile={(id) => removeFile(id)} />
        ))}
    </div>
);

export default UploadFileList;
