import { Tooltip } from "./Tooltip";

const NotesCell = ({ note }: { note: string }) => {
    if (!note || note.trim() === "-" || note.trim() === "") return <span>-</span>;

    return (
        <Tooltip placement="top" content={(
            <span className="line-clamp-6">{note}</span>
        )}>
            <div className="truncate max-w-[180px] cursor-pointer text-ellipsis whitespace-nowrap">
                {note}
            </div>
        </Tooltip>
    );
};

export default NotesCell;