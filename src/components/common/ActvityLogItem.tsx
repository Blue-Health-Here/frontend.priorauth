import React from "react";
import NameBadge from "../NameBadge";

type FileData = {
    icon?: string;
    name: string;
};

type StatusBadge = {
    text: string;
    colorClass: string;
    strike?: boolean;
};

type InfoItem = {
    label: string;
    value: string;
};

interface ActivityLogItemProps {
    name: string;
    actor?: string;
    timestamp: string;
    action: string | React.ReactNode;
    notes?: string;
    file?: FileData;
    info?: InfoItem[];
    statusBadges?: StatusBadge[];
    bgColor?: string;
    textColor?: string;
}

const ActivityLogItem: React.FC<ActivityLogItemProps> = ({
    name,
    actor,
    timestamp,
    action,
    notes,
    file,
    info,
    statusBadges,
    bgColor = "#F0F0F0",
    textColor = "#7A7A7A",
}) => {
    return (
        <div className="flex items-start gap-3">
            <NameBadge
                data={{ name, bgColor, textColor }}
                showName={false}
                className="w-6 h-6 text-xs"
            />

            <div className="flex-1">
                <div className="flex items-baseline gap-2">
                    <p className="text-sm text-[#1E1E1E]">{actor || action}</p>
                    {actor && <span className="text-sm text-quaternary-white">{action}</span>}
                    <span className="text-xs text-quaternary-white ml-auto">{timestamp}</span>
                </div>

                {(statusBadges || file || notes || info) && (
                    <div className="bg-[#F5F8FF] rounded-lg p-2 mt-1 border border-[#EBF1FF]">
                        {statusBadges && (
                            <>
                                <div className="text-xs text-[#525252] mb-1">Status</div>
                                <div className="flex items-center gap-2">
                                    {statusBadges.map((badge, index) => (
                                        <div
                                            key={index}
                                            className={`text-xs px-2 py-1 rounded-xl ${badge.colorClass}`}
                                        >
                                            {badge.strike ? (
                                                <span className="line-through">{badge.text}</span>
                                            ) : (
                                                badge.text
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {file && (
                            <>
                                <div className="text-xs text-[#525252] mb-1">File</div>
                                <div className="flex items-center gap-2 bg-primary-white rounded-lg p-2 border border-[#EBF1FF]">
                                    <img
                                        src={file.icon || "/file.svg"}
                                        alt="File"
                                        className="w-4 h-4"
                                    />
                                    <span className="text-xs text-[#1E1E1E]">{file.name}</span>
                                </div>
                            </>
                        )}

                        {notes && (
                            <>
                                <div className="text-xs text-[#525252] mb-1">Notes</div>
                                <div className="text-xs text-[#525252]">{notes}</div>
                            </>
                        )}

                        {info && (
                            <div className="flex gap-4">
                                {info.map((item, index) => (
                                    <div key={index} className="flex-1">
                                        <div className="text-xs text-[#525252] mb-1">
                                            {item.label}
                                        </div>
                                        <div className="text-sm text-gray-800">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLogItem;
