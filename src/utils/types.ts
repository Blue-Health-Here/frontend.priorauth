
export interface Pharmacy {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  type?: string;
  pharmacyLogo?: string;
  phone?: string;
  phoneNumber?: string;
  lastRequests: {
    date: string;
    approved: number;
    denied: number;
  };
}
export interface PharmacyCardProps {
  pharmacy: Pharmacy;
}
