/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-target-blank */
import Image from 'next/image'
// import { gsap } from "gsap";
import { useState, useRef } from 'react';
import parse from "html-react-parser";
import { image_url } from '../../global_vars';
import fadeWhenScroll from '../common/fadeWhenScroll';
import removeSlashFromPagination from '../common/removeSlashFromPagination';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination, Parallax, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
                <div id="" style={{ "backgroundImage": `url("${image_url}${data.image?.id}")` }} className=" aboutUs-bg" >
                    <div className="" style={{ "backgroundImage": `url("${image_url}${data.bar_image?.id}")`, backgroundRepeat: "no-repeat", height: "211px", position: "absolute", top: "50%", left: "8rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                            {data.image_title ? <h1 className='banner-title' style={{ fontSize: "82px" }}>{data.image_title}</h1> : null}
                            {data.image_subtitle ? <h3 className="banner-subtitle">{data.image_subtitle}</h3> : null}
                        </div>
                    </div>
                    <div style={{ position: "absolute", right: "10rem", top: "60%", borderRight: "2px solid #707070", paddingRight: "20px" }}>
                        {data.image_description ? <h2 style={{ textAlign: "right", fontWeight: "bold", color: "white" }}>{parse(`${data.image_description}`)}</h2> : null}
                    </div>
                </div>
                : null} 
            <div className="grid grid-cols-2">
                {/* <div className="absolute lg:left-36 md:left-36 left-2 lg:bottom-14 text-homePage">
                    {data.image_title ? <h1 className="text-[#009FE3] font-bold futura-bold lg:text-5xl md:text-4xl text-3xl">{data.image_title}</h1> : null}
                    <div className='flex lg:space-x-6 md:space-x-6 space-x-2 items-baseline'>
                        {data.image_description ? <h1 className="font-bold lg:text-7xl md:text-6xl text-white text-2xl futura-bold">{data.image_description}</h1> : null}
                        <div className=''>{data.icon_on ? <img src={`${image_url}${data.icon_on?.id}`} className="lg:h-16 md:h-16 h-5" /> : null}</div>
                    </div>
                    {data.button_url ? <a href={data.button_url} target="_blank" className=" bg-[#009FE3] learnMoreBtns p-2 text-center rounded-md futura-bold">{data.button_title}
                    </a> : null}
                </div> */}

                {/* {data.icon_sound_off ? <div className="absolute lg:right-44 lg:bottom-14 md:right-44  right-0 flex flex-row items-center sound">

                    <button className="flex"
                        onClick={() => {
                            changeImage();
                            unmuteVideo();
                        }}
                    >
                        <p className="lg:text-3xl md:text-3xl text-2xl futura-book text-white">{data.sound}</p>
                        {alternateImage && (
                            <img src={`${image_url}${data.icon_sound_off?.id}`} className="w-9 h-6 mt-1 ml-1" />
                        )}
                        {!alternateImage && (
                            <img src={`${image_url}${data.icon_sound_on?.id}`} className="w-9 h-6 mt-1 ml-1" />
                        )}
                    </button>
                </div> : null} */}
            </div>
            {data.layout_type == 'slider' || data.layout_type == null ?
                <div
                    ref={sliderRef}
                    className="slider slider-prlx text-center"
                >
                    <div className="swiper-container parallax-slider">
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
                                        <div className="bg-img valign" style={{ "backgroundImage": `url("${image_url}${slide.slider_images_component_id.image}")`, backgroundRepeat: "no-repeat" }}>
                                            <div className="tint"></div>
                                            <div className="container">
                                                <div className="row container flex-reverse" style={{ marginTop: "2rem" }}>
                                                    <div className="col-lg-6 col-md-8 width-mobile-unset">
                                                        <div className="caption" style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                            <div style={{ position: "relative" }}>
                                                                {slide.slider_images_component_id.with_bar_image ? <img src="/barr.svg" style={{ height: "20rem" }} className={`bg-swipe ${index === currentSlide ? 'fade-in' : ''}`} /> : null}

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
                                                                    {slide.slider_images_component_id.image_title ? <h1 style={{ fontSize: "82px" }}>{slide.slider_images_component_id.image_title}</h1> : null}
                                                                    {slide.slider_images_component_id.image_subtitle ? <h3 className="">{slide.slider_images_component_id.image_subtitle}</h3> : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-8 text-on-mobile">
                                                        <div className="caption" style={{ textAlign: "right" }}>
                                                        {slide.slider_images_component_id.image_description ?<p
                                                                className={`words chars splitting swipe-scd-title ${index === currentSlide ? 'fade-in' : ''}`}
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

                                                            </p>:null}
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
            {/* {data.button_title ?
                <div style={{
                    position: "fixed",
                    right: "0",
                    top: "10rem",
                    background: "#EDC500",
                    fontWeight: "bold",
                    padding: "70px 8px 70px 8px",
                    color: "black",
                    zIndex: 10,
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                    transform: "rotate(180deg)",
                }}>
                    {data.button_title.split('').map((char, index) => (
                        <span key={index} style={{
                            writingMode: "vertical-rl",
                            textOrientation: "upright",
                            transform: "rotate(90deg)",
                            display: "inline-block",
                            padding: char === ' ' ? "5px 0" : "0px",
                            letterSpacing: "-6px"
                        }}>
                            {char}
                        </span>
                    ))}
                </div>
                : null} */}

            {/* {data.layout_type == 'video' || data.layout_type == null ?
                    <div className="">
                        <div id="" className="" >
                            <video loop autoPlay muted playsInline className="video w-100" id="myVideo">
                                <source src={`${image_url}${data.video?.id}`} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    : null}
                <div className="grid grid-cols-2">
                    <div className="absolute lg:left-36 md:left-36 left-2 lg:bottom-14 text-homePage">
                        {data.image_title ? <h1 className="text-[#009FE3] font-bold futura-bold lg:text-5xl md:text-4xl text-3xl">{data.image_title}</h1> : null}
                        <div className='flex lg:space-x-6 md:space-x-6 space-x-2 items-baseline'>
                            {data.image_description ? <h1 className="font-bold lg:text-7xl md:text-6xl text-white text-2xl futura-bold">{data.image_description}</h1> : null}
                            <div className=''>{data.icon_on ? <img src={`${image_url}${data.icon_on?.id}`} className="lg:h-16 md:h-16 h-5" /> : null}</div>
                        </div>
                        {data.button_url ? <a href={data.button_url} target="_blank" className=" bg-[#009FE3] learnMoreBtns p-2 text-center rounded-md futura-bold">{data.button_title}
                        </a> : null}

                    </div>

                    {data.icon_sound_off ? <div className="absolute lg:right-44 lg:bottom-14 md:right-44  right-0 flex flex-row items-center sound">

                        <button className="flex"
                            onClick={() => {
                                changeImage();
                                unmuteVideo();
                            }}
                        >
                            <p className="lg:text-3xl md:text-3xl text-2xl futura-book text-white">{data.sound}</p>
                            {alternateImage && (
                                <img src={`${image_url}${data.icon_sound_off?.id}`} className="w-9 h-6 mt-1 ml-1" />
                            )}
                            {!alternateImage && (
                                <img src={`${image_url}${data.icon_sound_on?.id}`} className="w-9 h-6 mt-1 ml-1" />
                            )}
                        </button>
                    </div> : null}
                </div> */}
        </>
    )
}
