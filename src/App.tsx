import OTPVerification from "./pages/auth/OTPVerification";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from "./pages/admin/dashboard/index";
import AdminLayout from "./layouts/AdminLayout";

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
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>

  );
}

export default App;

