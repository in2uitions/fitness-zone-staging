import React, { useState } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useRouter } from "next/router";

export default function CompCarouselRight({ data = {}, style = 'white', isFlipped = false }) {
    const [activeSlide, setactiveSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(false)
    const [clickTiggered, setClickTriggered] = useState(false)
    
    const itemSet = (localStorage.getItem("token") !== null);
    const router = useRouter();
    const route = () => {
    if (itemSet) {
        // router.push({ pathname: "/login-process/classListing"});
    window.open("/login-process/classListing", "_blank");
    }
    else{
        // router.push({ pathname: "/login-process/login"});
        window.open("/login-process/login", "_blank");
    }
}
    let timeout = setTimeout(() => {
        if (nextSlide == true && clickTiggered == true) {
            activeSlide < data.carousel.length - 1 && setactiveSlide(activeSlide + 1);
            setClickTriggered(false)
        }
    }, 1000);
    const next = () =>
        activeSlide < data.carousel.length - 1 && setactiveSlide(activeSlide + 1);

    const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);
    const getStyles = (index) => {
        if (activeSlide === index)
            return {
                opacity: 1,
                transform: "translateX(230px) translateZ(0px) rotateY(0deg)",
                zIndex: 22,
                width: 470
            };
        else if (activeSlide - 1 === index)
            return {
                opacity: 0,
                transform: "translateX(240px) translateZ(-400px) rotateY(35deg)",
                zIndex: 9,

            };
        else if (activeSlide + 1 === index)
            return {
                opacity: 1,
                transform: "translateX(-290px) translateZ(0px) rotateY(0deg)",
                zIndex: 9,
                width: 470
            };
        else if (activeSlide - 2 === index)
            return {
                opacity: 0,
                transform: "translateX(480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 8
            };
        else if (activeSlide + 2 === index)
            return {
                opacity: 1,
                transform: "translateX(-780px) translateZ(-500px) rotateY(-45deg)",
                zIndex: 8,
                // width:345
            };
        else if (index < activeSlide - 2)
            return {
                opacity: 0,
                transform: "translateX(480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 7
            };
        else if (index > activeSlide + 2)
            return {
                opacity: 0,
                transform: "translateX(-480px) translateZ(-500px) rotateY(-35deg)",
                zIndex: 7
            };
    };
    const getTextStyles = (index) => {
        if (activeSlide === index)
            return {
                opacity: 1,
                transform: "translateX(250px) translateY(0px) rotateY(0deg)",
                zIndex: 22
            };
        else if (activeSlide - 1 === index)
            return {
                opacity: 0,
                transform: "translateX(0px) translateY(0px) rotateY(0deg)",
                zIndex: 9
            };
        else if (activeSlide + 1 === index)
            return {
                opacity: 0,
                transform: "translateX(0px) translateY(0px) rotateY(0deg)",
                zIndex: 9
            };
        else if (activeSlide - 2 === index)
            return {
                opacity: 0,
                transform: "translateX(0px) translateY(0px) rotateY(0deg)",
                zIndex: 8
            };
        else if (activeSlide + 2 === index)
            return {
                opacity: 0,
                transform: "translateX(0px) translateY(0px) rotateY(0deg)",
                zIndex: 8
            };
        else if (index < activeSlide - 2)
            return {
                opacity: 0,
                transform: "translateX(0px) translateY(0px) rotateY(0deg)",
                zIndex: 7
            };
        else if (index > activeSlide + 2)
            return {
                opacity: 0,
                transform: "translateX(0px) translateY(0px) rotateY(0deg)",
                zIndex: 7
            };
    };

    return (
        <>
            <div className="">
                <div className=" flex flex-col justify-center items-center pb-28 mt-20 relative trainers-mobile">
                    {data.title ? <p className="lg:text-5xl md:text-4xl text-3xl font-bold futura-bold mb-5 text-white">{data.title}</p> : null}
                    {data.image_title ? <img src={`${image_url}${data.image_title?.id}`} altv={data.image_title?.title} /> : null}
                </div>
            </div>
            <div className={`lg:flex md:flex relative items-center px-14 mb-52 pb-20 container  ${isFlipped ? 'flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block md:block ">
                    <div className="slideC">
                        {data.carousel.map((item, i) => (
                            <>
                                <div className="">

                                    <div key={item.id}
                                        className="slide absolute"
                                        style={{
                                            ...getStyles(i),
                                        }}
                                    >
                                        <div className="relative">
                                            {item.comp_carousel_items_id?.image ? <img src={`${image_url}${item.comp_carousel_items_id?.image?.id}`} className="tintImg none-event" altv={item.comp_carousel_items_id?.title} /> : null}
                                            <div className="flex space-x-2 absolute items-center left-8 bottom-8">
                                                {item.comp_carousel_items_id?.image_text ? <p className="text-white font-bold text-4xl">{item.comp_carousel_items_id?.image_text}</p> : null}
                                                {item.comp_carousel_items_id.image_icon ? <img src={`${image_url}${item.comp_carousel_items_id?.image_icon?.id}`} className="w-16 h-8" altv={item.comp_carousel_items_id?.title} /> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="reflection"
                                    style={{
                                        background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                                        ...getStyles(i),
                                    }}
                                />
                            </>
                        ))}
                    </div>

                    <div className="newsbtns">
                        <img src="/ArrowLeft.png"
                            onClick={next}
                            className={
                                (activeSlide < data.carousel.length - 1 ? "newsbtn prevbtn arrow" : "btn-disabled")
                            }
                            color="#fff"
                            size="2x"
                        />
                        <img src="/ArrowRight.png"
                            className={
                                (activeSlide > 0 ? "newsbtn arrow" : "btn-disabled")
                            }
                            onClick={prev}
                            color="#fff"
                            size="2x"
                        />
                    </div>
                </div>
                <div className="lg:w-1/2 md:w-1/2 pr-52">
                    <div className="slideCC">
                        {data.carousel.map((item, i) => (
                            <>
                                <div className="">
                                    <div key={item.id}
                                        className="slide absolute content-responsive"
                                        style={{
                                            background: item.bgColor,
                                            boxShadow: `0 5px 20px ${item.bgColor}30`,
                                            ...getTextStyles(i),
                                        }}
                                    >
                                        <div className="sliderContent pr-20">
                                            <div className="flex items-baseline space-x-5">
                                                <p className="font-bold futura-bold text-4xl">{item.comp_carousel_items_id?.title}</p>
                                                {item.comp_carousel_items_id.icon ? <img src={`${image_url}${item.comp_carousel_items_id?.icon?.id}`} className="w-16 h-8" altv={item.comp_carousel_items_id?.title} /> : null}
                                            </div>
                                            {item.comp_carousel_items_id?.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${item.comp_carousel_items_id?.description}`)} </p> : null}
                                            {item.comp_carousel_items_id?.button_title ? <a href={item.comp_carousel_items_id?.button_url} className="mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold cursor-pointer">{item.comp_carousel_items_id?.button_title}<ChevronRightIcon /></a> : null}
                                            {item.comp_carousel_items_id?.book_button ? <button  onClick={() => route()} className="mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold cursor-pointer">{item.comp_carousel_items_id?.book_button}<ChevronRightIcon /></button> : null}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="reflection"
                                    style={{
                                        background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                                        ...getTextStyles(i),
                                    }}
                                />
                            </>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};

