import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slidesData } from "../../constants";

const HeroSection: React.FC = () => {
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="px-6 xl:px-12 gap-4 theme-s-padding relative w-full overflow-hidden mx-auto">
      <Slider {...sliderSettings} className="w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className="text-center outline-none !flex items-center justify-between flex-col gap-6 h-full min-h-[350px]"
          >
            <div className="grid grid-cols-1 xl:grid-cols-12">
              <div className="xl:col-span-1"></div>
              <div className="xl:col-span-10">
                <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-8xl font-semibold text-primary-navy-blue leading-tigh select-text">
                  {slide.heading}
                </h1>
              </div>
            </div>

            <img src={slide.image} alt={`Dashboard ${index + 1}`}
              className="max-w-full w-full h-auto md:h-full mt-auto min-h-[280px] object-cover object-left" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
