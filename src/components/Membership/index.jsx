import React from "react";
import parse from "html-react-parser";
import { image_url } from "../../../global_vars";

const Membership = ({ withBG, withPadding, halfBG, withOutTitle, data = {} }) => {
    return (
        <section
            className={`services ${withPadding ? "section-padding" : ""} ${withBG ? "sub-bg" : ""
                }`}
        >
            <div className="">
            <div className="membershipTitle" style={{display:"flex", justifyContent:"center", marginBottom:"3rem"}}>
            {data.title ?<p style={{fontSize:"32px", letterSpacing:"15px", color:"white"}}>{data.title}</p>:null}
            </div>
                <div className="row mobileRow">
                    {
                        data.membership_components?.map((service, index) => (
                            <div className={`contact_block col-lg-4`} key={service.membership_components_id.id}>
                                <div className={` wow fadeInUp `} data-wow-delay={service.membership_components_id.id === 1 ? ".5s" : service.membership_components_id.id === 2 ? ".3s" : ".8s"}>
                                    <div style={{ position: "relative" }}>
                                        <img
                                            src={`${image_url}${service.membership_components_id?.image?.id}`}
                                            alt=""
                                            className="branch-img"
                                            style={{ height: "450px" }}
                                        />
                                            <div className="img_start" style={{ position: "absolute", bottom: "2rem", transform: "translateX(40%)" }}>
                                                <h6 style={{ fontSize: "32px" }}>{service.membership_components_id.title[0].first}</h6>
                                                <h6 style={{ fontSize: "32px", fontFamily: "Montserrat Regular" }}>{service.membership_components_id.title[0].second}</h6>
                                            </div>
                                            <div className='img__description'>
                                                <p>{parse(`${service.membership_components_id.brief}`)}</p>
                                            </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div className="diagonal-button-container" style={{
                                        marginTop: "4rem", display: "flex",
                                        justifyContent: "center", width: "50%"
                                    }} >
                                        <a style={{
                                            display: "flex",
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