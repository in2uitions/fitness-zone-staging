import React from "react";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
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
const Step = ({ currentIndex, handleNext, handlePrevious }) => {

    const [fade, setFade] = useState(true);
    return (
        <div className="container relative">
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

        </div>
    );
};

export default Step;
