/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

const VideoWithTestimonials = () => {
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
        <div>
          <div
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/circle.svg" style={{ height: "30%", width: "30%" }} />
            <p style={{ position: "absolute", fontSize: "36px", top: "4rem" , letterSpacing:"10px", color:"white" }}>
              WE ARE <bold style={{fontWeight:"bold"}}>OUR PEOPLE</bold>
            </p>
          </div>
        </div>
      </section>
      <section
        className="block-sec"
        style={{
      backgroundImage: 'url("people.png")',
      width: "100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      marginTop: "-17rem", 
      zIndex:"10",
      position:"relative"
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
                    marginTop:"4rem"
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
                        Change is ON
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
                    <div className="item">
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                      </p>
                      <div className="info">
                        <div className="img">
                          <div className="img-box">
                            <img src="/img/clients/1.jpg" alt="" />
                          </div>
                        </div>
                        <div className="cont">
                          <div className="author">
                            <h6 className="author-name custom-font">
                              Sir William Doe
                            </h6>
                            <span className="author-details">
                              CEO of The Merch , Founder, <br></br> Researcher,
                              Leader.
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
                    </div>
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
