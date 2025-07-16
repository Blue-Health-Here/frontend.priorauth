import React from 'react';
import { Link } from 'react-router-dom';
import ThemeButton from '@/components/common/ThemeButton';

interface SettingsCardProps {
    icon: string;
    title: string;
    description: string;
    path: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ icon, title, description, path }) => {
    return (
        <div className="bg-white rounded-lg p-4 border border-light-stroke h-full flex flex-col gap-4">
            <div className="bg-information-chip-bg-color rounded-lg w-20 h-20 flex items-center justify-center">
                <img
                    src={icon}
                    alt={`Icon`}
                    className='w-6 h-6'
                />
            </div>
            <div>
                <h2 className="text-base font-semibold text-primary-black whitespace-nowrap">
                    {title}
                </h2>
                <p className="text-xs text-quaternary-white flex-grow">
                    {description}
                </p>
            </div>
            <div className="mt-auto">
                <Link to={path} className='w-20'>
                    <ThemeButton className="px-6" variant="secondary">View More</ThemeButton>
                </Link>
            </div>
        </div>
    );
};

export default SettingsCard;