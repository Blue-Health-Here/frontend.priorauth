import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function RequestStatusDropdown({ selectedValue, data, handleChange, className = '' }: any) {
    const [selectedStatus, setselectedStatus] = useState(data.find((item: any) => item.code === selectedValue));
    const selectedStatusTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <span className="text-sm leading-inherit">{option.name}</span>
            );
        }

        return <span className="text-sm leading-inherit">{props.placeholder}</span>;
    };

    const optionTemplate = (option: any) => {
        return (
            <div>{option.name}</div>
        );
    };

    const handleStatusChange = (e: any) => {
        setselectedStatus(e.value);
        handleChange(e.value);
    }

    return (
        <Dropdown value={selectedStatus} onChange={handleStatusChange} options={data} optionLabel="name" placeholder="Select a status"
            filter valueTemplate={selectedStatusTemplate} filterPlaceholder="Search..." itemTemplate={optionTemplate} className={`${className} !text-sm`} />
    )
}
