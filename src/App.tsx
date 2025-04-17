import Home from "./pages/Home";
import LoginForm from "./auth/LoginForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OTPVerification from "./auth/EmailVerification";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>

  );
}

export default App;

