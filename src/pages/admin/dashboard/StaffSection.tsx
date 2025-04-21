import React from 'react'
import DataTable from './DataTable'
import { staffData } from '../../../constants'
const StaffSection: React.FC = () => {
  return (
    <DataTable
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