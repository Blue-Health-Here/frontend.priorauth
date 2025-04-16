import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { brands } from '../../constants';

const BrandSlider: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className="w-full px-10  bg-quaternary-sky-blue">
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <div key={index}>
              <div className="flex items-center justify-center h-24">
                <img 
                  src={brand} 
                  alt={`Brand ${index + 1}`} 
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
  );
};

export default BrandSlider;