import OTPVerification from "./pages/auth/OTPVerification";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from "./pages/admin/dashboard/index";
import AdminLayout from "./layouts/AdminLayout";
import AdminPharmacies from "./pages/admin/pharmacy";
import AdminRequests from "./pages/admin/requests";
import PharmacyDetails from "./pages/admin/pharmacy/PharmacyDetails";
import AddNewPharmacy from "./pages/admin/pharmacy/AddNewPharmacy";
import AdminSettings from "./pages/admin/settings";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pharmacies" element={<AdminPharmacies />} />
          <Route path="pharmacies/details" element={<PharmacyDetails />}/> 
          <Route path="pharmacies/add" element={<AddNewPharmacy />}/>   
          <Route path="requests" element={<AdminRequests />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>

  );
}

export default App;

