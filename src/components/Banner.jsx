import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Keyboard } from "swiper/modules";
import Slide from "./Slide";

export default function Banner() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      modules={[Pagination, Navigation, Keyboard]}
      className="mySwiper"
      aria-label="Visa Navigator Carousel"
    >
      <SwiperSlide>
        <Slide
          title="Explore, Learn and Grow"
          subtitle="Discover a world of knowledge with our extensive collection of
            books."
        />
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          title="Simple, Fast, Convenient"
          subtitle="With Just a click, borrow your favorite books and track their dates effortlessly."
        />
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          title="Become a Member Today"
          subtitle="Join our community of book enthusiasts and unleash your reading journey."
        />
      </SwiperSlide>
    </Swiper>
  );
}
