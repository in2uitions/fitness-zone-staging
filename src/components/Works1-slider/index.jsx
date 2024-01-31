import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { image_url } from "../../../global_vars";
// import "swiper/css";
// import "swiper/css/pagination";
SwiperCore.use([Autoplay, Pagination]);
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Split from "../Split";
// const Works1Slider = ({ data = {} }) => {
class Works1Slider extends React.Component {
  constructor(props) {
    super(props);
  }
  // renderArrows = () => {
  //   return (
  //     <div className="arrows">
  //       <div
  //         onClick={() => this.slider.slickNext()}
  //         className="next cursor-pointer"
  //       >
  //         <span className="pe-7s-angle-right"></span>
  //       </div>
  //       <div
  //         onClick={() => this.slider.slickPrev()}
  //         className="prev cursor-pointer"
  //       >
  //         <span className="pe-7s-angle-left"></span>
  //       </div>
  //     </div>
  //   );
  // };
  // componentDidMount() {
  //   removeOverlay();
  //   parallaxie('.testimonials.bg-img.parallaxie');
  // }
  render() {
    const { data } = this.props;
    return (
      <section
        className={`testimonials ${this.props.subBgLftstl ? "sub-bg lftstl" : ""} ${this.props.withBG ? "bg-img" : ""} ${this.props.parallaxie ? "parallaxie" : ""} ${!this.props.overlay ? "noOverlay" : ""}`}
        style={{ paddingBottom: "120px" }}

      >
        <div className=" position-re">
          <div className="sec-head custom-font text-center">
            <h3 className="wow words chars splitting" data-splitting>
              {data.title}
            </h3>
          </div>
          <div
            className="row mobileRow"
          >
            <div className="col-lg-12 no-padding">
              <Slider
                className="slic-item"
                {...{
                  ref: (c) => (this.slider = c),
                  dots: true,
                  infinite: true,
                  arrows: true,
                  centerMode: true,
                  centerPadding: "0",
                  autoplay: true,
                  rows: 1,
                  slidesToScroll: 1,
                  slidesToShow: 1.75,

                }}
                responsive={[
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                    }
                  },
                ]}
              >
                {data.carousel.map((item, i) => (
                  <div key={item.id} className="custom-slide">
                    <div
                      className="content wow noraidus fadeInUp"
                      data-wow-delay=".3s"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="item-img bg-img wow "
                        style={{
                          backgroundImage: `url(${image_url}${item.comp_carousel_items_id?.image?.id})`,
                          position: 'relative',
                          height: "480px",
                          width: "100%"
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
                        <a style={{ marginTop: "1.25rem", background: "#1990DF", borderRadius: '5px', padding: '10px' }} href={item.comp_carousel_items_id.button_url}>{item.comp_carousel_items_id.button_title}</a>
                        {/* <p>
                            {slide.secTex}
                          </p> */}
                      </div>
                    </div>
                  </div>
                ))}


              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Works1Slider;


