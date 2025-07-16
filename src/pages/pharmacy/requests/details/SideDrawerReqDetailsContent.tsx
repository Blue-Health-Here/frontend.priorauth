import ThemeButton from "@/components/common/ThemeButton";
import NameBadge from "@/components/NameBadge";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import { timeAgo } from "@/utils/helper";
import { useCallback, useState } from "react";
import { FiDownload, FiEye, FiRotateCcw } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Sample content component to demonstrate usage
const RequestDetailsContent: React.FC<any> = ({ comments, setComments }) => {
  const [activeTab, setActiveTab] = useState("Comments");

  const statusItems = [
    {
      status: "Awaiting feedback to Hi",
      date: "25-02-2025",
      color: "bg-blue-500",
    },
    {
      status: "Approved With Progress Notes",
      date: "25-02-2025",
      color: "bg-green-500",
    },
    {
      status: "Awaiting MD's Signature on Fax Form",
      date: "25-02-2025",
      color: "bg-yellow-500",
    },
    { status: "Denied", date: "25-02-2025", color: "bg-red-500" },
  ];

  const [input, setInput] = useState("");
  const handleAdd = useCallback(() => {
    if (!input.trim()) return;
    const newComment = {
      id: Date.now(),
      author: "You", // change as needed
      body: input.trim(),
      createdAt: new Date(),
    };
    const updated = [...comments, newComment];
    setComments(updated);
    setInput("");
  }, [comments, input]);

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      {/* Tabs */}
      <ThemeButtonTabs
        data={["Status & Notes", "Revision History", "Comments"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="w-full !h-12"
      />

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === "Status & Notes" && (
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-sm text-gray-800">5/5/2025</span>
              </div>

              <div className="space-y-3">
                {statusItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-800">{item.status}</div>
                      <div className="text-xs text-gray-500">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-800 mb-2">Medication</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Rx#: 669516-O</div>
                <div>Qty: 28</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-800 mb-2">
                Patient Information
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Patient Name: CHENG, MICHELLE</div>
                <div>Patient Address: 50 LOCKWOOD DR</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-800 mb-2">
                Insurance Information
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Insurance: AMERIGROUP</div>
                <div>Help Desk Number: 1-800-454-3730</div>
                <div>Group: WKPA</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-green-700 font-medium">
                    Analysis Complete
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
                    <FiDownload className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
                    <FiEye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
                    <FiRotateCcw className="w-4 h-4" />
                    <span>Restart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Comments" && (
          <div className="space-y-4">
            {comments && comments.length > 0 && (
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
          <div className="p-4">
            {/* Status Update */}
            <div className="flex items-start gap-3">
              <NameBadge
                data={{ name: "Tucer Carlson", textColor: "#fff" }}
                showName={false}
                className="w-6 h-6 text-xs"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="font-sm text-[#1E1E1E]">Tucker Carlson</p>
                  <span className="text-sm text-[#7A7A7A]">updated status</span>
                  <span className="text-xs text-[#7A7A7A] ml-auto">
                    2 days ago
                  </span>
                </div>
                <div className="bg-[#F5F8FF] rounded-lg p-2 mt-1 border border-[#EBF1FF]">
                  <div className="text-xs text-[#525252] mb-1">Status</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-[#1D4ED8] bg-blue-50 border border-[#19AD4B] px-2 py-1 rounded-xl">
                      Awaiting MD's Signature on Fax Form
                    </div>
                    <div className="text-xs text-[#B91C1C] bg-red-50 border border-[#FF2E37] px-2 py-1 rounded-xl">
                      <span className="line-through">Denied</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EBF1FF] my-4"></div>

            {/* Progress Notes */}
            <div className="flex items-start gap-3">
              <NameBadge
                data={{
                  name: "System",
                  bgColor: "#F0F0F0",
                  textColor: "#7A7A7A",
                }}
                showName={false}
                className="w-6 h-6 text-xs"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="font-sm text-[#1E1E1E]">Progress Notes</p>
                  <span className="text-sm text-[#7A7A7A]">
                    analyzed via API
                  </span>
                  <span className="text-xs text-[#7A7A7A] ml-auto">
                    2 days ago
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EBF1FF] my-4"></div>

            {/* File Upload */}
            <div className="flex items-start gap-3">
              <NameBadge
                data={{ name: "John Dee", textColor: "#fff" }}
                showName={false}
                className="w-6 h-6 text-xs"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="font-sm text-[#1E1E1E]">John Doe</p>
                  <span className="text-sm text-[#7A7A7A]">
                    uploaded a new file
                  </span>
                  <span className="text-xs text-[#7A7A7A] ml-auto">
                    2 days ago
                  </span>
                </div>
                <div className="bg-[#F5F8FF] rounded-lg p-2 mt-1 border border-[#EBF1FF]">
                  <div className="text-xs text-[#525252] mb-1">File</div>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-2 border border-[#EBF1FF]">
                    <img src="/file.svg" alt="File" className="w-4 h-4" />
                    <span className="text-xs text-[#1E1E1E]">
                      Vaccination_Records_April_2023.pdf
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EBF1FF] my-4"></div>

            {/* Medical Letter */}
            <div className="flex items-start gap-3">
              <NameBadge
                data={{
                  name: "System",
                  bgColor: "#F0F0F0",
                  textColor: "#7A7A7A",
                }}
                showName={false}
                className="w-6 h-6 text-xs"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="text-sm text-[#1E1E1E]">
                    Medical Letter of Necessity generated via API
                  </p>
                  <span className="text-xs text-gray-400 ml-auto">
                    2 days ago
                  </span>
                </div>
                <div className="bg-[#F5F8FF] rounded-lg p-2 mt-1 border border-[#EBF1FF]">
                  <div className="text-xs text-[#525252] mb-1">File</div>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-2 border border-[#EBF1FF]">
                    <img src="/file.svg" alt="File" className="w-4 h-4" />
                    <span className="text-xs text-[#1E1E1E]">
                      Medical Letter of Necessity.pdf
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EBF1FF] my-4"></div>

            {/* New Request */}
            <div className="flex items-start gap-3">
              <NameBadge
                data={{
                  name: "System",
                  bgColor: "#F0F0F0",
                  textColor: "#7A7A7A",
                }}
                showName={false}
                className="w-6 h-6 text-xs"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="text-sm text-[#1E1E1E]">
                    New Request Generated
                  </p>
                  <span className="text-sm text-[#7A7A7A]">via API</span>
                  <span className="text-xs text-[#7A7A7A] ml-auto">
                    2 days ago
                  </span>
                </div>
                <div className="bg-[#F5F8FF] rounded-lg p-2 mt-1 border border-[#EBF1FF]">
                  <div className="flex">
                    {/* Patient Name Column */}
                    <div className="flex-1 pr-4">
                      <div className="text-xs text-[#525252] mb-1">
                        Patient Name
                      </div>
                      <div className="text-sm text-gray-800">
                        CHENG, MICHELLE
                      </div>
                    </div>

                    {/* Member ID Column */}
                    <div className="flex-1">
                      <div className="text-xs text-[#525252] mb-1">
                        Member ID
                      </div>
                      <div className="text-sm text-gray-800">728597627</div>
                    </div>
                  </div>
                  <button className="text-xs text-blue-600 mt-2 hover:underline">
                    View Request
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EBF1FF] my-4"></div>

            {/* Fax Request */}
            <div className="flex items-start gap-3">
              <NameBadge
                data={{
                  name: "System",
                  bgColor: "#F0F0F0",
                  textColor: "#7A7A7A",
                }}
                showName={false}
                className="w-6 h-6 text-xs"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="font-sm text-[#1E1E1E]">Fax Request</p>
                  <span className="text-sm text-[#7A7A7A]">
                    sent for progress notes via API
                  </span>
                  <span className="text-xs text-[#7A7A7A] ml-auto">
                    2 days ago
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EBF1FF] my-4"></div>

            {/* Notes */}
            <div className="flex items-start gap-3">
              <NameBadge
                data={{ name: "ProdAdmin", textColor: "#fff" }}
                showName={false}
                className="w-6 h-6 text-xs"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="font-sm text-[#1E1E1E]">PriorAuthAdmin</p>
                  <span className="text-sm text-[#7A7A7A]">added notes</span>
                  <span className="text-xs text-[#7A7A7A] ml-auto">
                    2 days ago
                  </span>
                </div>
                <div className="bg-[#F5F8FF] rounded-lg p-2 mt-1 border border-[#EBF1FF]">
                  <div className="text-xs text-[#525252] mb-1">Notes</div>
                  <div className="text-xs text-[#525252]">
                    A calls was made to the Help Desk to check the status of the
                    Prior Authorization. The agent stated that the case is under
                    clinical review and additional information is required:
                    supporting chart notes. The agent stated to fax that
                    information to 866- 249-6155 and Case ID: 25-098223468
                    should be mention while submitting that information. (AA)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default RequestDetailsContent;
