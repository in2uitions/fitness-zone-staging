/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-target-blank */
import { useState, useRef } from 'react';
import parse from "html-react-parser";
import { image_url } from '../../global_vars';
import fadeWhenScroll from '../common/fadeWhenScroll';
import removeSlashFromPagination from '../common/removeSlashFromPagination';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Split from './Split';

export default function Header({ color = "orange", data = {}, sliderRef }) {
    const [isSent, setIsSent] = useState(false);
    const [isNotSent, setIsNotSent] = useState(false)
    const thankYouMessage = <h3>Thank you for your submission!</h3>;
    const submitmsg = <h3></h3>;
    const [alternateImage, setAlternateImage] = useState(true);

    const changeImage = () => {
        setAlternateImage((alternateImage) => !alternateImage);
    };

    function unmuteVideo() {
        var video = document.getElementById("myVideo");

        video.muted = !video.muted;
    }
    const ref = useRef();
    const [value, setValue] = useState();
    const [load, setLoad] = React.useState(true);
    React.useEffect(() => {
        fadeWhenScroll();
        setTimeout(() => {
            setLoad(false);
            removeSlashFromPagination();
        }, 1000);
    }, []);

    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const paginationRef = React.useRef(null);
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const handleSlideChange = (swiper) => {
        setCurrentSlide(swiper.realIndex);
    };
    return (
        <>
            {data.layout_type == 'regular' || data.layout_type == null ?
                <div id="" style={{ "backgroundImage": `url("${image_url}${data.image?.id}")`, position:"relative" }} className=" aboutUs-bg" >
                {/* <div style={{position:"absolute", right:"0", bottom:"-1px"}}><img src='/imgBg.png'/></div> */}
                <div className="tint-overlay"></div>
                    <div className='bannerTitleContainer' style={{height: "211px", position: "absolute", top: "50%", left: "8rem" }}>
        
                        <div style={{ position: "relative" }}>
                                                                {data.bar_image ? <img src={`${image_url}${data.bar_image?.id}`} /> : null}

                                                                <div className={`words chars splitting swipe-title`}
                                                                    style={{
                                                                        fontFamily: "'Montserrat', sans-serif",
                                                                        fontWeight: "900",
                                                                        textTransform: "uppercase",
                                                                        fontSize: "72px",
                                                                        lineHeight: "72px",
                                                                        position: "absolute",
                                                                        whiteSpace: "pre",
                                                                        top: "50%",
                                                                        transform: "translate(0%, -50%)",
                                                                        opacity: "1",
                                                                        textAlign: "left"
                                                                    }}>
                                                                    {data.image_title ? <h1 className='banner-title' style={{ fontSize: "50px" }}>{data.image_title}</h1> : null}
                                                                    {data.image_subtitle ? <h3 style={{whiteSpace:"pre-wrap", fontFamily:"Montserrat hi", fontSize:"30px"}} className='banner-subtitle'>{data.image_subtitle}</h3> : null}
                                                                </div>
                                                            </div>
                    </div>
                    <div className='bannerDescription' style={{ position: "absolute", right: "10rem", top: "60%", borderRight: "2px solid #707070", paddingRight: "20px" }}>
                        {data.image_description ? <h2 style={{ textAlign: "right", fontWeight: "bold", color: "white" }}>{parse(`${data.image_description}`)}</h2> : null}
                    </div>
                </div>
                : null} 
            <div className="grid grid-cols-2">
                
            </div>
            {data.layout_type == 'slider' || data.layout_type == null ?
                <div
                    ref={sliderRef}
                    className="slider slider-prlx text-center" 
                    style={{background:"#0c0f16"}}
                >
                    <div className="swiper-container parallax-slider" style={{position:"relative", height:"100vh"}}>
                        {!load ? (
                            <Swiper
                                speed={1000}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: true,
                                }}
                                loop={true}
                                parallax={true}
                                navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}
                                pagination={{
                                    type: "fraction",
                                    clickable: true,
                                    el: paginationRef.current,
                                }}
                                onSlideChange={handleSlideChange}
                                className="swiper-wrapper"
                                slidesPerView={1}
                            >
                                {data.slider_components.map((slide, index) => (
                                    <SwiperSlide key={slide.id} className="swiper-slide">
                                        <div className="bg-img valign" style={{ "backgroundImage": `url("${image_url}${slide.slider_images_component_id.image}")`, backgroundRepeat: "no-repeat"}}>
                                        {/* <div style={{position:"absolute", right:"0", top:"2px",zIndex:"3"}}><img src='/imgBg.png' style={{height:"100vh"}}/></div> */}
                                        <div className="tint-overlay"></div>
                                            <div className="container">
                                                <div className="row container flex-reverse" style={{ marginTop: "2rem" }}>
                                                    <div className="col-lg-6 col-md-8 width-mobile-unset">
                                                        <div className="caption" style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                        {!slide.slider_images_component_id.on_icon ? <div style={{ position: "relative" }}>
                                                                {slide.slider_images_component_id.with_bar_image ? <img src="/slashImagee.png" className={`bg-swipe barImage ${index === currentSlide ? 'fade-in' : ''}`} /> : null}

                                                                <div className={`words chars splitting swipe-title ${index === currentSlide ? 'fade-in' : ''}`}
                                                                    style={{
                                                                        fontFamily: "'Montserrat', sans-serif",
                                                                        fontWeight: "900",
                                                                        textTransform: "uppercase",
                                                                        fontSize: "72px",
                                                                        lineHeight: "72px",
                                                                        position: "absolute",
                                                                        whiteSpace: "pre",
                                                                        top: "50%",
                                                                        transform: "translate(0%, -50%)",
                                                                        opacity: "1",
                                                                        textAlign: "left"
                                                                    }}>
                                                                    {slide.slider_images_component_id.image_title ? <h1 className='banner-title' style={{ fontSize: "50px" }}>{slide.slider_images_component_id.image_title}</h1> : null}
                                                                    {slide.slider_images_component_id.image_subtitle ? <h3 className='banner-subtitle' style={{fontFamily:"Montserrat hi"}}>{slide.slider_images_component_id.image_subtitle}</h3> : null}
                                                                </div>
                                                            </div>:null}
                                                            {slide.slider_images_component_id.on_icon ?<div style={{ position: "relative" }}>
                                                            

                                                                <div className={`words chars splitting swipe-title ${index === currentSlide ? 'fade-in' : ''}`}
                                                                    style={{
                                                                        fontFamily: "'Montserrat', sans-serif",
                                                                        fontWeight: "900",
                                                                        textTransform: "uppercase",
                                                                        fontSize: "72px",
                                                                        lineHeight: "72px",
                                                                        position: "absolute",
                                                                        whiteSpace: "pre",
                                                                        top: "50%",
                                                                        transform: "translate(0%, -50%)",
                                                                        opacity: "1",
                                                                        textAlign: "left"
                                                                    }}>
                                                                    {slide.slider_images_component_id.image_title ? <h1 className='banner-title' style={{ fontSize: "92px" }}>{slide.slider_images_component_id.image_title}</h1> : null}
                                                                  
                                                                    {slide.slider_images_component_id.on_icon ?<div style={{display:"flex", justifyContent:"start", alignItems:"center", gap:"8px"}}> <h3 className='banner-subtitle' style={{fontSize:"92px"}}>{slide.slider_images_component_id.image_subtitle}</h3>
                                                                     <img className='onOnMobile' style={{height:"75px", width:"8rem"}} src={`${image_url}${slide.slider_images_component_id.on_icon}`} alt="" /></div>
                                                                    : null}
                                                                </div>
                                                            </div>:null}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-8 text-on-mobile" style={{position:"relative", zIndex:"33"}}>
                                                        <div className="caption" style={{ textAlign: "right" }}>
                                                        <Split>
                                                            {slide.slider_images_component_id.image_description ?<h1
                                                                className={`words chars data-splitting swipe-scd-title 
                                                                `}
                                                                // style={{ fontSize: "60px" }}
                                                                data-splitting
                                                                style={{
                                                                    fontFamily: "'Montserrat', sans-serif",
                                                                    fontWeight: "bold",
                                                                    textTransform: "uppercase",
                                                                    fontSize: "40px",
                                                                    marginTop: "6rem",
                                                                    paddingTop: "1rem",
                                                                    paddingRight: "2rem",
                                                                    borderRight: "2px solid #707070",
                                                                    paddingBottom: "1rem",
                                                                    textAlign: "right", fontWeight: "bold", color: "white"
                                                                }}
                                                            >
                                                                {parse(`${slide.slider_images_component_id.image_description}`)}

                                                            </h1>:null}
                                                            </Split>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                               
                            </Swiper>
                        ) : null}
                       
                    </div>
                </div>
                : null}
        </>
    )
}
