// import React, { useState, useRef } from "react";

// type Props = {
//     content: React.ReactNode;
//     placement?: "top" | "bottom";
//     children: React.ReactNode;
//     handleEdit?: any
// };

// export const Tooltip: React.FC<Props> = ({
//     content,
//     placement = "bottom",
//     children,
//     handleEdit
// }) => {
//     const [open, setOpen] = useState(false);
//     const id = useRef(`tooltip-${Math.random().toString(36).slice(2, 9)}`);

//     return (
//         <span
//             className="relative inline-block"
//             onMouseEnter={() => setOpen(true)}
//             onMouseLeave={() => setOpen(false)}
//             onFocus={() => setOpen(true)}
//             onBlur={() => setOpen(false)}
//             onTouchStart={() => setOpen(!open)} // Toggle on tap for mobile
//             aria-describedby={id.current}
//             onClick={handleEdit}
//         >
//             {children}

//             {open && (
//                 <div
//                     id={id.current}
//                     role="tooltip"
//                     className={`
//                         sticky z-50 w-[220px] sm:w-auto max-w-[270px] rounded-lg px-4 py-4 text-xs sm:text-sm shadow-lg
//                         bg-primary-navy-blue text-white ${placement === "top" ? "bottom-full mb-2" : "top-full mt-2"}
//                     `}
//                 >
//                     {content}

//                     {/* Arrow */}
//                     <span
//                         className={`
//                             absolute h-6 w-6 rotate-45 bg-primary-navy-blue -z-10
//                             ${placement === "top" ? "left-1/2 top-[100% + 20px] -translate-x-1/2" : "left-1/2 bottom-full -top-2 -translate-x-1/2"}
//                         `}
//                     />
//                 </div>
//             )}
//         </span>
//     );
// };


import React, { useRef, useState } from "react";
import {
    useFloating,
    offset,
    flip,
    shift,
    arrow,
    autoUpdate,
} from "@floating-ui/react";
import {
    useHover,
    useFocus,
    useClick,
    useDismiss,
    useInteractions,
    FloatingPortal,
    safePolygon,
} from "@floating-ui/react";

type Props = {
    content: React.ReactNode;
    placement?: "top" | "bottom";
    children: React.ReactNode;
    handleEdit?: () => void;
};

export const Tooltip: React.FC<Props> = ({
    content,
    placement = "top",
    children,
    handleEdit,
}) => {
    const arrowRef = useRef(null);
    const [open, setOpen] = useState(false);

    const { refs, floatingStyles, context, middlewareData, placement: finalPlacement } = useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [
            offset(10),
            flip(),
            shift(),
            arrow({ element: arrowRef }),
        ],
        placement,
        whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
        move: false,
        handleClose: safePolygon(), // 👈 keeps tooltip open when hovering it
    });
    const focus = useFocus(context);
    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        click,
    ]);

    const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
    }[finalPlacement.split("-")[0]]!;

    return (
        <>
            <span
                ref={refs.setReference}
                {...getReferenceProps({
                    onClick: handleEdit,
                    className: "inline-block cursor-pointer",
                })}
            >
                {children}
            </span>

            {open && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps({
                            className: `
                z-[9999] max-w-[280px] px-4 py-3 text-sm text-white
                bg-primary-navy-blue rounded-xl shadow-xl transition-opacity
              `,
                        })}
                    >
                        {content}
                        <div
                            ref={arrowRef}
                            className="absolute h-3 w-3 rotate-45 bg-primary-navy-blue"
                            style={{
                                left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : "",
                                top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : "",
                                [staticSide]: "-0.375rem",
                            }}
                        />
                    </div>
                </FloatingPortal>
            )}
        </>
    );
};
