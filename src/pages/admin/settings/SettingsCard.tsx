import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';

interface SettingsCardProps {
    icon: string;
    title: string;
    description: string;
    path: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ icon, title, description, path }) => {
    return (
        <div className="bg-white rounded-2xl p-6 border border-light-stroke h-full flex flex-col">
            <div className="bg-information-chip-bg-color rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <img
                    src={icon}
                    alt={`Icon`}
                    className='w-6 h-6'
                />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-primary-black whitespace-nowrap mb-4">
                {title}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-quaternary-white mb-8 flex-grow">
                {description}
            </p>
            <div className="mt-auto">
                <Link to={path} className='w-20'>
                    <Button
                        title="View More"
                        textColor="text-primary-navy-blue"
                        noBackground
                        className="bg-quaternary-navy-blue sm:w-36"
                        noHover
                    />
                </Link>
            </div>
        </div>
    );
};

export default SettingsCard;