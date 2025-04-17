import React from 'react';

interface Pharmacy {
  id: number;
  name: string;
  color: string;
}

interface Request {
  id: string;
  medication: string;
  patient: string;
  patientImage: string;
  prescriber: string;
  prescriberImage: string;
  dateSubmitted: string;
  pharmacy: Pharmacy;
  status: string;
}

interface RequestsTableProps {
  requests: Request[];
}

const RequestsTable: React.FC<RequestsTableProps> = ({ requests }) => {
  const getColorClass = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-500';
      case 'pink': return 'bg-pink-500';
      case 'indigo': return 'bg-indigo-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusClass = (status: string) => {
    if (status.includes('Approved')) return 'bg-green-100 text-green-800';
    if (status.includes('Progress')) return 'bg-blue-100 text-blue-800';
    if (status.includes('Queued')) return 'bg-yellow-100 text-yellow-800';
    if (status.includes('Call Scheduled')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pharmacy</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{request.medication}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={request.patientImage} alt={request.patient} />
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-800">{request.patient}</div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={request.prescriberImage} alt={request.prescriber} />
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-800">{request.prescriber}</div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.dateSubmitted}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getColorClass(request.pharmacy.color)}`}>
                    {request.pharmacy.name.charAt(0)}
                  </div>
                  <div className="ml-2 text-sm font-medium">{request.pharmacy.name}</div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(request.status)}`}>
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

export default RequestsTable;
