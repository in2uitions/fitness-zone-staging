import React, { useState, useEffect } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Popup from "reactjs-popup";

export default function CompCarouselStatic({ data = {}, style = 'white', isFlipped = false, }) {
    const [activeSlide, setactiveSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(false)
    const [clickTiggered, setClickTriggered] = useState(false)

    const [count, setCount] = useState(0);
    const [scrollOver, setScroll] = useState(false);

    useEffect(() => {
        if (scrollOver) {
            const timer = setInterval(() => {
                setactiveSlide((prevCount) => (prevCount + 1) % data.static_items.length);
            }, 3000);
            return () => clearInterval(timer);
        } else {
            setCount(0);
        }
    }, [scrollOver]);

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

    return (
        <>

            <div className={`lg:flex relative items-center px-14 pt-32 mb-10 pb-16 container`}>

                <div className="lg:w-1/2 px-40">
                    <div className="slideCC">
                        <>
                                    <div className="sliderContent">
                                        <div className="flex items-baseline space-x-5">
                                            <p className="font-bold futura-bold text-4xl">{data?.title}</p>
                                            {data.icon ? <img src={`${image_url}${data?.icon?.id}`} className="w-16 h-8" altv={data?.title} /> : null}
                                        </div>
                                        {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${data?.description}`)} </p> : null}
                                        {data.show_more_description ? <Popup
                                            trigger={
                                                <button>
                                                    <p className="bg-transparent text-md text-[#009FE3] futura-book mt-2 outline-none">Read more ...</p>
                                                </button>
                                            } modal
                                            position="center"
                                            closeOnDocumentClick={false}
                                        >
                                            {close => (
                                                <div className="container w-screen flex flex-col justify-center relative py-12">
                                                    <button className="flex w-full justify-end close-button " onClick={close}>
                                                        &times;
                                                    </button>
                                                    {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2 px-14">{parse(`${data?.description}`)} </p> : null}
                                                    {data.show_more_description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2 px-14">{parse(`${data?.show_more_description}`)} </p> : null}
                                                    {/* <FooterPopup /> */}
                                                </div>
                                            )}
                                        </Popup> : null}
                                        {data.button_title ? <a href={data.button_url} target="_blank" className="cursor-pointer mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{data.button_title}<ChevronRightIcon /></a> : null}
                                    </div>
                        </>
                    </div>
                </div>
                <div className="lg:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 ">
                    <div className="slideC">
                        {data.static_items.map((item, i) => (
                            <>
                                <div className="">

                                    <div key={item.id}
                                        className="slide-static"
                                        style={{
                                            ...getStyles(i),
                                        }}
                                    >
                                        {data.with_timer ?<div className="sliderContentImage" onLoad={() => setScroll(true)}>
                                            {item.static_items_id?.image ? <img src={`${image_url}${item.static_items_id?.image?.id}`} className="trainerimg none-event" altv={item.static_items_id?.title} /> : null}

                                        </div> : null}
                                        {data.without_timer ?<div className="sliderContentImage">
                                            {item.static_items_id?.image ? <img src={`${image_url}${item.static_items_id?.image?.id}`} className="trainerimg none-event" altv={item.static_items_id?.title} /> : null}
                                        </div>:null}
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
                                className={
                                    "btn arrow " +
                                    (activeSlide > 0 ? " btn arrow" : "btn-disabled")
                                }
                                onClick={prev}
                                color="#fff"
                                size="2x"
                            />
                            <img src="/ArrowRight.png"
                                className={
                                    "btn arrow " +
                                    (activeSlide < data.static_items.length - 1 ? " btn arrow" : "btn-disabled")
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

