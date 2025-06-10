import { getCurrentBadgeColors } from "../../../../utils/helper";

const RenderNoteCard: React.FC<any> = ({ item, handleDownloadReport }) => {
    return (
        <div className="border border-light-stroke p-4 rounded-theme-r">
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4">
                <span className="font-semibold">{item.label}</span>
                <span className={`${getCurrentBadgeColors(item.statusCode)} text-xs sm:text-sm px-4 py-2 font-semibold rounded-theme-r transition-colors`}>
                    {item.status}
                </span>
            </div>
            <div className="text-sm m   d:text-base text-primary-black pb-4">
                {item.description}
            </div>
            <button onClick={handleDownloadReport}
                className="text-secondary-black flex gap-2 bg-secondary-background rounded-md text-xs sm:text-sm cursor-pointer rounded-md px-4 py-2 transition-colors">
                <span>Reasoning</span>
                <img src="/next-arrow-carousel.svg" alt="next arrow carousel" className="w-2" />
            </button>
        </div>
    )
};

export default RenderNoteCard;