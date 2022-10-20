import React from "react";

const formEls = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
const Form = ({ currentIndex, handleNext, handlePrevious, handleComplete }) => {
    return (
        <div className="form-container">
            {/* <h3>{formEls[currentIndex]}</h3> */}
            {/* {currentIndex === formEls.length - 1 ? (
                <FormElement
                    value={"Complete"}
                    onClick={() => handleComplete(currentIndex)}
                />
            ) : ( */}
            <div className="flex">
                <button disabled={currentIndex === 0} className="timelineBack" onClick={() => handlePrevious(currentIndex)}>
                    <img
                        src="/ArrowBack.svg"
                        className="arrows"
                        
                    />{" "}
                </button>
                <button disabled={currentIndex === 4} className="timelineForward" onClick={() => handleNext(currentIndex)}>
                    <img
                        src="/ArrowForward.svg"
                        className="arrows"
                        
                    />
                </button>
            </div>
            {/* )} */}
        </div>
    );
};

export default Form;
