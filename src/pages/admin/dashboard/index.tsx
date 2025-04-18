// import React from 'react'
// import AdminSidebar from './AdminSidebar'
// import DashboardHeader from './DashboardHeader';
// import StatCard from './StatCard';
// import PharmacyListing from './PharmacyListing';
// import RequestsTable from './RequestsTable';
// import PrescribersTable from './PrescribersTable';
// import StaffTable from './StaffTable';
// import TasksTable from './TasksTable';

// const AdminDashboard: React.FC = () => {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <AdminSidebar />
//       <div className="flex-1 overflow-auto">
//         <DashboardHeader />
//         <div className="px-6 py-4">
//           {/* Stats Row */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <StatCard 
//               title="Pharmacies" 
//               subtitle="Total no. of clinics registered on Prior Auth to provide PAP services" 
//               value="85" 
//               bgColor="bg-blue-600" 
//             />
//             <StatCard 
//               title="Prescribers" 
//               subtitle="Total Doctor registered on platform, including individual & allied with clinics" 
//               value="48" 
//               bgColor="bg-white" 
//               textColor="text-gray-800" 
//               borderColor="border border-gray-200" 
//             />
//             <StatCard 
//               title="Requests" 
//               subtitle="Total no. of requests on platform to process" 
//               value="42K" 
//               bgColor="bg-white" 
//               textColor="text-gray-800" 
//               borderColor="border border-gray-200" 
//             />
//             <StatCard 
//               title="Tasks" 
//               subtitle="Total no. of tasks created by the Admin" 
//               value="5K" 
//               bgColor="bg-white" 
//               textColor="text-gray-800" 
//               borderColor="border border-gray-200" 
//             />
//           </div>

//           {/* Charts Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div className="bg-white p-4 rounded-lg shadow-sm">
//               <h3 className="text-sm font-medium text-gray-600 mb-2">Total Recipients</h3>
//               <p className="text-sm text-gray-500">Total no. of Patients/patients Doctors had to attend</p>
//               <div className="flex justify-center items-center h-32">
//                 <div className="relative">
//                   <div className="w-32 h-32 rounded-full border-8 border-blue-500"></div>
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
//                     870
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-center gap-4 mt-4">
//                 <div className="flex items-center">
//                   <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
//                   <span className="text-xs">Total</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
//                   <span className="text-xs">Completed</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-3 h-3 rounded-full bg-blue-100 mr-2"></div>
//                   <span className="text-xs">Pending</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-lg shadow-sm">
//               <h3 className="text-sm font-medium text-gray-600 mb-2">Total Trials</h3>
//               <p className="text-sm text-gray-500">Total no. of Submissions/Visits Doctors need to attend</p>
//               <div className="flex justify-center items-center h-32">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-800">$34K</div>
//                   <div className="bg-green-100 text-green-800 rounded-full py-1 px-4 mt-2 text-sm">
//                     870
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-lg shadow-sm">
//               <h3 className="text-sm font-medium text-gray-600 mb-4">Total</h3>
//               <div className="flex justify-center items-center h-32">
//                 <div className="bg-red-100 text-red-800 rounded-full py-4 px-8 text-2xl font-bold">
//                   870
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Pharmacies Listings */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             {/* <PharmacyListing title="Pharmacies (New York)" pharmacies={pharmaciesNY} />
//             <PharmacyListing title="Pharmacies (New Jersey)" pharmacies={pharmaciesNJ} />
//             <PharmacyListing title="Pharmacies (Pennsylvania)" pharmacies={pharmaciesPA} /> */}
//              <PharmacyListing title="Pharmacies (New York)" pharmacies={[]} />
//             <PharmacyListing title="Pharmacies (New Jersey)" pharmacies={[]} />
//             <PharmacyListing title="Pharmacies (Pennsylvania)" pharmacies={[]} />
//           </div>

//           {/* Requests Table */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-medium">Requests</h2>
//               <button className="text-gray-400">
//                 <i className="fas fa-ellipsis-v"></i>
//               </button>
//             </div>
//             {/* <RequestsTable requests={requests} /> */}
//             <RequestsTable requests={[]}/>
//           </div>

//           {/* Prescribers and Staff Tables */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-medium">Prescribers</h2>
//                 <button className="text-gray-400">
//                   <i className="fas fa-ellipsis-v"></i>
//                 </button>
//               </div>
//               {/* <PrescribersTable prescribers={prescribers} />
//                */}
//               <PrescribersTable/>
//             </div>
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-medium">Staff</h2>
//                 <button className="text-gray-400">
//                   <i className="fas fa-ellipsis-v"></i>
//                 </button>
//               </div>
//               {/* <StaffTable staff={staff} /> */}
//               <StaffTable/>
//             </div>
//           </div>

//           {/* Tasks Table */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-medium">Tasks</h2>
//               <button className="text-gray-400">
//                 <i className="fas fa-ellipsis-v"></i>
//               </button>
//             </div>
//             {/* <TasksTable tasks={tasks} /> */}
//             <TasksTable/>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="bg-white py-2 px-6 border-t border-gray-200 flex justify-center items-center text-xs text-gray-500">
//           © Copyright Prior Auth 2023 - All Rights Reserved
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard


import { useState } from 'react';
import { Search, Bell, Home, FileText, Users, User, Inbox, HelpCircle, Calendar, Settings, LogOut, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import DashboardHeader from './DashboardHeader';
import StatCard from './StatCard';
import AdminLayout from '../../../layouts/AdminLayout';
import StatsSection from './StatsSection';
import PharmacyListing from './PharmacyListing';

// Define TypeScript interfaces for our data
interface Pharmacy {
  id: number;
  name: string;
  phone: string;
}

interface Request {
  id: number;
  medication: string;
  patient: string;
  prescriber: string;
  submittedOn: string;
  pharmacy: number;
  status: string;
}

interface Prescriber {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
}

interface Task {
  id: number;
  medication: string;
  assignedTo: string;
  prescriber: string;
  assignedOn: string;
  status: string;
  pharmacy: number;
}

// Generate dummy data
const pharmacies: Record<string, Pharmacy[]> = {
  'New York': [
    { id: 1, name: 'Alchemya Ltd', phone: '(212) 555-0123', color: 'blue' },
    { id: 2, name: 'Big RxWorks Ltd', phone: '(620) 555-0352', color: 'green' },
    { id: 3, name: 'Acme Co', phone: '(226) 555-0424', color: 'red' },
    { id: 4, name: 'Breline LLC', phone: '(332) 555-0517', color: 'yellow' }
  ],
  'New Jersey': [
    { id: 5, name: 'Alchemya Ltd', phone: '(717) 555-0123', color: 'blue' },
    { id: 6, name: 'Big RxWorks Ltd', phone: '(620) 555-0352', color: 'green' },
    { id: 7, name: 'Acme Co', phone: '(226) 555-0424', color: 'red' },
    { id: 8, name: 'Breline LLC', phone: '(332) 555-0517', color: 'yellow' }
  ],
  'Pennsylvania': [
    { id: 9, name: 'Alchemya Ltd', phone: '(212) 555-0123', color: 'blue' },
    { id: 10, name: 'Big RxWorks Ltd', phone: '(620) 555-0352', color: 'green' },
    { id: 11, name: 'Acme Co', phone: '(226) 555-0424', color: 'red' },
    { id: 12, name: 'Breline LLC', phone: '(332) 555-0517', color: 'yellow' }
  ]
};

const requests: Request[] = [
  { id: 1, medication: 'Invokia 10 mg Tab', patient: 'Cody Parker', prescriber: 'Wade Warren', submittedOn: '01/02/2025', pharmacy: 1, status: 'Updated Progress (Sent)' },
  { id: 2, medication: 'Xifaxan 550 mg Tab', patient: 'Kristin Wilson', prescriber: 'Brooklyn Simmons', submittedOn: '3/01/2025', pharmacy: 2, status: 'Progress Note Required' },
  { id: 3, medication: 'Varndy 25 mg Tab', patient: 'Cameron Williamson', prescriber: 'Theresa Webb', submittedOn: '2/02/2025', pharmacy: 3, status: 'Queued for Call' },
  { id: 4, medication: 'Monglaro 2.5 mg PI', patient: 'Theresa Webb', prescriber: 'Esther Howard', submittedOn: '01/01/2025', pharmacy: 4, status: 'Sent for Revision (ID)' }
];

const prescribers: Prescriber[] = [
  { id: 1, name: 'Wade Warren', email: 'wade@rxm.com', phone: '(217) 555-0113', location: 'New York' },
  { id: 2, name: 'Brooklyn Simmons', email: 'brooklyn@rxm.com', phone: '(217) 555-0122', location: 'New Jersey' },
  { id: 3, name: 'Theresa Webb', email: 'twebb@rhrxmail.com', phone: '(226) 555-0324', location: 'Pennsylvania' },
  { id: 4, name: 'Esther Howard', email: 'esther@rxpal.com', phone: '(332) 555-0517', location: 'New York' }
];

const staffMembers: StaffMember[] = [
  { id: 1, name: 'Cody Parker', email: 'code@rxm.com', phone: '(217) 555-0113', designation: 'Accounts' },
  { id: 2, name: 'Kristin Wilson', email: 'kristin@rxm.com', phone: '(620) 555-0122', designation: 'Admin' },
  { id: 3, name: 'Cameron Williamson', email: 'cwilliamson@rxm.com', phone: '(226) 555-0324', designation: 'Manager' },
  { id: 4, name: 'Theresa Webb', email: 'twebb@rxm.com', phone: '(332) 555-0517', designation: 'In-charge' }
];

const tasks: Task[] = [
  { id: 1, medication: 'Invokia 10 mg Tab.', assignedTo: 'Cody Parker', prescriber: 'Wade Warren', assignedOn: '01/02/2025', status: 'Updated Progress (Sent)', pharmacy: 1 },
  { id: 2, medication: 'Xifaxan 550 mg Tab.', assignedTo: 'Kristin Wilson', prescriber: 'Brooklyn Simmons', assignedOn: '3/01/2025', status: 'Progress Note Required', pharmacy: 2 },
  { id: 3, medication: 'Varndy 25 mg Tab.', assignedTo: 'Cameron Williamson', prescriber: 'Theresa Webb', assignedOn: '2/02/2025', status: 'Queued for Call', pharmacy: 3 },
  { id: 4, medication: 'Monglaro 2.5 mg PI.', assignedTo: 'Theresa Webb', prescriber: 'Esther Howard', assignedOn: '01/01/2025', status: 'Sent for Revision (ID)', pharmacy: 4 }
];

// Create our components
const Sidebar = () => {
  return (
    <div className="w-48 min-h-screen bg-white border-r border-gray-200">
      <div className="p-4 flex items-center border-b border-gray-200">
        <div className="text-blue-600 font-bold text-lg">priorauth</div>
      </div>
      <nav className="p-2">
        <ul>
          <SidebarItem icon={<Home size={18} />} text="Dashboard" active />
          <SidebarItem icon={<FileText size={18} />} text="Prior auths" />
          <SidebarItem icon={<Users size={18} />} text="Prescribers" />
          <SidebarItem icon={<Inbox size={18} />} text="Requests" />
          <SidebarItem icon={<Inbox size={18} />} text="Invoices" />
          <SidebarItem icon={<FileText size={18} />} text="Send To Rep" />
          <SidebarItem icon={<Calendar size={18} />} text="Call" />
          <SidebarItem icon={<User size={18} />} text="Staff" />
          <SidebarItem icon={<Clock size={18} />} text="Tasks" />
          <SidebarItem icon={<Settings size={18} />} text="Pharmacies" />
          <SidebarItem icon={<Settings size={18} />} text="Settings" />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, active = false }) => {
  return (
    <li className={`flex items-center p-2 rounded-md mb-1 ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
      <div className="mr-2">{icon}</div>
      <span className="text-sm">{text}</span>
    </li>
  );
};

// const Header = () => {
//   return (

//   );
// };

// const StatCard = ({ title, value, color = 'blue' }) => {
//   const bgColor = {
//     blue: 'bg-blue-600',
//     gray: 'bg-gray-100',
//     green: 'bg-green-100',
//     purple: 'bg-purple-100',
//     pink: 'bg-pink-100',
//   }[color];

//   const textColor = color === 'blue' ? 'text-white' : 'text-gray-800';

//   return (
//     <div className={`p-4 rounded-md ${bgColor} ${textColor}`}>
//       <p className="text-sm opacity-80">{title}</p>
//       <p className="text-2xl font-bold mt-2">{value}</p>
//     </div>
//   );
// };


const RequestsTable = ({ requests }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Requests</h2>
        <button className="text-gray-400">
          <Plus size={16} />
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-gray-500 text-xs">
          <tr>
            <th className="text-left pb-2">Medication</th>
            <th className="text-left pb-2">Patient</th>
            <th className="text-left pb-2">Prescriber</th>
            <th className="text-left pb-2">Submitted On</th>
            <th className="text-left pb-2">Pharmacy</th>
            <th className="text-left pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-t border-gray-100">
              <td className="py-3">{request.medication}</td>
              <td className="py-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                  {request.patient}
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                  {request.prescriber}
                </div>
              </td>
              <td className="py-3">{request.submittedOn}</td>
              <td className="py-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${getColorByIndex(request.pharmacy)}`}>
                  {getInitial(pharmacies['New York'].find(p => p.id === request.pharmacy)?.name || '')}
                </div>
              </td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-md text-xs ${getStatusStyle(request.status)}`}>
                  {request.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PersonTable = ({ title, data, type }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">{title}</h2>
        <button className="text-gray-400">
          <Plus size={16} />
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-gray-500 text-xs">
          <tr>
            <th className="text-left pb-2">{type === 'prescriber' ? 'Prescriber' : 'Staff'}</th>
            <th className="text-left pb-2">Email</th>
            <th className="text-left pb-2">Phone No.</th>
            <th className="text-left pb-2">{type === 'prescriber' ? 'Location' : 'Designation'}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person.id} className="border-t border-gray-100">
              <td className="py-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                  {person.name}
                </div>
              </td>
              <td className="py-3">{person.email}</td>
              <td className="py-3">{person.phone}</td>
              <td className="py-3">{type === 'prescriber' ? person.location : person.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TasksTable = ({ tasks }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Tasks</h2>
        <button className="text-gray-400">
          <Plus size={16} />
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-gray-500 text-xs">
          <tr>
            <th className="text-left pb-2">ID</th>
            <th className="text-left pb-2">Medication</th>
            <th className="text-left pb-2">Assigned To</th>
            <th className="text-left pb-2">Prescriber</th>
            <th className="text-left pb-2">Assigned On</th>
            <th className="text-left pb-2">Status</th>
            <th className="text-left pb-2">Pharmacy</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-gray-100">
              <td className="py-3">{task.id}</td>
              <td className="py-3">{task.medication}</td>
              <td className="py-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                  {task.assignedTo}
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                  {task.prescriber}
                </div>
              </td>
              <td className="py-3">{task.assignedOn}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-md text-xs ${getStatusStyle(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td className="py-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${getColorByIndex(task.pharmacy)}`}>
                  {getInitial(pharmacies['New York'].find(p => p.id === task.pharmacy)?.name || '')}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper functions
const getColorByIndex = (index) => {
  const colors = ['bg-blue-500', 'bg-pink-500', 'bg-purple-500', 'bg-indigo-500'];
  return colors[(index - 1) % colors.length];
};

const getInitial = (name) => {
  return name.charAt(0);
};

const getStatusStyle = (status) => {
  if (status.includes('Sent')) return 'bg-green-100 text-green-700';
  if (status.includes('Required')) return 'bg-blue-100 text-blue-700';
  if (status.includes('Call')) return 'bg-gray-100 text-gray-700';
  if (status.includes('Revision')) return 'bg-yellow-100 text-yellow-700';
  return 'bg-gray-100 text-gray-700';
};

// Chart component (simple implementation)
const Chart = ({ value, total, color }: any) => {
  const percentage = (value / total) * 100;

  return (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-gray-500">Total</div>
      </div>
    </div>
  );
};

// Main App Component
const AdminDashboard = () => {
  return (
    <AdminLayout>
<StatsSection/>



      <div className="grid grid-cols-3 gap-4 pt-4">
            <PharmacyListing region="New York" pharmacies={pharmacies['New York']} />
            <PharmacyListing region="New Jersey" pharmacies={pharmacies['New Jersey']} />
            <PharmacyListing region="Pennsylvania" pharmacies={pharmacies['Pennsylvania']} />
        </div>

          <div className="my-6">
            <RequestsTable requests={requests} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <PersonTable title="Prescribers" data={prescribers} type="prescriber" />
            <PersonTable title="Staff" data={staffMembers} type="staff" />
          </div>

          <div className="mb-6">
            <TasksTable tasks={tasks} />
          </div> 

    </AdminLayout>
  );
};

export default AdminDashboard;