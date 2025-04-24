import React from 'react'
import StatCard from './StatCard'
import { DonutChart } from '../../../components/DonutChart'

const StatsSection: React.FC = () => {
  
  return (
    <div className="grid lg:grid-cols-12 gap-4">
    <div className="col-span-6">
      <div className="grid md:grid-cols-2 gap-4">
        <StatCard subtitle='Pharmacies' title="Total no. of clinics registered on Prior Auth to provide their services." value="85" bgColor='gradient-class' />
        <StatCard subtitle='Prescribers' title="Total Doctor registered on platform including individual & linked with clinics." value="48" />
        <StatCard subtitle='Requests' title="Total no of requests on platform to avail services." value="42K" />
        <StatCard subtitle='Tasks' title="Total no of tasks created by the Admin." value="5K" />
      </div></div>
      <div className="col-span-6 md:col-span-3">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-sm md:text-base lg:text-lg text-secondary-black font-secondary">Total Requests</h2>
          <p className="text-tertiary-black xt-xs md:text-sm lg:text-base leading-[120%] mt-2">
            Total no. of Sessions/sessions Doctors need to attend.
          </p>
          <div className="flex items-center justify-center py-2">
            <DonutChart completed={350} upcoming={520} />
          </div>
        </div>
      </div>

    <div className="col-span-6 md:col-span-3">
      <div className="bg-primary-white p-4 rounded-2xl shadow-lg">
        <h2 className="font-medium mb-4">Total Tasks</h2>
        <div className="flex items-center justify-between">
          Bubble Charet
        </div>
      </div>
    </div>
  </div>
  )
}

export default StatsSection