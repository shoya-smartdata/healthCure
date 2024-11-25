import React from "react";
import CountUp from "react-countup";
import { useTheme } from "../middleware/ThemeContext"; // Import theme context

const HomeCounts = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <section
      className={`flex flex-wrap justify-evenly items-center${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
    >
      {/* Satisfied Patients */}
      <div
        className={`flex flex-col justify-center items-center w-64 h-64 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-white'
        }`}
      >
        <CountUp
          start={0}
          end={1000}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className={`text-5xl font-semibold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-500'}`}>
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span
          className={`text-xl font-semibold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-600'} text-center mt-4`}
        >
          Satisfied <br /> Patients
        </span>
      </div>

      {/* Verified Doctors */}
      <div
        className={`flex flex-col justify-center items-center w-64 h-64 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-white'
        }`}
      >
        <CountUp
          start={0}
          end={250}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className={`text-5xl font-semibold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-500'}`}>
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span
          className={`text-xl font-semibold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-600'} text-center mt-4`}
        >
          Verified <br /> Doctors
        </span>
      </div>

      {/* Specialist Doctors */}
      <div
        className={`flex flex-col justify-center items-center w-64 h-64 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-white'
        }`}
      >
        <CountUp
          start={0}
          end={75}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className={`text-5xl font-semibold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-500'}`}>
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span
          className={`text-xl font-semibold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-600'} text-center mt-4`}
        >
          Specialist <br /> Doctors
        </span>
      </div>
    </section>
  );
};

export default HomeCounts;
