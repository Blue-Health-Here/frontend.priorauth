import { Tooltip } from "./Tooltip";

const NotesCell = ({ note, handleEditNote }: { note: string, handleEditNote?: any }) => {
    if (!note || note.trim() === "-" || note.trim() === "") return <span>-</span>;

    return (
        <Tooltip placement="top" handleEdit={handleEditNote} content={(
            <span className="line-clamp-6">{note}</span>
        )}>
            <div className="truncate max-w-[180px] cursor-pointer text-ellipsis whitespace-nowrap">
                {note}
            </div>
        </Tooltip>
    );
};

export default NotesCell;