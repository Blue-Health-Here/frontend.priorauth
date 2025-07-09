import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import { Routes } from "react-router";
import { Suspense, lazy } from "react";
import ThemeProvider from "./layouts/ThemeProvider";
import { Toaster } from "react-hot-toast";

// Route Guards
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loading from "./components/common/Loading";

// Public
const Home = lazy(() => import("./pages/Home"));

// Auth
const Login = lazy(() => import("./pages/auth/Login"));
const OTPVerification = lazy(() => import("./pages/auth/OTPVerification"));

// Admin
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/dashboard"));
const AdminPharmacies = lazy(() => import("./pages/admin/pharmacy"));
const PharmacyDetailScreen = lazy(() => import("./pages/admin/pharmacy/PharmacyDetailScreen"));
const AddNewPharmacyScreen = lazy(() => import("./pages/admin/pharmacy/AddNewPharmacyScreen"));
const AdminSettings = lazy(() => import("./pages/admin/settings"));
const ChangePasswordPage = lazy(() => import("./pages/admin/settings/change-password"));
const UserSettingPage = lazy(() => import("./pages/admin/settings/user-setting"));
const NotificationScreen = lazy(() => import("./pages/admin/notifications"));
const AdminRolesAndPermissions = lazy(() => import("./pages/permissions"));

// Pharmacy
const PharmacyLayout = lazy(() => import("./layouts/PharmacyLayout"));
const PharmacyDashboard = lazy(() => import("./pages/pharmacy/dashboard"));
const PharmacyRequests = lazy(() => import("./pages/pharmacy/requests"));
const PharmacyRequestDetails = lazy(() => import("./pages/pharmacy/requests/details"));
const CMMAccountDatabase = lazy(() => import("./pages/pharmacy/cmm-account"));
const PharmacySettings = lazy(() => import("./pages/pharmacy/settings"));
const Prescribers = lazy(() => import("./pages/prescribers"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Guest Routes */}
          <Route element={<ThemeProvider><GuestRoute /></ThemeProvider>}>
            <Route path="/login" element={<Login />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ThemeProvider><ProtectedRoute allowedRoles={["companyAdmin"]} /></ThemeProvider>}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="pharmacies" element={<AdminPharmacies />} />
              <Route path="pharmacies/:pharmacyId/pharmacy-details" element={<PharmacyDetailScreen />} />
              <Route path="pharmacies/add" element={<AddNewPharmacyScreen />} />
              <Route path="requests" element={<PharmacyRequests isAdmin={true} />} />
              <Route path="requests/:id/request-details" element={<PharmacyRequestDetails isAdmin={true} />} />
              <Route path="prescribers" element={<Prescribers isAdmin={true} />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="settings/change-password" element={<ChangePasswordPage />} />
              <Route path="settings/user-settings" element={<UserSettingPage />} />
              <Route path="notifications" element={<NotificationScreen />} />
              <Route path="permissions" element={<AdminRolesAndPermissions />} />
            </Route>
          </Route>

          {/* Pharmacy Routes */}
          <Route element={<ThemeProvider><ProtectedRoute allowedRoles={["pharmacyUser"]} /></ThemeProvider>}>
            <Route path="/pharmacy" element={<PharmacyLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<PharmacyDashboard />} />
              <Route path="requests" element={<PharmacyRequests isAdmin={false} />} />
              <Route path="requests/:id/request-details" element={<PharmacyRequestDetails isAdmin={false} />} />
              <Route path="prescribers" element={<Prescribers isAdmin={false} />} />
              {/* <Route path="prescribers/:id/prescriber-details" element={<PharmacyRequestDetails isAdmin={false} />} /> */}
              <Route path="cmm-account-database" element={<CMMAccountDatabase />} />
              <Route path="settings" element={<PharmacySettings />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>

      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
