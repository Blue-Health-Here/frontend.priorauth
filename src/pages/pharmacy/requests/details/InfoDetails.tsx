import CardHeader from "@/components/common/CardHeader";
import { transformRequestDetails } from "@/utils/helper";
import { Accordion, AccordionTab } from "primereact/accordion";
import React, { useEffect, useState } from "react";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import CommentsSection from "./CommentsSection";

const InfoDetails: React.FC<any> = ({ requestDetails, isAdmin }) => {
    const [details, setDetails] = useState<any>([]);

    useEffect(() => {
        if (requestDetails) {
            setDetails(transformRequestDetails(requestDetails));
        }
    }, [requestDetails]);
    
    const createRequestInfoTabs = () => {
        return details.length > 0 && details.map((tab: any) => {
            return (
                <AccordionTab key={tab.label} header={(
                    <CardHeader title={tab.label} className="rounded-lg" />
                )}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {tab.data.map((row: any, rowIndex: any) => (
                            <div
                                key={rowIndex}
                                className={` ${rowIndex < tab.data.length - 1 ? 'mb-2' : ''}`}
                            >
                                <div className="flex flex-col space-y-2">
                                    <span className="text-[10px] sm:text-xs font-medium text-secondary-black">{row.label}</span>
                                    <span className="text-[10px] sm:text-sm font-semibold text-primary-black">{row.value || '-'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </AccordionTab>
            );
        });
    };

    return (
        <div className="sm:col-span-1 lg:col-span-2 space-y-4">
            {requestDetails && <div className="p-4 rounded-xl border border-body-stroke lg:sticky lg:top-6">
                {/* Modified grid for mobile (2 columns) and desktop (3 columns) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-header">
                    {[
                        { label: "DOS", value: requestDetails.createdAt?.split("T")[0] || '-' },
                        { label: "CMM Key", value: requestDetails?.key },
                        // Add empty div to maintain layout if needed
                        <div key="empty" className="hidden sm:block"></div>
                    ].map((item: any, index: number) => {
                        if (typeof item === 'object') {
                            return (
                                <div key={index}>
                                    <p className="text-[12px] sm:text-xs font-semibold text-header-text uppercase tracking-wider">
                                        {item.label}
                                    </p>
                                    <p className="text-[12px] sm:text-sm font-medium text-header-text mt-1">{item.value}</p>
                                </div>
                            );
                        }
                        return item;
                    })}
                </div>
            </div>}
            <Accordion multiple activeIndex={[0]} 
                collapseIcon={<LiaAngleUpSolid className=" w-4 h-4 text-primary-black absolute right-3" />} 
                expandIcon={<LiaAngleDownSolid className="w-4 h-4 text-primary-black absolute right-3" />} 
                className='theme-accordion'>
                {createRequestInfoTabs()}
            </Accordion>
            
            <CommentsSection isAdmin={isAdmin} />
        </div>
    )
};

export default InfoDetails;