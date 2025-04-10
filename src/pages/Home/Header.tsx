import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";

const Header: React.FC = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 w-full sm:py-5 py-3 z-[999] px-5 md:px-10 ${isScrolled ? "bg-primary-white shadow-md" : "bg-transparent"}`}>
      <header className="grid grid-cols-12 justify-center items-center">
        <div className="col-span-4">
          <img src="/images/logo.svg" alt="PriorAuth Logo" className="h-10" />
        </div>
        <div className="col-span-4">
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
        </div>
        <div className="hidden md:flex col-span-4 ml-auto">
         <Button title="Sign In"/>
        </div>
      </header>
    </div>
  );
};

export default Header;
