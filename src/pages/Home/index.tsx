  import HomeLayout from "../../layouts/HomeLayout";
  import AboutSection from "./AboutSection";
  import CreateIdeaSection from "./CreateIdeaSection";
  import FAQAccordion from "./FAQSection";
  import HeroSection from "./HeroSection";

  const Home = () => {
    return (
      <HomeLayout>
        <div
          className="relative w-full bg-cover bg-center flex flex-col justify-between pt-20 overflow-hidden"
          style={{
            backgroundImage: `url(${"/images/herosection-bg-image.jpg"})`,
          }}
        >
        <HeroSection />
        </div>
        <AboutSection />
        <FAQAccordion />
        <CreateIdeaSection />
      </HomeLayout>
    );
  };

  export default Home;
