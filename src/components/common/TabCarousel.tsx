import { useRef, useState, useEffect } from 'react';
import { requestsTabs } from '../../utils/constants';

export default function TabCarousel() {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [activeTab, setActiveTab] = useState(requestsTabs[0]);

    const checkScroll = () => {
        const el: any = scrollRef.current;
        if (!el) return;
        setShowLeftArrow(el.scrollLeft > 0);
        setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    useEffect(() => {
        checkScroll();
        const handleResize = () => checkScroll();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const scroll = (direction: any) => {
        const el: any = scrollRef.current;
        if (!el) return;
        const scrollAmount = 200;
        el.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className="relative flex items-center w-full pb-2">
            {/* Left Arrow */}
            {showLeftArrow && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 z-10 bg-white border border-light-stroke shadow h-max w-6 md:w-8 flex items-center justify-center p-2 rounded-lg cursor-pointer text-center"
                >
                    <img src='/next-arrow-carousel.svg' alt='header left logo arrow' className='scale-[-1]' />
                </button>
            )}

            {/* Scrollable Tab List */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex space-x-2 overflow-x-auto w-full border-b border-light-stroke"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Hide scrollbar for WebKit-based browsers */}
                <style>
                    {`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}
                </style>
                {requestsTabs.map((tab, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base text-center 
                            transition-colors duration-200 cursor-pointer font-secondary flex-1 min-w-max
                            ${activeTab === tab
                                ? 'border-b-2 border-primary-sky-blue text-secondary-black font-medium'
                                : 'text-tertiary-black hover:text-secondary-black'
                            }`}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 z-10 bg-white border border-light-stroke shadow h-max w-6 md:w-8  flex items-center justify-center p-2 rounded-lg cursor-pointer text-center"
                >
                    <img src='/next-arrow-carousel.svg' alt='header left logo arrow' className='' />
                </button>
            )}
        </div>
    );
}
