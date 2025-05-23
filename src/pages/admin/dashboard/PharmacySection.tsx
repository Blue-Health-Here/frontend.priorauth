import React from 'react'
import DataTable from '../../../components/common/DataTable'
import { pharmacyData } from '../../../utils/constants'
import TableHeader from '../../../components/common/TableHeader';

const PharmacySection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-4">
      <DataTable
        headerComponent={<TableHeader title='Pharmacies' location='New York' />}
        title="Pharmacies"
        location="New York"
        columns={[
          { header: 'Pharmacy', key: 'pharmacy' },
          { header: 'Phone No.', key: 'phone' }
        ]}
        data={pharmacyData}
      />

      <DataTable
        headerComponent={<TableHeader title='Pharmacies' location='New Jersey' />}
        title="Pharmacies"
        location="New Jersey"
        columns={[
          { header: 'Pharmacy', key: 'pharmacy' },
          { header: 'Phone No.', key: 'phone' }
        ]}
        data={pharmacyData}
      />

      <DataTable
        headerComponent={<TableHeader title='Pharmacies' location='Pennsylvania' />}
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