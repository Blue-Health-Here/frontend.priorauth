import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import { useState } from "react";
import ActivityLogItem from "@/components/common/ActvityLogItem";
import StatusTimeline from "./StatusTimeline";
import CommentsWidget from "./CommentsWidget";

interface RequestDetailsContentProps {
  initialTab?: string;
  onClose?: () => void;
  isAdmin?: boolean;
}

const RequestDetailsContent: React.FC<RequestDetailsContentProps> = ({
  initialTab = "Comments",
  isAdmin
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <ThemeButtonTabs
        data={["Status & Notes", "Revision History", "Comments"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="w-full !h-12"
      />

      <div className="flex-1 relative overflow-auto" style={{ maxHeight: `calc(100% - 140px)` }}>
        {activeTab === "Status & Notes" && (
          <StatusTimeline className="!p-0" isAdmin={isAdmin} showCheckNotesBtn={false} height="" />
        )}
        {activeTab === "Comments" && <CommentsWidget showTwo={false} />}
        {activeTab === "Revision History" && (
          <div className="p-4 space-y-4">
            <ActivityLogItem
              name="Tucer Carlson"
              actor="Tucker Carlson"
              action="updated status"
              timestamp="2 days ago"
              statusBadges={[
                {
                  text: "Awaiting MD's Signature on Fax Form",
                  colorClass: "text-[#1D4ED8] bg-blue-50 border border-[#19AD4B]",
                },
                {
                  text: "Denied",
                  colorClass: "text-[#B91C1C] bg-red-50 border border-[#FF2E37]",
                  strike: true,
                },
              ]}
            />

            <ActivityLogItem
              name="System"
              action="Progress Notes"
              timestamp="2 days ago"
            />

            <ActivityLogItem
              name="John Dee"
              actor="John Doe"
              action="uploaded a new file"
              timestamp="2 days ago"
              file={{
                name: "Vaccination_Records_April_2023.pdf",
              }}
            />

            <ActivityLogItem
              name="System"
              action="Medical Letter of Necessity generated via API"
              timestamp="2 days ago"
              file={{
                name: "Medical Letter of Necessity.pdf",
              }}
            />

            <ActivityLogItem
              name="System"
              action="New Request Generated"
              timestamp="2 days ago"
              info={[
                { label: "Patient Name", value: "CHENG, MICHELLE" },
                { label: "Member ID", value: "728597627" },
              ]}
            />

            <ActivityLogItem
              name="System"
              action="Fax Request"
              timestamp="2 days ago"
            />

            <ActivityLogItem
              name="ProdAdmin"
              actor="PriorAuthAdmin"
              action="added notes"
              timestamp="2 days ago"
              notes={`A calls was made to the Help Desk to check the status of the Prior Authorization. The agent stated that the case is under clinical review and additional information is required: supporting chart notes. The agent stated to fax that information to 866-249-6155 and Case ID: 25-098223468 should be mentioned while submitting that information. (AA)`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetailsContent;