import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { FaAngleDown } from "react-icons/fa6";

export default function RequestStatusDropdown({ selectedValue, data, handleChange, className = '' }: any) {
    const [selectedStatus, setselectedStatus] = useState(data.find((item: any) => item.code === selectedValue));
    const getStatusStyle = (statusName: string) => {
        const normalized = statusName?.toUpperCase();

        if (normalized?.includes("APPROVED")) {
            return {
                bg: "bg-green-100",
                text: "text-green-800",
            };
        }
        if (normalized?.includes("REQUIRED") || normalized?.includes("PENDING")) {
            return {
                bg: "bg-blue-100",
                text: "text-blue-800",
            };
        }
        if (normalized?.includes("APPEAL") || normalized?.includes("QUEUE")) {
            return {
                bg: "bg-orange-100",
                text: "text-orange-800",
            };
        }

        return {
            bg: "bg-gray-100",
            text: "text-gray-800",
        };
    };

    const selectedStatusTemplate = (option: any, props: any) => {
        if (option) {
            const { bg, text } = getStatusStyle(option.name);
            return (
                <div className={`flex items-center justify-between gap-4 px-4 py-2 rounded-full ${bg} ${text}`}>
                    <span className="text-sm font-medium truncate">{option.name}</span>
                    <FaAngleDown size={30} className="w-6 h-4" />
                </div>
            );
        }

        return <span className="text-sm text-gray-400">{props.placeholder}</span>;
    };

    const optionTemplate = (option: any) => {
        const { bg, text } = getStatusStyle(option.name);

        return (
            <div className={`px-3 py-1 rounded-full ${bg} ${text}`}>
                <span className="text-sm font-medium truncate">{option.name}</span>
            </div>
        );
    };


    const handleStatusChange = (e: any) => {
        setselectedStatus(e.value);
        handleChange(e.value);
    }

    return (
        <Dropdown
            value={selectedStatus}
            onChange={handleStatusChange}
            options={data}
            optionLabel="name"
            placeholder="Select a status"
            filter
            filterPlaceholder="Search..."
            valueTemplate={selectedStatusTemplate}
            itemTemplate={optionTemplate}
            className={`w-full border-0 shadow-none bg-transparent !p-0 ${className}`}
            dropdownIcon="pi pi-chevron-down text-sm ml-2"
            panelClassName="!rounded-md !shadow-lg"
            pt={{
                root: {
                    className: "!border-0 !p-0 !rounded-full !bg-transparent",
                },
                input: {
                    className: "px-0 py-0 text-sm",
                },
                trigger: {
                    className: "!rounded-full !bg-transparent text-gray-500",
                },
            }}
        />
    )
}
