import React from 'react'
import DataTable from '../../../components/common/DataTable'
import { staffData } from '../../../utils/constants'
import TableHeader from '../../../components/common/TableHeader'
const StaffSection: React.FC = () => {
  return (
    <DataTable
      headerComponent={<TableHeader title='Staff' />}
      title="Staff"
      columns={[
        { header: 'Name', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Phone No.', key: 'phone' },
        { header: 'Role', key: 'role' },
      ]}
      data={staffData}
    />
  )
}

export default StaffSection