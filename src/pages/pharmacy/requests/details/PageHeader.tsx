import ThemeButton from "@/components/common/ThemeButton";
import { User } from "@/utils/types";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  requestDetails: any;
  isAdmin: boolean;
  prescriberId: string;
  inviteCode?: string;
  handleUploadClick: () => void;
  isAnalysisComplete?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  requestDetails, 
  isAdmin, 
  prescriberId, 
  inviteCode,
  handleUploadClick,
  isAnalysisComplete
}) => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    let user: User | null = null;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                try {
                    if (storedUser) {
                        user = JSON.parse(storedUser);
                    }
                } catch (error) {
                    console.error("Failed to parse user from localStorage", error);
                }

                navigate(user?.roleCode === "pharmacyUser" ? '/pharmacy/requests' : '/admin/requests');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);

    return (
        <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
            <h2 className="text-lg font-bold text-header-text inline-flex gap-2 items-center">
                {!inviteCode && <img 
                    onClick={() => navigate(inviteCode ? `/pharmacy/prescriber-invite/${prescriberId}/${inviteCode}` : isAdmin ? "/admin/requests" : "/pharmacy/requests")} 
                    src='/header-left-logo-arrow.svg'
                    alt='header left logo arrow' 
                    className="back-button w-8 h-8 bg-gray-100 p-2 rounded-lg cursor-pointer" 
                />}
                <span>{requestDetails && requestDetails.patientName}</span>
            </h2>
            {!inviteCode && (
                <>
                    {/* Desktop Buttons - hidden on mobile */}
                    <div className="hidden sm:flex gap-3 self-end sm:self-auto flex-wrap">
                        <ThemeButton className="h-full min-h-12" variant="secondary">Open Portal</ThemeButton>
                        <ThemeButton 
                            className="submit-progress-notes h-full min-h-12 !flex gap-2 items-center bg-button-bg" 
                            variant="primary"
                            onClick={handleUploadClick}
                        >
                            <span>{isAnalysisComplete ? "Restart Analysis" : "Submit Progress Notes"}</span>
                            <img src="/images/next-arrow.svg" alt="next arrow" className="" loading="lazy" />
                        </ThemeButton>
                    </div>
                    
                    {/* Mobile Button - shown only on mobile */}
                    <div className="sm:hidden flex items-center justify-center w-7 h-7 bg-quaternary-navy-blue rounded-md p-2 cursor-pointer">
                        <img src="/add.svg" alt="Add" className="w-4 h-4" />
                    </div>
                </>
            )}
        </div>
    )
};

export default PageHeader;