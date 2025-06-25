// utils/paginationTemplates.js
export const commonPaginatorTemplate = {
  layout: 'RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
  RowsPerPageDropdown: (options: any) => {
    const dropdownOptions = [
      { label: 2, value: 2 },
      { label: 5, value: 5 },
      { label: 25, value: 25 },
      { label: 50, value: 50 },
    ];

    return (
      <>
        <span className="mx-1">Rows:</span>
        <select
          className="border border-gray-300 rounded p-1"
          value={options.value}
          onChange={(e) => options.onChange({ value: parseInt(e.target.value) })}
        >
          {dropdownOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </>
    );
  },
  CurrentPageReport: (options: any) => {
    return (
      <span className="mx-2 text-sm text-gray-700">
        {options.first} to {options.last} of {options.totalRecords}
      </span>
    );
  },
};
