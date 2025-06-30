import OTPVerification from "./pages/auth/OTPVerification";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import { Routes } from "react-router"
import AdminDashboard from "./pages/admin/dashboard/index";
import AdminLayout from "./layouts/AdminLayout";
import AdminPharmacies from "./pages/admin/pharmacy";
import AdminRequests from "./pages/admin/requests";
import PharmacyDetailScreen from "./pages/admin/pharmacy/PharmacyDetailScreen";
import AddNewPharmacyScreen from "./pages/admin/pharmacy/AddNewPharmacyScreen";
import AdminSettings from "./pages/admin/settings";
import AdminRolesAndPermissions from "./pages/permissions";
import ThemeProvider from "./layouts/ThemeProvider";
import { Toaster } from "react-hot-toast";
import RequestDetails from "./pages/admin/requests/RequestDetails";
import PharmacyRequestDetails from "./pages/pharmacy/requests/RequestDetails";
import NotificationScreen from "./pages/admin/notifications";
import ChangePasswordPage from "./pages/admin/settings/change-password";
import UserSettingPage from "./pages/admin/settings/user-setting";
import PharmacyLayout from "./layouts/PharmacyLayout";
import PharmacyDashboard from "./pages/pharmacy/dashboard";
import CMMAccountDatabase from "./pages/pharmacy/cmm-account";
import PharmacyRequests from "./pages/pharmacy/requests";
import { PharmacySettings } from "./pages/pharmacy/settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={
          <ThemeProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="pharmacies" element={<AdminPharmacies />} />
                <Route path="pharmacies/:pharmacyId/pharmacy-details" element={<PharmacyDetailScreen />}/> 
                <Route path="pharmacies/add" element={<AddNewPharmacyScreen />}/>   
                <Route path="requests" element={<AdminRequests />} />
                <Route path="requests/:id/request-details" element={<RequestDetails />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="settings/change-password" element={<ChangePasswordPage/>} />
                <Route path="settings/user-settings" element={<UserSettingPage/>} />
                <Route path="notifications" element={<NotificationScreen />}/>   
                <Route path="permissions" element={<AdminRolesAndPermissions />}/>   
              </Route>
              <Route path="/pharmacy" element={<PharmacyLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<PharmacyDashboard />} />
                <Route path="requests" element={<PharmacyRequests />} />
                <Route path="requests/:id/request-details" element={<PharmacyRequestDetails />} />
                <Route path="cmm-account-database" element={<CMMAccountDatabase />} />
                <Route path="settings" element={<PharmacySettings />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            <Toaster
              position="top-center"
            />
          </ThemeProvider>
        } />
      </Routes>
    </Router>
  );
}

export default App;