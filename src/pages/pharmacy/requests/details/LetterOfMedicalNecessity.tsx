import api from "@/api/instance";
import ThemeButton from "@/components/common/ThemeButton";
import { postGenerateMedicalNecessity } from "@/services/pharmacyService";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const LetterOfMedicalNecessity: React.FC<any> = ({ requestDetails }) => {
    const [isLoadingMedicalNecessity, setIsLoadingMedicalNecessity] = useState<boolean>(false);
    const [isReGenerateAgain, setIsReGenerateAgain] = useState<boolean>(false);
    const [medicalNecessityFile, setMedicalNecessityFile] = useState<null>(null);
    const dispatch = useDispatch();
    const { id: reqId, inviteCode } = useParams();
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (requestDetails) {
            setMedicalNecessityFile(requestDetails?.letterOfMedicalNecessity[0]);
        } else {
            setMedicalNecessityFile(null);
        }
    }, [requestDetails]);

    const generateMedicalNecessity = async () => {
        setIsLoadingMedicalNecessity(true);
        try {
            const response = await postGenerateMedicalNecessity(dispatch, reqId);
            if (response) {
                setMedicalNecessityFile(response);
            };
        } catch (error: any) {
            console.log(error, "error");
        } finally {
            setIsLoadingMedicalNecessity(false);
            setIsReGenerateAgain(false);
        }
    };

    const handleDownload = async () => {
        if (medicalNecessityFile && user) {
            const file = medicalNecessityFile as { url: string; fileName: string };
            try {
                const response = await api.get(file.url, {
                    responseType: "blob"
                });
                const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = file.fileName || "medical_necessity.pdf";
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
        <div className="inline-flex flex-col gap-4 p-4 max-w-[400px] border border-quaternary-navy-blue rounded-lg">
            <img src="/AI_PDF_large.svg" alt="pdf icon" className="w-10 h-10 sm:w-12 sm:h-12" />
            <div className="">
                <h3 className="text-sm sm:text-base font-medium text-primary-black whitespace-nowrap sm:whitespace-normal">
                    {medicalNecessityFile && !isReGenerateAgain ? (
                        "Successfully Generated"
                    ) : (
                        "Letter of Medical Necessity"
                    )}
                </h3>
                <p className="text-xs sm:text-sm text-quaternary-white">
                    {medicalNecessityFile && !isReGenerateAgain ? (
                        "Your Letter of Medical Necessity has been generated successfully."
                    ) : (
                        "You can generate letter of medical necessity directly inside the platform using our latest AI Models"
                    )}
                </p>
            </div>
            {medicalNecessityFile && !isReGenerateAgain ? (
                <div className="flex gap-2 items-center h-10 sm:h-12">
                    <ThemeButton variant="primary" className="flex-1" onClick={handleDownload}>
                        <span className="flex gap-2 items-center text-xs sm:text-sm">
                            Download
                            <FiDownload className="w-4 h-3 sm:w-5 sm:h-4" />
                        </span>
                    </ThemeButton>
                    <TfiReload 
                        className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 p-3 sm:p-4 border rounded-lg border-quaternary-navy-blue" 
                        onClick={() => setIsReGenerateAgain(true)} />
                </div>
            ) : !inviteCode && (
                <div className="relative rounded-lg p-[2px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B] overflow-hidden">
                    <button
                        type="button"
                        onClick={generateMedicalNecessity}
                        className="flex w-full items-center justify-center cursor-pointer gap-2 py-2 sm:py-4 px-3 bg-primary-white rounded-lg"
                    >
                        <p className="text-xs sm:text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]">
                            {isLoadingMedicalNecessity ? "Generating..." : isReGenerateAgain ? "Generate Again" : "Generate"}
                        </p>
                        <img src={"/Group (2).svg"} alt="AI Icon" className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </button>
                </div>
            )}
        </div>
    )
};

export default LetterOfMedicalNecessity;