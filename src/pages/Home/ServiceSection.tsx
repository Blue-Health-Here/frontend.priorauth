import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServiceSection: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const services = [
    {
      id: 1,
      title: "PA Criteria",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
      bgColor: "bg-blue-50",
      imageUrl: "images/serviceslider1.png",
    },
    {
      id: 2,
      title: "CMM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
      bgColor: "bg-yellow-50",
      imageUrl: "images/serviceslider1.png",
    },
    {
      id: 3,
      title: "Analytics",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
      bgColor: "bg-blue-50",
      imageUrl: "images/serviceslider1.png",
    },
    {
      id: 4,
      title: "Consulting",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
      bgColor: "bg-yellow-50",
      imageUrl: "images/serviceslider1.png",
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full pl-8 py-32">
      <div className="grid mb-12 grid-cols-12">
        <div className="col-span-1">
          <span className="text-primary-black font-secondary text-base md:text-lg">
            What We Offer?
          </span>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-8 text-primary-black ">
          <h2 className="text-xl sm:text-3xl md:text-5xl ">Our Services</h2>
          <p className="font-secondary text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus.
          </p>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <div className="flex gap-x-4">
             
            <img
              src="/images/chevronleft.svg"
              alt=""
              onClick={() => sliderRef.current?.slickNext()}
              className="p-2 rounded-2xl border border-tertiary-black hover:bg-quaternary-black"
            />
           <img
              src="/images/chevronright.svg"
              alt=""
              onClick={() => sliderRef.current?.slickPrev()}
              className="p-2 rounded-2xl border border-tertiary-black hover:bg-quaternary-black"
            />
          </div>
        </div>
      </div>

      <Slider ref={sliderRef} {...sliderSettings}>
        {services.map((service) => (
          <div key={service.id} className="mb-8">
            <div className="flex gap-4">
              <div className="rounded-3xl overflow-hidden shadow-md">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className=""
                />
              </div>
              <div
                className={`max-w-[257px] flex flex-col justify-between h-[200px] p-4 rounded-3xl shadow-md ${service.bgColor}`}
              >
                <h3 className="text-md font-semibold mb-2">{service.title}</h3>
                <div className="">
                  <p className="text-secondary-black text-base mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary-navy-blue font-semibold text-sm">
                    <span>Explore More</span>
                    <span className="ml-1">↗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ServiceSection;
