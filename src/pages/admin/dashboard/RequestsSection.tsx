import React from 'react'
import DataTable from './DataTable'
import { requestsData } from '../../../utils/constant'

const RequestsSection: React.FC = () => {
  return (
    <div className="pt-4">
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
      data={requestsData}
    />
  </div>
  )
}

export default RequestsSection