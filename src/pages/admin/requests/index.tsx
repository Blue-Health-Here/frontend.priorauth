import React, { useState } from 'react'
import DataTable from '../dashboard/DataTable'
import Pagination from '../../../components/common/Pagination'
import { requestsDumyLargeData } from '../../../utils/constants'

const AdminRequests: React.FC = () => {
      const [currentPage, setCurrentPage] = useState(1);
    
    return (
        <>
            <DataTable
                title="Requests"
                columns={[
                    { header: 'Medication', key: 'medication', width: '20%' },
                    { header: 'Patient', key: 'patient', width: '20%' },
                    { header: 'Prescriber', key: 'prescriber', width: '20%' },
                    { header: 'Submitted On', key: 'submittedOn', width: '20%' },
                    { header: 'Pharmacy', key: 'pharmacy', width: '20%' },
                    { header: 'Status', key: 'status', width: '20%' },
                ]}
                data={requestsDumyLargeData}
                customHeader
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