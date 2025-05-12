import HomeLayout from "../../layouts/HomeLayout";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import CreateIdeaSection from "./CreateIdeaSection";
import FAQAccordion from "./FAQSection";
import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import TestimonialSection from "./TestimonialSection";

const Home: React.FC = () => {
  return (
    <HomeLayout>
      <div 
        id="hero"
        className="relative w-full bg-cover bg-center flex flex-col justify-end pt-20 overflow-hidden lg:min-h-screen max-h-screen"
        style={{
          backgroundImage: `url(${"/images/herosection-bg-image.jpg"})`,
        }}
      >
        <HeroSection />
      </div>
      <AboutSection />
      <ServiceSection />
      <FAQAccordion />
      <CreateIdeaSection />
      <TestimonialSection />
      <ContactSection />
    </HomeLayout>
  );
};

export default Home;
