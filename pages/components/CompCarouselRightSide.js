import React, { useState } from "react";
import { image_url } from '../../global';
import parse from "html-react-parser";

export default function CompCarouselRight({ data = {}, style = 'white', isFlipped = false, }) {
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
                transform: "translateX(240px) translateY(20px) rotateY(35deg)",
                zIndex: 9
            };
        else if (activeSlide + 1 === index)
            return {
                opacity: 0,
                transform: "translateX(-240px) translateY(20px) rotateY(-35deg)",
                zIndex: 9
            };
        else if (activeSlide - 2 === index)
            return {
                opacity: 0,
                transform: "translateX(480px) translateY(20px) rotateY(35deg)",
                zIndex: 8
            };
        else if (activeSlide + 2 === index)
            return {
                opacity: 0,
                transform: "translateX(-480px) translateY(20px) rotateY(-35deg)",
                zIndex: 8
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
                transform: "translateX(-480px) translateY(60px) rotateY(-35deg)",
                zIndex: 7
            };
    };

    return (
        <>
            <div className="">
                <div className=" flex flex-col justify-center items-center pt-20 mb-28 relative trainers-mobile">
                    {data.image_title ? <img src={`${image_url}${data.image_title?.id}`} altv={data.image_title?.title} /> : null}
                </div>
            </div>
            <div className={`lg:flex relative items-center px-14 mb-52 container  ${isFlipped ? 'flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block md:block ">
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
                                            {item.comp_carousel_items_id?.image ? <img src={`${image_url}${item.comp_carousel_items_id?.image?.id}`} className="tintImg none-event" altv={item.comp_carousel_items_id?.title} /> : null}
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
                            className="newsbtn prevbtn arrow"
                            onClick={next}
                            color="#fff"
                            size="2x"
                        />
                        <img src="/ArrowRight.png"
                            className="newsbtn arrow"
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
                                        className="slide"
                                        style={{
                                            background: item.bgColor,
                                            boxShadow: `0 5px 20px ${item.bgColor}30`,
                                            ...getTextStyles(i),
                                        }}
                                    >
                                        <div className="sliderContent">
                                            {item.comp_carousel_items_id?.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${item.comp_carousel_items_id?.description}`)} </p> : null}
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

