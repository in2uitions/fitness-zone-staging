import React from "react";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
import { data } from "autoprefixer";
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
        eventDescription: "Baabda branch became in motion",
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
        eventDescription: "Dbayeh has become home to Fitness Zone’s 7th branch",
        image: "/event-image.png",
    },
    {
        // eventTitle: "Event TitleFive",
        year: "2022",
        eventDescription:
            "The Fitness Zone experience is now expanding to the UAE with its first branch overseas in City Walk Dubai",
        image: "event-image.png",
    },
];
const aa = [{ image: "/triangle.png" }, { image: "/triangle.png" }, { image: "/triangle.png" }, { image: "/triangle.png" }, { image: "/triangle.png" }];
export default function Form({ data = {}, currentIndex, style = 'white', isFlipped = false }) {
    const [fade, setFade] = useState(true);
    return (
        <div className="flex justify-between relative">
            {steps.map((step, index) => {
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
                                <p className="text-white">{step.year}</p>
                                <br></br>
                            </div>
                        </div>
                );
            })}
        </div>
    );
};


