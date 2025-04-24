import OTPVerification from "./pages/auth/OTPVerification";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from "./pages/admin/dashboard/index";
import AdminLayout from "./layouts/AdminLayout";
import AdminPharmacies from "./pages/admin/pharmacy";
import AdminRequests from "./pages/admin/requests";
import PharmacyDetailScreen from "./pages/admin/pharmacy/PharmacyDetailScreen";
import AddNewPharmacyScreen from "./pages/admin/pharmacy/AddNewPharmacyScreen";
import AdminSettings from "./pages/admin/settings";
import ChangePasswordScreen from "./pages/admin/settings/ChangePasswordScreen";
import NotificationScreen from "./components/NotificationScreen";
import AdminRolesAndPermissions from "./pages/permissions";

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
          <Route path="pharmacies/details" element={<PharmacyDetailScreen />}/> 
          <Route path="pharmacies/add" element={<AddNewPharmacyScreen />}/>   
          <Route path="requests" element={<AdminRequests />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="settings/change-password" element={<ChangePasswordScreen/>} />
          <Route path="notifications" element={<NotificationScreen />}/>   
          <Route path="permissions" element={<AdminRolesAndPermissions />}/>   
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

