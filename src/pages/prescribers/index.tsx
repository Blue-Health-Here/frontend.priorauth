import PrescriberCard from "@/components/PrescriberCard";
import React from "react";

const Prescribers: React.FC<any> = ({ isAdmin }) => {
    const prescribrs: any[] = [
        {
            id: '1',
            name: 'Abstergo Ltd.',
            image: "/images/Abstergo Ltd..png",
            type: 'pharmacy',
            phone: '(217) 555-0113',
            npi: "1063228229",
            address: "1033 US HWY STE 102",
            city: "Clifton"
        },
        {
            id: '2',
            name: 'Big Kahuna Ltd.',
            image: "/images/Big Kahuna Ltd..png",
            type: 'pharmacy',
            phone: '(217) 555-0113',
            npi: "1063228229",
            address: "1033 US HWY STE 102",
            city: "Clifton"
        },
        {
            id: '3',
            name: 'Barone LLC.',
            image: "/images/Barone LLC..png",
            type: 'pharmacy',
            phone: '(217) 555-0113',
            npi: "1063228229",
            address: "1033 US HWY STE 102",
            city: "Clifton"
        },
        {
            id: '4',
            name: 'Acme Co.',
            image: "/images/Acme Co..png",
            type: 'pharmacy',
            phone: '(217) 555-0113',
            npi: "1063228229",
            address: "1033 US HWY STE 102",
            city: "Clifton"
        }
    ];

    return (
        <div className="bg-white rounded-lg theme-shadow p-4 h-full">
            <h1 className="text-xl font-medium tracking-tighter">Prescribers List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 pt-6">
                {prescribrs.map((item: any) => (
                    <PrescriberCard prescriber={item} isAdmin={isAdmin} isDetails={true} />
                ))}
            </div>
        </div>
    )
};

export default Prescribers;