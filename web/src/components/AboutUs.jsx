import React from "react";
import { useTheme } from "../middleware/ThemeContext"; // Import the theme context

const AboutUs = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} container-fluid mx-auto px-4 py-8`}>
      <h2 className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-8`}>About Us</h2>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src={'./about.jpg'}
            alt="About Us"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        {/* Content Section */}
        <div className={`flex-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            tenetur doloremque molestias repellat minus asperiores in aperiam
            dolor, quaerat praesentium. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatibus, repudiandae! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Provident quibusdam doloremque
            ex? Officia atque ab dolore? Tempore totam non ea!
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            We strive to deliver the best services to our clients by ensuring
            their utmost satisfaction. Our team is dedicated to excellence and
            innovation in every aspect of what we do.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
