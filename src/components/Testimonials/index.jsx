/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import parse from "html-react-parser";
import { image_url } from "../../../global_vars";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

const Testimonials = ({ data = {} }) => {
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
        <section
            className="block-sec container"
        style={{ paddingBottom:"120px" }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <img style={{ width: "30%" }} className="circleShape" src="/circles.png" />
                <p className="peopleTitle"
                    style={{
                        display: "flex",
                        gap: "20px",
                        position: "absolute",
                        top: "3rem",
                        fontFamily: 'Montserrat Regular',
                        fontSize: "42px",
                        color:"white",
                        letterSpacing:"10px"
                    }}
                >
                    {data.title[0]?.first}
                    <span style={{fontFamily:"Montserrat ExtraBold"}}>{data.title[0]?.second}</span>
                </p>
            </div>
            <div
                style={{
                    backgroundImage: `url(${image_url}${data?.background_image?.id})`,
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    zIndex: "10",
                }}
            >
                <div className="container">
                    <div
                        className="row"
                        style={{ justifyContent: "center", alignItems: "center" }}
                    >
                        <div className="col-lg-6">
                            <div
                                className="vid-area"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    className="cont"
                                    style={{
                                        padding: "0 40px",
                                        textShadow:
                                            "0px 0px 2px #11141b, -2px -2px 2px #11141b, 2px -2px 2px #11141b, -2px 2px 2px #11141b, 2px 2px 2px #11141b ",
                                    }}
                                >
                                    <Split style={{fontSize:"21px"}}>
                                        <h3 className="wow testimonials" data-splitting>
                                            {parse(`${data?.brief}`)}
                                        </h3>
                                    </Split>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="testim-box">
                                <div className="head-box">
                                    <h6 className="wow fadeIn" data-wow-delay=".5s" style={{color:"black"}}>
                                        KNOW US THROUGH
                                    </h6>
                                    <h4 className="wow fadeInLeft" data-wow-delay=".5s">
                                        OUR PEOPLE&apos;S WORDS
                                    </h4>
                                </div>
                                <Slider
                                    {...settings}
                                    className="slic-item wow fadeInUp"
                                    data-wow-delay=".5s"
                                >
                                    {data?.sliders?.map((item, i) => (
                                        <div className="item">
                                            <>
                                                <p>{parse(`${item.sliders_id?.description}`)}</p>
                                                <div className="info">
                                                    <div className="img">
                                                        <div className="img-box">
                                                            <img
                                                                src={`${image_url}${item.sliders_id?.icon?.id}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="cont">
                                                        <div className="author">
                                                            <h6 className="author-name custom-font">
                                                                {item.sliders_id?.title}
                                                            </h6>
                                                            <span className="author-details">
                                                                {parse(`${item.sliders_id?.side_description}`)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
