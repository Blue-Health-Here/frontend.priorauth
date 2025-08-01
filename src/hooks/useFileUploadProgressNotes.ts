// hooks/useFileUploadProgressNotes.ts
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postStartAiAnalysis } from "@/services/pharmacyService";
import api from "@/api/instance";
import toast from "react-hot-toast";

export const useFileUploadProgressNotes = (reqId: string, requestDetails: any) => {
    const dispatch = useDispatch();

    const [isAnalysisStarted, setIsAnalysisStarted] = useState(false);
    const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
    const [isAnalysisFailed, setIsAnalysisFailed] = useState(false);

    useEffect(() => {
        if (requestDetails?.chartNotes?.length > 0) {
            setIsAnalysisStarted(true);
            setIsAnalysisComplete(true);
        }
    }, [requestDetails?.chartNotes]);

    const startAnalysis = async () => {
        setIsAnalysisStarted(true);
        setIsAnalysisComplete(false);
        setIsAnalysisFailed(false);

        const response = await postStartAiAnalysis(dispatch, reqId);
        if (response) {
            setIsAnalysisComplete(true);
            setIsAnalysisFailed(false);
        } else {
            setIsAnalysisComplete(false);
            setIsAnalysisFailed(true);
        }
    };

    const handleDownload = async () => {
        const file = requestDetails?.progressNotesReport?.[0];
        if (!file) return;

        try {
            const response = await api.get(file.url, { responseType: "blob" });
            const blobUrl = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = file.fileName || "progress_notes_report.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            toast.error("Download failed");
        }
    };

    return {
        isAnalysisStarted,
        setIsAnalysisStarted,
        isAnalysisComplete,
        setIsAnalysisComplete,
        isAnalysisFailed,
        setIsAnalysisFailed,
        startAnalysis,
        restartAnalysis: startAnalysis,
        handleDownload,
    };
};
