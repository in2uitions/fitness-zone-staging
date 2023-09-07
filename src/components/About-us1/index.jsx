/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import AboutUs1Date from "../../data/sections/about-us1.json";

const AboutUs1 = () => {
  return (
    <div className="about section-padding" style={{ backgroundImage: 'url("MainSite.png")', backgroundRepeat:"no-repeat" }}>
      <div className="container" >
        <div className="row">
          <div className="col-lg-5">
          <div className="content">
              <Split>
                <h3
                  className="words chars splitting main-title wow"
                  data-splitting
                >
                  {AboutUs1Date.title.first} <br /> {AboutUs1Date.title.second}
                </h3>
              </Split>
              <Split>
                <p className="words chars splitting wow txt" data-splitting>
                  {AboutUs1Date.content}
                </p>
              </Split>
            </div>
            
          </div>
          <div className="col-lg-6 offset-lg-1 valign">
          <div className="img-mons">
              <div className="row">
                    <img src="/aboutUsImg.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs1;
