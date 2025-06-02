import React from "react";
import { notification } from "../../../utils/constants";
import { getCurrentBadgeColors, getStatusTextColor } from "../../../utils/helper";

const NotificationScreen: React.FC = () => {
    return (
        <div className="bg-primary-white rounded-2xl shadow-lg p-6">
            <div className="flex gap-4 items-center justify-between flex-wrap mb-4">
                <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold">All Notificatons</h2>
                <button type="button" className="text-blue-navigation-link-button cursor-pointer font-medium bg-transparent p-0 border-0">
                    Mark all as read
                </button>
            </div>
            {notification.map((item, index) => (
                <div className={`flex flex-col gap-x-4 sm:flex-row ${item.unRead ? "bg-quaternary-navy-blue border-quaternary-navy-blue-dark" : 
                    "border-light-stroke"} cursor-pointer p-4 ${index !== notification.length - 1 ? "border-b" : ""}`} key={index}>
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
            ))}
        </div>
    );
};

export default NotificationScreen;
