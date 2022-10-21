import React, { useState } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import Step from './slider/steps'
import Slider from "./slider/slider";
import Form from "./slider/Form";

export default function CompTimeline({ data = {}, style = 'white', isFlipped = false }) {
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
    const _handleComplete = () => { };
    return (
        <>
            <div className="">
                <div className="mt-40 mb-20 flex flex-col justify-center items-center text-center">
                    <p className="font-bold lg:text-5xl md:text-5xl text-3xl mb-5 futura-bold w-3/4 text-white">{data.title}</p>
                    <p className="text-[#D8D8D8] w-3/4 futura-book">
                        {data.subtitle}
                    </p>
                </div>
                <div className="App">
                    <div className="flex flex-col w-screen">

                        <Slider onChange={_handleIndexChange} currentIndex={currentIndex} />
                        <div className="container">

                        </div>
                        <div className="container relative">
                            <div className="form-container">
                                <Form
                                    currentIndex={currentIndex}
                                    handleNext={_handleNext}
                                    handleComplete={_handleComplete}
                                />
                            </div>
                        </div>
                        {/* <Step currentIndex={currentIndex} handleNext={_handleNext} handlePrevious={_handlePrev} /> */}
                    </div>

                </div>
            </div></>
    );
}
