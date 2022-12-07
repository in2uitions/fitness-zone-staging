import React, { useState } from "react";

export default function App() {
    const data = [
        {
            year: "2011",
            desc:
                "LG acquired Daewoo Entech -- a South Korean-based operations and maintenance (O&M) company for running water treatment plants -- and formed LG HiEntech"
        },
        {
            year: "2012",
            desc:
                "LG formed a IV with Hitachi named LG-Hitachi Water Solutions - an engineering, procurement, and construction (EPC) contractor for water treatment facilities"
        },
        {
            year: "2014",
            desc:
                "LG Chem acquired NanoH2O -- a US-based seawater reverse osmosis (SWRO) membrane producer -- to expand its global capabilities in the public and private water treatment business"
        },
        {
            year: "2017",
            desc:
                "LG Chem aggressively entered the residential market with its own brand in 2017. However, the company gave up its playing in element business in less than two years"
        }
    ];

    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(0);
    return (
        <div className="flex flex-col">
            <div style={{ width: "100vw", height: "100px", margin: "0 auto" }}>
                {/* <HorizontalTimeline
                    getLabel={data => data}
                    index={current}
                    indexClick={index => {
                        setCurrent(index);
                        setPrevious(current);
                    }}
                    values={data.map(el => el.year)}
                    maxEventPadding={20}
                    minEventPadding={20}
                    styles={{
                        background: "white",
                        foreground: "#BD3253",
                        outline: "#BFBFBF",
                        margin: "0 auto",
                        textAlign: "center"
                    }}
                /> */}
            </div>
            <div className="shadow-lg container -mt-2 transition duration-1000 ease-in-out timeline-items flex timeline-mobile">{data[current].desc}</div>
            <div>
                {/* <Timeline>
          {data.map(el => {
            return <TimelineEvent title={el.year}>{el.desc}</TimelineEvent>;
          })}
        </Timeline> */}
            </div>
        </div>
    );
}
