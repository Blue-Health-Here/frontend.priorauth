import { useEffect, useRef, useState } from "react";
import { UploadedFile } from "../../utils/types";
import CustomCheckbox from "./form/CustomCheckbox";
import ThemeButton from "./ThemeButton";
import { Link } from "react-router-dom";

const predefinedTags = [
  "Denial Letter",
  "Fax Form",
  "Letter of Medical Necessity",
  "Appeal Form",
  "Approval Form",
];

interface UploadFileItemProps {
  file: UploadedFile;
  isAddTags?: boolean;
  removeFile: (id: string) => void;
  handleAddTag: (
    updateFn: (prevFiles: UploadedFile[]) => UploadedFile[]
  ) => void;
}

const UploadFileItem: React.FC<UploadFileItemProps> = ({
  file,
  removeFile,
  handleAddTag,
  isAddTags,
}) => {
  const [customTag, setCustomTag] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleAddTag((prev) =>
          prev.map((f) =>
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
  }, [file.showTagDropdown, handleAddTag, file.id]);

  const toggleDropdown = () => {
    handleAddTag((prev) =>
      prev.map((f) =>
        f.id === file.id ? { ...f, showTagDropdown: !f.showTagDropdown } : f
      )
    );
  };

  const toggleTag = (tag: string) => {
    handleAddTag((prev) =>
      prev.map((f) =>
        f.id === file.id
          ? {
            ...f,
            fileTags: f.fileTags?.includes(tag)
              ? f.fileTags.filter((t) => t !== tag)
              : [...(f.fileTags || []), tag],
          }
          : f
      )
    );
  };

  const addCustomTag = () => {
    const trimmed = customTag.trim();
    if (!trimmed || (file.fileTags && file.fileTags.includes(trimmed))) return;

    handleAddTag((prev) =>
      prev.map((f) =>
        f.id === file.id
          ? { ...f, fileTags: [...(f.fileTags || []), trimmed] }
          : f
      )
    );
    setCustomTag("");
  };

  return (
    <div className="border border-quaternary-navy-blue rounded-xl p-2.5 relative">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src="/uploading_state.svg"
            alt="uploading state"
            className="h-8 w-8"
          />
          <div className="flex flex-col min-w-0">
            {file.url ? (              
              <Link to={file.url} target="_blank">
                <p className="text-sm font-medium text-primary-black truncate">
                  {file.name}
                </p>
              </Link>
            ) : (
              <p className="text-sm font-medium text-primary-black truncate">
                {file.name}
              </p>
            )}
            {file.fileTags?.length > 0 && (
              <div className="flex gap-1 mt-1">
                <div className="px-2 py-1 rounded-lg text-xs font-medium bg-quaternary-navy-blue text-secondary-navy-blue truncate">
                  {file.fileTags[0]}
                </div>
                {file.fileTags.length > 1 && (
                  <div className="px-2 py-1 rounded-lg text-xs font-medium bg-quaternary-navy-blue text-secondary-navy-blue">
                    +{file.fileTags.length - 1}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end gap-2 flex-col-reverse">
          {isAddTags && (
            <button
              type="button"
              onClick={toggleDropdown}
              className="text-blue-navigation-link-button cursor-pointer text-sm underline whitespace-nowrap"
            >
              {file.showTagDropdown ? "Hide Tags" : "Add Tags"}
            </button>
          )}
          <button
            onClick={() => removeFile(file.id)}
            className={file.status === "uploading" ? "text-black cursor-pointer" : "text-red-500 hover:text-red-700 cursor-pointer"}
          >
            <img src="/images/delete.svg" alt="delete icon" className="" />
          </button>
        </div>
      </div>

      {file.status === "uploading" && (
        <div className="w-full mt-2">
          <div className="bg-gray-200 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full"
              style={{
                width: `${file.progress}%`,
                background:
                  "linear-gradient(297deg, #79A4FF 16.66%, #C6D9FF 83.34%)",
              }}
            />
          </div>
        </div>
      )}

      {file.showTagDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 bottom-9 mt-2 z-20 bg-primary-white border border-light-stroke theme-shadow rounded-lg p-4 w-72"
        >
          <input
            type="text"
            placeholder="Search Tags"
            className="w-full mb-3 border border-light-stroke rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dark-stroke"
          />

          <div className="space-y-2 max-h-40 overflow-auto mb-3">
            {predefinedTags.map((tag) => (
              <label
                htmlFor={tag}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <CustomCheckbox
                  id={tag}
                  checked={file.fileTags?.includes(tag) || false}
                  onChange={() => toggleTag(tag)}
                  className='!border'
                />
                <span className="text-xs md:text-sm text-secondary-black ml-2 font-medium font-secondary">
                  {tag}
                </span>
              </label>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Add custom tag"
              className="flex-1 border border-light-stroke rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dark-stroke"
            />
            <ThemeButton onClick={addCustomTag} variant="primary" className="rounded-lg" type="button">Add</ThemeButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFileItem;
