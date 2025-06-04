import React from 'react'
import StatCard from './StatCard'
import DashboardRequestCard from './DashboardRequestCard';
import GlobalStatsCard from './GlobalStatsCard';

const StatsSection: React.FC = () => {
  const yearlyRequestsData = {
    yearly: [35, 42, 38, 45, 52, 48, 58, 62, 55, 68, 72, 65],
    monthly: [15, 22, 18, 28, 32, 25, 35, 42, 38, 45, 52, 48, 58, 62, 55, 68, 72, 65, 58, 62, 55, 48, 52, 58, 62, 55, 48, 42, 38, 45],
    weekly: [65, 72, 58, 68, 45, 62, 75]
  };

  const globalStatsData = {
    yearly: {
      total: 19200,
      stats: [
        { label: 'Approval', value: 56, color: '#19AD4B' },
        { label: 'Denial', value: 18, color: '#FF2E37' },
        { label: 'Pending', value: 26, color: '#1594CC' }
      ]
    },
    monthly: {
      total: 15800,
      stats: [
        { label: 'Approval', value: 62, color: '#19AD4B' },
        { label: 'Denial', value: 15, color: '#FF2E37' },
        { label: 'Pending', value: 23, color: '#1594CC' }
      ]
    },
    weekly: {
      total: 3200,
      stats: [
        { label: 'Approval', value: 48, color: '#19AD4B' },
        { label: 'Denial', value: 22, color: '#FF2E37' },
        { label: 'Pending', value: 30, color: '#1594CC' }
      ]
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-4">
      <div className='sm:col-span-2 xl:col-span-6'>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
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
      <div className='sm:col-span-1 xl:col-span-6 h-full'>
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