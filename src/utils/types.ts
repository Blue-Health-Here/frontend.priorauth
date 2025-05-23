
export interface Pharmacy {
  id: string;
  name: string;
  type: string;
  image: string;
  phone: string;
  lastRequests: {
    date: string;
    approved: number;
    denied: number;
  };
}
export interface PharmacyCardProps {
  pharmacy: Pharmacy;
}

