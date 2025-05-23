import React, { useRef } from "react";
import Slider from "react-slick";
import { testimonials } from "../../utils/constants";

const TestimonialSection: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    pauseOnHover: true,
  };

  return (
    <div className="py-8 md:py-16 lg:py-32">
      <div className="grid grid-cols-12 gap-2 md:gap-4">
        <div className="col-span-1 hidden md:block"></div>
        <div className="col-span-6 md:col-span-1 pl-6 md:pl-0">
          <div className="flex gap-x-2 md:gap-x-4">
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
        <div className="col-span-0 md:col-span-2 hidden md:block"></div>
        <div className="col-span-6 md:col-span-1 flex justify-end md:justify-start pr-6 md:pr-0">
          <img src="/images/double-qotes-icon.svg" alt="" className="w-8 md:w-auto" />
        </div>
      </div>

      <div className="grid grid-cols-12 overflow-hidden mt-6 md:mt-12 lg:mt-16">
        <div className="col-span-12">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="focus:outline-none select-auto">
                <div className="grid grid-cols-12 gap-2 md:gap-4">
                  <div className="col-span-0 md:col-span-1 hidden md:block"></div>

                  <div className="col-span-12 md:col-span-3 px-6 md:px-0">
                    {testimonial.profileLink ? (
                      <a
                        href="#"
                        aria-label={`View ${testimonial.name}'s profile`}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity max-w-[350px] min-h-[350px] max-h-[350px] m-auto"
                        />
                      </a>
                    ) : (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-lg  max-w-[350px] min-h-[350px] max-h-[350px] m-auto"
                      />
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-7 flex flex-col h-full px-6 md:px-0 mt-4 md:mt-0 relative">
                    <p className="text-secondary-black text-base sm:text-lg md:text-xl lg:text-2xl font-secondary select-text">
                      {testimonial.content}
                    </p>
                    <div className="mt-10 flex gap-y-3 flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        {testimonial.profileLink ? (
                          <a
                            href="#"
                            aria-label={`View ${testimonial.name}'s profile`}
                          >
                            <h3 className="font-semibold text-lg sm:text-xl md:text-3xl bot text-primary-black select-text">
                              {testimonial.name}
                            </h3>
                          </a>
                        ) : (
                          <h3 className="font-semibold text-lg sm:text-xl md:text-3xl bot text-primary-black select-text">
                            {testimonial.name}
                          </h3>
                        )}
                        <p className="text-secondary-black text-base sm:text-lg md:text-xl lg:text-2xl font-secondary select-text">
                          {testimonial.designation}
                        </p>
                      </div>
                      {testimonial.companyLink ? (
                        <a
                          href="#"
                          target="_blank"
                          className="absolute bottom-0 right-6 md:right-0"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${
                            testimonial.company || "company"
                          } website`}
                        >
                          <img
                            src="/images/Group-icon.svg"
                            alt={testimonial.company || "Company logo"}
                            className="hover:opacity-90 transition-opacity h-16 md:h-32 w-auto"
                          />
                        </a>
                      ) : (
                        <img src="/images/Group-icon.svg" alt="" className="h-16 md:h-32 w-auto"/>
                      )}
                    </div>
                  </div>

                  <div className="col-span-0 md:col-span-1 hidden md:block"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;