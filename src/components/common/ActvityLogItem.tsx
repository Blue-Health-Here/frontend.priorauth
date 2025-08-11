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
                    <p className="text-sm text-body-text">{actor || action}</p>
                    {actor && <span className="text-sm text-[#7A7A7A]">{action}</span>}
                    <span className="text-xs text-[#7A7A7A] ml-auto">{timestamp}</span>
                </div>

                {(statusBadges || file || notes || info) && (
                    <div className="bg-revision-history-bg rounded-lg p-2 mt-1 border border-revision-history-border">
                        {statusBadges && (
                            <>
                                <div className="text-xs text-body-text mb-1">Status</div>
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
                                <div className="flex items-center gap-2 bg-header rounded-lg p-2 border border-body-stroke">
                                    <img
                                        src={file.icon || "/uploaded-files.svg"}
                                        alt="File"
                                        className=" w-6 h-6"
                                    />
                                    <span className="text-xs text-header-text">{file.name}</span>
                                </div>
                            </>
                        )}

                        {notes && (
                            <>
                                <div className="text-xs text-body-text mb-1">Notes</div>
                                <div className="text-xs text-[#525252]">{notes}</div>
                            </>
                        )}

                        {info && (
                            <div className="flex gap-4">
                                {info.map((item, index) => (
                                    <div key={index} className="flex-1">
                                        <div className="text-xs text- mb-1">
                                            {item.label}
                                        </div>
                                        <div className="text-sm ">{item.value}</div>
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
