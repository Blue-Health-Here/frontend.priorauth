import React from 'react'
import DataTable from './DataTable'
import { tasksData } from '../../../constants'

const TasksSection: React.FC = () => {
  return (
    
    <div className="pt-4">
    <DataTable
      title="Tasks"
      columns={[
        { header: 'ID', key: 'id' },
        { header: 'Medication', key: 'medication' },
        { header: 'Assigned To', key: 'assignedTo' },
        { header: 'Prescriber', key: 'prescriber' },
        { header: 'Assigned On', key: 'assignedOn' },
        { header: 'Status', key: 'status' },
        { header: 'Pharmacy', key: 'pharmacy' },

      ]}
      data={tasksData}
    />
  </div>
  )
}

export default TasksSection