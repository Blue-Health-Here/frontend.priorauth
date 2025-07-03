import CardHeader from "@/components/common/CardHeader";
import { data } from "react-router-dom";

const InfoDetails = () => {
    const requestDetails = [
        {
            label: "Medication",
            data: [
                { label: "RxNorm", value: "636815-0" },
                { label: "NDC", value: "00642-7470-01" },
                { label: "Days", value: "28" },
                { label: "Qty", value: "28" },
                { label: "Medication Dosing", value: "-" },
                { label: "Drug Dosage Form", value: "Tablet" }
            ]
        },
        {
            label: "Patient Information",
            data: [
                { label: "Patient Name", value: "CHENG MICHELLE" },
                { label: "Member ID", value: "726897627" },
                { label: "DOB", value: "05-30-2000" },
                { label: "Patient Address", value: "50 LONGWOOD DR" },
                { label: "Patient City", value: "CLIFTON" },
                { label: "Patient ZipCode", value: "07013" }
            ]
        },
        {
            label: "Insurance Information",
            data: [
                { label: "Insurance", value: "AMERGROUP" },
                { label: "FORM", value: "-" },
                { label: "Insurance Phone", value: "833-207-3115" },
                { label: "Help Desk Number", value: "1-800-454-3730" },
                { label: "PCN", value: "WP" },
                { label: "BIN", value: "003107" },
                { label: "Group", value: "WMPA" },
                { label: "", value: "" },
                { label: "", value: "" }
            ]
        },
        {
            label: "Medication",
            data: [
                { label: "Pharmacy", value: "Silvercare Pharmacy" },
                { label: "Fax Number", value: "(866)-407-2417" },
                { label: "", value: "VIERA RUBIA" },
                { label: "NPI", value: "1063228229" },
                { label: "Prescriber Address", value: "1033 US HWY STE 102" },
                { label: "Prescriber City", value: "CLIFTON" },
                { label: "PrescriberZipCode", value: "07013-2449" },
                { label: "Prescriber Phone", value: "963-779-7979" },
                { label: "Prescriber Fax", value: "973-779-7970" }
            ]
        }
    ];

    return (
        <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            {requestDetails.map((item: any, index: number) => (
                <div key={index} className={`border border-quaternary-navy-blue rounded-xl overflow-hidden`}>
                    <CardHeader title={item.label} />
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {item.data.map((row: any, rowIndex: any) => (
                            <div
                                key={rowIndex}
                                className={` ${rowIndex < data.length - 1 ? 'mb-2' : ''}`}
                            >
                                <div className="flex flex-col space-y-2">
                                    <span className="text-[10px] sm:text-xs font-medium text-gray-500">{row.label}</span>
                                    <span className="text-[10px] sm:text-sm font-semibold text-gray-800">{row.value || '-'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default InfoDetails;