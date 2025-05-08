import React from "react";
import Button from "../../../components/common/Button";
import { pharmacyDetail } from "../../../utils/constants";

const PharmacyDetailsCard: React.FC<any> = () => {
    return (
        <div className="bg-primary-white p-5 rounded-t-2xl shadow-lg">
            <div className="border-b pb-4 border-light-stroke">
                <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mb-6">
                    <div className="flex items-center gap-x-2 mt-4 md:mt-0">
                        <img
                            src="/images/Abstergo Ltd..png"
                            alt="Abstergo logo"
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                        />
                        <h2 className='text-sm md:text-lg lg:text-xl font-semibold text-primary-black leading-[110%]'>
                            Abstergo Ltd.
                        </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <Button
                            title="Delete Pharmacy"
                            textColor="text-primary-sky-blue"
                            className="w-full sm:w-auto px-6 bg-primary-white border border-primary-sky-blue hover:bg-primary-sky-blue hover:text-primary-white"
                            noHover
                        />
                        <Button
                            title="Edit Details"
                            className="w-full sm:w-auto px-6"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 mt-4">
                    {pharmacyDetail.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-2">
                            <div className={`${item.bg} rounded-lg p-2 h-10 w-10 min-w-10 min-h-10  flex items-center justify-center`}>
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="w-4 h-4 md:w-5 md:h-5"
                                />
                            </div>
                            <div className="text-secondary-black">
                                <p className="text-xs">{item.label}</p>
                                <p className="text-sm md:text-base">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PharmacyDetailsCard;