import React from "react";
import Split from "../Split";
import parse from "html-react-parser";
import services4Data from "../../data/sections/services4.json";
import { image_url } from "../../../global_vars";

const Membership = ({ withBG, withPadding, halfBG, withOutTitle, data = {} }) => {
    return (
        <section
            className={`services ${withPadding ? "section-padding" : ""} ${withBG ? "sub-bg" : ""
                }`}
        >
            <div className="">
                <div className="row">
                    {
                        data.membership_components?.map((service, index) => (
                            <div className={`col-lg-4`} key={service.membership_components_id.id}>
                                <div className={` wow fadeInUp `} data-wow-delay={service.membership_components_id.id === 1 ? ".5s" : service.membership_components_id.id === 2 ? ".3s" : ".8s"}>
                                    <div style={{ position: "relative" }}>
                                        <img
                                            src={`${image_url}${service.membership_components_id?.image?.id}`}
                                            alt=""
                                            style={{ height: "450px" }}
                                        />
                                        <div style={{ position: "absolute", bottom: "2rem", transform: "translateX(50%)" }}>
                                            <h6 style={{ fontSize: "32px" }}>{service.membership_components_id.title[0].first}</h6>
                                            <h6 style={{ fontSize: "32px", fontFamily: "Montserrat Regular" }}>{service.membership_components_id.title[0].second}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div style={{display:"flex", justifyContent:"center"}}>
                                <div className="diagonal-button-container" style={{
                                    marginTop: "4rem", display: "flex",
                                    justifyContent: "center", width:"50%"
                                }} >
                                <a  style={{ display: "flex",
                                    justifyContent: "center"
                                }} className="diagonal-button" href={service.membership_components_id.button_link}>{service.membership_components_id.button_title}</a>
              </div>
              </div>
                            </div>
                        ))}
                </div>
            </div> 
            {halfBG && <div className="half-bg bottom"></div>}
        </section>
    );
}; 

export default Membership;