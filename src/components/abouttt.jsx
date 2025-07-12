

import React from 'react';

function abouttt() {
  return (
    <section className="about bg-white py-12 px-4 md:px-16" id="about">
      {/* Header Section */}
      <div className="bg-green-400 border-2 border-red-500 flex justify-center items-center h-24 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
          <span className="text-pink-500">About</span> Us ℹ️
        </h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8">

        {/* Stylish Framed YouTube Video */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-[10px] border-pink-300 bg-black relative pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              src="https://www.youtube.com/embed/dzfOoIdyJRI?autoplay=1&mute=1&loop=1&playlist=dzfOoIdyJRI&controls=0&showinfo=0&modestbranding=1&rel=0"
              title="Delicious Moments Every Day"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className="mt-4 text-center text-2xl text-pink-600 font-bold">
            🍽️ Delicious Moments Every Day
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

export default abouttt

