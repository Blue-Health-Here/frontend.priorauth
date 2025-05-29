import React, { useState, useEffect, useCallback, useRef } from "react";
import ModalWrapper from "./ModalWrapper";
import ModalHeader from "./ModalHeader";
import FileDropzone from "./FileDropzone";
import UploadFileList from "./UploadFileList";
import GradientSidebarButton from "./GradientSidebarButton";
import { UploadedFile } from "../../../../utils/types";
import { notesAiAnalysisData } from "../../../../utils/constants";
import { getCurrentBadgeColors } from "../../../../utils/helper";

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

    const renderFilePreview = (file: any, isLarge: boolean = false, selectedItem: any) => {
        if (!file.url) return null;

        const containerClass = isLarge
            ? 'w-full h-96 bg-secondary-background rounded-theme-r flex items-center justify-center overflow-hidden cursor-pointer border-2 border-gray-200'
            : 'w-full h-60 bg-secondary-background rounded-theme-r flex items-center justify-center overflow-hidden cursor-pointer border-2 border-gray-200';

        if (file.type.startsWith('image/')) {
            return (
                <div key={file.id} onClick={() => handleSelectFile(file)} 
                    className={selectedItem === file ? containerClass + ' relative border-primary-sky-blue' : containerClass + ' relative'}>
                    <img src={file.url} alt={file.name} className="max-h-full max-w-full object-cover h-full w-full" />
                    <p className="absolute bottom-0 left-0 right-0 p-2 text-center bg-white ">
                        <span className="font-medium text-xs line-clamp-1 text-secondary-black">{file.name}</span>
                    </p>
                    <a href={file.url} target="_blank" className="cursor-pointer bg-white z-10 p-1.5 border rounded-sm border-blue-navigation-link-button absolute top-4 right-4">
                        <img src="/formkit_expand.svg" alt="expand button" className="w-4" />
                    </a>
                </div>
            );
        } else if (file.type === 'application/pdf') {
            return (
                <div key={file.id} onClick={() => handleSelectFile(file)} 
                    className={selectedItem === file ? containerClass + ' relative border-primary-sky-blue' : containerClass + ' relative'}>
                    <img src={file.url} alt={file.name} className="max-h-full max-w-full object-cover h-full" />
                    <p className="absolute bottom-0 left-0 right-0 p-2 text-center bg-white ">
                        <span className="font-medium text-xs line-clamp-1 text-secondary-black">{file.name}</span>
                    </p>
                    <a href={URL.createObjectURL(file.file)} target="_blank" className="cursor-pointer bg-white z-10 p-1.5 border rounded-sm border-blue-navigation-link-button absolute top-4 right-4">
                        <img src="/formkit_expand.svg" alt="expand button" className="w-4" />
                    </a>
                </div>
            );
        } else if (file.type.startsWith('text/') || file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return (
                <div key={file.id} onClick={() => handleSelectFile(file)} 
                    className={selectedItem === file ? containerClass + ' relative border-primary-sky-blue' : containerClass + ' relative'}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 p-2 text-center bg-white ">
                        <span className="font-medium text-xs line-clamp-1 text-secondary-black">{file.name}</span>
                    </p>
                    <a href={file.url} target="_blank" className="cursor-pointer bg-white z-10 p-1.5 border rounded-sm border-blue-navigation-link-button absolute top-4 right-4">
                        <img src="/formkit_expand.svg" alt="expand button" className="w-4" />
                    </a>
                </div>
            );
        } else {
            return (
                <div key={file.id} onClick={() => handleSelectFile(file)} 
                    className={selectedItem === file ? containerClass + ' relative border-primary-sky-blue' : containerClass + ' relative'}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 p-2 text-center bg-white ">
                        <span className="font-medium text-xs line-clamp-1 text-secondary-black">{file.name}</span>
                    </p>
                    <a href={file.url} target="_blank" className="cursor-pointer bg-white z-10 p-1.5 border rounded-sm border-blue-navigation-link-button absolute top-4 right-4">
                        <img src="/formkit_expand.svg" alt="expand button" className="w-4" />
                    </a>
                </div>
            );
        }
    };

    const renderNoteCard = (item: any, index: number) => {
        return (
            <div className="border border-light-stroke p-4 rounded-theme-r" key={index}>
                <div className="flex justify-between items-center gap-4 pb-4">
                    <span className="font-semibold">{item.label}</span>
                    <span className={`${getCurrentBadgeColors(item.statusCode)} text-xs sm:text-sm px-4 py-2 font-semibold rounded-theme-r transition-colors`}>
                        {item.status}
                    </span>
                </div>
                <div className="text-primary-black pb-4">
                    {item.description}
                </div>
                <button onClick={handleDownloadReport}
                    className="text-secondary-black flex gap-2 bg-secondary-background rounded-md text-xs sm:text-sm cursor-pointer rounded-md px-4 py-2 transition-colors">
                    <span>Reasoning</span>
                    <img src="/next-arrow-carousel.svg" alt="next arrow carousel" className="w-2" />
                </button>
            </div>
        )
    };

    const handleDownloadReport = () => { };
    const handleSelectFile = (file: any) => setSelectedFile(file);

    return (
        <ModalWrapper>
            <ModalHeader title="AI Analysis" onClose={onClose} />
            {/* Hidden canvas for PDF rendering */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="relative overflow-y-auto grid grid-cols-3 lg:grid-cols-4 flex-1">
                <div className="col-span-1 bg-[#F8FAFF] z-0 flex flex-col justify-between gap-4 p-6 relative">
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
                            {uploadedFiles.map((file) => renderFilePreview(file, uploadedFiles.length === 1, selectedFile))}
                        </div>
                    </div>}
                    <GradientSidebarButton
                        disabled={uploadedFiles?.length === 0}
                        analysisStarted={analysisStarted}
                        redoAnalysis={redoAnalysis}
                        startAnalysis={startAnalysis} />
                </div>
                <div className="col-span-2 lg:col-span-3">
                    {!analysisStarted ? (
                        <div className="flex items-center justify-center h-full">
                            <img src="/radial-color-ai.png" alt="radial color ai" className="w-[26rem] lg:w-[40rem] custom-bounce" />
                        </div>
                    ) : (
                        <div className="px-4 lg:px-6 py-4 lg:py-6">
                            <div className="flex justify-between items-center gap-4 mb-4">
                                <h2 className="text-primary-black font-semibold text-xl">Progress Notes Analysis</h2>
                                <button onClick={handleDownloadReport}
                                    className="text-white bg-primary-navy-blue rounded-xl hover:bg-blue-800 text-xs sm:text-sm cursor-pointer rounded-md px-4 sm:px-6 py-2 sm:py-3.5 transition-colors">
                                    Download Report
                                </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-4 col-span-2">
                                    {notesAiAnalysisData.map((item, index) => renderNoteCard(item, index))}
                                </div>
                                <div className="flex gap-4 flex-col col-span-1">
                                    <div className="border border-primary-sky-blue rounded-theme-r flex flex-col gap-5 bg-primary-white p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="font-semibold">Recommendation</h3>
                                            <img src="/copy-icon.svg" alt="copy icon" className="" />
                                        </div>
                                        <p className="text-primary-black">The patient has type 2 diabetes mellitus without complications (E11.9), hyperuricemia (E79.0), essential hypertension (110), chronic rhinitis (J31.0), and fatty liver disease (K76.0). Elevated glucose levels were noted.</p>
                                    </div>
                                    <div className="border border-ai-animation rounded-theme-r flex flex-col gap-5 bg-primary-white p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="font-semibold">Magic Lines</h3>
                                            <img src="/copy-icon.svg" alt="copy icon" className="" />
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
