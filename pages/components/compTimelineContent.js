import React, { useState } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import Step from './slider/steps'
import Slider from "./slider/slider";
import Form from "./slider/Form";
import HorizontalTimeline from "react-horizontal-timeline";
import { Timeline, TimelineEvent } from "react-event-timeline";

export default function CompTimeline({ data = {}, style = 'white', isFlipped = false }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    function dateFrmt(dat, frag) {
        const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        const d = new Date(dat);
        const month = monthNames[d.getMonth()];
        const year = d.getFullYear();
        if (frag == "m") return month;
        else return year;
    }
    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(0);
    const _handleIndexChange = (index) => {
        setCurrentIndex(index);
    };

    const _handleNext = (currentIndex) => {
        setCurrentIndex(currentIndex + 1);
    };
    const _handlePrev = (currentIndex) => {
        setCurrentIndex(currentIndex - 1);
    };
    const [fade, setFade] = useState(true);
    const _handleComplete = () => { };
    const triangle = [{ image: "/triangle.png" }, { image: "/triangle.png" }, { image: "/triangle.png" }, { image: "/triangle.png" }, { image: "/triangle.png" }, { image: "/triangle.png" }];
    return (
        <>
            <div className="">
                <div className="mt-40 mb-20 flex flex-col justify-center items-center text-center">
                    <p className="font-bold lg:text-5xl md:text-5xl text-3xl mb-5 futura-bold w-3/4 text-white">{data.title}</p>
                    {data.subtitle ? <p className="text-[#D8D8D8] w-3/4 futura-book">
                        {parse(`${data.subtitle}`)}
                    </p> : null}
                </div>
                <div className="App relative">
                    <div className="flex flex-col w-screen">
                        {/* <div className="flex flex-col">
                    <div className="flex justify-between relative">
            {data.timeline.map((step, index) => {
                let opacity = currentIndex === index ? "1" : "0";
                {
                    console.log("color", opacity);
                }
                return (
                        <div
                            className={`${fade == "true" ? "opacity-1" : "opacity-0"
                                }`}
                            style={{
                                opacity: opacity,
                            }}
                        >
                            <div className="">
                                <p className="text-white">{step.timeline_items_id?.date}</p>
                                <br></br>
                            </div>
                        </div>
                );
            })}
        </div> */}
                        <div className="flex flex-col w-screen">
                            <div style={{ width: "100vw", height: "100px", margin: "0 auto" }}>
                                <HorizontalTimeline
                                    getLabel={function (date) { return date.slice(0, 4); }}
                                    index={currentIndex}
                                    indexClick={index => {
                                        setCurrentIndex(index);
                                        setPrevious(current);
                                    }}
                                    className=""
                                    values={data.timeline.map(step => step.timeline_items_id?.date)}
                                    maxEventPadding={200}
                                    minEventPadding={200}
                                    linePadding={350}
                                    labelWidth={50}
                                    styles={{
                                        // background: "white",
                                        width:"100vw",
                                        foreground: "#BD3253",
                                        outline: "#BFBFBF",
                                        margin: "0 auto",
                                        textAlign: "center"
                                    }}
                                />
                            </div>
                            <div className="container relative">
                                <div className="relative h-screen h-mobile">
                                    {data.timeline.map((step, index) => {
                                        let opacity = currentIndex === index ? "1" : "0";
                                        {
                                            console.log("color", opacity);
                                        }
                                        return (
                                            <div
                                                className="lg:flex absolute inset-0 justify-center items-center w-screen lg:px-40 md:px-40 px-6"
                                                style={{
                                                    opacity: opacity,
                                                }}
                                            >
                                                <div className="flex flex-col">
                                                    <div className={`steps-container transition duration-1000 ease-in-out`}
                                                        style={{
                                                            opacity: opacity,
                                                        }}>
                                                        {triangle.map((step, index) => {
                                                            let color = currentIndex === index ? "#ffffff" : "white";
                                                            let opacity = currentIndex === index ? "1" : "0";
                                                            console.log("color", color);
                                                            return (
                                                                <div className="steps-item">
                                                                    <img src="/triangle.png"
                                                                    className=""
                                                                        style={{
                                                                            margin: 0,
                                                                            color: color,
                                                                            opacity: opacity
                                                                        }}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div
                                                        className={`shadow-lg container -mt-2 transition duration-1000 ease-in-out timeline-items flex timeline-mobile`}
                                                        style={{
                                                            opacity: opacity,
                                                        }}
                                                    >
                                                        <div className="lg:w-1/2 lg:py-16 lg:px-24 px-14 mt-24">
                                                            {/* <h3>{step.timeline_items_id?.title}</h3> */}
                                                            {/* <p className="text-white">{step.timeline_items_id?.date}</p> */}
                                                            <br></br>
                                                            <p className="text-white">{parse(`${step.timeline_items_id?.description}`)} </p>
                                                        </div>
                                                        <div className="lg:w-1/2 px-14 py-14">
                                                            <img src={`${image_url}${step.timeline_items_id?.image?.id}`} className="trainerimg none-event" altv={step.timeline_items_id?.title} />
                                                            {/* <img className="pt-10 pb-10 imageStep" src={step.image} /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                            </div>
                            <Step currentIndex={currentIndex} handleNext={_handleNext} handlePrevious={_handlePrev} />
                        </div>
                        {/* </div> */}

                        
                    </div>

                </div>
            </div></>
    );
}
