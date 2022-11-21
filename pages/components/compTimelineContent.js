import React, { useState } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import Step from './slider/steps'
import Slider from "./slider/slider";
import Form from "./slider/Form";
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
        $(".parc1").addClass("parcours-active");


        $(".round1").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".parcours-active").removeClass("parcours-active");
            $(".parc1").addClass("parcours-active");
            // $(".timeline-indicator").css("width", "0");
        })

        $(".round2").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            // $(".tl-round").css("width", "80px");
            // $(".tl-round").css("height", "80px");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".parcours-active").removeClass("parcours-active");
            $(".parc2").addClass("parcours-active");
            $(".timeline-indicator").css("width", "240");
        })

        $(".round3").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".parcours-active").removeClass("parcours-active");
            $(".parc3").addClass("parcours-active");
            $(".timeline-indicator").css("width", "480");
        })

        $(".round4").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round4").css("background-image", "url(/slider-button-active.png)");
            $(".parcours-active").removeClass("parcours-active");
            $(".parc4").addClass("parcours-active");
            $(".timeline-indicator").css("width", "720");
        })
        $(".round5").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round4").css("background-image", "url(/slider-button-active.png)");
            $(".round5").css("background-image", "url(/slider-button-active.png)");
            $(".parcours-active").removeClass("parcours-active");
            $(".parc5").addClass("parcours-active");
            $(".timeline-indicator").css("width", "720");
        })
        $(".round6").on("click", function () {
            $(".tl-round").css("background-image", "url(/slider-button-active.png)");
            $(".round1").css("background-image", "url(/slider-button-active.png)");
            $(".round2").css("background-image", "url(/slider-button-active.png)");
            $(".round3").css("background-image", "url(/slider-button-active.png)");
            $(".round4").css("background-image", "url(/slider-button-active.png)");
            $(".round5").css("background-image", "url(/slider-button-active.png)");
            $(".round6").css("background-image", "url(/slider-button-active.png)");
            $(".parcours-active").removeClass("parcours-active");
            $(".parc6").addClass("parcours-active");
            $(".timeline-indicator").css("width", "720");
        })

    });
    return (
        <>
            <div className="">
                <div className="mt-40 mb-20 flex flex-col justify-center items-center text-center">
                    <p className="font-bold lg:text-5xl md:text-5xl text-3xl mb-5 futura-bold w-3/4 text-white">{data.title}</p>
                    {data.subtitle ? <p className="text-[#D8D8D8] w-3/4 futura-book">
                        {parse(`${data.subtitle}`)}
                    </p> : null}
                </div>
                <div className="timeline-parcours">

                    <div className="container-time-line">
                        <div className="time-line-parcours">
                            <div className="timeline-indicator">
                                <p className="indicator-val"></p>
                            </div>
                        </div>
                    </div>
                    <div className="container-bulle">
                        <div className="timeline-section-tl">
                            <div className="tl-round round1"></div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="tl-round round2"></div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="tl-round round3"></div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="tl-round round4"></div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="tl-round round5"></div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="tl-round round6"></div>
                        </div>
                    </div>
                    <div className="container-info relative">
                        <div className="timeline-section-tl">
                            <div className="parcours-box parc1">
                                <div className="fleche-bloc"></div>
                                <div className="infobox date1 lg:flex absolute inset-0 items-center w-screen lg:px-40 md:px-40 px-6">
                                    <div className="lg:w-1/2 lg:py-16 lg:px-24 px-14 mt-24">
                                        {/* <h3>{step.timeline_items_id?.title}</h3> */}
                                        {/* <p className="text-white">{step.timeline_items_id?.date}</p> */}
                                        <br></br>
                                        <p className="text-white">Baabda branch became in motion</p>
                                    </div>
                                    <div className="lg:w-1/2 px-14 py-14">
                                        <img src="/blurred-background-rows-black-dumbbells-rack-gym.jpg" className="trainerimg none-event" />
                                        {/* <img className="pt-10 pb-10 imageStep" src={step.image} /> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="parcours-box parc2">
                                <div className="fleche-bloc"></div>
                                <div className="infobox date1 lg:flex absolute inset-0 items-center w-screen lg:px-40 md:px-40 px-6">
                                    <div className="lg:w-1/2 lg:py-16 lg:px-24 px-14 mt-24">
                                        {/* <h3>{step.timeline_items_id?.title}</h3> */}
                                        {/* <p className="text-white">{step.timeline_items_id?.date}</p> */}
                                        <br></br>
                                        <p className="text-white">The expansion journey continued with the opening of kaslik branch</p>
                                    </div>
                                    <div className="lg:w-1/2 px-14 py-14">
                                        <img src="/blurred-background-rows-black-dumbbells-rack-gym.jpg" className="trainerimg none-event" />
                                        {/* <img className="pt-10 pb-10 imageStep" src={step.image} /> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="parcours-box parc3">
                                <div className="fleche-bloc"></div>
                                <div className="infobox date1 lg:flex absolute inset-0 items-center w-screen lg:px-40 md:px-40 px-6">
                                    <div className="lg:w-1/2 lg:py-16 lg:px-24 px-14 mt-24">
                                        {/* <h3>{step.timeline_items_id?.title}</h3> */}
                                        {/* <p className="text-white">{step.timeline_items_id?.date}</p> */}
                                        <br></br>
                                        <p className="text-white">The dynamic attribute of Beirut has led Fitness Zone to open a branch in Beirut Souks, the hub of commercial and business activity in the capital</p>
                                    </div>
                                    <div className="lg:w-1/2 px-14 py-14">
                                        <img src="/blurred-background-rows-black-dumbbells-rack-gym.jpg" className="trainerimg none-event" />
                                        {/* <img className="pt-10 pb-10 imageStep" src={step.image} /> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="parcours-box parc4">
                                <div className="fleche-bloc"></div>
                                <div className="infobox date1 lg:flex absolute inset-0 items-center w-screen lg:px-40 md:px-40 px-6">
                                    <div className="lg:w-1/2 lg:py-16 lg:px-24 px-14 mt-24">
                                        {/* <h3>{step.timeline_items_id?.title}</h3> */}
                                        {/* <p className="text-white">{step.timeline_items_id?.date}</p> */}
                                        <br></br>
                                        <p className="text-white">The dynamic attribute of Beirut has led Fitness Zone to open a branch in Beirut Souks, the hub of commercial and business activity in the capital</p>
                                    </div>
                                    <div className="lg:w-1/2 px-14 py-14">
                                        <img src="/blurred-background-rows-black-dumbbells-rack-gym.jpg" className="trainerimg none-event" />
                                        {/* <img className="pt-10 pb-10 imageStep" src={step.image} /> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="parcours-box parc5">
                                <div className="fleche-bloc"></div>
                                <div className="infobox date1 lg:flex absolute inset-0 items-center w-screen lg:px-40 md:px-40 px-6">
                                    <div className="lg:w-1/2 lg:py-16 lg:px-24 px-14 mt-24">
                                        {/* <h3>{step.timeline_items_id?.title}</h3> */}
                                        {/* <p className="text-white">{step.timeline_items_id?.date}</p> */}
                                        <br></br>
                                        <p className="text-white">Dbayeh has become home to Fitness Zone's 7th branch</p>
                                    </div>
                                    <div className="lg:w-1/2 px-14 py-14">
                                        <img src="/blurred-background-rows-black-dumbbells-rack-gym.jpg" className="trainerimg none-event" />
                                        {/* <img className="pt-10 pb-10 imageStep" src={step.image} /> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="timeline-section-tl">
                            <div className="parcours-box parc6">
                                <div className="fleche-bloc"></div>
                                <div className="infobox date1 lg:flex absolute inset-0 items-center w-screen lg:px-40 md:px-40 px-6">
                                    <div className="lg:w-1/2 lg:py-16 lg:px-24 px-14 mt-24">
                                        {/* <h3>{step.timeline_items_id?.title}</h3> */}
                                        {/* <p className="text-white">{step.timeline_items_id?.date}</p> */}
                                        <br></br>
                                        <p className="text-white">The Fitness Zone experience is now expanding to the UAE with its first branch overseas in City Walk Dubai</p>
                                    </div>
                                    <div className="lg:w-1/2 px-14 py-14">
                                        <img src="/blurred-background-rows-black-dumbbells-rack-gym.jpg" className="trainerimg none-event" />
                                        {/* <img className="pt-10 pb-10 imageStep" src={step.image} /> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <Step currentIndex={currentIndex} handleNext={_handleNext} handlePrevious={_handlePrev} />
                    </div>


                </div>

            </div></>
    );
}