// components/Timeline.js
import React from 'react';
import slides from '../../data/sections/timeline.json';

const Timeline = ({ data }) => {
  return (
    <div className="timeline " style={{ marginTop: "20rem" }}>
      <div className="eventLine"></div>
      {slides.map((event) => (
        <div className="timelineEvent">

          <div style={{ marginBottom: "2rem", padding: "0 60px" }}>
            <div className="eventDate">{event.date}</div>
            <div className="eventDate">{event.position}</div>
          </div>
          <div className="eventCircle"></div>
          <div className="eventDescription">{event.name}</div>
        </div>
      ))}
    </div> 
  );
};

export default Timeline;
