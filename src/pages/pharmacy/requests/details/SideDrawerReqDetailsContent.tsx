import ThemeButton from "@/components/common/ThemeButton";
import NameBadge from "@/components/NameBadge";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import { timeAgo } from "@/utils/helper";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActivityLogItem from "@/components/common/ActvityLogItem";
import StatusTimeline from "./StatusTimeline";

interface RequestDetailsContentProps {
  comments?: any[];
  setComments?: (comments: any[]) => void;
  initialTab?: string;
  onClose?: () => void;
  isAdmin?: boolean;
}

const RequestDetailsContent: React.FC<RequestDetailsContentProps> = ({
  comments = [],
  setComments = () => { },
  initialTab = "Comments",
  isAdmin
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [input, setInput] = useState("");

  const handleAdd = useCallback(() => {
    if (!input.trim()) return;
    const newComment = {
      id: Date.now(),
      author: "You",
      body: input.trim(),
      createdAt: new Date(),
    };
    setComments([...comments, newComment]);
    setInput("");
  }, [input, comments, setComments]);

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

        {activeTab === "Comments" && (
          <div className="space-y-4">
            {comments.length > 0 && (
              <div className="space-y-6 p-3 border-b border-quaternary-navy-blue">
                <AnimatePresence>
                  {comments.map((c: any) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 items-start"
                    >
                      <NameBadge
                        data={{ name: c.author, textColor: "#fff" }}
                        showName={false}
                      />
                      <div className="flex-1 space-y-1">
                        <p className="font-medium leading-none text-gray-900 dark:text-gray-100">
                          {c.author}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {timeAgo(c.createdAt)}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {c.body}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <div className="p-3">
              <div className="flex gap-3 items-start">
                <NameBadge
                  data={{ name: "P", bgColor: "#CBDAFF", textColor: "#3961B2" }}
                  showName={false}
                />
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Write a comment"
                  className="flex-1 resize-none rounded-lg border border-light-stroke bg-white p-3 text-sm focus:outline-none focus:border-dark-stroke"
                  rows={3}
                />
              </div>
              <div className="flex justify-end pt-3">
                <ThemeButton
                  onClick={handleAdd}
                  disabled={!input.trim()}
                  className="px-6"
                >
                  Post Comment
                </ThemeButton>
              </div>
            </div>
          </div>
        )}

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