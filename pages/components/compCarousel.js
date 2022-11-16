import React, { useState } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function CompCarousel({ data = {}, style = 'white', isFlipped = false, }) {
    const [activeSlide, setactiveSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(false)
    const [clickTiggered, setClickTriggered] = useState(false)



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
                transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
                zIndex: 22,
                width: 500
            };
        else if (activeSlide - 1 === index)
            return {
                opacity: 0,
                transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
                zIndex: 9,

            };
        else if (activeSlide + 1 === index)
            return {
                opacity: 1,
                transform: "translateX(480px) translateZ(-400px) rotateY(-45deg)",
                zIndex: 9,
                width: 400
            };
        else if (activeSlide - 2 === index)
            return {
                opacity: 0,
                transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 8
            };
        else if (activeSlide + 2 === index)
            return {
                opacity: 1,
                transform: "translateX(800px) translateZ(-500px) rotateY(-45deg)",
                zIndex: 8,
                // width:345
            };
        else if (index < activeSlide - 2)
            return {
                opacity: 0,
                transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 7
            };
        else if (index > activeSlide + 2)
            return {
                opacity: 0,
                transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
                zIndex: 7
            };
    };
    const getTextStyles = (index) => {
        if (activeSlide === index)
            return {
                opacity: 1,
                transform: "translateX(0px) translateY(0px) rotateY(0deg)",
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
                <div className=" flex flex-col justify-center items-center  md:mt-32 relative trainers-mobile">
                    {data.title ? <p className="lg:text-5xl md:text-4xl text-3xl font-bold futura-bold mb-5 text-white">{data.title}</p> : null}
                    {data.subtitle ? <p className="futura-book text-center w-3/4 text-[#D8D8D8] mb-5">
                        {parse(`${data.subtitle}`)} </p> : null}
                </div>
            </div>
            <div className={`lg:flex relative items-center px-14 container mt-60 mb-96 pb-24 ${isFlipped ? 'flex-row-reverse' : ''}`}>

                <div className="lg:w-1/2">
                    <div className="slideCC">
                        {data.carousel.map((item, i) => (
                            <>
                                <div className="">
                                    <div key={item.id}
                                        className="slide"
                                        style={{
                                            background: item.bgColor,
                                            boxShadow: `0 5px 20px ${item.bgColor}30`,
                                            ...getTextStyles(i),
                                        }}
                                    >
                                        <div className="sliderContent">
                                            <div className="flex items-center space-x-5">
                                                {item.comp_carousel_items_id.icon ? <img src={`${image_url}${item.comp_carousel_items_id?.icon?.id}`} className="w-16 h-8" altv={item.comp_carousel_items_id?.title} /> : null}
                                                <p className="font-bold futura-bold text-4xl">{item.comp_carousel_items_id?.title}</p>
                                            </div>
                                            {item.comp_carousel_items_id?.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${item.comp_carousel_items_id?.description}`)} </p> : null}
                                            {item.comp_carousel_items_id?.button_title ? <a href={item.comp_carousel_items_id?.button_url} className="mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{item.comp_carousel_items_id?.button_title}<ChevronRightIcon /></a> : null}
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
                <div className="lg:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 ">
                    <div className="slideC">
                        {data.carousel.map((item, i) => (
                            <>
                                <div className="">

                                    <div key={item.id}
                                        className="slide"
                                        style={{
                                            ...getStyles(i),
                                        }}
                                    >
                                        <div className="sliderContentImage">
                                            {item.comp_carousel_items_id?.image ? <img src={`${image_url}${item.comp_carousel_items_id?.image?.id}`} className="trainerimg none-event" altv={item.comp_carousel_items_id?.title} /> : null}
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


                        <div className="btns" >
                            <img src="/ArrowLeft.png"
                                // className="btn arrow"
                                className={
                                    "btn arrow " +
                                    (activeSlide > 0 ? " btn arrow" : "btn-disabled")
                                }
                                onClick={prev}
                                color="#fff"
                                size="2x"
                            />
                            <img src="/ArrowRight.png"
                                // className="btn arrow"
                                className={
                                    "btn arrow " +
                                    (activeSlide < data.carousel.length - 1  ? " btn arrow" : "btn-disabled")
                                }
                                onClick={next}
                                color="#fff"
                                size="2x"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

