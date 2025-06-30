import React, { useCallback, useEffect, useRef, useState } from "react";
import ThemeButton from "../../../components/common/ThemeButton";
import { useNavigate } from "react-router-dom";
import { FiFileText, FiX, FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import CardHeader from "@/components/common/CardHeader";
import FileDropzone from "@/components/common/FileDropzone";

interface ExtendedUploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  progress: number;
  status: "uploading" | "completed" | "error";
  file: File;
  url: string;
  tags: string[];
}

interface RequestDetail {
  label: string;
  data: {
    label: string;
    value: string;
  }[];
}

interface StatusItem {
  id: number;
  title: string;
  status: "waiting" | "approved" | "denied";
  date: string | null;
  note: string | null;
  isActive: boolean;
  statusClass: string;
}

const RequestDetails: React.FC = () => {
  const navigate = useNavigate();

  const requestDetails: RequestDetail[] = [
    {
      label: "Medication",
      data: [
        { label: "RxNorm", value: "636815-0" },
        { label: "NDC", value: "00642-7470-01" },
        { label: "Days", value: "28" },
        { label: "Qty", value: "28" },
        { label: "Medication Dosing", value: "-" },
        { label: "Drug Dosage Form", value: "Tablet" },
      ],
    },
    {
      label: "Patient Information",
      data: [
        { label: "Patient Name", value: "CHENG MICHELLE" },
        { label: "Member ID", value: "726897627" },
        { label: "DOB", value: "05-30-2000" },
        { label: "Patient Address", value: "50 LONGWOOD DR" },
        { label: "Patient City", value: "CLIFTON" },
        { label: "Patient ZipCode", value: "07013" },
      ],
    },
    {
      label: "Insurance Information",
      data: [
        { label: "Insurance", value: "AMERGROUP" },
        { label: "FORM", value: "-" },
        { label: "Insurance Phone", value: "833-207-3115" },
        { label: "Help Desk Number", value: "1-800-454-3730" },
        { label: "PCN", value: "WP" },
        { label: "BIN", value: "003107" },
        { label: "Group", value: "WMPA" },
        { label: "", value: "" },
        { label: "", value: "" },
      ],
    },
    {
      label: "Pharmacy Information",
      data: [
        { label: "Pharmacy", value: "Silvercare Pharmacy" },
        { label: "Fax Number", value: "(866)-407-2417" },
        { label: "", value: "VIERA RUBIA" },
        { label: "NPI", value: "1063228229" },
        { label: "Prescriber Address", value: "1033 US HWY STE 102" },
        { label: "Prescriber City", value: "CLIFTON" },
        { label: "PrescriberZipCode", value: "07013-2449" },
        { label: "Prescriber Phone", value: "963-779-7979" },
        { label: "Prescriber Fax", value: "973-779-7970" },
      ],
    },
  ];

  const statusItems: StatusItem[] = [
    {
      id: 1,
      title: "Awaiting Prescribers Tax ID",
      status: "waiting",
      date: null,
      note: null,
      isActive: false,
      statusClass: "bg-status-success-bg-color text-status-success-text-color",
    },
    {
      id: 2,
      title: "Approved With Progress Notes",
      status: "approved",
      date: "25-02-2025",
      note: "Fax form is ready. Submission to insurance is pending MD's signature.",
      isActive: true,
      statusClass: "bg-status-success-bg-color text-status-success-text-color",
    },
    {
      id: 3,
      title: "Awaiting MD's Signature on Fax Form",
      status: "waiting",
      date: "25-02-2025",
      note: null,
      isActive: false,
      statusClass: "bg-status-bg-lilac-sky text-status-text-lilac-sky",
    },
    {
      id: 4,
      title: "Denied",
      status: "denied",
      date: "25-02-2025",
      note: null,
      isActive: false,
      statusClass: "bg-status-bg-rose-blush text-status-text-rose-blush",
    },
  ];

  const availableTags: string[] = [
    "Denial Letter",
    "Prior Authorization",
    "Progress Notes",
    "Prescription",
    "Insurance Card",
    "Patient ID",
    "Lab Results",
    "Medical Records",
    "Physician Notes",
    "Treatment Plan",
  ];

  const [uploadedFiles, setUploadedFiles] = useState<ExtendedUploadedFile[]>(
    []
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTagDropdown, setActiveTagDropdown] = useState<string | null>(
    null
  );
  const [tagSearchQuery, setTagSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>(
    {}
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveTagDropdown(null);
        setTagSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!uploadedFiles.some((file) => file.status === "uploading")) return;

    const interval = setInterval(() => {
      setUploadedFiles((prevFiles) =>
        prevFiles.map((file) => {
          if (file.status === "uploading") {
            const newProgress = Math.min(
              file.progress + Math.random() * 20,
              100
            );
            return {
              ...file,
              progress: newProgress,
              status: newProgress >= 100 ? "completed" : "uploading",
            };
          }
          return file;
        })
      );
    }, 500);
    return () => clearInterval(interval);
  }, [uploadedFiles]);

  const loadPdfJs = useCallback(() => {
    return new Promise<any>((resolve, reject) => {
      if ((window as any).pdfjsLib) {
        resolve((window as any).pdfjsLib);
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve((window as any).pdfjsLib);
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js"));
      document.head.appendChild(script);
    });
  }, []);

  const convertPdfToImage = useCallback(
    async (file: File): Promise<ExtendedUploadedFile | null> => {
      try {
        const pdfjsLib: any = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = canvasRef.current;
        if (!canvas) return null;

        const context = canvas.getContext("2d");
        if (!context) return null;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        return {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          progress: 0,
          status: "uploading",
          file: file,
          url: canvas.toDataURL("image/png", 0.9),
          tags: [],
        };
      } catch (err) {
        console.error("Error converting PDF to image:", err);
        return null;
      }
    },
    [loadPdfJs]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const newFiles = await Promise.all(
      Array.from(e.target.files).map(async (file) => {
        if (file.type === "application/pdf") {
          return await convertPdfToImage(file);
        }
        return {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          progress: 0,
          status: "uploading" as const,
          file: file,
          url: URL.createObjectURL(file),
          tags: [],
        } as ExtendedUploadedFile;
      })
    );
    setUploadedFiles((prev) => [
      ...prev,
      ...(newFiles.filter(Boolean) as ExtendedUploadedFile[]),
    ]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (!e.dataTransfer?.files?.length) return;

    const newFiles = await Promise.all(
      Array.from(e.dataTransfer.files).map(async (file) => {
        if (file.type === "application/pdf") {
          return await convertPdfToImage(file);
        }
        return {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          progress: 0,
          status: "uploading" as const,
          file: file,
          url: URL.createObjectURL(file),
          tags: [],
        } as ExtendedUploadedFile;
      })
    );
    setUploadedFiles((prev) => [
      ...prev,
      ...(newFiles.filter(Boolean) as ExtendedUploadedFile[]),
    ]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    setSelectedTags((prev) => {
      const newTags = { ...prev };
      delete newTags[id];
      return newTags;
    });
  };

  const handleAddTagClick = (fileId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTagDropdown((prev) => (prev === fileId ? null : fileId));
    setTagSearchQuery("");
  };

  const handleTagSelection = (fileId: string, tag: string) => {
    setSelectedTags((prev) => {
      const currentTags = prev[fileId] || [];
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t: string) => t !== tag)
        : [...currentTags, tag];
      return { ...prev, [fileId]: newTags };
    });
  };

  const handleAddTags = (fileId: string) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file) => {
        if (file.id === fileId) {
          return { ...file, tags: selectedTags[fileId] || [] };
        }
        return file;
      })
    );
    setActiveTagDropdown(null);
    setTagSearchQuery("");
  };

//   const removeTag = (fileId: string, tag: string) => {
//     setUploadedFiles((prevFiles) =>
//       prevFiles.map((file) => {
//         if (file.id === fileId) {
//           return {
//             ...file,
//             tags: (file.tags || []).filter((t: string) => t !== tag),
//           };
//         }
//         return file;
//       })
//     );
//   };

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-xl theme-shadow relative">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <h2 className="text-lg font-bold text-gray-800 inline-flex gap-2 items-center">
          <img
            onClick={() => navigate("/pharmacy/requests")}
            src="/header-left-logo-arrow.svg"
            alt="header left logo arrow"
            className="w-8 h-8 bg-gray-100 p-2 rounded-lg cursor-pointer"
          />
          <span>UBRELVY 50MG TAB</span>
        </h2>
        <div className="flex gap-3 self-end sm:self-auto flex-wrap">
          <ThemeButton className="h-full min-h-12" variant="secondary">
            Open Portal
          </ThemeButton>
          <ThemeButton className="h-full min-h-12" variant="primary">
            Submit Progress Notes
          </ThemeButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="sm:col-span-2 lg:col-span-3 space-y-4">
          {requestDetails.map((item, index) => (
            <div
              key={index}
              className="border border-quaternary-navy-blue rounded-xl overflow-hidden"
            >
              <CardHeader title={item.label} />
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {item.data.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={rowIndex < item.data.length - 1 ? "mb-2" : ""}
                  >
                    <div className="flex flex-col space-y-2">
                      <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                        {row.label}
                      </span>
                      <span className="text-[10px] sm:text-sm font-semibold text-gray-800">
                        {row.value || "-"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl border border-quaternary-navy-blue lg:sticky lg:top-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[12px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  DOS
                </p>
                <p className="text-[12px] sm:text-sm font-medium text-gray-900 mt-1">
                  5/5/2025
                </p>
              </div>
              <div>
                <p className="text-[12px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  CMM Key
                </p>
                <p className="text-[12px] sm:text-sm font-medium text-gray-900 mt-1">
                  -
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[12px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  CMM Key 2
                </p>
                <p className="text-[12px] sm:text-sm font-medium text-gray-900 mt-1">
                  BM8DJD89
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-quaternary-navy-blue">
            <CardHeader title="Status" />
            <div className="p-4">
              <div className="relative flex flex-col gap-4">
                <div className="absolute left-2.5 top-0 bottom-0 w-1.5 bg-gray-200"></div>
                {statusItems.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center gap-4 ${
                      item.isActive
                        ? "border border-dashed border-blue-navigation-link-button rounded-xl opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <div className="p-1 bg-white rounded-full inline-flex justify-center items-center ml-1">
                      <div className="relative z-10 w-2.5 h-2.5 rounded-full flex-shrink-0 p-1">
                        <div className="absolute inset-0 rounded-full bg-blue-500"></div>
                      </div>
                    </div>

                    <div className="p-2 w-full">
                      <div className="flex justify-between items-center w-full">
                        <div
                          className={`px-4 py-1 rounded-full line-clamp-1 text-xs sm:text-sm lg:text-base font-normal ${item.statusClass}`}
                        >
                          {item.title}
                        </div>
                        {item.date && (
                          <span className="text-quaternary-white text-sm">
                            {item.date}
                          </span>
                        )}
                      </div>

                      {item.note && (
                        <p className="text-tertiary-black text-md mt-2 italic">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <ThemeButton
                  variant="tertiary"
                  className="flex-1 gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="flex gap-2 items-center">
                    Check Notes
                    <FiFileText />
                  </span>
                </ThemeButton>
                <ThemeButton className="flex-1 gap-2 px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <span className="flex gap-2 items-center">
                    Add Notes
                    <FaPlus />
                  </span>
                </ThemeButton>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-[#EBF1FF]">
            <CardHeader title="Files" />
            <div className="p-4 flex flex-col gap-4">
              <div className="inline-flex flex-col gap-1">
                <h3 className="text-base font-medium text-primary-black">
                  Progress Notes
                </h3>
                <div className="relative rounded-lg p-[2px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B] overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 py-4 px-3 bg-white rounded-lg"
                  >
                    <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]">
                      Upload Progress Notes
                    </p>
                    <img
                      src="/upload-new.svg"
                      alt="upload new img"
                      className=""
                    />
                  </button>
                </div>
              </div>
              <div className="inline-flex flex-col gap-1">
                <h3 className="text-base font-medium text-primary-black">
                  Upload Files
                </h3>
                <FileDropzone
                  isDragging={isDragging}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onFileChange={handleFileChange}
                  className="!p-3"
                  minHeight="100%"
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="inline-flex flex-col gap-1">
                  <h3 className="text-sm font-medium text-secondary-black">
                    {uploadedFiles.length} files uploading...
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="border border-[#EBF1FF] rounded-lg p-3 relative"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <img
                              src="/Vector (8).svg"
                              alt="file icon"
                              className="w-6 h-6"
                            />
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">
                              {file.name}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-800 hover:text-gray-600 p-1"
                          >
                            <img
                              src="/delete.svg"
                              alt="Delete"
                              className="w-3.5 h-3.5"
                            />
                          </button>
                        </div>

                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex items-center gap-1 min-h-6">
                            {file.tags.length > 0 ? (
                              <>
                                <span className="inline-flex items-center px-2 py-1 bg-[#EBF1FF] text-[#3961B2] text-xs rounded max-w-[80px] truncate">
                                  {file.tags[0]}
                                </span>
                                {file.tags.length > 1 && (
                                  <span className="text-xs bg-[#EBF1FF] text-[#3961B2] rounded">
                                    +{file.tags.length - 1}
                                  </span>
                                )}
                              </>
                            ) : null}
                          </div>
                          <div className="relative" ref={dropdownRef}>
                            <button
                              onClick={(e) => handleAddTagClick(file.id, e)}
                              className="text-xs text-blue-600 px-2 py-1 rounded"
                            >
                              Add Tags
                            </button>
                            {activeTagDropdown === file.id && (
                              <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-md shadow-lg z-10 border border-[#EBEBEB]">
                                <div className="p-2">
                                  <div className="relative mb-2">
  <FiSearch
    className="absolute left-2 top-2.5 text-[#525252]"
    size={14}
  />
  <input
    type="text"
    placeholder="Search Tags"
    className="w-full pl-8 pr-2 py-1.5 text-xs border-2 rounded-lg border-[#EBEBEB] focus:outline-none"
    value={tagSearchQuery}
    onChange={(e) => setTagSearchQuery(e.target.value)}
    autoFocus
  />
</div>
<div className="max-h-40 overflow-y-auto no-scrollbar">
  {filteredTags.length > 0 ? (
    filteredTags.map((tag) => (
      <label
        key={tag}
        className="flex items-center px-2 py-1.5 rounded cursor-pointer text-sm"
      >
        <input
          type="checkbox"
          checked={(selectedTags[file.id] || []).includes(tag)}
          onChange={() => handleTagSelection(file.id, tag)}
          className="mr-2 h-3 w-3 border-2 border-[#CCCCCC] rounded text-blue-600"
        />
        <span className="text-[#525252]">
          {tag}
        </span>
      </label>
    ))
  ) : (
    <div className="px-2 py-2 text-sm text-gray-500">
      No tags found
    </div>
  )}
</div>
                                </div>
                                <div className="flex justify-between items-center p-2 rounded-b-md">
                                  <button className="flex-[3] text-xs border-2 border-[#EBEBEB] text-[#1E1E1E] px-3 py-2 rounded-lg hover:bg-gray-50 mr-2 text-left">
                                    A11.9
                                  </button>
                                  <button
                                    className="flex-1 text-xs bg-[#163066] text-white px-1 py-2 rounded mr-2"
                                    onClick={() => handleAddTags(file.id)}
                                  >
                                    Add
                                  </button>
                                  <button
                                    className="text-gray-[#163066] hover:text-gray-700 p-2 bg-[#EBF1FF] rounded"
                                    onClick={() => {
                                      setActiveTagDropdown(null);
                                      setTagSearchQuery("");
                                    }}
                                  >
                                    <FiX size={16} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {file.status === "uploading" && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden"></canvas>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default RequestDetails;
