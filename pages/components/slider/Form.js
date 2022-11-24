import React, { useState } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import Step from './slider/steps'
import Slider from "./slider/slider";
// import Form from "./slider/Form";
import HorizontalTimeline from "react-horizontal-timeline";
import { Timeline, TimelineEvent } from "react-event-timeline";
import Head from "next/head";
import Script from "next/script";
import $ from "jquery"
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
    const [refresh, setRefresh] = useState(0)
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
    $(document).ready(function () {
        $(".timeline1").addClass("parcours-active");
        // $(".round1").css("background-image", "url(/slider-button-active.png)");
        // $(".round1").css("width", "80px");
        // $(".round1").css("height", "80px");
        // $(".round1").css("top", "-1.75rem");
        $(".round1").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".parcours-active").removeClass("parcours-active");
            $(".timeline1").addClass("parcours-active");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("width", "80px");
            $(".round1").css("height", "80px");
            $(".round1").css("top", "-1.75rem");
            $(".round1").addClass("active-btn");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("width", "40px");
            $(".round2").css("height", "40px");
            $(".round2").css("top", "-4px");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("width", "40px");
            $(".round3").css("height", "40px");
            $(".round3").css("top", "-4px");
            $(".round4").css("background-image", "url(/slider-button-active.png)");
            $(".round4").css("width", "40px");
            $(".round4").css("height", "40px");
            $(".round4").css("top", "-4px");
            $(".round5").css("background-image", "url(/slider-button-active.png)");
            $(".round5").css("width", "40px");
            $(".round5").css("height", "40px");
            $(".round5").css("top", "-4px");
            $(".round6").css("background-image", "url(/slider-button-active.png)");
            $(".round6").css("width", "40px");
            $(".round6").css("height", "40px");
            $(".round6").css("top", "-4px");
            // $(".timeline-indicator").css("width", "0");
        })

        $(".round2").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            // $(".tl-round").css("width", "80px");
            // $(".tl-round").css("height", "80px");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("width", "40px");
            $(".round1").css("height", "40px");
            $(".round1").css("top", "-4px");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("width", "80px");
            $(".round2").css("height", "80px");
            $(".round2").css("top", "-1.75rem");
            $(".round2").addClass("active-btn");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("width", "40px");
            $(".round3").css("height", "40px");
            $(".round3").css("top", "-4px");
            $(".round4").css("background-image", "url(/slider-button-active.png)");
            $(".round4").css("width", "40px");
            $(".round4").css("height", "40px");
            $(".round4").css("top", "-4px");
            $(".round5").css("background-image", "url(/slider-button-active.png)");
            $(".round5").css("width", "40px");
            $(".round5").css("height", "40px");
            $(".round5").css("top", "-4px");
            $(".round6").css("background-image", "url(/slider-button-active.png)");
            $(".round6").css("width", "40px");
            $(".round6").css("height", "40px");
            $(".round6").css("top", "-4px");
            $(".parcours-active").removeClass("parcours-active");
            $(".timeline2").addClass("parcours-active");
            $(".timeline-indicator").css("width", "240");
        })

        $(".round3").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("width", "40px");
            $(".round1").css("height", "40px");
            $(".round1").css("top", "-4px");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("width", "40px");
            $(".round2").css("height", "40px");
            $(".round2").css("top", "-4px");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("width", "80px");
            $(".round3").css("height", "80px");
            $(".round3").css("top", "-1.75rem");
            $(".round3").addClass("active-btn");
            $(".round4").css("background-image", "url(/slider-button-active.png)");
            $(".round4").css("width", "40px");
            $(".round4").css("height", "40px");
            $(".round4").css("top", "-4px");
            $(".round5").css("background-image", "url(/slider-button-active.png)");
            $(".round5").css("width", "40px");
            $(".round5").css("height", "40px");
            $(".round5").css("top", "-4px");
            $(".round6").css("background-image", "url(/slider-button-active.png)");
            $(".round6").css("width", "40px");
            $(".round6").css("height", "40px");
            $(".round6").css("top", "-4px");
            $(".parcours-active").removeClass("parcours-active");
            $(".timeline3").addClass("parcours-active");
            $(".timeline-indicator").css("width", "480");
        })

        $(".round4").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("width", "40px");
            $(".round1").css("height", "40px");
            $(".round1").css("top", "-4px");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("width", "40px");
            $(".round2").css("height", "40px");
            $(".round2").css("top", "-4px");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("width", "40px");
            $(".round3").css("height", "40px");
            $(".round3").css("top", "-4px");
            $(".round4").css("background-image", "url(/slider-button-active.png)");
            $(".round4").css("background-image", "url(/slider-button-active.png)");
            $(".round4").css("width", "80px");
            $(".round4").css("height", "80px");
            $(".round4").css("top", "-1.75rem");
            $(".round4").addClass("active-btn");
            $(".round5").css("background-image", "url(/slider-button-active.png)");
            $(".round5").css("width", "40px");
            $(".round5").css("height", "40px");
            $(".round5").css("top", "-4px");
            $(".round6").css("background-image", "url(/slider-button-active.png)");
            $(".round6").css("width", "40px");
            $(".round6").css("height", "40px");
            $(".round6").css("top", "-4px");
            $(".parcours-active").removeClass("parcours-active");
            $(".timeline4").addClass("parcours-active");
            $(".timeline-indicator").css("width", "720");
        })
        $(".round5").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("width", "40px");
            $(".round1").css("height", "40px");
            $(".round1").css("top", "-4px");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("width", "40px");
            $(".round2").css("height", "40px");
            $(".round2").css("top", "-4px");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("width", "40px");
            $(".round3").css("height", "40px");
            $(".round3").css("top", "-4px");
            $(".round4").css("background-image", "url(/slider-button-active.png)");
            $(".round4").css("width", "40px");
            $(".round4").css("height", "40px");
            $(".round4").css("top", "-4px");
            $(".round5").css("background-image", "url(/slider-button-active.png)");
            $(".round5").css("background-image", "url(/slider-button-active.png)");
            $(".round5").css("width", "80px");
            $(".round5").css("height", "80px");
            $(".round5").css("top", "-1.75rem");
            $(".round5").addClass("active-btn");
            $(".round6").css("background-image", "url(/slider-button-active.png)");
            $(".round6").css("width", "40px");
            $(".round6").css("height", "40px");
            $(".round6").css("top", "-4px");
            $(".parcours-active").removeClass("parcours-active");
            $(".timeline5").addClass("parcours-active");
            $(".timeline-indicator").css("width", "720");
        })
        $(".round6").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button.svg)");
            $(".round1").css("background-image", "url(/slider-button.svg)");
            $(".round1").css("width", "40px");
            $(".round1").css("height", "40px");
            $(".round1").css("top", "-4px");
            $(".round2").css("background-image", "url(/slider-button.svg)");
            $(".round2").css("width", "40px");
            $(".round2").css("height", "40px");
            $(".round2").css("top", "-4px");
            $(".round3").css("background-image", "url(/slider-button.svg)");
            $(".round3").css("width", "40px");
            $(".round3").css("height", "40px");
            $(".round3").css("top", "-4px");
            $(".round4").css("background-image", "url(/slider-button.svg)");
            $(".round4").css("width", "40px");
            $(".round4").css("height", "40px");
            $(".round4").css("top", "-4px");
            $(".round5").css("background-image", "url(/slider-button.svg)");
            $(".round5").css("width", "40px");
            $(".round5").css("height", "40px");
            $(".round5").css("top", "-4px");
            $(".round6").css("background-image", "url(/slider-button-active.png)");
            $(".round6").css("width", "80px");
            $(".round6").css("height", "80px");
            $(".round6").css("top", "-1.75rem");
            $(".round6").addClass("active-btn");
            $(".parcours-active").removeClass("parcours-active");
            $(".timeline6").addClass("parcours-active");
            $(".timeline-indicator").css("width", "720");
        })

    });
    let currentSection = 0;
    let sections = document.querySelectorAll(".section ");
    let sectionButtons = document.querySelectorAll(".nav > li");
    let nextButton = document.querySelector(".next");
    let previousButton = document.querySelector(".previous");
    for (let i = 0; i < sectionButtons.length; i++) {
        sectionButtons[i].addEventListener("click", function () {
            sections[currentSection].classList.remove("activate");
            sectionButtons[currentSection].classList.remove("activate");
            sections[currentSection = i].classList.add("activate");
            sectionButtons[currentSection].classList.add("activate");
            setRefresh(refresh + 1)
            if (i === 0) {
                if (previousButton.className.split(" ").indexOf("disable") < 0) {
                    previousButton.classList.add("disable");
                }
            } else {
                if (previousButton.className.split(" ").indexOf("disable") >= 0) {
                    previousButton.classList.remove("disable");
                }
            }
            if (i === sectionButtons.length - 1) {
                if (nextButton.className.split(" ").indexOf("disable") < 0) {
                    nextButton.classList.add("disable");
                }
            } else {
                if (nextButton.className.split(" ").indexOf("disable") >= 0) {
                    nextButton.classList.remove("disable");
                }
            }
        });
    }
    nextButton?.addEventListener("click", function () {
        if (currentSection < sectionButtons.length - 1) {
            sectionButtons[currentSection + 1].click();
            console.log("next")
        }
    });

    previousButton?.addEventListener("click", function () {
        if (currentSection > sectionButtons.length) {
            sectionButtons[currentSection - 1].click();
            console.log("prev")
        }
    });
    if (currentSection != 0) {
        return <div>loading...</div>;
    }

    // btn?.addEventListener('click', () => {
    //     console.log('btn clicked');
    // });

    return (
        <>
            <div className="" id="loading">
                <div className="mt-40 mb-20 flex flex-col justify-center items-center text-center">
                    <p className="font-bold lg:text-5xl md:text-5xl text-3xl mb-5 futura-bold w-3/4 text-white">{data.title}</p>
                    {data.subtitle ? <p className="text-[#D8D8D8]  w-3/4 futura-book">
                        {parse(`${data.subtitle}`)}
                    </p> : null}
                </div>
                <div className="timeline-parcours mt-36">

                    <div className="container-time-line">
                        <div className="time-line-parcours">
                            <div className="timeline-indicator">
                                <p className="indicator-val"></p>
                            </div>
                        </div>
                    </div>
                    <div className="" id="slides">
                        <div className="container-bulle mb-24">
                            {data.timeline.map((step, index) => {
                                let opacity = currentIndex === index ? "1" : "0";

                                return (
                                    <ul className="timeline-section-tl nav flex flex-col items-center">
                                        {/* <div className="flex flex-col items-center"> */}
                                        <li className={`tl-round ${step.timeline_items_id?.value}`} data-cont={step.timeline_items_id?.value}>
                                            <p className="-mt-20">{step.timeline_items_id?.date}</p></li>
                                        {/* </div> */}
                                    </ul>
                                );
                            })}
                        </div>
                        <div className="container-info relative ">



                            {data.timeline.map((step, index) => {
                                let opacity = currentIndex === index ? "1" : "0";

                                return (
                                    <section className="timeline-section-tl section activate ">
                                        <div className={`parcours-box ${step.timeline_items_id?.name}`}>
                                            <div className="">
                                                <div className="fleche-bloc"></div>

                                                <div className="infobox date1 lg:flex absolute top-0 bottom-0 right-28 left-28 items-center" id={step.timeline_items_id?.value}>
                                                    <div className="lg:w-1/2 lg:py-16 lg:px-24 mt-24">
                                                        <br></br>
                                                        <p className="text-white ">{parse(`${step.timeline_items_id?.description}`)} </p>
                                                    </div>
                                                    <div className="lg:w-1/2 lg:px-14 lg:py-14">
                                                        <img src={`${image_url}${step.timeline_items_id?.image?.id}`} className="trainerimg none-event" altv={step.timeline_items_id?.title} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-evenly items-center">

                                        </div>
                                    </section>
                                );
                            })}
                            <div className="flex items-center lg:space-x-60 space-x-32 justify-center absolute forwardback">
                                <button className="timelineBack">
                                    <img
                                        src="/ArrowBack.svg"
                                        className="arrows previous disable" id="previous"

                                    />{" "}
                                </button>
                                <button className="timelineForward">
                                    <img
                                        src="/ArrowForward.svg"
                                        className="arrows next" id="next"

                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div></>
    );
}