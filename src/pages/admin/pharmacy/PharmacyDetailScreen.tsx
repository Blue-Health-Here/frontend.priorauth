import React, { useState } from 'react'
import Pagination from '../../../components/common/Pagination'
import DataTable from '../dashboard/DataTable'
import PharmacyDetailsCrad from './PharmacyDetailsCrad'
import { rquestDetailpageData } from '../../../utils/constants'
import AskAIButton from '../../../components/common/AskAIButton'

const PharmacyDetailScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-[calc(100vh-15rem)]">
      <PharmacyDetailsCrad />
      <DataTable
        className="rounded-b-2xl rounded-t-none"
        title="Requests"
        columns={[
          { header: 'Medication', key: 'medication', width: '20%' },
          { header: 'Patient', key: 'patient', width: '20%' },
          { header: 'Prescriber', key: 'prescriber', width: '20%' },
          { header: 'Submitted On', key: 'submittedOn', width: '20%' },
          { header: 'Pharmacy', key: 'pharmacy', width: '20%' },
          { header: 'Status', key: 'status', width: '20%' },
        ]}
        data={rquestDetailpageData}
        customHeader
      />
        <Pagination
          currentPage={currentPage}
          totalEntries={4}
          entriesPerPage={4}
          onPageChange={setCurrentPage} />
    </div>
  )
}

export default PharmacyDetailScreen