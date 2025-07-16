import { postChartNotesFiles } from "@/services/pharmacyService";
import { deleteUploadedProgressNote } from "@/store/features/pharmacy/requests/requestProgressNotesSlice";
import { UploadedFile } from "@/utils/types";
import {
    useState,
    useEffect,
    useCallback,
    useRef,
    DragEvent,
    ChangeEvent,
} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

declare global {
    interface Window {
        pdfjsLib: any;
    }
}

export default function useProgressNotes(chartNotes: any[] = []) {
    // ─── refs & redux ────────────────────────────────────────────────────────────
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dispatch = useDispatch();
    const { id: requestId } = useParams();

    // ─── state ───────────────────────────────────────────────────────────────────
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [previouslyUploadedFiles, setPreviouslyUploadedFiles] =
        useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [analysisStarted, setAnalysisStarted] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);

    // ─── hydrate from props (chartNotes) ─────────────────────────────────────────
    useEffect(() => {
        if (chartNotes?.length) {
            setUploadedFiles(
                chartNotes.map((n) => ({
                    ...n,
                    name: n.fileName,
                    type: n.mimeType,
                    status: "completed",
                }))
            );
            setAnalysisStarted(true);
            setSelectedFile(chartNotes[0]);
        } else {
            setUploadedFiles([]);
        }
    }, [chartNotes]);

    // ─── fake uploading progress bar ─────────────────────────────────────────────
    useEffect(() => {
        if (!uploadedFiles.some((f) => f.status === "uploading")) return;
        const t = setInterval(() => {
            setUploadedFiles((prev) =>
                prev.map((f) =>
                    f.status === "uploading"
                        ? {
                            ...f,
                            progress: Math.min(f.progress + Math.random() * 20, 100),
                            status:
                                f.progress + Math.random() * 20 >= 100 ? "completed" : "uploading",
                        }
                        : f
                )
            );
        }, 500);
        return () => clearInterval(t);
    }, [uploadedFiles]);

    // ─── pdf.js loader & converter ───────────────────────────────────────────────
    const loadPdfJs = useCallback(
        () =>
            new Promise<any>((res, rej) => {
                if (window.pdfjsLib) return res(window.pdfjsLib);
                const s = document.createElement("script");
                s.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
                s.onload = () => {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
                    res(window.pdfjsLib);
                };
                s.onerror = () => rej(new Error("PDF.js failed to load"));
                document.head.appendChild(s);
            }),
        []
    );

    const convertPdfToImage = useCallback(
        async (file: File) => {
            try {
                const pdfjs = await loadPdfJs();
                const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() })
                    .promise;
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 2 });
                const canvas = canvasRef.current!;
                const ctx = canvas.getContext("2d")!;
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: ctx, viewport }).promise;
                return canvas.toDataURL("image/png", 0.9);
            } catch (e) {
                console.error("convertPdfToImage:", e);
                return null;
            }
        },
        [loadPdfJs]
    );

    // ─── helpers for <input type=file> & drag‑and‑drop ───────────────────────────
    const appendFiles = async (files: File[]) => {
        const formData = new FormData();
        files.forEach((f) => formData.append("chartNotes", f));

        // -> upload to API
        const response = await postChartNotesFiles(dispatch, requestId, formData);

        // response contains blob metadata from server
        const toAdd: UploadedFile[] = response.map((r: any) => ({
            ...r,
            name: r.fileName,
            type: r.mimeType,
        }));

        setUploadedFiles((prev) => [...prev, ...toAdd]);
    };

    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) await appendFiles(Array.from(e.target.files));
    };

    const onDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.length)
            await appendFiles(Array.from(e.dataTransfer.files));
    };

    // ─── other UI actions ────────────────────────────────────────────────────────
    const startAnalysis = () => {
        setAnalysisStarted(true);
        const all = [...uploadedFiles, ...previouslyUploadedFiles];
        setUploadedFiles(all);
        setSelectedFile(all[0]);
    };

    const redoAnalysis = () => {
        setPreviouslyUploadedFiles((p) => [...p, ...uploadedFiles]);
        setUploadedFiles([]);
        setAnalysisStarted(false);
        setSelectedFile(null);
    };

    const removeFile = (id: string, isServerFile?: boolean) => {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
        if (isServerFile) {
            dispatch(
                deleteUploadedProgressNote({
                    requestId,
                    fileName:
                        uploadedFiles.find((f) => f.id === id)?.name || "",
                })
            );
        }
    };

    return {
        /* refs */
        canvasRef,

        /* state */
        uploadedFiles,
        previouslyUploadedFiles,
        isDragging,
        analysisStarted,
        selectedFile,

        /* setters & actions */
        setIsDragging,
        onFileChange,
        onDrop,
        startAnalysis,
        redoAnalysis,
        removeFile,
        setSelectedFile,
        convertPdfToImage
    };
}
