import React, { useState } from "react";
import ThemeButton from "@/components/common/ThemeButton";
import { RxArrowTopRight } from "react-icons/rx";
import SideDrawer from "@/components/SideDrawer";
import RequestDetailsContent from "./SideDrawerReqDetailsContent";
import CommentsWidget from "./CommentsWidget";
import { useParams } from "react-router-dom";

interface CommentsSectionProps {
  isAdmin?: boolean;
  inviteCode?: any;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ isAdmin }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { inviteCode } = useParams();
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
        {/* Header row - adjusted button width */}
        <div className="flex items-center justify-between p-3 border-b border-quaternary-navy-blue">
          <h2 className="text-base font-medium">Comments</h2>
          <ThemeButton
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="h-8 px-[4px] sm:px-3 flex items-center gap-1 sm:gap-2 whitespace-nowrap"
            variant="tertiary"
          >
            <span className="text-sm">View All Comments</span>
            <RxArrowTopRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </ThemeButton>
        </div>

        <CommentsWidget isAdmin={isAdmin} showTwo={true} showActions={!inviteCode} />
      </div>
    </>
  );
};

export default CommentsSection;
