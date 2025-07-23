import React, { useCallback, useEffect, useRef, useState } from "react";
import CardHeader from "@/components/common/CardHeader";
import { UploadedFile } from "@/utils/types";
import ProgressNotesModal from "@/components/ProgressNotesModal";
import PageHeader from "./PageHeader";
import InfoDetails from "./InfoDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteReqUploadedFile,
  getRequestDetails,
  getRequestStatuses,
  postRequestUploadFiles,
} from "@/services/pharmacyService";
import Loading from "@/components/common/Loading";
import StatusTimeline from "./StatusTimeline";
import SideDrawer from "@/components/SideDrawer";
import RequestDetailsContent from "./SideDrawerReqDetailsContent";
import LetterOfMedicalNecessity from "./LetterOfMedicalNecessity";
import { loadPdfJs } from "@/services/pdfService";
import { RootState } from "@/store";
import toast from "react-hot-toast";
import FileUploadSection from "./FileUploadSection";

const PharmacyRequestDetails: React.FC<any> = ({ isAdmin }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const canvasRef = useRef(null);
  const [requestDetails, setRequestDetails] = useState<any>(null);
  const isFetchedReqDetails = useRef(false);
  const { reqComments } = useSelector((state: RootState) => state.pharmacyReqs);
  const dispatch = useDispatch();
  const { id: reqId } = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>(reqComments);
  const [isAnalysisStarted, setIsAnalysisStarted] = useState<boolean>(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [isAnalysisFailed, setIsAnalysisFailed] = useState(false);
  const analysisTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (analysisTimerRef.current) {
        clearTimeout(analysisTimerRef.current);
      }
    };
  }, []);

  const startAnalysis = () => {
    setIsAnalysisStarted(true);
    setIsAnalysisComplete(false);
    setIsAnalysisFailed(false);

    if (analysisTimerRef.current) {
      clearTimeout(analysisTimerRef.current);
    }

    // Simulate analysis that randomly succeeds or fails
    analysisTimerRef.current = setTimeout(() => {
      const isSuccess = Math.random() > 0.5; 
      if (isSuccess) {
        setIsAnalysisComplete(true);
      } else {
        setIsAnalysisFailed(true);
      }
    }, 5000); 
  };

  const restartAnalysis = () => {
    startAnalysis();
  };

  const handleOpenProgressNotesModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const detailsRes = await getRequestDetails(dispatch, reqId);

      if (detailsRes) {
        setRequestDetails(detailsRes);
        setUploadedFiles(
          detailsRes?.files.map((item: any) => ({
            ...item,
            name: item.fileName,
            type: item.mimeType,
          }))
        );
      } else {
        setRequestDetails(null);
        setUploadedFiles([]);
      }

      setIsLoading(false);
    };

    if (!isFetchedReqDetails.current) {
      fetchData();
      isFetchedReqDetails.current = true;
    }
  }, [dispatch, reqId]);

  const convertPdfToImage = useCallback(
    async (file: any) => {
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
          fileTags: [],
        };
      } catch (err) {
        console.error("Error converting PDF to image:", err);
      }
    },
    []
  );

  const handleCheckNotes = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <ProgressNotesModal
        isOpen={isModalOpen}
        onClose={(isAdded?: boolean) => {
          setIsModalOpen(false);
          if (isAdded) getRequestStatuses(dispatch, reqId);
        }}
        chartNotes={requestDetails?.chartNotes || []}
      />
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title=""
        width="w-[500px]"
        position="right"
      >
        <RequestDetailsContent
          comments={comments}
          setComments={setComments}
          initialTab="Status & Notes"
          onClose={() => setIsDrawerOpen(false)}
          isAdmin={isAdmin}
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
                    isAdmin={isAdmin}
                    onCheckNotes={handleCheckNotes}
                    showCheckNotesBtn={true}
                  />
                </div>
                {/* <div className="bg-white rounded-xl overflow-hidden border border-quaternary-navy-blue">
                  <CardHeader title="Progress Notes" />
                  <div className="p-4">
                    <div className="relative rounded-lg p-[2px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B] overflow-hidden">
                      <button
                        type="button"
                        onClick={handleOpenProgressNotesModal}
                        className="flex w-full items-center justify-center cursor-pointer gap-2 py-4 px-3 bg-white rounded-lg"
                      >
                        <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]">
                          {requestDetails?.chartNotes?.length > 0
                            ? "View Progress Notes"
                            : "Upload Progress Notes"}
                        </p>
                        <img
                          src="/upload-new.svg"
                          alt="upload new img"
                          className=""
                        />
                      </button>
                    </div>
                  </div>
                </div> */}
                <FileUploadSection
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  reqId={reqId || ""}
                  isAnalysisStarted={isAnalysisStarted}
                  setIsAnalysisStarted={setIsAnalysisStarted}
                  isAnalysisComplete={isAnalysisComplete}
                  setIsAnalysisComplete={setIsAnalysisComplete}
                  isAnalysisFailed={isAnalysisFailed}
                  setIsAnalysisFailed={setIsAnalysisFailed}
                  startAnalysis={startAnalysis}
                  restartAnalysis={restartAnalysis}
                  handleOpenProgressNotesModal={handleOpenProgressNotesModal}
                  convertPdfToImage={convertPdfToImage}
                />
                <div className="bg-white rounded-xl border border-quaternary-navy-blue relative overflow-hidden">
                  <CardHeader title="Other Files" />
                  <div className="p-4 flex flex-col gap-4 relative">
                    <div className="inline-flex flex-col gap-2">
                      <h3 className="text-base font-medium text-primary-black">
                        Generate File
                      </h3>
                      <LetterOfMedicalNecessity
                        requestDetails={requestDetails}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <InfoDetails requestDetails={requestDetails} isAdmin={isAdmin} />
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}
      </div>
    </>
  );
};

export default PharmacyRequestDetails;