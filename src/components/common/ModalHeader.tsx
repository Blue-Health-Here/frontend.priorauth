interface ModalHeaderProps {
    title: string;
    subtitle?: string;
    onClose?: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subtitle, onClose }) => (
    <div className="flex justify-between items-center gap-4 border-b border-light-stroke px-6 py-4">
        <div>
            <h3 className="text-lg font-semibold text-primary-black">{title}</h3>
            {subtitle && <p className="text-md text-tertiary-black">{subtitle}</p>}
        </div>
        {onClose && <button onClick={onClose} type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>}
    </div>
);

export default ModalHeader;
