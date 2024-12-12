import React from "react";
import { useTheme } from "../middleware/ThemeContext"; // Import the theme context
import AboutUs from "./AboutUs";
import HomeCounts from "./HomeCountes";
import Chat from "./Chat";

const Hero = () => {
  const { theme } = useTheme(); // Get the current theme

  return ( 
    <>
      <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} w-full `}>
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Hero Content */}
          <div className={`text-center md:text-left ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Your Health, <br />
              <span className="text-indigo-600">Our Responsibility</span>
            </h1>
            <p className={`mt-6 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              tenetur doloremque molestias repellat minus asperiores in aperiam
              dolor, quaerat praesentium.
            </p>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <button className="px-6 py-3 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700">
                Get Started
              </button>
              <button className={`px-6 py-3 ${theme === 'dark' ? 'text-indigo-600 border-indigo-600' : 'text-indigo-600 border border-indigo-600'} rounded-md hover:bg-indigo-50`}>
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={'./hero.jpg'}
              alt="Hero"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <AboutUs />
        <HomeCounts />
      </section>
      <Chat/>
    </>
  );
};

export default Hero;
