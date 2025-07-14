import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeButton from "@/components/common/ThemeButton";
import { RxArrowTopRight } from "react-icons/rx";
import NameBadge from "@/components/NameBadge";

interface CommentsSectionProps {
    initialComments?: {
        id: string | number,
        author: string,
        body: string,
        createdAt: Date | any
    }[],
    onChange?: (comments: any) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ initialComments = [], onChange }) => {
    const [comments, setComments] = useState(initialComments);
    const [input, setInput] = useState("");

    // derive the last two comments (newest last so that the latest one appears at the bottom)
    const lastTwo = useMemo(() => {
        return [...comments]
            .sort((a, b) => a.createdAt - b.createdAt) // oldest → newest
            .slice(-2);
    }, [comments]);

    const handleAdd = useCallback(() => {
        if (!input.trim()) return;
        const newComment = {
            id: Date.now(),
            author: "You", // change as needed
            body: input.trim(),
            createdAt: new Date()
        };
        const updated = [...comments, newComment];
        setComments(updated);
        setInput("");
        onChange?.(updated);
    }, [comments, input, onChange]);

    return (
        <div className="w-full rounded-lg border border-quaternary-navy-blue">
            <div className="flex items-center justify-between p-3 border-b border-quaternary-navy-blue">
                <h2 className="text-base font-medium">Comments</h2>
                <ThemeButton className="h-full min-h-10 !flex gap-2 items-center" variant="tertiary">
                    <span>View All Comments</span>
                    <RxArrowTopRight size={18} />
                </ThemeButton>
            </div>
            <div className="space-y-4">
                {lastTwo.length > 0 && (
                    <div className="space-y-6 p-3 border-b border-quaternary-navy-blue">
                        <AnimatePresence>
                            {lastTwo.map((c: any) => (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex gap-4 items-start"
                                >
                                    <NameBadge data={{ name: c.author, textColor: '#fff' }} showName={false} />
                                    <div className="flex-1 space-y-1">
                                        <p className="font-medium leading-none text-gray-900 dark:text-gray-100">{c.author}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(c.createdAt)}</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{c.body}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                <div className="p-3">
                    <div className="flex gap-3 items-start">
                        <NameBadge data={{ name: "P", bgColor: '#CBDAFF', textColor: '#3961B2' }} showName={false} />
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Write a comment"
                            className="flex-1 resize-none rounded-lg border border-light-stroke bg-white p-3 text-sm focus:outline-none focus:border-dark-stroke"
                            rows={3}
                        />
                    </div>
                    <div className="flex justify-end pt-3">
                        <ThemeButton onClick={handleAdd} disabled={!input.trim()} className="px-6">
                            Post Comment
                        </ThemeButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

/** tiny helper to get x days / minutes ago */
function timeAgo(date: any) {
    const dateObj = new Date(date);
    const diff = (Date.now() - dateObj.getTime()) / 1000;
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

export default CommentsSection;