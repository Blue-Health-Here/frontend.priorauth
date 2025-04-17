import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 w-full sm:py-5 py-3 z-[999] px-5 md:px-10 ${isScrolled ? "bg-primary-white shadow-md" : "bg-transparent"}`}>
      <header className="flex justify-between items-center">
        <div className="flex-shrink-0">
          <img src="/images/logo.svg" alt="PriorAuth Logo" className="h-7 sm:h-8 lg:h-10" />
        </div>
        <nav className="hidden md:flex justify-center space-x-8 text-primary-navy-blue text-lg">
          {["About", "Services", "FAQs", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative after:content-[''] after:block after:h-[2px] after:bg-primary-navy-blue after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100 after:mt-[0.px]"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="hidden md:block flex-shrink-0">
          <Link to="/login">
            <Button title="Sign In" />
          </Link>
        </div>
        <button
          className="md:hidden text-primary-navy-blue"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-primary-white border border-primary-sky-blue md:hidden py-4 px-5">
            <nav className="flex flex-col space-y-4 text-primary-navy-blue text-sm">
              {["About", "Services", "FAQs", "Contact"].map((item) => (
                <a key={item} href="#" className="hover:text-primary-blue transition-colors">
                  {item}
                </a>
              ))}
              <div className="pt-2">
                <Button title="Sign In" className="w-full" />
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;