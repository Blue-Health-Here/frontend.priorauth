import { NavLink } from "react-router-dom";
import { profileMenu } from "../../utils/constants";
import { TbLogout2 } from "react-icons/tb";
interface NavbarProfileDropdownProps {
  onClose: () => void;
}

const NavbarProfileDropdown: React.FC<NavbarProfileDropdownProps> = ({
  onClose,
}) => {
  return (
    <div className="absolute right-0 top-full p-3 w-52 md:w-60 bg-white rounded-lg shadow-lg z-50">
      {profileMenu.map((item, index) => {
        const Icon = item.icon;
        return (
          <NavLink
            to={item.path}
            key={index}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center gap-x-2 p-2 h-9 md:h-11 mb-1 rounded-lg cursor-pointer transition font-secondary ${
                isActive
                  ? "text-primary-sky-blue"
                  : "hover:text-primary-sky-blue"
              }`
            }
          >
            <>
              <Icon className="w-5 h-5 transition duration-200" />
              <span className="text-xs md:text-sm">{item.name}</span>
            </>
          </NavLink>
        );
      })}
      <hr className="mb-1 " />
      <button
        onClick={onClose}
        className="group flex items-center gap-x-2 p-2 rounded-md text-sm text-primary-black cursor-pointer transition hover:text-primary-sky-blue"
      >
        <TbLogout2 className="w-5 h-5 transition duration-200" />
        <span className="text-xs md:text-sm">Logout</span>
      </button>
    </div>
  );
};

export default NavbarProfileDropdown;
