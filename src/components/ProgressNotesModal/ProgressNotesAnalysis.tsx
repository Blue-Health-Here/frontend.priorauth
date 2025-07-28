import React, { useState } from "react";
import ThemeButton from "../common/ThemeButton";
import RenderNoteCard from "./RenderNoteCard";
import api from "@/api/instance";

const ProgressNotesAnalysis: React.FC<any> = ({ analysisDetails }) => {
    const [expanded, setExpanded] = useState<string | null>(null);
    console.log(analysisDetails, "analysisDetails");
    const handleToggle = (key: string) => {
        setExpanded(prev => (prev === key ? null : key));
    };

    const handleDownloadReport = async () => {
        if (analysisDetails.progressNotesReport && analysisDetails.progressNotesReport?.length > 0) {
            const file = analysisDetails.progressNotesReport[0] as { url: string; fileName: string };
            try {
                const response = await api.get(file.url, {
                    responseType: "blob"
                });
                const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = file.fileName || "progress_notes_report.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl); // Cleanup
            } catch (error) {
                console.error("Download failed:", error);
            }
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto p-8 pr-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-primary-black font-medium text-xl">
                    Progress Notes Analysis
                </h2>
                <ThemeButton
                    className="w-max sm:w-auto min-h-12"
                    variant="primary"
                    onClick={handleDownloadReport}
                >
                    Download Report
                </ThemeButton>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* <div className="flex-1 flex flex-col gap-4">
                    {Object.entries(analysisDetails)
                        .filter(([key]) => key !== "magicLines" && key !== "recommendation")
                        .map(([key, value], index: number) => (
                        <RenderNoteCard
                            key={index}
                            item={key}
                            value={value}
                            handleToggle={handleToggle}
                            expanded={expanded}
                        />
                    ))}
                </div> */}
                <div className="flex-1 flex flex-col gap-4">
                    {[
                        "diagnosis",
                        "previousMedications",
                        "currentMedications",
                        "treatmentNotes",
                        "labResults",
                        "additionalRelevantInformation"
                    ].map((key, index) => (
                        <RenderNoteCard
                            key={index}
                            item={key}
                            value={analysisDetails[key]}
                            handleToggle={handleToggle}
                            expanded={expanded}
                        />
                    ))}
                </div>

                <div className="lg:w-1/3 flex flex-col gap-4">
                    <div className="border border-primary-sky-blue rounded-theme-r flex flex-col gap-5 bg-primary-white p-4">
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="font-semibold">Recommendation</h3>
                            <img
                                src="/copy-icon.svg"
                                alt="copy icon"
                                className="cursor-pointer"
                            />
                        </div>
                        <p className="text-primary-black text-sm">
                            {analysisDetails?.recommendation || "---"}
                        </p>
                    </div>

                    <div className="magic-lines rounded-lg overflow-hidden">
                        <div className="flex flex-col gap-5 bg-primary-white p-4 bg-primary-white rounded-lg">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold magic-title">
                                    Magic Lines
                                </h3>
                                <img
                                    src="/magic-copy-icon.svg"
                                    alt="copy icon"
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className="text-primary-black text-sm">
                                {analysisDetails?.magicLines || "---"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProgressNotesAnalysis;