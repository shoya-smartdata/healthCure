import React from "react";
import CountUp from "react-countup";

const HomeCounts = () => {
  return (
    <section className="flex flex-wrap bg-gray-100 justify-evenly items-center mt-40">
      <div className="flex flex-col justify-center items-center bg-white w-64 h-64 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
        <CountUp
          start={0}
          end={1000}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="text-5xl font-semibold text-teal-500">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="text-xl font-semibold text-teal-600 text-center mt-4">
          Satisfied <br /> Patients
        </span>
      </div>

      <div className="flex flex-col justify-center items-center bg-white w-64 h-64 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
        <CountUp
          start={0}
          end={250}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="text-5xl font-semibold text-teal-500">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="text-xl font-semibold text-teal-600 text-center mt-4">
          Verified <br /> Doctors
        </span>
      </div>

      <div className="flex flex-col justify-center items-center bg-white w-64 h-64 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
        <CountUp
          start={0}
          end={75}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="text-5xl font-semibold text-teal-500">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="text-xl font-semibold text-teal-600 text-center mt-4">
          Specialist <br /> Doctors
        </span>
      </div>
    </section>
  );
};

export default HomeCounts;
