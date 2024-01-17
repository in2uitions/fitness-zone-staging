import React from "react";
import works1SliderData from "../../data/sections/works1Slider.json";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import Link from "next/link";
import parse from "html-react-parser";
import { image_url } from "../../../global_vars";
import "swiper/css";
import "swiper/css/pagination";
SwiperCore.use([Autoplay, Pagination]);

const Works1Slider = ({ data = {} }) => {
  return (
    <section
      className="work-carousel section-padding pt-0 metro position-re"
      style={{
        position: 'relative',
      }}
    >

      <div className="container ontop">
        <div className="sec-head custom-font text-center">
          <h3 className="wow words chars splitting" data-splitting>
            {data.title}
          </h3>
          <h6 className="wow fadeIn subtitle" data-wow-delay=".5s">
            {parse(`${data.subtitle}`)}
          </h6>
          {/* <span className="tbg">Services</span> */}
        </div>
        <div className="row">
          <div className="col-lg-12 no-padding">
            <div className="swiper-container" style={{ display: "flex" }}>
              <img src="/CarouselSides.svg" style={{
                width: "130px",
                position: "absolute",
                height: "100%",
                zIndex: 99, left: "-6rem"
              }} />
              <Swiper
                className="swiper-wrapper"
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                pagination={{ clickable: true }} // Enable pagination dots
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                speed={1000}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  767: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    centeredSlides: false,
                  },
                  991: {
                    slidesPerView: 2,
                  },
                }}
              >
               {data.carousel.map((item, i) => (
                  <SwiperSlide key={item.id} className="swiper-slide">
                    <div
                      className="content wow noraidus fadeInUp"
                      data-wow-delay=".3s"
                    >
                      <div
                        className="item-img bg-img wow "
                        style={{
                          backgroundImage: `url(${image_url}${item.comp_carousel_items_id?.image?.id})`,
                          position: 'relative',
                        }}
                      >
                        <div
                          className="overlay"
                          style={{
                            background: 'rgba(0, 0, 0, 0.5)', 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                          }}
                        ></div>
                      </div>

                      <div className="cont" style={{ position: "absolute", top: "0px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
                          <p style={{ color: "white", fontSize: "21px", fontWeight: "bold" }}>{item.comp_carousel_items_id?.title}</p>
                          <a style={{marginTop:"1.25rem", background:"#1990DF", borderRadius:'5px', padding:'10px'}} href={item.comp_carousel_items_id.button_url}>{item.comp_carousel_items_id.button_title}</a>
                          {/* <p>
                            {slide.secTex}
                          </p> */}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <img src="/CarouselSides.svg" style={{
                width: "130px",
                position: "absolute",
                height: "100%",
                zIndex: 99, right: "-6rem"
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works1Slider;

