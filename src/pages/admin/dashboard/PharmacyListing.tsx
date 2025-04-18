import { Plus } from 'lucide-react';
import React from 'react';

interface Pharmacy {
  id: number;
  name: string;
  color: string;
  phone: string;
}

interface PharmacyListingProps {
  region: string;
  pharmacies: Pharmacy[];
}

const PharmacyListing: React.FC<PharmacyListingProps> = ({ region, pharmacies }) => {
  
const getInitial = (name:string) => {
  return name.charAt(0);
};
const getColorByIndex = (index:number) => {
  const colors = ['bg-blue-500', 'bg-pink-500', 'bg-purple-500', 'bg-indigo-500'];
  return colors[(index - 1) % colors.length];
};

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Pharmacies ({region})</h2>
        <button className="text-gray-400">
          <Plus size={16} />
        </button>
      </div>
      <div className="space-y-3">
        {pharmacies.map((pharmacy) => (
          <div key={pharmacy.id} className="flex items-center">
            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-white ${getColorByIndex(pharmacy.id)}`}>
              {getInitial(pharmacy.name)}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{pharmacy.name}</div>
              <div className="text-xs text-gray-500">{pharmacy.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyListing;