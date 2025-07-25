import { Link } from "react-router-dom";
import { notification } from "../../utils/constants";
import { getCurrentBadgeColors, getStatusTextColor } from "../../utils/helper";

const NavbarNotificationDropdown: React.FC = () => {
    return (
        <div className="absolute right-0 top-full w-[20rem] md:w-[24rem] xl:w-[27rem] bg-primary-white rounded-2xl border border-gray-200 shadow-lg z-50">
            <div className="py-4 px-6 flex gap-4 items-center justify-between flex-wrap border-b border-gray-200">
                <h2 className="text-lg font-semibold">Notificatons</h2>
                <button type="button" className="text-blue-navigation-link-button cursor-pointer font-medium bg-transparent p-0 border-0">
                    Mark all as read
                </button>
            </div>
            <div className="flex flex-col overflow-y-auto max-h-[400px]">
                {notification.map((item, index) => 
                    <div className={`flex flex-col gap-x-4 sm:flex-row justify-between ${item.unRead ? "bg-quaternary-navy-blue border-quaternary-navy-blue-dark" : "border-light-stroke"} cursor-pointer p-4 ${index !== notification.length - 1 ? "border-b" : ""}`} key={index}>
                        <img
                            src={item.icon}
                            alt="Abstergo logo"
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                        />
                        <div className="text-tertiary-black text-xs md:text-sm font-secondary flex flex-col gap-4">
                            <h3 className="text-secondary-black font-medium text-sm md:text-base font-secondary">{item.message}</h3>
                            <div className="flex gap-4 items-center">
                                <span className={`${item.status === "Approved" ? getCurrentBadgeColors('success') : 
                                    item.status === "Denied" ? getCurrentBadgeColors('error') + getStatusTextColor('rejected') : 
                                    getCurrentBadgeColors('warning')} py-1.5 px-3 rounded-lg font-semibold`}>{item.status}</span>
                                <span>{item.time}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="py-4 px-6 border-t border-gray-200 text-center">
                <Link to="/admin/notifications" className="text-blue-navigation-link-button font-medium bg-transparent p-0 border-0">
                    View All Notifications
                </Link>
            </div>
        </div>
    );
};

export default NavbarNotificationDropdown;
