import React, { useState, useRef } from "react";

type Props = {
    content: React.ReactNode;
    placement?: "top" | "bottom";
    children: React.ReactNode;
};

export const Tooltip: React.FC<Props> = ({
    content,
    placement = "bottom",
    children,
}) => {
    const [open, setOpen] = useState(false);
    const id = useRef(`tooltip-${Math.random().toString(36).slice(2, 9)}`);

    return (
        <span
            className="relative inline-block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onTouchStart={() => setOpen(!open)} // Toggle on tap for mobile
            aria-describedby={id.current}
        >
            {children}

            {open && (
                <div
                    id={id.current}
                    role="tooltip"
                    className={`
                        absolute z-50 w-[220px] sm:w-auto max-w-[270px] rounded-lg px-4 py-4 text-xs sm:text-sm shadow-lg
                        bg-primary-navy-blue text-white ${placement === "top" ? "bottom-full mb-2" : "top-full mt-2"}
                    `}
                >
                    {content}

                    {/* Arrow */}
                    <span
                        className={`
                            absolute h-6 w-6 rotate-45 bg-primary-navy-blue -z-10
                            ${placement === "top" ? "left-1/2 top-[100% + 20px] -translate-x-1/2" : "left-1/2 bottom-full -top-2 -translate-x-1/2"}
                        `}
                    />
                </div>
            )}
        </span>
    );
};
