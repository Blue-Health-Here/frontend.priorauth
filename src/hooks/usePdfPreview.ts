import { useEffect, useState } from "react";
import { loadPdfJs } from "@/services/pdfService";


declare global {
    interface Window {
        pdfjsLib: any;
    }
}

export default function usePdfPreview(fileUrl: string | undefined) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!fileUrl) return;

        let cancelled = false;

        (async () => {
            try {
                const pdfjsLib: any = await loadPdfJs();
                const pdf = await pdfjsLib.getDocument(fileUrl).promise;
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement("canvas");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const ctx = canvas.getContext("2d")!;
                await page.render({ canvasContext: ctx, viewport }).promise;
                const dataUrl = canvas.toDataURL("image/png");
                if (!cancelled) setPreviewUrl(dataUrl);
            } catch (err) {
                console.error("PDF Preview Error:", err);
                if (!cancelled) setPreviewUrl(null);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [fileUrl]);

    return previewUrl;
}
