import CardHeader from "@/components/common/CardHeader";
import Loading from "@/components/common/Loading";
import { transformRequestDetails } from "@/utils/helper";
import { Accordion, AccordionTab } from "primereact/accordion";
import React, { useEffect, useState } from "react";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";

const InfoDetails: React.FC<any> = ({ isLoading, requestDetails }) => {
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
        <div className="sm:col-span-1 lg:col-span-3 space-y-4">
            {isLoading ? (
                <Loading />
            ) : (
                <Accordion multiple activeIndex={[0]} 
                    collapseIcon={<LiaAngleUpSolid className="w-4 h-4 text-primary-black absolute right-3" />} 
                    expandIcon={<LiaAngleDownSolid className="w-4 h-4 text-primary-black absolute right-3" />} 
                    className='theme-accordion'>
                    {createRequestInfoTabs()}
                </Accordion>
            )}
        </div>
    )
};

export default InfoDetails;