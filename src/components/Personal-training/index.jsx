import React from "react";
import Split from "../Split";
import parse from "html-react-parser";
import services4Data from "../../data/sections/services4.json";
import { image_url } from "../../../global_vars";

const PersonalTraining = ({ withBG, withPadding, halfBG, withOutTitle, data = {} }) => {
    return (
        <section
            className={`services stylepadding`} style={{paddingTop:"120px"}}
        >
            <div className="">
                <div className="membershipTitle" style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
                    {data.title ? <p style={{ fontSize: "32px", letterSpacing: "15px", color: "white" }}>{data.title}</p> : null}
                </div>
                <div className="row mobileRow">
                    {
                        data.personal_training_components?.map((service, index) => (
                            <div className={`contact_block col-lg-4`} key={service.membership_components_id.id}>
                                <div className={` wow fadeInUp `} data-wow-delay={service.membership_components_id.id === 1 ? ".5s" : service.membership_components_id.id === 2 ? ".3s" : ".8s"}>
                                    <div style={{ position: "relative" }}>
                                        <img
                                            src={`${image_url}${service.membership_components_id?.image?.id}`}
                                            alt=""
                                            className="branch-img"
                                            style={{ height: "450px" }}
                                        />
                                        <div className="img_start" style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            position: "absolute",
                                            width: "100%",
                                            left: "0px",
                                            bottom: "3rem",
                                            zIndex: "22",
                                        

                                        }}>
                                        <h6 style={{ fontSize: "32px" }}>{service.membership_components_id.title[0].first}</h6>
                                        <h6 style={{ fontSize: "32px", fontFamily: "Montserrat Regular" }}>{service.membership_components_id.title[0].second}</h6>
                                    </div>

                                </div>
                                <div className="textPT" style={{width:"70%", paddingLeft:"3rem", marginTop:"1rem"}}>
                                                <p>{parse(`${service.membership_components_id.brief}`)}</p>
                                            </div>
                            </div>
                                
                            </div>
                        ))}
            </div>
            {data.book_session_button ?<div className="booksession" style={{display:"flex", justifyContent:"center", background:"#0090DF", padding:"10px 20px"}}>
             <p style={{fontSize:"21px"}}>{data.book_session_button}</p>
             </div>:null}
        </div>
            { halfBG && <div className="half-bg bottom"></div> }

        </section >
    );
};

export default PersonalTraining;