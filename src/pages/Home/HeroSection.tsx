import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slidesData } from "../../constants";

const HeroSection: React.FC = () => {
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="px-12 pt-12 gap-4 theme-s-padding relative w-full overflow-hidden mx-auto">
      <Slider {...sliderSettings} className="w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className="text-center outline-none !flex items-center justify-between flex-col gap-6 h-full"
          >
            <div className="grid grid-cols-1 xl:grid-cols-12">
              <div className="xl:col-span-1"></div>
              <div className="xl:col-span-10">
                <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-8xl font-semibold text-blue-900 leading-tight">
                  Automate Specialty Medication Workflows.
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-auto">
              <div className="col-span-1"></div>
              <div className="col-span-10">
                {" "}
                <img
                  src={slide.image}
                  alt={`Dashboard ${index + 1}`}
                  className="max-w-full w-full mt-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
