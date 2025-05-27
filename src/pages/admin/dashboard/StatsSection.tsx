import React from 'react'
import StatCard from './StatCard'
import { DonutChart } from '../../../components/DonutChart'
import useWindowSize from '../../../hooks/useWindowSize';

const StatsSection: React.FC = () => {
  const { width } = useWindowSize();

  const stats = {
    totalTasks: 34000,
    completedTasks: 870,
    pendingTasks: 870,
    currency: '$'
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-4">
      <div className="sm:col-span-2 xl:col-span-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
          <StatCard title='Pharmacies' description="Total no. of clinics registered on Prior Auth to provide their services." value="85"/>
          <StatCard title='Prescribers' description="Total Doctor registered on platform including individual & linked with clinics." value="48"  />
          <StatCard title='Requests' description="Total no of requests on platform to avail services." value="42K"  />
          <StatCard title='Tasks' description="Total no of tasks created by the Admin." value="5K"  />
        </div>
      </div>

      <div className="sm:col-span-1 xl:col-span-3 h-full">
        <div className="bg-primary-white p-4 sm:p-6 rounded-2xl shadow-lg h-full flex flex-col">
          <h2 className="text-sm md:text-base lg:text-lg text-secondary-black font-secondary">Total Requests</h2>
          <p className="text-tertiary-black text-xs md:text-sm lg:text-base leading-[120%] mt-2">
            Total no. of Sessions/sessions Doctors need to attend.
          </p>
          <div className="flex items-center justify-center py-2 flex-grow">
            <DonutChart 
              completed={350} 
              upcoming={520} 
              labels={width > 1400 ? 12 : width > 1200 ? 11 : width > 600 ? 10 : 8} 
            />
          </div>
        </div>
      </div>

      <div className="sm:col-span-1 xl:col-span-3 h-full">
        <div className="bg-primary-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col h-full">
          <h2 className="text-sm md:text-base lg:text-lg text-secondary-black font-secondary">
            Total Tasks
          </h2>
          <p className="text-tertiary-black text-xs md:text-sm lg:text-base leading-[120%] mt-2">
            Total no. of Sessions/sessions Doctors need to attend.
          </p>

          <div className="flex-grow flex items-center justify-center mt-4 sm:mt-6">
            <div className="relative w-full max-w-[350px] aspect-square">
              <div className="bg-quaternary-navy-blue rounded-full flex flex-col justify-center items-center w-[60%] h-[60%] absolute top-1/3 left-[40%] -translate-x-1/2 -translate-y-1/2 p-4">
                <p className="font-secondary text-[10px] sm:text-xs">Total Tasks</p>
                <p className="text-xl md:text-3xl font-bold">
                  {stats.currency}{(stats.totalTasks / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="bg-success-chip-bg-color text-secondary-black rounded-full flex flex-col justify-center items-center w-[45%] h-[45%] absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-10">
                <p className="font-secondary text-[10px] sm:text-xs text-center">Completed Tasks</p>
                <p className="text-xl md:text-2xl font-bold">{stats.completedTasks}</p>
              </div>
              <div className="bg-error-chip-bg-color rounded-full flex flex-col justify-center items-center w-[40%] h-[40%] absolute top-[70%] left-[60%] -translate-x-1/2 -translate-y-1/2 z-10">
                <p className="font-secondary text-[10px] sm:text-xs text-center">Pending Tasks</p>
                <p className="text-xl md:text-2xl font-bold">{stats.pendingTasks}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsSection