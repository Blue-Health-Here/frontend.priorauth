import { useEffect, useRef, useState } from "react";
import { UploadedFile } from "../../utils/types";

const predefinedTags = [
    "Denial Letter",
    "Fax Form",
    "Letter of Medical Necessity",
    "Appeal Form",
    "Approval Form"
];

interface UploadFileItemProps {
    file: UploadedFile;
    isAddTags?: boolean;
    removeFile: (id: string) => void;
    handleAddTag: (updateFn: (prevFiles: UploadedFile[]) => UploadedFile[]) => void;
}

const UploadFileItem: React.FC<UploadFileItemProps> = ({ file, removeFile, handleAddTag, isAddTags }) => {
    const [customTag, setCustomTag] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                handleAddTag(prev =>
                    prev.map(f =>
                        f.id === file.id ? { ...f, showTagDropdown: false } : f
                    )
                );
            }
        };

        if (file.showTagDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [file.showTagDropdown]);

    const toggleDropdown = () => {
        handleAddTag(prev =>
            prev.map(f => f.id === file.id ? { ...f, showTagDropdown: !f.showTagDropdown } : f)
        );
    };

    const toggleTag = (tag: string) => {
        handleAddTag(prev =>
            prev.map(f =>
                f.id === file.id
                    ? {
                        ...f,
                        fileTags: f.fileTags && f.fileTags.includes(tag)
                            ? f.fileTags.filter(t => t !== tag)
                            : [...f.fileTags, tag]
                    }
                    : f
            )
        );
    };

    const addCustomTag = () => {
        const trimmed = customTag.trim();
        if (!trimmed || file.fileTags && file.fileTags.includes(trimmed)) return;

        handleAddTag(prev =>
            prev.map(f =>
                f.id === file.id
                    ? { ...f, fileTags: [...f.fileTags, trimmed] }
                    : f
            )
        );
        predefinedTags.push(trimmed);
        setCustomTag("");
    };

    return (
        <div className="border border-quaternary-navy-blue rounded-xl p-2">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2">
                    <img src="/uploading_state.svg" alt="uploading state" />
                    <div className="inline-flex gap-1 flex-col">
                        <p className="text-xs font-medium text-primary-black truncate break-all max-w-[150px] line-clamp-1">{file.name}</p>
                        {file.fileTags?.length > 0 && <div className="flex gap-1">
                            <div className="px-4 py-1 rounded-lg line-clamp-1 text-xs sm:text-sm font-medium w-max bg-quaternary-navy-blue text-secondary-navy-blue">
                                {file.fileTags[0]} 
                            </div>
                            {file.fileTags.length > 1 && <div className="px-2 py-1 rounded-lg line-clamp-1 text-xs sm:text-sm font-medium w-max bg-quaternary-navy-blue text-secondary-navy-blue">
                                +{file.fileTags.length - 1}
                            </div>}
                        </div>}
                    </div>
                </div>
                <div className="inline-flex justify-between items-end flex-col gap-2">
                    <button className="text-[#1E1E1E]" onClick={() => removeFile(file.id)}>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={file.status === "uploading"
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"}
                            />
                        </svg>
                    </button>
                    {isAddTags && <button
                        type="button"
                        onClick={toggleDropdown}
                        className="text-blue-navigation-link-button cursor-pointer font-medium text-sm underline"
                    >
                        {file.showTagDropdown ? "Hide Tags" : "Add Tags"}
                    </button>}
                </div>
            </div>

            {file.status === "uploading" && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                        className="h-2.5 rounded-full"
                        style={{
                            width: `${file.progress}%`,
                            background: 'linear-gradient(297deg, #79A4FF 16.66%, #C6D9FF 83.34%)'
                        }}
                    />
                </div>
            )}

            {file.showTagDropdown && (
                <div ref={dropdownRef} className="absolute right-6 bottom-14 mt-2 z-20 bg-white border border-gray-200 shadow-xl rounded-lg p-4 w-72">
                    <input
                        type="text"
                        placeholder="Search Tags"
                        className="w-full mb-3 border border-gray-300 rounded px-3 py-2 text-sm"
                    />

                    <div className="space-y-2 max-h-40 overflow-auto mb-3">
                        {predefinedTags.map(tag => (
                            <label key={tag} className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={file.fileTags && file.fileTags.includes(tag)}
                                    onChange={() => toggleTag(tag)}
                                />
                                {tag}
                            </label>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={customTag}
                            onChange={(e) => setCustomTag(e.target.value)}
                            placeholder="Add custom tag"
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                        <button
                            onClick={addCustomTag}
                            className="bg-blue-600 text-white text-sm px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadFileItem;
