import { getStatusColor } from "@/utils/helper";

const RenderNoteCard: React.FC<any> = ({ expanded, item, value, handleToggle }) => {
    return (
        <div className="border border-light-stroke p-4 rounded-theme-r">
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4">
                <span className="font-semibold text-[#525252] capitalize">{item.replace(/([A-Z])/g, " $1")}</span>
                {value.status && <span className={`${getStatusColor(value.status)} text-xs sm:text-sm px-4 py-2 font-semibold rounded-theme-r transition-colors`}>
                    {value.status}
                </span>}
            </div>
            {value.summary && <div className="text-sm md:text-base text-primary-black pb-4">
                {value.summary || "---"}
            </div>}
            <button onClick={() => handleToggle(item)}
                className="text-secondary-black flex gap-2 bg-secondary-background rounded-md text-xs sm:text-sm cursor-pointer rounded-md px-4 py-2 transition-colors">
                <span>Reasoning</span>
                <img src="/next-arrow-carousel.svg" alt="next arrow carousel" className="w-2" />
            </button>
            {expanded === item && (
                <div className="mt-2 p-3 text-gray-800 text-sm bg-gray-50 rounded-lg border border-light-stroke">
                    {value.reasoning}
                </div>
            )}
        </div>
    )
};

export default RenderNoteCard;