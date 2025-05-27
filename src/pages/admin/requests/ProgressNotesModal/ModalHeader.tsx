interface ModalHeaderProps {
    title: string;
    onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => (
    <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button onClick={onClose} type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
);

export default ModalHeader;
