import HomeLayout from "../../layouts/HomeLayout";
import AboutSection from "./AboutSection";
import CreateIdeaSection from "./CreateIdeaSection";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <HomeLayout>
      <div
        className="relative w-full md:min-h-screen bg-cover bg-center flex flex-col justify-between pt-20 overflow-hidden"
        style={{
          backgroundImage: `url(${"/images/herosection-bg-image.jpg"})`,
        }}
      >
        <HeroSection />
      </div>
      <AboutSection />
      <CreateIdeaSection />
    </HomeLayout>
  );
};

export default Home;
