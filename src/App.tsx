import OTPVerification from "./pages/auth/OTPVerification";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
      </Routes>
    </Router>

  );
}

export default App;

