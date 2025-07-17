import { NavLink } from "react-router-dom";

const PharmacyToolTipDropdown = () => {
    return (
        <div className="absolute right-0 top-full border border-light-stroke w-40 md:w-44 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
            {/* Modify Option */}
            <NavLink
                to="/admin/pharmacies/modify"
                className={({ isActive }) =>
                    `group flex w-full items-center gap-x-1.5 px-3 py-2 cursor-pointer transition font-secondary ${
                        isActive
                            ? "text-secondary-black"
                            : "text-secondary-black hover:bg-gray-50"
                    }`
                }
            >
                <img src="/modify.svg" alt="modify icon" className="w-4 h-4" />
                <span className="text-xs md:text-sm">Modify</span>
            </NavLink>

            {/* Archive Option */}
            <button
                className="group flex items-center w-full gap-x-1.5 px-3 py-2 text-sm cursor-pointer transition text-[#FF2E37] hover:bg-gray-50"
            >
                <img src="/archive.svg" alt="archive icon" className="w-4 h-4" />
                <span className="text-xs md:text-sm">Archive</span>
            </button>
        </div>
    );
};

export default PharmacyToolTipDropdown;