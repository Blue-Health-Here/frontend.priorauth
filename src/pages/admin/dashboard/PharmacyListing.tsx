import React from 'react';

interface Pharmacy {
  id: number;
  name: string;
  color: string;
  phone: string;
}

interface PharmacyListingProps {
  title: string;
  pharmacies: Pharmacy[];
}

const PharmacyListing: React.FC<PharmacyListingProps> = ({ title, pharmacies }) => {
  const getColorClass = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-500';
      case 'pink': return 'bg-pink-500';
      case 'indigo': return 'bg-indigo-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <button className="text-gray-400">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
      <ul>
        {pharmacies.map((pharmacy) => (
          <li key={pharmacy.id} className="flex items-center py-2 border-b border-gray-100 last:border-b-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getColorClass(pharmacy.color)}`}>
              {pharmacy.name.charAt(0)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{pharmacy.name}</p>
            </div>
            <div className="text-sm text-gray-500">
              {pharmacy.phone}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacyListing;