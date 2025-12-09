import React from "react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const data = [
  {
    title: "Where Ideas Turn",
    title2: "Into Winners",
    subtitle:
      "Host contests, showcase talent and discover amazing creativity in one powerful platform.",
    image:
      "https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_1280.jpg",
  },
  {
    title: "The Ultimate Platform for",
    title2: "Creative Competitions",
    subtitle:
      "Create contests, invite participants, judge submissions — manage everything seamlessly.",
    image:
      "https://img.freepik.com/free-photo/colombian-national-soccer-team-concept-still-life_23-2150257157.jpg?semt=ais_hybrid&w=740&q=80",
  },

  {
    title: "Your Creativity.",
    title2: "Our Platform.",
    subtitle:
      "From contest creation to judging, we make the journey smooth, fun and rewarding.",
    image: "https://citizenbest.com/wp-content/uploads/2020/09/cb-blog3.jpg",
  },
  {
    title: "Join the Creative",
    title2: "Revolution",
    subtitle:
      "Compete, display your skills, and get recognized by a global community.",
    image:
      "https://www.hillsdale.edu/wp-content/uploads/2016/02/Creativity.jpg",
  },
];

function Hero({ setSearch }) {
  const handleSetSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };
  return (
    <div className="relative w-full h-[500px] md:h-[650px] lg:h-[690px] overflow-hidden md:rounded-4xl">
      <div className="absolute inset-0 w-full h-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 4000, 
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {data.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="text-center w-full h-[500px] md:h-[650px] lg:h-[690px] flex flex-col items-center justify-start"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="w-full h-full absolute bg-black/40 z-10 blur-3xl"></div>
                <div className="mt-[10%] z-20">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-xl animate-fadeUp">
                    {slide.title}
                    <span className="text-blue-400"> {slide.title2}</span>
                  </h1>

                  <p className="text-white mt-5 text-lg md:text-xl animate-fadeUp animation-delay-300">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm "></div>

      <div className="absolute bottom-10 md:bottom-[100px] lg:bottom-[200px] left-1/2 -translate-x-1/2 z-10 w-full max-w-[550px] px-5">
        <form onSubmit={handleSetSearch}>
          <div
            className="
            bg-white/20 backdrop-blur-xl shadow-2xl 
            flex items-center gap-3 w-full 
            border border-white/30 rounded-full p-2 
            hover:bg-white/30 transition-all
          "
          >
            <input
              type="text"
              name="search"
              placeholder="🔍 Search contests (design, article, gaming...)"
              className="
              w-full bg-transparent text-white 
              placeholder-gray-200 px-4 py-2 
              focus:outline-none
            "
            />
            <button
              type="submit"
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
        </form>
      </div>
    </div>
  );
}

export default Hero;
