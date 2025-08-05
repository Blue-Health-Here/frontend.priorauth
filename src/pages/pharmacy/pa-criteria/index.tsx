import SphereAnimation from "@/components/SphereAnimation";
import PACriteriaForm from "./PACriteriaForm";
import { FormikValues } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatPACriteria } from "@/utils/helper";

const PharmacyPACriteria = () => {
    const [isLoading, setIsLoading] = useState(false);
    const paCriteria: any = null;
    
    const handleSubmit = async (values: FormikValues) => {
        console.log(values, "values");
        try {
            setIsLoading(true);
            setTimeout(() => {
                // setIsLoading(false);
            }, 10000);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="bg-primary-white theme-shadow border border-quaternary-navy-blue p-4 rounded-lg flex flex-col gap-4 sm:col-span-1 xl:col-span-2 max-h-[300px] sm:max-h-content">
                <h1 className="text-xl font-medium tracking-tighter">
                    Get PA Criteria
                </h1>
                <PACriteriaForm handleSubmit={handleSubmit} />
            </div>
            {isLoading ? (
                <div style={{ minHeight: 'calc(100vh - 120px)' }}
                    className="sm:col-span-2 xl:col-span-3 bg-primary-white theme-shadow rounded-lg border border-quaternary-navy-blue flex items-center justify-center">
                    <SphereAnimation />
                </div>
            ) : paCriteria && (
                <div style={{ minHeight: 'calc(100vh - 120px)' }}
                    className="sm:col-span-2 xl:col-span-3 bg-primary-white theme-shadow rounded-lg border border-quaternary-navy-blue flex items-center justify-center">
                    <div className="p-4 md:p-6 rounded-lg bg-quaternary-navy-blue text-left">
                        {Array.isArray(paCriteria) && paCriteria[0]?.fields?.["PA Criteria"] ? (
                            <pre
                                className="text-sm md:text-base whitespace-pre-wrap"
                                style={{
                                    fontFamily: "Arial, sans-serif",
                                    lineHeight: "1.6",
                                }}
                            >
                                {formatPACriteria(paCriteria[0].fields["PA Criteria"]).map((section: any, index: number) => (
                                    <div key={index}>
                                        <h3 className="py-2 text-lg"><strong>{section.title}</strong></h3>
                                        <ul>
                                            {section.items.map((item: any, idx: number) => (
                                                <li className="py-1" key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </pre>
                        ) : (
                            <p className="text-gray-600">PA Criteria not found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
};

export default PharmacyPACriteria;
