import React from 'react'
import DataTable from '../../../components/common/DataTable'
import { prescribersData } from '../../../utils/constants'
import TableHeader from '../../../components/common/TableHeader'

const PrescribersSection: React.FC = () => {
  return (
    <DataTable
      headerComponent={<TableHeader title='Prescribers' />}
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