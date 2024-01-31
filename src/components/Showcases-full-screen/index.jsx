import React from "react";
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
      <div className="">
      
          {data.gx_classes_components.map((slide) => (
              <div
                className="valign"
                // data-overlay-dark="4"
              >
                <div
                  className="container"
                >
                  <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-lg-5" style={{ position: "relative" }}>
                      <div
                        className="caption"
                        style={{ position: "absolute", zIndex: "22" }}
                      >
                        <h1>
                          <div href="/">
                            <a className="gxTitle" style={{ display: "flex", gap: "10px" }}>
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
                          </div>
                        </h1>
                        <p
                           className="gxBrief"  
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
                    <div className="col-lg-6 offset-lg-1 valign">
                      <div className="caption">
                        {/* <img src={slide.image} /> */}
                        <img src={`${image_url}${slide.gx_classes_components_id.image?.id}`} alt={`${slide.gx_classes_components_id?.title}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ))}
      </div>
      <div style={{display:"flex", justifyContent:"center"}}><a href="/about/Gx-classes" style={{background:"#0090df", padding:"10px", borderRadius:"5px", cursor:"pointer",marginTop:"3rem"}}>VIEW CLASSES</a></div>
    </section>
  );
};

export default ShowcasesFullScreen;
