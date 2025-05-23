import React, { useState } from "react";
import MoreOptionsMenu from "./MoreOptionsMenu";
import { menuItems } from "../../utils/constants";

const TableHeader: React.FC<{ title: string; location?: string }> = ({ title, location }) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const toggleDropdown = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    return (
        <div className="flex justify-between items-center relative">
            <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-primary-black leading-[110%]">
                {location ? `${title} (${location})` : title}
            </h2>
            <div className="relative">
                <button
                    className="border border-medium-stroke rounded-lg p-3 text-tertiary-white cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                    </svg>
                </button>
                <MoreOptionsMenu
                    items={menuItems(title)}
                    isOpen={isOpenMenu}
                    onClose={() => setIsOpenMenu(false)}
                    headerText={location ? `${title} (${location})` : `${title} Options`}
                />
            </div>
        </div>
    )
};

export default TableHeader;