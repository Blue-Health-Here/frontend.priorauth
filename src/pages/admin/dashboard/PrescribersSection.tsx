import React from 'react'
import DataTable from './DataTable'
import { prescribersData } from '../../../utils/constant'

const PrescribersSection: React.FC = () => {
  return (
    <DataTable
      title="Prescribers"
      columns={[
        { header: 'Prescriber', key: 'prescriber' },
        { header: 'Email', key: 'email' },
        { header: 'Phone No.', key: 'phone' },
        { header: 'Location', key: 'location' },
      ]}
      data={prescribersData}
    />
  )
}

export default PrescribersSection