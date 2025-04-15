import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import CreateIdeaSection from "./CreateIdeaSection";
import FAQAccordion from "./FAQSection";
import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import TestimonialSection from "./TestimonialSection";
import FooterSection from "./FooterSection";
import LoginForm from "../../auth/LoginForm";

const Home: React.FC  = () => {
  return (
    // <HomeLayout>
    //   <div
    //     className="relative w-full md:min-h-screen bg-cover bg-center flex flex-col justify-between pt-20 overflow-hidden"
    //     style={{
    //       backgroundImage: `url(${"/images/herosection-bg-image.jpg"})`,
    //     }}
    //   >
    //     <HeroSection />
    //   </div>
    //   <AboutSection />
    //   <ServiceSection />
    //   <FAQAccordion />
    //   <CreateIdeaSection />
    //   <TestimonialSection />
    //   <ContactSection />
    //   <FooterSection />
    // </HomeLayout>
    <LoginForm />
  );
};

export default Home;
