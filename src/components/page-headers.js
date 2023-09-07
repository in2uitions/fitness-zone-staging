/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-target-blank */
import Image from 'next/image'
import React, { Component } from 'react';
// import { gsap } from "gsap";
import { useState, useRef } from 'react';
import { image_url } from '../../global_vars';
import fadeWhenScroll from '../common/fadeWhenScroll';
import removeSlashFromPagination from '../common/removeSlashFromPagination';

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
    return (
        <>
                {data.layout_type == 'regular' || data.layout_type == null ?
                    <header
                        ref={sliderRef}
                        className="slider slider-prlx fixed-slider text-center"
                    >
                        <div className="swiper-container parallax-slider">
                            {!load ? (
                                <div className="">
                                    <img src={`${image_url}${data.image?.id}`} />
                                </div>
                            ) : null}

                        </div>
                    </header>

                    : null}
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
