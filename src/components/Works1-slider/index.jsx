import React from "react";
import works1SliderData from "../../data/sections/works1Slider.json";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
SwiperCore.use([Autoplay, Pagination]);

const Works1Slider = () => {
  return (
    <section
    className="work-carousel section-padding pt-0 metro position-re"
    style={{
      position: 'relative',
    }}
  >
    <div
      className="swiper-background" // Add a new class for the background image
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("aa.png")',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
      }}
    ></div>
      <div className="container ontop">
        <div className="sec-head custom-font text-center">
          <h3 className="wow words chars splitting" data-splitting>
            CLUBS
          </h3>
          <h6 className="wow fadeIn" data-wow-delay=".5s">
            ZONES AROUND THE WORLD
          </h6>
          <span className="tbg">Services</span>
        </div>
        <div className="row">
          <div className="col-lg-12 no-padding">
            <div className="swiper-container">
              <Swiper
                className="swiper-wrapper"
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                pagination={{ clickable: true }} // Enable pagination dots
                // autoplay={{
                //   delay: 2500,
                //   disableOnInteraction: false,
                // }}
                // speed={1000}
                // breakpoints={{
                //   320: {
                //     slidesPerView: 1,
                //     spaceBetween: 0,
                //   },
                //   640: {
                //     slidesPerView: 1,
                //     spaceBetween: 0,
                //   },
                //   767: {
                //     slidesPerView: 1,
                //     spaceBetween: 0,
                //     centeredSlides: false,
                //   },
                //   991: {
                //     slidesPerView: 2,
                //   },
                // }}
              >
                {works1SliderData.map((slide) => (
                  <SwiperSlide key={slide.id} className="swiper-slide">
                    <div
                      className="content wow noraidus fadeInUp"
                      data-wow-delay=".3s"
                    >
                      <div
                        className="item-img bg-img wow imago"
                        style={{
                          backgroundImage: `url(${slide.image})`,
                        }}
                      ></div>
                      <div className="cont">
                        <h6 className="color-font">
                          {/* <Link href="/works/works-dark">{slide.title}</Link> */}
                        </h6>
                        <h4>
                          {/* <Link href="/project-details2/project-details2-dark">
                            {slide.secTex}
                          </Link> */}
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works1Slider;
