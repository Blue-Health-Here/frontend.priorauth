import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import ModalHeader from "./ModalHeader";
import FileDropzone from "./FileDropzone";
import UploadFileList from "./UploadFileList";
import GradientSidebarButton from "./GradientSidebarButton";
import { UploadedFile } from "../../../../utils/types";

interface ProgressNotesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProgressNotesModal: React.FC<ProgressNotesModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isOpen || !uploadedFiles.some((file) => file.status === "uploading"))
            return;

        const interval = setInterval(() => {
            setUploadedFiles((prevFiles) =>
                prevFiles.map((file) => {
                    if (file.status === "uploading") {
                        const newProgress = Math.min(
                            file.progress + Math.random() * 20,
                            100
                        );
                        return {
                            ...file,
                            progress: newProgress,
                            status: newProgress >= 100 ? "completed" : "uploading",
                        };
                    }
                    return file;
                })
            );
        }, 500);
        return () => clearInterval(interval);
    }, [uploadedFiles, isOpen]);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map((file) => ({
                id: Math.random().toString(36).substring(2, 9),
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                progress: 0,
                status: "uploading" as const,
            }));
            setUploadedFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
                id: Math.random().toString(36).substring(2, 9),
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                progress: 0,
                status: "uploading" as const,
            }));
            setUploadedFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    };

    return (
        <ModalWrapper>
            <ModalHeader title="AI Analysis" onClose={onClose} />
            <div className="relative overflow-y-auto grid grid-cols-3 lg:grid-cols-4 flex-1">
                <div className="col-span-1 bg-[#F8FAFF] z-0 flex flex-col justify-between gap-4 p-6">
                    <div
                        className="bg-white rounded-xl border border-gray-200 p-2"
                    >
                        <FileDropzone 
                            isDragging={isDragging} 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onFileChange={handleFileChange}
                        />
                        
                        {uploadedFiles.length > 0 && (
                            <div className="mt-4">
                                <div className="px-2 py-2">
                                    <h4 className="text-sm font-medium text-gray-700">
                                        Uploaded Files
                                    </h4>
                                </div>
                                <UploadFileList files={uploadedFiles} removeFile={(id: any) => removeFile(id)} />
                            </div>
                        )}
                    </div>
                    <GradientSidebarButton />
                </div>
                <div className="col-span-2 lg:col-span-3 flex items-center justify-center">
                    <img src="/radial-color-ai.png" alt="radial color ai" className="w-[30rem] lg:w-[50rem]" />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ProgressNotesModal;
