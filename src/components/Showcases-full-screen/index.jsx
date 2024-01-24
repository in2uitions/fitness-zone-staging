import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import ShowcassesFullScreenData from "../../data/showcases-full-screen-slider.json";
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  Parallax,
  Mousewheel,
} from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import parse from "html-react-parser";
import { image_url } from '../../../global_vars';

SwiperCore.use([Navigation, Autoplay, Pagination, Parallax, Mousewheel]);

const ShowcasesFullScreen = ({data={}}) => {
  return (
    <section className="slider showcase-full block-sec section-padding">
      <div className="swiper-container parallax-slider">
        <Swiper
          speed={1000}
          className="swiper-wrapper"
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {data.gx_classes_components.map((slide) => (
            <SwiperSlide key={slide.id} className="swiper-slide">
              <div
                className="valign"
                // data-overlay-dark="4"
              >
                <div
                  className="container"
                  style={{
                    width: "100%",
                    paddingLeft: "15px",
                    marginRight: "unset",
                    paddingRight: "unset",
                    marginLeft: "auto",
                  }}
                >
                  <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-lg-4" style={{ position: "relative" }}>
                      <div
                        className="caption"
                        style={{ position: "absolute", zIndex: "22" }}
                      >
                        <h1>
                          <Link href="/project-details2/project-details2-dark">
                            <a style={{ display: "flex", gap: "10px" }}>
                              <div     
                                style={{
                                  color: "#0090DF",
                                  fontFamily: "Montserrat Bold",
                                }}
                              >
                                {slide.gx_classes_components_id.title[0]?.first}
                              </div>
                              <span
                                style={{ fontFamily: "Montserrat Regular" }}
                              >
                                {slide.gx_classes_components_id.title[0]?.second}
                              </span>
                            </a>
                          </Link>
                        </h1>
                        <p
                          style={{
                            color: "white",
                            fontSize: "21px",
                            fontFamily: "Montserrat Regular",
                            lineHeight: "1",
                          }}
                        >
                           {parse(`${slide.gx_classes_components_id.brief}`)}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-8 ">
                      <div className="caption">
                        {/* <img src={slide.image} /> */}
                        <img src={`${image_url}${slide.gx_classes_components_id.image?.id}`} alt={`${slide.gx_classes_components_id?.title}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ShowcasesFullScreen;
