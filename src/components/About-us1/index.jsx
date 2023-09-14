/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import Membership from "../../data/sections/membership.json";

const AboutUs1 = () => {
  return (
    <div className="about section-padding">
      <div className="container">
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-lg-5">
            <div className="img-mons">
              <div className="row">
                <div className="" style={{ width: "100%" }}>
                  <div className="img1 wow imago" data-wow-delay=".5s">
                    <img src={Membership.image1} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1 valign">
            <div className="content">
              <div className="">
                <h6 style={{ fontWeight: "normal", marginBottom: "10px" }}>
                  {Membership.smallTitle}
                </h6>
                {/* <span></span>
                <span></span>
                <span></span> */}
              </div>
              <Split>
                <h3
                  className="words chars splitting main-title wow"
                  data-splitting
                >
                  {Membership.title.first} <br /> {Membership.title.second}
                </h3>
              </Split>
              <Split>
                <p className="words chars splitting wow txt" data-splitting>
                  {Membership.content}
                </p>
              </Split>
              <div className=" mt-30">
                <ul
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {Membership.features.map((feature) => (
                    <li
                      key={feature.id}
                      className={`wow fadeIn ${feature.id == 2 ? "space" : ""}`}
                      style={{
                        backgroundImage: `url(${feature.icon})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        display: "flex",
                        alignItems: "center",
                        position:"relative",
                        width:"100%",
                        height:"8rem"
                      }}
                      data-wow-delay={feature.wowDelay}
                    >
                      <h6
                        className="custom-font"
                        style={{
                          fontSize: "24px",
                          textAlign: "center",
                          fontWeight: "500",
                          lineHeight: "26px",
                          position:"absolute",
                          top:"10px",
                          left:"0.5rem"
                        }}
                      >
                        {feature.name.first} <br /> {feature.name.second} <br />{" "}
                        {feature.name.third} <br /> {feature.name.fourth}
                      </h6>
                      <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs1;
