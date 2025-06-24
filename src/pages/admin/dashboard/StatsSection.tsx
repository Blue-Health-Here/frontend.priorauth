import DashboardRequestCard from '@/components/common/DashboardRequestCard'
import GlobalStatsCard from '@/components/common/GlobalStatsCard'
import StatCard from '@/components/common/StatCard'
import { globalStatsData, yearlyRequestsData } from '@/utils/constants'
import React from 'react'

const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-4">
      <div className='sm:col-span-2 xl:col-span-6'>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-4 h-full">
          <StatCard title="Today's Request" className='col-span-2 bg-gradient-to-br from-[#0000FD] to-[#74F8FD]' description="Total no of tasks created by the Admin." value="150" />
          <StatCard title='Prescribers' className='col-span-1' description="Doctor registered, including individual & linked with clinics." value="48" />
          <div className='col-span-2'>
            <DashboardRequestCard
              title="Requests"
              value="42K"
              data={yearlyRequestsData}
            />
          </div>
          <StatCard title='Pharmacies' className='col-span-1' description="Total pharmacies on Prior auth" value="5K" />
        </div>
      </div>
      <div className='sm:col-span-2 xl:col-span-6 h-full'>
        <GlobalStatsCard
          title="Global Stats"
          description="Total no. of Sessions/sessions Doctors need to attend"
          data={globalStatsData}
        />
      </div>
    </div>
  )
}

export default StatsSection