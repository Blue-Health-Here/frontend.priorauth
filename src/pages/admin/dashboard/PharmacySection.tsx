import React from 'react'
import DataTable from './DataTable'
import { pharmacyData } from '../../../utils/constants'

const PharmacySection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4">
      <DataTable
        title="Pharmacies"
        location="New York"
        columns={[
          { header: 'Pharmacy', key: 'pharmacy' },
          { header: 'Phone No.', key: 'phone' }
        ]}
        data={pharmacyData}
      />

      <DataTable
        title="Pharmacies"
        location="New Jersey"
        columns={[
          { header: 'Pharmacy', key: 'pharmacy' },
          { header: 'Phone No.', key: 'phone' }
        ]}
        data={pharmacyData}
      />

      <DataTable
        title="Pharmacies"
        location="Pennsylvania"
        columns={[
          { header: 'Pharmacy', key: 'pharmacy' },
          { header: 'Phone No.', key: 'phone' }
        ]}
        data={pharmacyData}
      />
    </div>
  )
}

export default PharmacySection