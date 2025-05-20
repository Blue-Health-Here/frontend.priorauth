import React from 'react'
import DataTable from '../../../components/common/DataTable'
import PharmacyDetailsCrad from './PharmacyDetailsCrad'
import { rquestDetailpageData } from '../../../utils/constants'

const PharmacyDetailScreen: React.FC = () => {
  return (
    <div className="shadow-lg rounded-b-2xl">
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
        isShadow={false}
        customHeaderButtonText="View All Requests"
        isPagination={true}
      />
    </div>
  )
}

export default PharmacyDetailScreen