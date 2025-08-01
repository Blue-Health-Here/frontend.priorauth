import ThemeButton from "@/components/common/ThemeButton";
import NameBadge from "@/components/NameBadge";
import { timeAgo } from "@/utils/helper";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setRequestComments } from "@/store/features/pharmacy/requests/requestsSlice";
import toast from "react-hot-toast";
import { addNewReqComment } from "@/services/pharmacyService";
import { useParams } from "react-router-dom";

const CommentsWidget: React.FC<any> = ({ showTwo = false, showActions = true }) => {
  const { reqComments } = useSelector((state: RootState) => state.pharmacyReqs);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { id: requestId } = useParams();

  const handleAdd = async () => {
    if (!input.trim()) return;
    try {
      const response = await addNewReqComment(dispatch, requestId, {
        comment: input,
      });
      if (response) {
        dispatch(setRequestComments(response.comments));
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
    setInput("");
  };

  const lastTwo = useMemo(() => {
    return [...reqComments]
      .filter((comment) => comment.date)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-2);
  }, [reqComments]);

  return (
    <div className="space-y-4">
      {(showTwo ? lastTwo.length > 0 : reqComments.length > 0) && (
        <div className="space-y-6 p-3 border-b border-quaternary-navy-blue">
          <AnimatePresence>
            {(showTwo ? lastTwo : reqComments).map((c: any) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-4 items-start"
              >
                <NameBadge
                  data={{ name: c.userName, textColor: "#fff" }}
                  showName={false}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium leading-none text-gray-900">
                      {c.userName}
                    </p>
                    <img
                      src="/Ellipse 442.svg"
                      alt="separator"
                      className="w-1.5 h-1.5"
                    />
                    <p className="text-xs text-gray-500">{timeAgo(c.date)}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">
                    {c.comment}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {showActions && <div className="p-3">
        <div className="flex gap-3 items-start">
          <NameBadge
            data={{ name: "P", bgColor: "#CBDAFF", textColor: "#3961B2" }}
            showName={false}
          />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment"
            className="flex-1 resize-none rounded-lg border border-light-stroke bg-primary-white p-3 text-sm focus:outline-none focus:border-dark-stroke"
            rows={3}
          />
        </div>
        <div className="flex justify-end pt-3">
          <ThemeButton
            onClick={handleAdd}
            disabled={!input.trim()}
            className="w-full sm:w-auto px-6 !bg-primary-navy-blue !text-primary-white"
            variant="primary" // Force primary variant
          >
            Post Comment
          </ThemeButton>
        </div>
      </div>}
    </div>
  );
};

export default CommentsWidget;
