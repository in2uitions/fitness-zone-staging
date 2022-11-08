import React from "react";

const formEls = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
const Step = ({ currentIndex, handleNext, handlePrevious, handleComplete }) => {
    return (
        <div className="flex justify-evenly items-center">
            <div className="flex items-center lg:space-x-60 space-x-32 justify-center absolute top-16 forwardback">
                <button disabled={currentIndex === 0} className="timelineBack" onClick={() => handlePrevious(currentIndex)}>
                    <img
                        src="/ArrowBack.svg"
                        className="arrows"
                        
                    />{" "}
                </button>
                <button disabled={currentIndex === 5} className="timelineForward" onClick={() => handleNext(currentIndex)}>
                    <img
                        src="/ArrowForward.svg"
                        className="arrows"
                        
                    />
                </button>
            </div>
        </div>
    );
};

export default Step;