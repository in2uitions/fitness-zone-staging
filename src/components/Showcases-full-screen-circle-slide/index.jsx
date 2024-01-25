// components/Timeline.js
import React from "react";
import slides from "../../data/sections/timeline.json";

const Timeline = ({ data }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="">
          <div
          style={{display:"inline-block", width:"100%"}}>
            <ul className="timeline timeline-horizontal">
            {slides.map((event, index) => (
              <li className="timeline-item">
                <div className="timeline-badge primary">
                  
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">{event.date}</h4>
                  </div>
                  <div className="timeline-body">
                    <p>
                    {event.position}
                    </p>
                  </div>
                </div>
                <p className="timeline-name">{event.name}</p>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
