import React, { useState } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function CompCarouselRight({ data = {}, style = 'white', isFlipped = false }) {
    const [activeSlide, setactiveSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(false)
    const [clickTiggered, setClickTriggered] = useState(false)



    let timeout = setTimeout(() => {
        if (nextSlide == true && clickTiggered == true) {
            activeSlide < data.static_items.length - 1 && setactiveSlide(activeSlide + 1);
            setClickTriggered(false)
        }
    }, 1000);
    const next = () =>
        activeSlide < data.static_items.length - 1 && setactiveSlide(activeSlide + 1);

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
    // const getTextStyles = (index) => {
    //     if (activeSlide === index)
    //         return {
    //             opacity: 1,
    //             transform: "translateX(250px) translateY(0px) rotateY(0deg)",
    //             zIndex: 22
    //         };
    //     else if (activeSlide - 1 === index)
    //         return {
    //             opacity: 0,
    //             transform: "translateX(0px) translateY(0px) rotateY(0deg)",
    //             zIndex: 9
    //         };
    //     else if (activeSlide + 1 === index)
    //         return {
    //             opacity: 0,
    //             transform: "translateX(0px) translateY(0px) rotateY(0deg)",
    //             zIndex: 9
    //         };
    //     else if (activeSlide - 2 === index)
    //         return {
    //             opacity: 0,
    //             transform: "translateX(0px) translateY(0px) rotateY(0deg)",
    //             zIndex: 8
    //         };
    //     else if (activeSlide + 2 === index)
    //         return {
    //             opacity: 0,
    //             transform: "translateX(0px) translateY(0px) rotateY(0deg)",
    //             zIndex: 8
    //         };
    //     else if (index < activeSlide - 2)
    //         return {
    //             opacity: 0,
    //             transform: "translateX(0px) translateY(0px) rotateY(0deg)",
    //             zIndex: 7
    //         };
    //     else if (index > activeSlide + 2)
    //         return {
    //             opacity: 0,
    //             transform: "translateX(0px) translateY(0px) rotateY(0deg)",
    //             zIndex: 7
    //         };
    // };

    return (
        <>
            <div className={`lg:flex relative items-center px-14 mt-32 mb-56 pb-20 container  ${isFlipped ? 'flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block md:block ">
                    <div className="slideC">
                        {data.static_items.map((item, i) => (
                            <>
                                <div className="">

                                    <div key={item.id}
                                        className="slide"
                                        style={{
                                            ...getStyles(i),
                                        }}
                                    >
                                        <div className="relative">
                                            {item.static_items_id?.image ? <img src={`${image_url}${item.static_items_id?.image?.id}`} className="tintImg none-event" altv={item.static_items_id?.title} /> : null}
                                            <div className="flex space-x-2 absolute items-center left-8 bottom-8">
                                            {item.static_items_id.image_icon?<img src={`${image_url}${item.static_items_id?.image_icon?.id}`} className="w-16 h-8" altv={item.static_items_id?.title} /> : null}
                                            {item.static_items_id?.image_text ?<p className="text-white font-bold text-4xl">{item.static_items_id?.image_text}</p>:null}
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
                        {/* {data.carousel.map((item, i) => ( */}
                            <>
                                <div className="">
                                    <div
                                        className="slide"
                                    >
                                        <div className="sliderContent staticSlide">
                                        <div className="flex items-center space-x-5">
                                            {data.icon?<img src={`${image_url}${data.icon?.id}`} className="w-16 h-8" altv={data.title} /> : null}
                                            <p className="font-bold futura-bold text-4xl">{data.title}</p>
                                        </div>
                                            {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${data.description}`)} </p> : null}
                                            {data.button_title ? <a href={data.button_url} className="mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{data.button_title}<ChevronRightIcon /></a> : null}
                                        </div>
                                    </div>
                                </div>
                                
                            </>
                        {/* ))} */}
                    </div>
                </div>

            </div>
        </>
    );
};

