import { NavLink } from "react-router-dom";

const PharmacyToolTipDropdown = () => {
    return (
        <div className="absolute right-0 top-full border border-light-stroke w-40 md:w-48 bg-white rounded-lg shadow-lg z-50">
            {[{ name: "Edit", icon: '/edit-icon-gray.svg' }, { name: "Deactivate", icon: '/view-off-gray.svg' }].map((item, index) => {
                return (
                    <NavLink
                        to={`/admin/pharmacies/${index + 1}/update`}
                        key={index}
                        className={({ isActive }) =>
                            `group flex w-full items-center gap-x-2 p-3 mb-1 rounded-lg cursor-pointer transition font-secondary ${isActive
                                ? "text-primary-sky-blue"
                                : "hover:text-primary-sky-blue"
                            }`
                        }
                    >
                        <>
                            <img src={item.icon} alt="item icon" className="" />
                            <span className="text-xs md:text-sm">{item.name}</span>
                        </>
                    </NavLink>
                );
            })}
            <button
                className="group flex items-center w-full gap-x-2 p-3 border-t border-light-stroke rounded-md text-sm text-primary-black cursor-pointer transition hover:text-primary-sky-blue"
            >
                <img src="/delete-gray.svg" alt="delete icon" className="" />
                <span className="text-xs md:text-sm">Delete</span>
            </button>
        </div>
    );
};

export default PharmacyToolTipDropdown;
