import { getRequestDetails, getRequestStatuses } from "@/services/pharmacyService";
import { setRequestComments, setStatusItems } from "@/store/features/pharmacy/requests/requestsSlice";
import { formatDateTime, getStatusClass } from "@/utils/helper";
import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";

export const useRequestData = ({
    reqId,
    setRequestDetails,
    setUploadedFiles,
    setIsLoading,
    setIsAnalysisStarted,
    setIsAnalysisComplete,
}: {
    reqId?: string;
    setRequestDetails: (data: any) => void;
    setUploadedFiles: (files: any[]) => void;
    setIsLoading: (val: boolean) => void;
    setIsAnalysisStarted: (val: boolean) => void;
    setIsAnalysisComplete: (val: boolean) => void;
}) => {
    const dispatch = useDispatch();
    const hasFetched = useRef(false);

    const fetchRequestStatuses = useCallback(async () => {
        const response = await getRequestStatuses(dispatch, reqId);
        if (!response?.currentStatus) {
            dispatch(setStatusItems([]));
            return;
        }

        const current = response.currentStatus;
        const previous = [...response.previousStatuses].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const allStatuses = [
            {
                ...current,
                date: formatDateTime(current.date),
                isActive: true,
                note: current.notes,
                statusClass: getStatusClass(current.name),
                showNotesButton: !(current.notes?.trim()),
                isEditing: false,
            },
            ...previous.map((s: any) => ({
                ...s,
                date: formatDateTime(s.date),
                isActive: false,
                note: s.notes,
                statusClass: getStatusClass(s.name),
                showNotesButton: !(s.notes?.trim()),
                isEditing: false,
            })),
        ];

        dispatch(setStatusItems(allStatuses));
    }, [dispatch, reqId]);

    const fetchRequestDetailsData = useCallback(async () => {
        setIsLoading(true);
        const details = await getRequestDetails(dispatch, reqId);

        if (details) {
            setRequestDetails(details);
            dispatch(setRequestComments(details.comments));
            setUploadedFiles(
                (details?.files || []).map((item: any) => ({
                    ...item,
                    name: item.fileName,
                    type: item.mimeType,
                }))
            );

            const hasChartNotes = details?.chartNotes?.length > 0;
            setIsAnalysisStarted(hasChartNotes);
            setIsAnalysisComplete(hasChartNotes);
        } else {
            setRequestDetails(null);
            setUploadedFiles([]);
            dispatch(setRequestComments([]));
        }

        setIsLoading(false);
    }, [dispatch, reqId]);

    useEffect(() => {
        hasFetched.current = false;
        if (reqId && !hasFetched.current) {
            fetchRequestDetailsData().then(fetchRequestStatuses);
            hasFetched.current = true;
        }
    }, [reqId]);
};
