import React from 'react';

function About() {
  return (
    <section className="about bg-white py-12 px-4 md:px-16" id="about">
      <div className='bg-green-400 border-2 border-red-500 flex justify-center items-center h-24 mb-10'>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
          <span className="text-pink-500">About</span> Us ℹ️
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Video Section */}
        <div className="w-full lg:w-1/2 border-[8px] border-pink-200 rounded-xl shadow-xl overflow-hidden relative">
          <video
            src="src/images/video.mp4"
            loop
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
          <h3 className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-3xl md:text-4xl bg-white bg-opacity-80 px-6 py-3 text-center text-pink-600 font-semibold">
            Delicious Moments Every Day
          </h3>
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-3xl text-gray-800 font-semibold mb-4">Why Choose Us</h3>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            At <span className="font-bold text-pink-600">The Food House</span>, we serve more than just meals—we serve experiences. From authentic flavors to creative dishes, our food is crafted with passion, using only the freshest ingredients.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Whether you're craving traditional recipes or new-age fusion, <span className="font-bold text-pink-600">The Food House</span> is your go-to destination for taste and warmth. With excellent service and a cozy ambiance, we make every meal memorable.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
