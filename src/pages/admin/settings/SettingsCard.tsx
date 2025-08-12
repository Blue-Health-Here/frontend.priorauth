import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeButton from '@/components/common/ThemeButton';

interface SettingsCardProps {
    icon: string;
    title: string;
    description: string;
    path: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ icon, title, description, path }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-primary-white rounded-lg p-4 border border-light-stroke h-full flex flex-col gap-4">
            <div className="bg-settings-info-icons-bg rounded-lg w-20 h-20 flex items-center justify-center">
                <img
                    src={icon}
                    alt={`Icon`}
                    className='settings-button w-6 h-6'
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
            <div>
                <ThemeButton onClick={() => navigate(path)} className="px-6 !h-11" variant="secondary">View More</ThemeButton>
            </div>
        </div>
    );
};

export default SettingsCard;