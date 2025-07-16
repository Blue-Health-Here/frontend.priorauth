import ThemeButton from "@/components/common/ThemeButton";
import NameBadge from "@/components/NameBadge";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import { timeAgo } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface StatusItem {
  name: string;
  date: string;
  statusClass: string;
  isActive?: boolean;
  notes?: string;
}

interface RequestDetailsContentProps {
  comments?: any[];
  setComments?: (comments: any[]) => void;
  initialTab?: string;
  onClose?: () => void;
}

const RequestDetailsContent: React.FC<RequestDetailsContentProps> = ({
  comments = [],
  setComments = () => {},
  initialTab = "Comments",
  onClose = () => {},
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [statusItems, setStatusItems] = useState<StatusItem[]>([]);
  const [input, setInput] = useState("");
  const [showNotesField, setShowNotesField] = useState(false);
  const [notesInput, setNotesInput] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  useEffect(() => {
    const loadStatuses = () => {
      const storedStatuses = localStorage.getItem("pharmacyRequestStatuses");
      if (storedStatuses) {
        try {
          const parsedStatuses = JSON.parse(storedStatuses);
          if (parsedStatuses) {
            const items: StatusItem[] = [];

            if (parsedStatuses.currentStatus) {
              items.push({
                name: parsedStatuses.currentStatus.name,
                date: parsedStatuses.currentStatus.date,
                statusClass: "bg-blue-100 text-blue-800",
                isActive: true,
                notes: parsedStatuses.currentStatus.notes,
              });
            }

            if (parsedStatuses.previousStatuses?.length > 0) {
              parsedStatuses.previousStatuses.forEach((status: any) => {
                items.push({
                  name: status.name,
                  date: status.date,
                  statusClass: "bg-gray-100 text-gray-800",
                  isActive: false,
                  notes: status.notes,
                });
              });
            }

            setStatusItems(items);
          }
        } catch (error) {
          console.error("Error parsing statuses:", error);
        }
      }
    };

    loadStatuses();
  }, []);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

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

  const handleAddNotes = () => {
    setShowNotesField(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (notesInput.trim()) {
        setSavedNotes((prev) => [...prev, notesInput.trim()]);
        setNotesInput("");
        setShowNotesField(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      <ThemeButtonTabs
        data={["Status & Notes", "Revision History", "Comments"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="w-full !h-12"
      />

      <div className="flex-1">
        {activeTab === "Status & Notes" && (
          <div className="p-4 flex flex-col h-full">
            <div className="space-y-6 flex-1">
              <div className="space-y-4">
                {statusItems.length > 0 ? (
                  <div className="relative flex flex-col gap-4 w-full">
                    <div className="absolute left-2.5 top-0 bottom-0 w-1.5 bg-gray-200"></div>
                    {statusItems.map((item, index) => (
                      <div
                        key={index}
                        className={`relative flex items-center gap-4 ${
                          item.isActive
                            ? "border border-dashed border-blue-navigation-link-button rounded-xl opacity-100"
                            : "opacity-50"
                        }`}
                      >
                        <div className="p-1 bg-white rounded-full inline-flex justify-center items-center ml-1">
                          <div className="relative z-10 w-2.5 h-2.5 rounded-full flex-shrink-0 p-1">
                            <div
                              className={`absolute inset-0 rounded-full ${
                                item.isActive ? "bg-blue-500" : "bg-gray-400"
                              }`}
                            ></div>
                          </div>
                        </div>

                        <div className="p-2 w-full">
                          <div className="flex justify-between items-center gap-4 w-full">
                            <span
                              className={`px-4 py-1 rounded-full line-clamp-1 text-xs sm:text-sm lg:text-md font-normal ${item.statusClass}`}
                            >
                              {item.name}
                            </span>
                            {item.date && (
                              <span className="text-quaternary-white text-sm whitespace-nowrap">
                                {formatDate(item.date)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <FiFileText className="mx-auto h-8 w-8 mb-2" />
                    <p>No status history available</p>
                  </div>
                )}
              </div>

              {savedNotes.length > 0 && (
                <div className="space-y-4">
                  {savedNotes.map((note, index) => (
                    <div
                      key={index}
                      className="p-3 bg-[#FAFAFA] border border-[#EBEBEB] rounded-lg"
                    >
                      <p className="text-xs font-medium text-[#525252] mb-1">
                        Notes
                      </p>
                      <p className="text-xs text-[#525252]">{note}</p>
                    </div>
                  ))}
                </div>
              )}

              {!showNotesField && (
                <button
                  onClick={handleAddNotes}
                  className="w-full py-2 px-4 rounded-md flex items-center justify-center gap-1 text-sm"
                  style={{ backgroundColor: "#EBF1FF", color: "#163066" }}
                >
                  Add Notes
                  <img
                    src="/Vector (20).svg"
                    alt="Add Notes"
                    className="w-3 h-3"
                  />
                </button>
              )}

              {showNotesField && (
                <div className="p-3">
                  <label className="block text-sm font-medium text-[#9E9E9E] mb-2">
                    Notes
                  </label>
                  <div className="flex gap-3 items-start">
                    <textarea
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter notes here"
                      className="flex-1 resize-none rounded-lg border border-light-stroke bg-white p-3 text-sm focus:outline-none focus:border-dark-stroke"
                      rows={1}
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => {
                        setShowNotesField(false);
                        setNotesInput("");
                      }}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 mr-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              className="w-full py-3 px-4 rounded-md text-sm font-medium mt-auto"
              style={{
                backgroundColor: "#EBF1FF",
                color: "#163066",
              }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}

        {activeTab === "Comments" && (
          <div className="space-y-4">
            {comments.length > 0 && (
              <div className="space-y-6 p-3 border-b border-quaternary-navy-blue">
                <AnimatePresence>
                  {comments.map((c) => (
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
          <div className="p-4">
            <div className="text-center text-gray-500 py-8">
              <FiFileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No revision history available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetailsContent;