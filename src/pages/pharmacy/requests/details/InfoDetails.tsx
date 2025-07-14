import CardHeader from "@/components/common/CardHeader";
import { transformRequestDetails } from "@/utils/helper";
import { Accordion, AccordionTab } from "primereact/accordion";
import React, { useEffect, useState } from "react";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import CommentsSection from "./CommentsSection";

const InfoDetails: React.FC<any> = ({ requestDetails }) => {
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
                                    <span className="text-[10px] sm:text-xs font-medium text-gray-500">{row.label}</span>
                                    <span className="text-[10px] sm:text-sm font-semibold text-gray-800">{row.value || '-'}</span>
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
            {requestDetails && <div className="p-4 rounded-xl border border-quaternary-navy-blue lg:sticky lg:top-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: "DOS", value: requestDetails.createdAt?.split("T")[0] || '-' },
                        { label: "CMM Key", value: requestDetails?.key },
                        { label: "CMM Key 2", value: requestDetails?.key },
                    ].map((item: any, index: number) => {
                        return (
                            <div key={index}>
                                <p className="text-[12px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {item.label}
                                </p>
                                <p className="text-[12px] sm:text-sm font-medium text-gray-900 mt-1">{item.value}</p>
                            </div>
                        )
                    })}
                </div>
            </div>}
            <Accordion multiple activeIndex={[0]} 
                collapseIcon={<LiaAngleUpSolid className="w-4 h-4 text-primary-black absolute right-3" />} 
                expandIcon={<LiaAngleDownSolid className="w-4 h-4 text-primary-black absolute right-3" />} 
                className='theme-accordion'>
                {createRequestInfoTabs()}
            </Accordion>
            
            <CommentsSection />
        </div>
    )
};

export default InfoDetails;