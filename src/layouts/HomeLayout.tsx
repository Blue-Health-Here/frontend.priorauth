import React from "react";
import Header from "../pages/Home/Header";
import FooterSection from "../pages/Home/FooterSection";

const HomeLayout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary-white ">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      <FooterSection />
      {/* Footer */}
      {/* <footer className="w-full py-4 text-center">
        <p>&copy; 2025 Prior Auth. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default HomeLayout;