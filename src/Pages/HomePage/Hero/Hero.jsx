import React from "react";

function Hero() {
  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh] flex items-center justify-center overflow-hidden">
      <img
        src="https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_1280.jpg"
        alt="contest banner"
        className="absolute inset-0 w-full h-full object-cover animate-zoomSlow"
      />

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative z-10 text-center max-w-3xl px-5">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-xl animate-fadeUp">
          Explore. Create.
          <span className="text-blue-400"> Win Contests.</span>
        </h1>

        <p className="text-gray-200 mt-5 text-lg md:text-xl animate-fadeUp animation-delay-300">
          Discover creative contests, join with talent, and achieve greatness.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <div
            className="
            bg-white/20 backdrop-blur-xl shadow-2xl 
            flex items-center gap-3 w-full md:w-[550px] 
            border border-white/30 rounded-full p-2 
            hover:bg-white/30 transition-all
          "
          >
            <input
              type="text"
              placeholder="🔍 Search contests (design, article, gaming...)"
              className="
                w-full bg-transparent text-white 
                placeholder-gray-200 px-4 py-2 
                focus:outline-none
              "
            />
            <button
              className="
              bg-blue-500 hover:bg-blue-600 
              text-white px-6 py-2 
              rounded-full font-semibold 
              transition-all shadow-lg
            "
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
