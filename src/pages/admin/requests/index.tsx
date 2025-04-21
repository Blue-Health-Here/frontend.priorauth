import React, { useState } from 'react'
import DataTable from '../dashboard/DataTable'
import { requestsDumyLargeData } from '../../../constants'
import { Form, Formik } from 'formik'
import SelectField from '../../../components/common/form/SelectField'
import Button from '../../../components/Button/Button'
import Pagination from '../../../components/common/Pagination'

const AdminRequests: React.FC = () => {
      const [currentPage, setCurrentPage] = useState(1);
    
    return (
        <>
            <DataTable
                title="Requests"
                columns={[
                    { header: 'Medication', key: 'medication' },
                    { header: 'Patient', key: 'patient' },
                    { header: 'Prescriber', key: 'prescriber' },
                    { header: 'Submitted On', key: 'submittedOn' },
                    { header: 'Pharmacy', key: 'pharmacy' },
                    { header: 'Status', key: 'status' },
                ]}
                data={requestsDumyLargeData}
                customHeader={<div className="flex flex-col md:flex-col lg:flex-row gap-4 pt-1">
                    <h1 className="text-lg md:text-xl font-semibold flex-1 text-nowrap lg:text-2xl">
                        Requests
                    </h1>
                    <Formik
                        initialValues={{ category: "", search: "" }}
                        onSubmit={() => { }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex md:min-w-64 flex-wrap pb-6 text-grey gap-2 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                                <SelectField
                                    className="border border-medium-stroke rounded-lg p-2 font-medium min-w-48"
                                    parentClassName="flex-1"
                                    name="sort"
                                    options={[
                                        { value: "sortby", label: "Sort By" },
                                        { value: "operational", label: "Operational" },
                                    ]}
                                />
                                <SelectField
                                    className="border border-medium-stroke rounded-lg p-2 font-medium min-w-48"
                                    parentClassName="flex-1"
                                    name="filter"
                                    options={[
                                        { value: "filterby", label: "Filter By" },
                                        { value: "operational", label: "Operational" },
                                    ]}
                                />
                                <Button title="Add Pharmacy" className="w-full sm:w-48" isSmall />
                            </Form>
                        )}
                    </Formik>
                </div>}
            />
            <Pagination      
             currentPage={currentPage}
             totalEntries={4}
             entriesPerPage={4}
             onPageChange={setCurrentPage}/>
        </>

    )
}

export default AdminRequests