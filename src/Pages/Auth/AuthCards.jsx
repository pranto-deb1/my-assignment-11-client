import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";

const AuthCards = () => {
  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[EffectCards, Autoplay]}
        className="mySwiper authcards"
      >
        <SwiperSlide className="authSlide">Slide 1</SwiperSlide>
        <SwiperSlide className="authSlide">Slide 2</SwiperSlide>
        <SwiperSlide className="authSlide">Slide 3</SwiperSlide>
        <SwiperSlide className="authSlide">Slide 4</SwiperSlide>
        <SwiperSlide className="authSlide">Slide 5</SwiperSlide>
        <SwiperSlide className="authSlide">Slide 6</SwiperSlide>
        <SwiperSlide className="authSlide">Slide 7</SwiperSlide>
        <SwiperSlide className="authSlide">Slide 8</SwiperSlide>
        <SwiperSlide className="authSlide">Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AuthCards;
