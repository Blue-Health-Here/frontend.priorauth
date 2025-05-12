import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalEntries: number;
    entriesPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalEntries,
    entriesPerPage,
    onPageChange
}) => {
    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    return (
        <div className="flex items-center gap-x-6 text-xs md:text-sm lg:text-base font-secondary text-secondary-black pt-3">
            <p className="">
                Showing {currentPage} of {totalPages} entries
            </p>
            <div className="flex items-center space-x-2">
                <img
                    src="/images/chevronleft.svg"
                    alt=""
                    onClick={() => onPageChange(currentPage - 1)}
                    className="p-1 md:p-3 rounded-lg bg-secondary-background cursor-pointer"
                />
                <div
                    className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-tertiary-sky-blue"
                >
                    {currentPage}
                </div>

                <img
                    src="/images/chevronright.svg"
                    alt=""
                    onClick={() => onPageChange(currentPage + 1)}
                    className="p-1 md:p-3 rounded-lg bg-secondary-background cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Pagination;