import React from 'react';
import logo from "../../assets/images/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="PriorAuth Logo" className="h-10" />
      </div>
      <nav className="hidden md:flex space-x-8 text-primary-navy-blue text-lg">
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">FAQs</a>
        <a href="#">Contact</a>
      </nav>
      <button className="text-primary-white bg-primary-navy-blue px-4 py-1 rounded-md text-sm font-semibold shadow">
        Sign In
      </button>
    </header>
  );
};

export default Header;
