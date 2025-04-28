import React from 'react'
import StatCard from './StatCard'
import { DonutChart } from '../../../components/DonutChart'

const StatsSection: React.FC = () => {

  const stats = {
    totalTasks: 34000,
    completedTasks: 870,
    pendingTasks: 870,
    currency: '$'
  }

  return (
  <div className="grid lg:grid-cols-12 gap-4">
  <div className="col-span-6">
    <div className="grid md:grid-cols-2 gap-4 h-full">
      <StatCard subtitle='Pharmacies' title="Total no. of clinics registered on Prior Auth to provide their services." value="85" bgColor='gradient-class'  />
      <StatCard subtitle='Prescribers' title="Total Doctor registered on platform including individual & linked with clinics." value="48"  />
      <StatCard subtitle='Requests' title="Total no of requests on platform to avail services." value="42K"  />
      <StatCard subtitle='Tasks' title="Total no of tasks created by the Admin." value="5K"  />
    </div>
  </div>
  
  <div className="col-span-6 lg:col-span-3 h-full">
    <div className="bg-primary-white p-6 rounded-2xl shadow-lg h-full flex flex-col">
      <h2 className="text-sm md:text-base lg:text-lg text-secondary-black font-secondary">Total Requests</h2>
      <p className="text-tertiary-black xt-xs md:text-sm lg:text-base leading-[120%] mt-2">
        Total no. of Sessions/sessions Doctors need to attend.
      </p>
      <div className="flex items-center justify-center py-2 flex-grow">
        <DonutChart completed={350} upcoming={520} />
      </div>
    </div>
  </div>

  <div className="col-span-6 lg:col-span-3 h-full">
    <div className="bg-primary-white p-6 rounded-2xl shadow-lg flex flex-col h-full">
      <h2 className="text-sm md:text-base lg:text-lg text-secondary-black font-secondary">Total Requests</h2>
      <p className="text-tertiary-black xt-xs md:text-sm lg:text-base leading-[120%] mt-2">
        Total no. of Sessions/sessions Doctors need to attend.
      </p>
      <div className="relative flex-grow flex items-center justify-center">
        <div className="absolute left-10 top-10">
          <div className="bg-quaternary-navy-blue rounded-full w-36 h-36 md:h-40 md:w-40 flex flex-col justify-center items-center">
            <p className="font-secondary text-xs">Total Tasks</p>
            <p className="text-3xl font-bold">
              {stats.currency}{(stats.totalTasks / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
        
        <div className="absolute right-10 top-1/4">
          <div className="bg-success-chip-bg-color text-secondary-black rounded-full w-28 h-28 md:h-32 md:w-32 flex flex-col justify-center items-center">
            <p className="font-secondary text-xs">Completed Tasks</p>
            <p className="text-3xl font-bold">
              {stats.completedTasks}
            </p>
          </div>
        </div>
        <div className="absolute right-1/3 bottom-12">
          <div className="bg-error-chip-bg-color rounded-full w-24 h-24 md:h-28 md:w-28 flex flex-col justify-center items-center">
            <p className="font-secondary text-xs">Pending Tasks</p>
            <p className="text-3xl font-bold">
              {stats.pendingTasks}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default StatsSection