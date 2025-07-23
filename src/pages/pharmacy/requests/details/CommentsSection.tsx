import React, { useState, useEffect } from "react";
import ThemeButton from "@/components/common/ThemeButton";
import { RxArrowTopRight } from "react-icons/rx";
import SideDrawer from "@/components/SideDrawer";
import RequestDetailsContent from "./SideDrawerReqDetailsContent";
import CommentsWidget from "./CommentsWidget";

interface CommentsSectionProps {
    isAdmin?: boolean;
};

const CommentsSection: React.FC<CommentsSectionProps> = ({ isAdmin }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    return (
        <>
            <SideDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title=""
                width="w-[500px]"
                position="right"
                isClose={false}
            >
                <RequestDetailsContent isAdmin={isAdmin} />
            </SideDrawer>
            <div className="w-full rounded-lg border border-quaternary-navy-blue">
                <div className="flex items-center justify-between p-3 border-b border-quaternary-navy-blue">
                    <h2 className="text-base font-medium">Comments</h2>
                    <ThemeButton type="button" onClick={() => setIsDrawerOpen && setIsDrawerOpen(true)} className="h-full min-h-10 !flex gap-2 items-center" variant="tertiary">
                        <span>View All Comments</span>
                        <RxArrowTopRight size={18} />
                    </ThemeButton>
                </div>
                <CommentsWidget isAdmin={isAdmin} showTwo={true} />
            </div>
        </>
    );
}

export default CommentsSection;