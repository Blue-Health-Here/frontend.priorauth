import { Label } from "@/components/common/Label";
import React from "react";

const ByLinkCard: React.FC<{ value: string }> = ({ value }) => {
    return (
        <div className="space-y-2">
            <Label htmlFor="link" className="text-quaternary-white text-sm font-secondary">
                Link
            </Label>
            <div className="relative flex items-center gap-2 w-full">
                <div className="relative flex-1">
                    <input
                        name="link"
                        value={value}
                        readOnly
                        className="w-full h-10 bg-quaternary-navy-blue rounded-lg px-4 pr-12 text-sm"
                    />
                    <img src="/link.svg" alt="Link" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                </div>
                <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100"
                    onClick={() => navigator.clipboard.writeText(value)}
                >
                    <img src="/Vector (24).svg" alt="Copy" className="w-5.5 h-5.5" />
                </button>
            </div>
        </div>
    )
};

export default ByLinkCard;