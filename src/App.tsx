// App.tsx
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import { Routes } from "react-router";
import ThemeProvider from "./layouts/ThemeProvider";
import { Toaster } from "react-hot-toast";

// Routes
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

// Public
import Home from "./pages/Home";

// Auth
import Login from "./pages/auth/Login";
import OTPVerification from "./pages/auth/OTPVerification";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminPharmacies from "./pages/admin/pharmacy";
import PharmacyDetailScreen from "./pages/admin/pharmacy/PharmacyDetailScreen";
import AddNewPharmacyScreen from "./pages/admin/pharmacy/AddNewPharmacyScreen";
import AdminRequests from "./pages/admin/requests";
import RequestDetails from "./pages/admin/requests/RequestDetails";
import AdminSettings from "./pages/admin/settings";
import ChangePasswordPage from "./pages/admin/settings/change-password";
import UserSettingPage from "./pages/admin/settings/user-setting";
import NotificationScreen from "./pages/admin/notifications";
import AdminRolesAndPermissions from "./pages/permissions";

// Pharmacy
import PharmacyLayout from "./layouts/PharmacyLayout";
import PharmacyDashboard from "./pages/pharmacy/dashboard";
import PharmacyRequests from "./pages/pharmacy/requests";
import PharmacyRequestDetails from "./pages/pharmacy/requests/RequestDetails";
import CMMAccountDatabase from "./pages/pharmacy/cmm-account";
import { PharmacySettings } from "./pages/pharmacy/settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Guest Routes (only accessible if NOT logged in) */}
        <Route element={<ThemeProvider><GuestRoute /></ThemeProvider>}>
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route
          element={
            <ThemeProvider>
              <ProtectedRoute allowedRoles={["companyAdmin"]} />
            </ThemeProvider>
          }
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="pharmacies" element={<AdminPharmacies />} />
            <Route path="pharmacies/:pharmacyId/pharmacy-details" element={<PharmacyDetailScreen />} />
            <Route path="pharmacies/add" element={<AddNewPharmacyScreen />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="requests/:id/request-details" element={<RequestDetails />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="settings/change-password" element={<ChangePasswordPage />} />
            <Route path="settings/user-settings" element={<UserSettingPage />} />
            <Route path="notifications" element={<NotificationScreen />} />
            <Route path="permissions" element={<AdminRolesAndPermissions />} />
          </Route>
        </Route>

        {/* Pharmacy Protected Routes */}
        <Route
          element={
            <ThemeProvider>
              <ProtectedRoute allowedRoles={["pharmacyUser"]} />
            </ThemeProvider>
          }
        >
          <Route path="/pharmacy" element={<PharmacyLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<PharmacyDashboard />} />
            <Route path="requests" element={<PharmacyRequests />} />
            <Route path="requests/:id/request-details" element={<PharmacyRequestDetails />} />
            <Route path="cmm-account-database" element={<CMMAccountDatabase />} />
            <Route path="settings" element={<PharmacySettings />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Toaster for toast messages */}
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
