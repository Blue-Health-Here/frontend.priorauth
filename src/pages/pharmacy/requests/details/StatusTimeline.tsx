import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiEdit, FiFileText } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import ThemeButton from "@/components/common/ThemeButton";
import { Input } from "@/components/ui/input";
// import { formatDateTime, getStatusClass } from "@/utils/helper";
import { updateRequestNotes } from "@/services/pharmacyService";
import { RootState } from "@/store";
import { setStatusItems } from "@/store/features/pharmacy/requests/requestsSlice";

interface StatusTimelineProps {
  isAdmin?: boolean;
  onCheckNotes?: () => void;
  height?: string;
  showCheckNotesBtn?: boolean;
  className?: string;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({
  isAdmin, onCheckNotes, height = 'max-h-[260px]', showCheckNotesBtn, className
}) => {
  // const [statusItems, setStatusItems] = useState<any[]>([]);
  const { reqStatuses: statusItems } = useSelector((state: RootState) => state.pharmacyReqs);
  const dispatch = useDispatch();
  const { id: reqId } = useParams();
  // const isFetchedReqStatuses = useRef(false);

  // useEffect(() => {
  //   if (!isFetchedReqStatuses.current) {
  //     fetchData();
  //     isFetchedReqStatuses.current = true;
  //   }
  // }, [dispatch, reqId]);

  // const fetchData = async () => {
  //   const response = await getRequestStatuses(dispatch, reqId);
  //   if (response?.currentStatus) {
  //     const current = response.currentStatus;
  //     const previous = [...response.previousStatuses].sort(
  //       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  //     );

  //     const allStatuses = [
  //       {
  //         ...current,
  //         date: formatDateTime(current.date),
  //         isActive: true,
  //         note: current.notes,
  //         statusClass: getStatusClass(current.name),
  //         showNotesButton: !(current.notes && current.notes.trim() !== ""),
  //         isEditing: false
  //       },
  //       ...previous.map((s: any) => ({
  //         ...s,
  //         date: formatDateTime(s.date),
  //         isActive: false,
  //         note: s.notes,
  //         statusClass: getStatusClass(s.name),
  //         showNotesButton: !(s.notes && s.notes.trim() !== ""),
  //         isEditing: false
  //       }))
  //     ];

  //     setStatusItems(allStatuses);
  //   } else {
  //     setStatusItems([]);
  //   }
  // };

  const handleAddNotes = (index: number) => {
    const updated = [...statusItems];
    updated[index].isEditing = true;
    updated[index].showNotesButton = false;
    dispatch(setStatusItems(updated));
  };

  const handleChange = (value: string, index: number) => {
    const updated = [...statusItems];
    updated[index].note = value;
    dispatch(setStatusItems(updated));
  };

  const handleSubmitNote = async (item: any, index: number) => {
    if (!item.note?.trim()) return;
    try {
      await updateRequestNotes(dispatch, reqId, { notes: item.note, id: item.id });
      const updated = [...statusItems];
      updated[index].isEditing = false;
      updated[index].showNotesButton = false;
      dispatch(setStatusItems(updated));
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, item: any, index: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSubmitNote(item, index);
    }
  };

  const handleBlur = async (item: any, index: any) => {
    await handleSubmitNote(item, index);
  };

  const renderNoteSection = (item: any, index: number) => {
    if (!isAdmin && !item.note) {
      return <p>-</p>;
    }

    if (item.isEditing) {
      return (
        <Input
          type="text"
          placeholder="Add Notes"
          value={item.note || ""}
          onKeyDown={(e) => handleKeyDown(e, item, index)}
          onBlur={() => handleBlur(item, index)}
          onChange={(e) => handleChange(e.target.value, index)}
          /* MOBILE-ONLY: Smaller text below 640px */
          className="max-[639px]:text-sm"
        />
      );
    }

    if (item.note && !item.isEditing) {
      return (
        <div className="inline-flex justify-between gap-4 items-center">
          <p className="text-tertiary-black text-md italic line-clamp-2 max-w-screen-sm
                       /* MOBILE-ONLY: Smaller text below 640px */
                       max-[639px]:text-sm">
            {item.note}
          </p>
          {isAdmin && <FiEdit className="cursor-pointer" onClick={() => handleAddNotes(index)} />}
        </div>
      );
    }

    if (item.showNotesButton) {
      return (
        <ThemeButton
          onClick={() => handleAddNotes(index)}
          variant="secondary"
          className="!py-2 !px-3 !text-xs
                   /* MOBILE-ONLY: Full width below 640px */
                   max-[639px]:w-full"
        >
          Add Notes <FaPlus />
        </ThemeButton>
      );
    }

    return null;
  };

  return (
    <div className={`p-4 flex items-center justify-center flex-col gap-4 ${className}`}>
      {statusItems.length > 0 ? (
        <>
          <div className={`${height} overflow-auto w-full`}>
            <div className="relative flex flex-col gap-4 w-full">
              <div className="absolute left-2.5 top-0 bottom-0 w-1.5 bg-gray-200"></div>

              {statusItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-4 ${item.isActive
                    ? "border border-dashed border-blue-navigation-link-button rounded-xl opacity-100"
                    : "opacity-50"
                    }`}
                >
                  <div className="p-1 bg-primary-white rounded-full ml-1">
                    <div className="relative z-10 w-2.5 h-2.5 rounded-full">
                      <div className="absolute inset-0 rounded-full bg-blue-500"></div>
                    </div>
                  </div>

                  <div className="p-2 w-full flex flex-col gap-2 items-start">
                    <div className="flex justify-between items-center gap-4 w-full
                                  /* MOBILE-ONLY: Stacked layout below 640px */
                                  max-[639px]:flex-col max-[639px]:items-start max-[639px]:gap-1">
                      <span
                        className={`px-4 py-1 rounded-full line-clamp-1 text-xs sm:text-sm lg:text-base font-medium ${item.statusClass}
                                  /* MOBILE-ONLY: Smaller padding below 640px */
                                  max-[639px]:px-3`}
                      >
                        {item.name}
                      </span>
                      {item.date && (
                        <span className="text-quaternary-white text-sm whitespace-nowrap
                                        /* MOBILE-ONLY: Smaller text below 640px */
                                        max-[639px]:text-xs">
                          {item.date}
                        </span>
                      )}
                    </div>

                    {renderNoteSection(item, index)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showCheckNotesBtn && <ThemeButton
            variant="tertiary"
            className="border border-quaternary-navy-blue rounded-lg text-primary-navy-blue hover:bg-gray-50 transition-colors
                      /* MOBILE-ONLY: Full width below 640px */
                      max-[639px]:w-full"
            onClick={onCheckNotes}
          >
            <span className="flex gap-2 items-center">
              Check Notes <FiFileText />
            </span>
          </ThemeButton>}
        </>
      ) : (
        <p className="text-sm text-primary-black">Statuses Not Found.</p>
      )}
    </div>
  );
};

export default StatusTimeline;