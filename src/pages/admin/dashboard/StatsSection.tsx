import React from 'react'
import StatCard from './StatCard'

const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
    <div className="col-span-6">
      <div className="grid grid-cols-2 gap-4">
        <StatCard subtitle='Pharmacies' title="Total no. of clinics registered on Prior Auth to provide their services." value="85" bgColor='gradiant-class' />
        <StatCard subtitle='Prescribers' title="Total Doctor registered on platform including individual & linked with clinics." value="48" />
        <StatCard subtitle='Requests' title="Total no of requests on platform to avail services." value="42K" />
        <StatCard subtitle='Tasks' title="Total no of tasks created by the Admin." value="5K" />
      </div></div>

    <div className="col-span-3">
      <div className="bg-primary-white p-4 rounded-2xl shadow-lg">
        <h2 className="font-medium mb-4">Total Requests</h2>
        <div className="flex items-center justify-between">
          Circle Chart
        </div>
      </div>
    </div>
    <div className="col-span-3">
      <div className="bg-primary-white p-4 rounded-2xl shadow-lg">
        <h2 className="font-medium mb-4">Total Requests</h2>
        <div className="flex items-center justify-between">
          Bubble Charet
        </div>
      </div>
    </div>
  </div>
  )
}

export default StatsSection