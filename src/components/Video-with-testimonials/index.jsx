/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import parse from "html-react-parser";
import { image_url } from "../../../global_vars";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

const VideoWithTestimonials = ({data={}}) => {
  const [isOpen, setOpen] = React.useState(false);
  React.useEffect(() => {
    console.clear();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div style={{ position: "relative" }}>
      <section className="block-sec">
        <div
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: -1,
            marginBottom: "-10rem"
          }}
        >
          <img src="/circle.svg" style={{ height: "20%", width: "20%" }} />
          <p style={{ position: "absolute", fontSize: "36px", top: "4rem", letterSpacing: "10px", color: "white" }}>
            {data?.global_title[0]?.first} <bold style={{ fontWeight: "bold" }}>{data?.global_title[0]?.second}</bold>
          </p>
        </div>
      </section>
      <section
        className="block-sec"
        style={{
          backgroundImage: `url(${image_url}${data?.image?.id})`,
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "10",
        }}
      >
        <div
        // className="background bg-img section-padding pb-0"
        // style={{ backgroundImage: `url(/img/slid/1.jpg)` }}
        // data-overlay-dark="8"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="vid-area"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "4rem"
                  }}
                >
                  <div className="vid-icon">
                    {typeof window !== "undefined" && (
                      <ModalVideo
                        channel="vimeo"
                        autoplay
                        isOpen={isOpen}
                        videoId="127203262"
                        onClose={() => setOpen(false)}
                      />
                    )}
                    <a
                      className="vid"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                      }}
                      href="https://vimeo.com/127203262"
                    >
                      <div className="vid-butn">
                        <span className="icon">
                          <i
                            className="fas fa-play"
                            style={{ color: "#009FE3" }}
                          ></i>
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="cont">
                    <Split>
                      <h3 className="wow" data-splitting>
                      {data.image_title}
                      </h3>
                    </Split>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="testim-box">
                  <div className="head-box">
                    <h6 className="wow fadeIn" data-wow-delay=".5s">
                      KNOW US THROUGH
                    </h6>
                    <h4 className="wow fadeInLeft" data-wow-delay=".5s">
                      OUR PEOPLE&apos;S WORDS?
                    </h4>
                  </div>
                  <Slider
                    {...settings}
                    className="slic-item wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                      {data.sliders.map((item, i) => (
                    <div className="item">
                
                    <>
                      <p>
                      {parse(`${item.sliders_id?.description}`)}
                        {/* Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet */}
                      </p>
                      <div className="info">
                        <div className="img">
                          <div className="img-box">
                            <img src={`${image_url}${item.sliders_id?.icon?.id}`} alt="" />
                          </div>
                        </div>
                        <div className="cont">
                          <div className="author">
                            <h6 className="author-name custom-font">
                              {/* Sir William Doe */}
                              {item.sliders_id?.title}
                              
                            </h6>
                            <span className="author-details">
                              {/* CEO of The Merch , Founder, <br></br> Researcher,
                              Leader. */}
                              {parse(`${item.sliders_id?.side_description}`)}
                            </span>
                          </div>
                        </div>
                      </div>
                      </>
                  
                    </div>
                    ))}
                    {/* <div className="item">
                      <p>
                        Nulla metus metus ullamcorper vel tincidunt sed euismod
                        nibh volutpat velit class aptent taciti sociosqu ad
                        litora.
                      </p>
                      <div className="info">
                        <div className="img">
                          <div className="img-box">
                            <img src="/img/clients/2.jpg" alt="" />
                          </div>
                        </div>
                        <div className="cont">
                          <div className="author">
                            <h6 className="author-name custom-font">
                              Alex Regelman
                            </h6>
                            <span className="author-details">
                              Co-founder, Colabrio
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <p>
                        Nulla metus metus ullamcorper vel tincidunt sed euismod
                        nibh volutpat velit class aptent taciti sociosqu ad
                        litora.
                      </p>
                      <div className="info">
                        <div className="img">
                          <div className="img-box">
                            <img src="/img/clients/3.jpg" alt="" />
                          </div>
                        </div>
                        <div className="cont">
                          <div className="author">
                            <h6 className="author-name custom-font">
                              Alex Regelman
                            </h6>
                            <span className="author-details">
                              Co-founder, Colabrio
                            </span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoWithTestimonials;
