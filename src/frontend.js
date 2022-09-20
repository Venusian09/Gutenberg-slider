import React from "react";
import ReactDOM from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./frontend.scss";

const slides = document.querySelectorAll(".slides");

slides.forEach((slide) => {
  const data = JSON.parse(slide.dataset.json);
  ReactDOM.render(<Slide {...data} />, slide);
  slide.dataset.json = "";
});
function Slide(props) {
  return (
    <Swiper
      pagination={props.pagination}
      slidesPerView={props.slidesPerView}
      modules={[Pagination]}
      className="mySwiper slider"
    >
      {props.slides.map((slide) => {
        console.log(slide);
        return (
          <SwiperSlide style={{ backgroundColor: slide.bgColor }}>
            <div className={`slider__single-slide`}>
              <h3 style={{ textAlign: props.theAligment }}>{slide.title}</h3>
              <p style={{ textAlign: props.theAligment }}>
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
