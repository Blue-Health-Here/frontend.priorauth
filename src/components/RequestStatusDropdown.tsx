import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { FaAngleDown } from "react-icons/fa6";
import { getStatusClass } from "@/utils/helper";

export default function RequestStatusDropdown({ selectedValue, data, handleChange, className = '' }: any) {
    const [selectedStatus, setselectedStatus] = useState(data.find((item: any) => item.name === selectedValue));
    const selectedStatusTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div className={`flex items-center justify-between gap-4 px-4 py-2 rounded-full ${getStatusClass(option.name)}`}>
                    <span className="text-sm font-medium truncate">{option.name}</span>
                    <FaAngleDown size={30} className="w-6 h-4" />
                </div>
            );
        }

        return <span className="text-sm text-gray-400">{props.placeholder}</span>;
    };

    const optionTemplate = (option: any) => {
        return (
            <div className={`px-3 py-1 rounded-full ${getStatusClass(option.name)}`}>
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
