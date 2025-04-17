import { Bell, Search } from 'lucide-react';
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
      <h1 className="text-xl font-semibold">Welcome back!</h1>
      <div className="flex items-center">
        <div className="relative mr-4">
          <input
            type="text"
            placeholder="Search"
            className="pl-8 pr-4 py-2 border border-gray-300 rounded-md text-sm"
          />
          <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
        </div>
        <div className="relative mr-4">
          <Bell size={20} className="text-gray-600" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">3</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <span className="text-sm">JP</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
