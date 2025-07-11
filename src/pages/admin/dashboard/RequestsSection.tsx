import React from 'react'
import DataTable from '../../../components/common/DataTable'
// import { requestsData } from '../../../utils/constants'
import TableHeader from '../../../components/common/TableHeader'

const RequestsSection: React.FC = () => {
  return (
    <div className="pt-4">
    <DataTable
      headerComponent={<TableHeader title='Requests' />}
      title="Requests"
      columns={[
        { header: 'Medication', key: 'medication' },
        { header: 'Patient', key: 'patient' },
        { header: 'Prescriber', key: 'prescriber' },
        { header: 'Submitted On', key: 'submittedOn' },
        { header: 'Pharmacy', key: 'pharmacy' },
        { header: 'Status', key: 'status' },
      ]}
      data={[]}
    />
  </div>
  )
}

export default RequestsSection