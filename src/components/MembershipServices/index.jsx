import React from "react";
import Split from "../Split";
import membership from "../../data/sections/membershipdata.json";

const MembershipServices = ({ withBG, withPadding, halfBG, withOutTitle }) => {
    return (
        <section
            className={`services ${withPadding ? "section-padding" : ""} ${withBG ? "sub-bg" : ""
                }`}
        >
            <div className="" style={{paddingLeft:"3rem",paddingRight:"3rem", width:"100%"}}>
                {!withOutTitle && (
                    <div
                        className="text-center"
                        style={{ marginBottom: "2rem", fontSize: "21px" }}
                    >
                        A COMMUNITY FOR THE{" "}
                        <span style={{ fontWeight: "bold" }}>THE POWERFUL</span>
                    </div>
                )}
                <div className="row">
                    {membership.map((item, index) => (
                        <div className={`col-lg-4`} key={item.id}>
                            <div
                                className="item wow fadeInUp"
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    position: "relative",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    height:"30rem"
                                }}
                                data-wow-delay={
                                    item.id === 1 ? ".5s" : item.id === 2 ? ".3s" : ".8s"
                                }
                            >
                                <h6 style={{position:"absolute", bottom:"0"}}>{item.title}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {halfBG && <div className="half-bg bottom"></div>}
        </section>
    );
};

export default MembershipServices;
