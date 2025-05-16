import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { services } from "../../utils/constants";

const ServiceSection: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="w-full py-20 md:py-32" id="services">
      <div className="grid mb-12 grid-cols-12 px-4 sm:px-8">
        <div className="col-span-12 lg:col-span-1">
          <span className="text-primary-black font-secondary text-sm sm:text-base md:text-lg">
            What We Offer?
          </span>
        </div>
        <div className="hidden sm:block lg:col-span-1"></div>
        <div className="col-span-12 md:col-span-7 lg:col-span-8 text-primary-black mt-4 sm:mt-0">
          <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold">Our Services</h2>
          <p className="font-secondary text-sm md:text-base mt-2">
          PriorAuth offers a comprehensive suite of services designed to help individuals and organizations build custom applications, 
          streamline workflows, and scale operations efficiently. Here's an overview of its key services:
          </p>
        </div>
        <div className="hidden sm:block lg:col-span-1"></div>
        <div className="col-span-12 md:col-span-2 lg:col-span-1 ">
        <div className="flex gap-x-2 md:gap-x-4 mt-6 md:mt-0">
            <img
              src="/images/chevronleft.svg"
              alt=""
              onClick={() => sliderRef.current?.slickPrev()}
              className="p-1 md:p-2 rounded-lg border border-tertiary-black hover:bg-quaternary-black cursor-pointer"
            />
            <img
              src="/images/chevronright.svg"
              alt=""
              onClick={() => sliderRef.current?.slickNext()}
              className="p-1 md:p-2 rounded-lg border border-tertiary-black hover:bg-quaternary-black cursor-pointer"
            />
          </div>
        </div>
      </div>
           
      <div className="pl-4 md:pl-8 pr-0">
        <div className="overflow-visible">
          <Slider ref={sliderRef} {...sliderSettings}>
            {services.map((service) => (
              <div key={service.id} className="mb-8 pr-4 select-text">
                <div className="sm:grid grid-cols-5 gap-4 flex flex-col">
                  <div className="col-span-3 rounded-3xl overflow-hidden shadow-md min-h-80 max-h-80">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover  min-h-80 max-h-80"
                    />
                  </div>
                  <div
                    className={`col-span-2 flex flex-col justify-between text-sm md:text-base p-4 rounded-3xl shadow-md ${service.bgColor} h-auto md:h-48 lg:h-52`}
                  >
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <div className="flex flex-col justify-between flex-grow">
                      <p className="text-secondary-black line-clamp-3 md:line-clamp-4 lg:line-clamp-5">
                        {service.description}
                      </p>
                      <a 
                        href="#"
                        className="flex items-center gap-x-3 text-primary-navy-blue font-semibold mt-2">
                        <span>Explore More</span>
                        <img
                          src="/right-up-arrow.svg"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;