import React, { useState , useEffect } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import Step from './slider/steps'
import Slider from "./slider/slider";
// import Form from "./slider/Form";
import Head from "next/head";
import Script from "next/script";
import $ from "jquery"
export default function CompTimelineMobile({ data = {}, style = 'white', isFlipped = false }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    function dateFrmt(dat, frag) {
        const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        const d = new Date(dat);
        const month = monthNames[d.getMonth()];
        const year = d.getFullYear();
        if (frag == "m") return month;
        else return year;
    }

    $(document).ready(function () {
        $(".timeline1").addClass("parcours-active");
        $(".round1").css("background-image", "url(/slider-button-active.png)");
        $(".round1").css("width", "80px");
        $(".round1").css("height", "80px");
        $(".round1").css("top", "-1.75rem");
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
    useEffect(() => {
        let currentSection = 0;
        let sections = document.querySelectorAll(".section");
        let sectionButtons = document.querySelectorAll(".nav > li");
        let nextButton = document.querySelector(".next");
        let previousButton = document.querySelector(".previous");
        for (let i = 0; i < sectionButtons.length; i++) {
            sectionButtons[i].addEventListener("click", function() {
                sections[currentSection].classList.remove("activate");
                sectionButtons[currentSection].classList.remove("activate");
                sections[currentSection = i].classList.add("activate");
                sectionButtons[currentSection].classList.add("activate");
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
        
        document.querySelector(".next").addEventListener("click", function() {
            if (currentSection < sectionButtons.length - 1) {
                sectionButtons[currentSection + 1].click();
            }
        });
        
        document.querySelector(".previous").addEventListener("click", function() {
            if (currentSection > 0) {
                sectionButtons[currentSection - 1].click();
            }
        });
    })

    return (
        <>
            <div className="" id="loading">
                <div className="mt-20 mb-10 flex flex-col justify-center items-center text-center">
                    <p className="font-bold lg:text-5xl md:text-5xl text-3xl mb-5 futura-bold w-3/4 text-white">{data.title}</p>
                    {data.subtitle ? <p className="text-[#D8D8D8]  w-3/4 futura-book">
                        {parse(`${data.subtitle}`)}
                    </p> : null}
                </div>
                <div className="timeline-parcours ">

                    <div className="container-time-line">
                        <div className="time-line-parcours">
                            <div className="timeline-indicator">
                                <p className="indicator-val"></p>
                            </div>
                        </div>
                    </div>
                    <div className="" id="slides">
                        <div className="container-bulle">
                            {data.timeline.map((step, index) => {
                                let opacity = currentIndex === index ? "1" : "0";
                                {
                                    {/* console.log("color", opacity); */}
                                }
                                return (
                                    <ul className="timeline-section-tl nav">
                                        <li className={`tl-round ${step.timeline_items_id?.value}`} data-cont={step.timeline_items_id?.value}>
                                        <p className="-mt-20 text-white">{step.timeline_items_id?.date}</p></li>
                                    </ul>
                                );
                            })}
                        </div>
                        <div className="container-info relative ">



                            {data.timeline.map((step, index) => {
                                let opacity = currentIndex === index ? "1" : "0";
                                {
                                    {/* console.log("color", opacity); */}
                                }
                                return (
                                    <div className="timeline-section-tl">
                                        <div className={`parcours-box ${step.timeline_items_id?.name}`}>
                                            <div className="">
                                                <div className="fleche-bloc"></div>

                                                <section className="section activate infobox date1 lg:flex absolute top-0 bottom-0 right-28 left-28 items-center" id={step.timeline_items_id?.value}>
                                                    <div className="h-1/2">
                                                        <p className="text-white px-4 py-4">{parse(`${step.timeline_items_id?.description}`)} </p>
                                                    </div>
                                                    <div className="h-1/2 lg:px-14 lg:py-14">
                                                        <img src={`${image_url}${step.timeline_items_id?.image?.id}`} className="trainerimg none-event" altv={step.timeline_items_id?.title} />
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                        <div className="flex justify-evenly items-center">

                                        </div>
                                        
                                    </div>
                                );
                            })}
                            <div className="">
                                <button className="absolute left-0">
                                    <img
                                        src="/ArrowBack.svg"
                                        className="arrows previous disable" id="previous"

                                    />{" "}
                                </button>
                                <button className="absolute right-0">
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