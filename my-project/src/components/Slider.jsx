import React, { useEffect, useState } from "react";
import slider1 from "../assets/sliderImages/slider1.jpg";
import slider2 from "../assets/sliderImages/slider2.jpg";
import slider3 from "../assets/sliderImages/slider3.jpg";
import slider4 from "../assets/sliderImages/slider4.jpg";
import slider5 from "../assets/sliderImages/slider5.jpg";

const images = [slider1, slider2, slider3, slider4, slider5];
const slideTexts = [
  {
    heading: "Welcome to Our Platform",
    sub: "Discover powerful features tailored for your success.",
  },
  {
    heading: "Explore Our Features",
    sub: "From smart learning tools to real-time collaboration.",
  },
  {
    heading: "Join Our Community",
    sub: "Thousands of learners trust us for daily growth.",
  },
  {
    heading: "Learn and Grow",
    sub: "Expand your knowledge with interactive courses.",
  },
  {
    heading: "Start Your Journey Today",
    sub: "Don't wait—unlock your potential right now!",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  const goToSlide = (index) => setCurrent(index);

  return (
    <div className="relative w-full">
      {/* Slider Container */}
      <div className="overflow-hidden relative h-48 sm:h-80 md:h-[500px] shadow-xl">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === current
                ? "opacity-100 scale-100 blur-0 z-20"
                : "opacity-0 scale-105 blur-sm z-10"
            }`}
          >
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center text-white px-4">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3">
                {slideTexts[index].heading}
              </h2>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl">
                {slideTexts[index].sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border border-white ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
