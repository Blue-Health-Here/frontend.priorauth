// // components/FileUpload/FileUploadSectionWrapper.tsx
// import React from "react";
// import { useFileUploadProgressNotes } from "@/hooks/useFileUploadProgressNotes";
// import FileDropzone from "@/components/common/FileDropzone";
// import UploadFileList from "@/components/common/UploadFileList";
// import CardHeader from "@/components/common/CardHeader";
// import LetterOfMedicalNecessity from "@/pages/pharmacy/requests/details/LetterOfMedicalNecessity";
// import ThemeButton from "../common/ThemeButton";

// type Props = {
//     requestDetails: any;
//     reqId: string;
//     handleOpenProgressNotesModal: () => void;
// };

// const FileUploadSectionWrapper: React.FC<Props> = ({
//     requestDetails,
//     reqId,
//     handleOpenProgressNotesModal,
// }) => {
//     const {
//         uploadedFiles,
//         setUploadedFiles,
//         isDragging,
//         isAnalysisStarted,
//         isAnalysisComplete,
//         isAnalysisFailed,
//         startAnalysis,
//         handleFileChange,
//         handleDrop,
//         handleDragOver,
//         handleDragLeave,
//         removeFile,
//         handleAddTag,
//         handleDownloadReport,
//     } = useFileUploadProgressNotes(reqId, requestDetails);

//     return (
//         <div className="bg-primary-white rounded-xl border border-quaternary-navy-blue relative overflow-hidden">
//             <CardHeader title="Other Files" />
//             <div className="p-4 flex flex-col gap-4 relative">
//                 <div className="inline-flex flex-col gap-2">
//                     <h3 className="text-base font-medium text-primary-black">
//                         Generate File
//                     </h3>
//                     <LetterOfMedicalNecessity requestDetails={requestDetails} />
//                 </div>

//                 <div className="inline-flex flex-col gap-2">
//                     <h3 className="text-base font-medium text-primary-black">Upload Files</h3>
//                     <FileDropzone
//                         isDragging={isDragging}
//                         onDragOver={handleDragOver}
//                         onDragLeave={handleDragLeave}
//                         onDrop={handleDrop}
//                         onFileChange={handleFileChange}
//                         className="!p-3"
//                         isPharmacyRequest={true}
//                     />
//                 </div>

//                 {uploadedFiles.length > 0 && (
//                     <div className="inline-flex flex-col gap-2">
//                         <h3 className="text-sm font-medium text-secondary-black ">
//                             {uploadedFiles.some(file => file.status === "uploading")
//                                 ? `${uploadedFiles.filter(file => file.status === "uploading").length} files uploading...`
//                                 : "Uploaded Files"}
//                         </h3>
//                         <UploadFileList
//                             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                             files={uploadedFiles}
//                             removeFile={removeFile}
//                             handleAddTag={handleAddTag}
//                         />
//                         <ThemeButton
//                             className="flex items-center justify-center gap-2 sm:mx-auto mt-2"
//                             variant="tertiary"
//                             onClick={() => console.log("View All clicked")}
//                         >
//                             <span className="flex items-center gap-2 text-xs">
//                                 View All
//                                 <img src="/view-all.svg" alt="View All" className="w-4 h-4" />
//                             </span>
//                         </ThemeButton>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FileUploadSectionWrapper;
