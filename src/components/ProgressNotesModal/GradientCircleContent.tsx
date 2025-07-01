// components/GradientCircleContent.tsx
import React from "react";

const GradientCircleContent: React.FC = () => {
    return (
        <div className="">
            <div
                className="relative flex items-center justify-center rounded-full p-1"
                style={{
                    background: "linear-gradient(to right, #F66568, #A16CF9)",
                    width: "400px",
                    height: "400px",
                }}
            >
                <div
                    className="bg-white rounded-full w-full h-full flex items-center justify-center p-8 relative"
                    style={{
                        boxShadow: `
                        inset 0 4px 12px rgba(166, 108, 249, 0.5),
                        inset 0 -2px 6px rgba(246, 101, 104, 0.3)
                        `,
                    }}
                >
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: `radial-gradient(
                                circle at 50% 80%,
                                transparent 65%,
                                rgba(166, 108, 249, 0.15) 70%,
                                rgba(166, 108, 249, 0.3) 75%,
                                rgba(166, 108, 249, 0.1) 85%,
                                transparent 90%
                            )`,
                            filter: "blur(1px)",
                        }}
                    ></div>

                    <div
                        className="absolute inset-0 rounded-full opacity-70"
                        style={{
                            background: `radial-gradient(
                                circle at 50% 20%,
                                transparent 85%,
                                rgba(246, 101, 104, 0.1) 90%,
                                transparent 95%
                            )`,
                            mixBlendMode: "overlay",
                        }}
                    ></div>

                    <h2 className="text-3xl font-bold text-center relative z-10">
                        <span className="bg-gradient-to-r from-[#F66568] to-[#A163F9] bg-clip-text text-transparent">
                            Upload Progress
                        </span>
                        <br />
                        <span className="bg-gradient-to-r to-[#A163F9] from-[#F66568] bg-clip-text text-transparent">
                            Notes for AI Analysis
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default GradientCircleContent;
