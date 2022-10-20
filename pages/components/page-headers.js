import Image from 'next/image'
import React, { Component } from 'react';
// import { gsap } from "gsap";
import { useState } from 'react';
import $ from 'jquery';
import { image_url } from '../../global';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function Header({ color = "orange", data = {} }) {


    // const handleMouseMove = event => {
    //     var wx = $(window).width();
    //     var wy = $(window).height();
    //     var x = event.pageX;
    //     var y = event.pageY;
    //     var newx = x - wx / 2;
    //     var newy = y - wy / 2;

    //     if ($(window).width() > 500) {
    //         $('#wrapper img').each(function () {
    //             var speed = $(this).attr('data-speed');
    //             if ($(this).attr('data-revert')) speed *= -1;

    //             gsap.to($(this), 1, { x: (1 - newx * speed), y: 0 });

    //         });
    //     }

    // }

    const [alternateImage, setAlternateImage] = useState(true);

    const changeImage = () => {
        setAlternateImage((alternateImage) => !alternateImage);
    };

    function unmuteVideo() {
        var video = document.getElementById("myVideo");

        video.muted = !video.muted;
    }
    return (
        <div className="relative" id="">
            <div className="overflow-hidden">
            {data.layout_type == 'regular' || data.layout_type == null ?
                    <div className="">
                        <div id="" className="" >

                            <img src={`${image_url}${data.image?.id}`} className="w-screen" />

                        </div>
                    </div>
                    : null}
                {data.layout_type == 'video' || data.layout_type == null ?
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
                        {data.image_description ? <h1 className="font-bold lg:text-7xl md:text-6xl text-white text-5xl futura-bold">{data.image_description}</h1> : null}
                        {data.button_title ? <a href="/" target="_blank" className=" bg-[#009FE3] learnMoreBtns p-2 w-36 flex justify-start items-center rounded-md futura-bold">{data.button_title}
                            <ChevronRightIcon className="-ml-2" /></a> : null}
                    </div>

                    {data.icon_sound_off?<div className="absolute lg:right-44 lg:bottom-14 md:right-44  right-0 flex flex-row items-center sound">
                        
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
                            {/* </button> */}
                        </button>
                    </div>:null}
                </div>
            
            </div>

        </div>
    )
}
