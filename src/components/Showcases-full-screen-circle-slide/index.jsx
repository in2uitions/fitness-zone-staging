// components/Timeline.js
import React from "react";
import parse from "html-react-parser";

const Timeline = ({ data }) => { 
  return (
    <div className="timelineSection">
    <div className="container mobileTimeline">
      <div className="row">
        <div className="">
          <div
          style={{display:"inline-block", width:"100%"}}>
            <ul className="timeline timeline-horizontal">
            {data.timeline_components.map((event, index) => (
              <li className="timeline-item">
                <div className="timeline-badge primary">
                  
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">{event.timeline_components_id.date}</h4>
                  </div>
                  <div className="timeline-body">
                    {parse(`${event.timeline_components_id.brief}`)}
                  </div>
                </div>
                <p className="timeline-name">{event.timeline_components_id.branch_name}</p>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Timeline;
