import React, { useState, useEffect, useCallback, useRef } from "react";
import ModalWrapper from "./ModalWrapper";
import ModalHeader from "./ModalHeader";
import FileDropzone from "./FileDropzone";
import UploadFileList from "./UploadFileList";
import GradientSidebarButton from "./GradientSidebarButton";
import { UploadedFile } from "../../../../utils/types";
import { notesAiAnalysisData } from "../../../../utils/constants";
import RenderFilePreview from "./RenderFilePreview";
import RenderNoteCard from "./RenderNoteCard";
import ThemeButton from "../../../../components/common/ThemeButton";

interface ProgressNotesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProgressNotesModal: React.FC<ProgressNotesModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [analysisStarted, setAnalysisStarted] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const canvasRef = useRef(null);

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

    const loadPdfJs = useCallback(() => {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            if (window.pdfjsLib) {
                // @ts-ignore
                resolve(window.pdfjsLib);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
                // @ts-ignore // Set worker path
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                // @ts-ignore
                resolve(window.pdfjsLib);
            };
            script.onerror = () => reject(new Error('Failed to load PDF.js'));
            document.head.appendChild(script);
        });
    }, []);

    const convertPdfToImage = useCallback(async (file: any) => {
        try {
            // Load PDF.js
            const pdfjsLib: any = await loadPdfJs();

            // Convert file to array buffer
            const arrayBuffer = await file.arrayBuffer();

            // Load PDF document
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            // Get first page
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 2.0 }); // Scale for better quality

            // Set up canvas
            const canvas: any = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page to canvas
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            await page.render(renderContext).promise;

            // Convert canvas to image URL
            const imageDataUrl = canvas.toDataURL('image/png', 0.9);
            return {
                id: Math.random().toString(36).substring(2, 9),
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                progress: 0,
                status: "uploading" as const,
                file: file,
                url: imageDataUrl
            };
        } catch (err) {
            console.error('Error converting PDF to image:', err);
        }
    }, [loadPdfJs]);

    if (!isOpen) return null;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileArray = Array.from(e.target.files);
            const newFiles = await Promise.all(
                fileArray.map(async (file) => {
                    if (file.type === 'application/pdf') {
                        const response: any = await convertPdfToImage(file);
                        return response;
                    } else {
                        return {
                            id: Math.random().toString(36).substring(2, 9),
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            lastModified: file.lastModified,
                            progress: 0,
                            status: "uploading" as const,
                            file: file,
                            url: URL.createObjectURL(file)
                        };
                    }
                })
            );
            console.log(newFiles, "newFiles");
            setUploadedFiles((prev: any) => [...prev, ...newFiles]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const startAnalysis = () => {
        setAnalysisStarted(true);
        if (uploadedFiles?.length > 0) {
            setSelectedFile(uploadedFiles[0]);
        }
    };

    const redoAnalysis = () => {
        setAnalysisStarted(false);
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const fileArray = Array.from(e.dataTransfer.files);
            const newFiles = await Promise.all(
                fileArray.map(async (file) => {
                    if (file.type === 'application/pdf') {
                        const response: any = await convertPdfToImage(file);
                        return response;
                    } else {
                        return {
                            id: Math.random().toString(36).substring(2, 9),
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            lastModified: file.lastModified,
                            progress: 0,
                            status: "uploading" as const,
                            file: file,
                            url: URL.createObjectURL(file)
                        };
                    }
                })
            );
            setUploadedFiles((prev: any) => [...prev, ...newFiles]);
        }
    };

    const removeFile = (id: string) => setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
    const handleDownloadReport = () => { };
    const handleSelectFile = (file: any) => setSelectedFile(file);
    return (
        <ModalWrapper>
            <ModalHeader title="AI Analysis" onClose={onClose} />
            {/* Hidden canvas for PDF rendering */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="relative overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 flex-1">
                <div className="order-2 md:order-1 col-span-1 bg-[#F8FAFF] z-0 flex flex-col justify-between gap-4 p-4 md:p-6 relative">
                    {!analysisStarted ? <div className="bg-white rounded-xl border border-gray-200 p-2">
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
                                    <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
                                </div>
                                <UploadFileList files={uploadedFiles} removeFile={(id: any) => removeFile(id)} />
                            </div>
                        )}
                    </div> : <div className="flex-1">
                        <h4 className="text-base font-medium text-gray-700 mb-4">Your Uploads</h4>
                        <div className={`${uploadedFiles.length === 1 ? 'flex justify-center flex-1' : 'grid grid-cols-2 gap-4 flex-1'}`}>
                            {uploadedFiles.map((file) => <RenderFilePreview
                                file={file}
                                isLarge={uploadedFiles.length === 1}
                                selectedItem={selectedFile} handleSelectFile={handleSelectFile} />)}
                        </div>
                    </div>}
                    <GradientSidebarButton
                        disabled={uploadedFiles?.length === 0}
                        analysisStarted={analysisStarted}
                        redoAnalysis={redoAnalysis}
                        startAnalysis={startAnalysis} />
                </div>
                <div className="hidden order-1 md:order-2 col-span-1 md:col-span-2 lg:col-span-3 lg:flex items-center justify-center p-4 md:p-0">
                    {!analysisStarted ? (
                        <div className="flex items-center justify-center h-full">
                            <img src="/radial-color-ai.png" alt="radial color ai" className="w-full max-w-xs sm:max-w-sm md:max-w-none md:w-[30rem] lg:w-[40rem] custom-bounce" />
                        </div>
                    ) : (
                        <div className="px-4 lg:px-6 py-4 lg:py-6">
                            <div className="flex justify-between items-center gap-4 mb-4">
                                <h2 className="text-primary-black font-semibold text-xl">Progress Notes Analysis</h2>
                                <ThemeButton className="h-full min-h-12" variant="primary" onClick={handleDownloadReport}>
                                    Download Report
                                </ThemeButton>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-4 col-span-2">
                                    {notesAiAnalysisData.map((item, index) => <RenderNoteCard
                                        item={item} key={index}
                                        handleDownloadReport={handleDownloadReport} />)}
                                </div>
                                <div className="flex gap-4 flex-col col-span-1">
                                    <div className="border border-primary-sky-blue rounded-theme-r flex flex-col gap-5 bg-primary-white p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="font-semibold">Recommendation</h3>
                                            <img src="/copy-icon.svg" alt="copy icon" className="cursor-pointer" />
                                        </div>
                                        <p className="text-primary-black">The patient has type 2 diabetes mellitus without complications (E11.9), hyperuricemia (E79.0), essential hypertension (110), chronic rhinitis (J31.0), and fatty liver disease (K76.0). Elevated glucose levels were noted.</p>
                                    </div>
                                    <div className="border border-ai-animation rounded-theme-r flex flex-col gap-5 bg-primary-white p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="font-semibold">Magic Lines</h3>
                                            <img src="/copy-icon.svg" alt="copy icon" className="cursor-pointer" />
                                        </div>
                                        <div className="text-primary-black">
                                            <p>The patient has trialed and failed, experienced contraindications, or had intolerances to at least two preventive migraine medications, each used for at least 60-90 days:</p>
                                            <ul>
                                                <li><p>Propranolol 20mg BID (XX/XX/2023 - XX/XX/2023), which worsened headaches.</p></li>
                                                <li><p>Amitriptyline 25mg daily (XX/XX/2023 - XX/XX/2023), which caused excessive drowsiness.</p></li>
                                                <li><p>Topiramate 100mg daily (XX/XX/2023 - XX/XX/2023), which caused memory issues.</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ProgressNotesModal;