import Home from "./pages/Home";
import LoginForm from "./auth/LoginForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OTPVerification from "./auth/EmailVerification";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-page" element={<LoginForm />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>

  );
}

export default App;

