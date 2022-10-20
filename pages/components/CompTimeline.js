import React, { useState } from "react";
import Slider from "./slider/slider";
import Step from "./slider/steps";
import Form from "./slider/Form";
import ReactTooltip from "react-tooltip";
const content = [
    {
        id: "1",
        key: "1",
        img: "/Ralph Dagher.jpg"
    },
    {
        id: "2",
        key: "2",
        img: "/PT-bg.png"
    },
    {
        id: "3",
        img: "/Natasha Hamod.jpg"
    },
    {
        id: "4",
        img: "/Sara Baydoun.jpg"
    }
];
const steps = [
    {
        // eventTitle: "Event TitleOne",
        year: "2010",
        eventDescription:
            "Fitness Zone launched with its first branch located in Hamra",
        image: "/event-image.png",
    },
    {
        // eventTitle: "Event TitleTwo",
        year: "2012",
        eventDescription:
            "Baabda branch became in motion",
        image: "/event-image.png",
    },
    {
        // eventTitle: "Event TitleThree",
        year: "2014",
        eventDescription:
            "The expansion journey continued with the opening  of Kaslik branch",
        image: "/event-image.png",
    },
    {
        // eventTitle: "Event TitleFour",
        year: "2016",
        eventDescription:
            "The dynamic attribute of Beirut has led Fitness Zone to open a branch in Beirut Souks, the hub of commercial and business activity in the capital",
        image: "/event-image.png",
    },
    {
        // eventTitle: "Event TitleFive",
        year: "2017",
        eventDescription:
            "Fitness Zone continued its expansion in Beirut with two new branches in Verdun and ABC Achrafieh, becoming the first gym in Lebanon to operate in a commercial facility.",
        image: "/event-image.png",
    },
    {
        // eventTitle: "Event TitleFive",
        year: "2017",
        eventDescription:
            "Dbayeh has become home to Fitness Zone’s 7th branch",
        image: "/event-image.png",
    },
    {
        // eventTitle: "Event TitleFive",
        year: "2022",
        eventDescription:
            "The Fitness Zone experience is now expanding to the UAE with its first branch overseas in City Walk Dubai",
        image: "event-image.png",
    }
];
export default function CompTimeline(data = {}) {
    const [toggle, setToggle] = useState();
    const [visible, setVisible] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

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
    return (
        <div className="App">
            <div className="mt-40 flex flex-col justify-center items-center text-center">
                <p className="font-bold lg:text-5xl md:text-5xl text-3xl mb-5 futura-bold w-3/4 text-white">{data.title}</p>
                <p className="text-[#D8D8D8] w-3/4 futura-book">
                    {data.subtitle}
                </p>
            </div>
            {/* <div className="App w-screen mt-10">
                <div className="container">
                    <Slider  data-for="test" onChange={_handleIndexChange} currentIndex={currentIndex} />
                    <Step currentIndex={currentIndex} />
                    <Form currentIndex={currentIndex} handleNext={_handleNext} handlePrevious={_handlePrev} />

                </div>
            </div> */}
            <div id="timeline-wrap" className="mb-96">
                <div id="timeline"></div>


                <div className="marker mfirst">
                <div className="flex flex-col">
                    <div  data-tip data-for="submit" data-event="click focus">
                        <ReactTooltip
                            className="tooltip"
                            id="submit"
                            // effect="solid"
                            // type="light"
                            // place="bottom"
                            globalEventOff="click focus"
                        >
                            {steps.map((step, index) => {
                                let opacity = currentIndex === index ? "1" : "0";
                                {
                                    console.log("color", opacity);
                                }
                                return (
                                    <div>

                                        <div className="lg:flex absolute justify-center items-center w-screen mt-20 lg:px-40" style={{
                                            opacity: opacity,
                                        }}>


                                            <div className={`shadow-lg transition duration-1000 ease-in-out timeline-items flex ${fade == 'true' ? 'opacity-1' : 'opacity-0'}`} style={{
                                                opacity: opacity,
                                            }}>
                                                <div className="lg:w-1/2 lg:py-16 lg:px-24 mt-24">
                                                    <h3>
                                                        {step.eventTitle}
                                                    </h3>
                                                    <p className="text-white">
                                                        {step.year}
                                                    </p><br></br>
                                                    <p className="text-white">
                                                        {step.eventDescription}
                                                    </p>
                                                </div>
                                                <div className="lg:w-1/2">
                                                    <img className="pt-10 pb-10 imageStep" src={step.image}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </ReactTooltip>
                        <div className="inner-marker"></div>
                        </div></div>
</div>


                <div className="marker m2">
                    <span className="hint--top" data-hint="Here is a marker with more text!">
                        <div className="inner-marker"></div></span></div>




                <div className="marker m3">
                    <span className="hint--top" data-hint="Here is a marker with more text!">
                        <div className="inner-marker"></div></span></div>




                <div className="marker m4">
                    <span className="hint--top" data-hint="Here is a marker with more text!">
                        <div className="inner-marker"></div></span></div>




                <div className="marker m5">
                    <span className="hint--top" data-hint="Here is a marker with more text!">
                        <div className="inner-marker"></div></span></div>



                <div className="marker mlast">
                    <span className="hint--top" data-hint="Here is a marker with more text!">
                        <div className="inner-marker"></div></span></div>



                <div id="timeline-next"></div>
                <Form currentIndex={currentIndex} handleNext={_handleNext} handlePrevious={_handlePrev} />
            </div>
            {/* <div className="buttons text-white">
                <button
                    onClick={() => {
                        console.log(toggle);
                        if (isNaN(toggle)) {
                            prevImage = data.length;
                        } else {
                            var prevImage = toggle - 1;
                            if (prevImage <= 0) {
                                prevImage = data.length;
                            }
                        }
                        setVisible(false);
                        setToggle(String(prevImage));
                    }}
                >
                    Previous image
                </button>
                <button
                    onClick={() => {
                        console.log(toggle);
                        if (isNaN(toggle)) {
                            nextImage = 1;
                        } else {
                            var nextImage = parseInt(toggle) + 1;
                            if (nextImage >= data.length) {
                                nextImage = 1;
                            }
                        }
                        setToggle(String(nextImage));
                    }}
                >
                    Next image
                </button>
            </div> */}
            {/* <div className="flex justify-between container mb-96 App w-screen">
                {content.map(({ id, img }) => {
                    return (
                        <>
                            <div className="main">
                                <div className="text">
                                    <h1
                                        onClick={() => {
                                            setToggle(id);
                                            setVisible(false);
                                        }}
                                    >
                                        <Slider onChange={_handleIndexChange} currentIndex={currentIndex} />
                                    </h1>
                                    {toggle === id ? (
                                        <>
                                        <Form currentIndex={currentIndex} handleNext={_handleNext} handlePrevious={_handlePrev} />

                                        </>
                                    ) : null}
                                </div>
                                <div className="img">
                                    {visible && id === "1" ? (
                                        <Step currentIndex={currentIndex} />
                                    ) : null}
                                    {toggle === id ? (
                                        <>
                                        <Step currentIndex={currentIndex} />
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </>
                    );
                })}
            </div> */}
        </div>
    );
}
