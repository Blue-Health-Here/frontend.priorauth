// NavbarProfileDropdown.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { adminSidebarItems } from "../../utils/constants";

interface NavbarProfileDropdownProps {
    onClose: () => void; // <-- added
    role?: string;
}

const NavbarProfileDropdown: React.FC<NavbarProfileDropdownProps> = ({ onClose }) => {
    return (
        <div className="absolute md:right-0 -right-16 top-full p-4 w-52 md:w-64 bg-white rounded-lg shadow-lg z-50">
            {adminSidebarItems.map((item, index) => (
                <NavLink
                    to={item.path}
                    key={index}
                    onClick={onClose} // <-- close dropdown on route click
                    className={({ isActive }) =>
                        `group flex items-center gap-x-3 p-3 h-9 md:h-11 mb-1 rounded-lg cursor-pointer transition font-secondary ${isActive
                            ? 'bg-primary-sky-blue text-primary-white'
                            : 'hover:bg-primary-sky-blue hover:text-primary-white'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <img
                                src={item.icon}
                                alt={`${item.name} Icon`}
                                className={`transition duration-200 ${isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'}`}
                            />
                            <span className="text-xs sm:text-sm xl:text-[16px]">
                                {item.name}
                            </span>
                        </>
                    )}
                </NavLink>
            ))}
            <hr className='mb-1' />
            <button
                onClick={onClose} // optional: also close on logout click
                className='flex items-center gap-x-2 p-2 rounded-md text-sm text-primary-black cursor-pointer transition'
            >
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
                    <path d="..." fill="#525252" />
                </svg>
                <span className="text-xs sm:text-sm md:text-[16px]">Logout</span>
            </button>
        </div>
    );
};

export default NavbarProfileDropdown;
