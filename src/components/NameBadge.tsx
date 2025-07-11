import { getAvatarInfo } from "@/utils/avatar";
import React from "react";

const NameBadge: React.FC<any> = ({ data }) => {
    const { initials, bgColor }: any = getAvatarInfo(data.name);
    return (
        <div className="flex gap-2 items-center">
            <p
                className="w-10 h-10 rounded-full text-center align-middle leading-10 inline-flex flex-1 max-w-10 justify-center"
                style={{
                    backgroundColor: bgColor,
                    color: "white",
                }}
            >
                {initials}
            </p>
            <p className="inline-flex flex-1">{data.name}</p>
        </div>
    )
};

export default NameBadge;