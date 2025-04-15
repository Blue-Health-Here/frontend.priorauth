import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  return (
    <div className="flex h-screen w-full">
    <div className="w-1/2 flex flex-col justify-between pt-10 pl-10 bg-white">
      <div className="self-start mb-8">
        <img 
          src="/images/logo.svg" 
          alt="Prior Auth Support Logo" 
        />
      </div>
      
      <div className="flex-grow flex flex-col justify-center w-full max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back to, Prior Auth</h1>
          <p className="text-gray-500 text-sm">Welcome back! Please enter your details.</p>
        </div>
        
        <form className="w-full">
          <div className="mb-6 relative">
            <label 
              htmlFor="email" 
              className={`absolute transition-all duration-200 ${
                emailFocused || email ? 'text-xs text-gray-500 top-0' : 'text-sm text-gray-500 top-7'
              }`}
            >
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              className="w-full border-b border-gray-300 pb-2 pt-6 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </div>
          
          <div className="mb-4 relative">
            <label 
              htmlFor="password" 
              className={`absolute transition-all duration-200 ${
                passwordFocused || password ? 'text-xs text-gray-500 top-0' : 'text-sm text-gray-500 top-7'
              }`}
            >
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              className="w-full border-b border-gray-300 pb-2 pt-6 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="mr-2"
              />
              <label htmlFor="remember" className="text-xs text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-xs text-pink-500 hover:underline">Forgot Password?</a>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-900 text-white py-2 rounded-md mb-6 hover:bg-blue-800 font-medium"
          >
            Login
          </button>
          
          <div className="text-center text-xs text-gray-600">
            Don't have an account? <a href="#" className="text-blue-900 font-medium hover:underline">Sign up for free</a>
          </div>
        </form>
      </div>
      
      <div className="h-8">
      </div>
    </div>
    
    {/* Right side - Image */}
    <div className="w-1/2">
      <img 
        src="/images/contact-section.png" 
        alt="Hands holding each other" 
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  );
};

export default LoginForm;
