import React, { useCallback, useEffect, useRef, useState } from "react";
import CardHeader from "@/components/common/CardHeader";
import FileDropzone from "@/components/common/FileDropzone";
import UploadFileList from "@/components/common/UploadFileList";
import { UploadedFile } from "@/utils/types";
import ProgressNotesModal from "@/components/ProgressNotesModal";
import PageHeader from "./PageHeader";
import InfoDetails from "./InfoDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReqUploadedFile, getRequestDetails, getRequestStatuses } from "@/services/pharmacyService";
import Loading from "@/components/common/Loading";
import StatusTimeline from "./StatusTimeline";
import SideDrawer from "@/components/SideDrawer";
import RequestDetailsContent from "./SideDrawerReqDetailsContent";
import LetterOfMedicalNecessity from "./LetterOfMedicalNecessity";
import { loadPdfJs } from "@/services/pdfService";
import { RootState } from "@/store";
import toast from "react-hot-toast";

const PharmacyRequestDetails: React.FC<any> = ({ isAdmin }) => {
  const [statuses, setReqStatuses] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const canvasRef = useRef(null);
  const [requestDetails, setRequestDetails] = useState<any>(null);
  const isFetchedReqDetails = useRef(false);
  const { reqComments } = useSelector((state: RootState) => state.pharmacyReqs);
  const dispatch = useDispatch();
  const { id: reqId } = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>(reqComments);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const [detailsRes, statusesRes] = await Promise.all([
        getRequestDetails(dispatch, reqId),
        getRequestStatuses(dispatch, reqId),
      ]);

      if (detailsRes) {
        setRequestDetails(detailsRes);
        setUploadedFiles(detailsRes?.files.map((item: any) => ({ ...item, name: item.fileName, type: item.mimeType })))
      } else {
        setRequestDetails(null);
        setUploadedFiles([]);
      }
      // console.log(statusesRes, "statusesRes");
      setReqStatuses(statusesRes);
      localStorage.setItem("pharmacyRequestStatuses", JSON.stringify(statuses));
      setIsLoading(false);
    };

    if (!isFetchedReqDetails.current) {
      fetchData();
      isFetchedReqDetails.current = true;
    }
  }, [dispatch, reqId]);

  const convertPdfToImage = useCallback(async (file: any) => {
    try {
      const pdfjsLib: any = await loadPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas: any = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      const imageDataUrl = canvas.toDataURL("image/png", 0.9);
      return {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        progress: 0,
        status: "uploading" as const,
        file: file,
        url: imageDataUrl,
        fileTags: []
      };
    } catch (err) {
      console.error("Error converting PDF to image:", err);
    }
  }, [loadPdfJs]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      console.log(fileArray, "fileArray");
      const newFiles = await Promise.all(
        fileArray.map(async (file) => {
          if (file.type === "application/pdf") {
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
              url: file ? URL.createObjectURL(file) : "",
              fileTags: []
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

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      const newFiles = await Promise.all(
        fileArray.map(async (file) => {
          if (file.type === "application/pdf") {
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
              url: URL.createObjectURL(file),
              fileTags: []
            };
          }
        })
      );
      setUploadedFiles((prev: any) => [...prev, ...newFiles]);
    }
  };

  const removeFile = async (id: string) => {
    try {
      const response = await deleteReqUploadedFile(dispatch, reqId, id);
      if (response.success) {
        setUploadedFiles((prev: any) => prev.filter((file: any) => file.id !== id))
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleAddTag = (updateFn: (prev: UploadedFile[]) => UploadedFile[]) => {
    setUploadedFiles(updateFn);
  };

  useEffect(() => {
    if (!uploadedFiles.some((file) => file.status === "uploading"))
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
  }, [uploadedFiles]);

  const handleCheckNotes = () => {
    setIsDrawerOpen(true);
  };

  // console.log(requestDetails, uploadedFiles, "requestDetails")
  return (
    <>
      <ProgressNotesModal isOpen={isModalOpen} onClose={(isAdded?: boolean) => {
        setIsModalOpen(false);
        if (isAdded) getRequestStatuses(dispatch, reqId);
      }} chartNotes={requestDetails?.chartNotes || []} />
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title=""
        width="w-[500px]"
        position="right"
      >
        {/* <RequestDetailsContent />   */}
        <RequestDetailsContent
          comments={comments}
          setComments={setComments}
          initialTab="Status & Notes"
          onClose={() => setIsDrawerOpen(false)} 
        />
      </SideDrawer>
      <div className="p-4 bg-white rounded-xl theme-shadow relative">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <PageHeader requestDetails={requestDetails} isAdmin={isAdmin} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 lg:col-span-2 space-y-4">
                <div className="bg-white rounded-xl overflow-hidden border border-quaternary-navy-blue">
                  <CardHeader title="Status" />
                  <StatusTimeline
                    currentStatus={statuses ? statuses.currentStatus : null}
                    previousStatuses={statuses ? statuses.previousStatuses : []}
                    onCheckNotes={handleCheckNotes}
                  />
                </div>
                <div className="bg-white rounded-xl overflow-hidden border border-quaternary-navy-blue">
                  <CardHeader title="Progress Notes" />
                  <div className="p-4">
                    <div className="relative rounded-lg p-[2px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="flex w-full items-center justify-center cursor-pointer gap-2 py-4 px-3 bg-white rounded-lg"
                      >
                        <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]">
                          {requestDetails?.chartNotes?.length > 0 ? "View Progress Notes" : "Upload Progress Notes"}
                        </p>
                        <img src="/upload-new.svg" alt="upload new img" className="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-quaternary-navy-blue relative overflow-hidden">
                  <CardHeader title="Other Files" />
                  <div className="p-4 flex flex-col gap-4 relative">
                    <div className="inline-flex flex-col gap-2">
                      <h3 className="text-base font-medium text-primary-black">Generate File</h3>
                      <LetterOfMedicalNecessity requestDetails={requestDetails} />
                    </div>
                    <div className="inline-flex flex-col gap-2">
                      <h3 className="text-base font-medium text-primary-black">Upload Files</h3>
                      <FileDropzone
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onFileChange={handleFileChange}
                        className="!p-3"
                      />
                      <p className="text-[#9E9E9E] text-sm font-medium">Accepts:
                        <span className="text-[#525252]"> Denial Letter, Appeal Form, Blank Fax Form, Letter of Medical Necessity</span></p>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="inline-flex flex-col gap-2">
                        <h3 className="text-sm font-medium text-secondary-black">
                          {uploadedFiles.some((item: any) => item.status === "uploading") ? (
                            <span>{uploadedFiles.filter((item: any) => item.status === "uploading").length} files uploading...</span>
                          ) : (
                            <span>Uploaded Files</span>
                          )}
                        </h3>
                        <UploadFileList
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          files={uploadedFiles}
                          removeFile={(id: any) => removeFile(id)}
                          handleAddTag={handleAddTag}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <InfoDetails requestDetails={requestDetails} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PharmacyRequestDetails;