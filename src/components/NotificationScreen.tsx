import React from "react";
import { notification } from "../utils/constants";

const NotificationScreen: React.FC = () => {
    return (
        <div className="min-h-[calc(100vh-17rem)] bg-primary-white rounded-2xl shadow-lg pt-7 px-4 sm:px-6 pb-4">
            <h2 className="text-lg md:text-xl font-semibold md:block py-2">Notifications</h2>

            <div className="flex flex-row justify-between items-center cursor-pointer px-0 py-2">
                <p className="text-tertiary-black text-sm md:text-base font-secondary">Today</p>
                <h3 className="text-primary-navy-blue text-xs md:text-sm font-semibold">
                    Mark All As Read
                </h3>
            </div>
            {notification.map((item, index) => (
                <div key={index} className="border-b border-gray-200 py-4">
                    <div className="flex flex-col sm:flex-row justify-between cursor-pointer">
                        <div className="flex items-center gap-x-4">
                            <img
                                src={item.icon}
                                alt="Abstergo logo"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                            />
                            <h3 className="text-secondary-black text-sm md:text-base font-secondary">{item.message}</h3>
                        </div>
                        <div className="text-tertiary-black text-xs md:text-sm font-secondary flex items-end justify-end">
                            {item.time}
                        </div>

                    </div>
                </div>
            ))}
        </div>

    );
};

export default NotificationScreen;
