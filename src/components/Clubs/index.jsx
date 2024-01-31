/* eslint-disable @next/next/no-img-element */
import React from "react";
import { image_url } from "../../../global_vars";
import parse from "html-react-parser";

const Clubs = ({ data = {} }) => {

    return (
        <section className="works pb-70 section-padding">
            <h2 style={{ display: 'none' }}> &nbsp; </h2>
            <div className="container">
                <div style={{ display: "flex",flexDirection:"column", justifyContent: "flex-start", alignItems: "start", gap: "20px", marginBottom: "3rem" }}>
                    <img src="/barSlash.svg" style={{width:"101px", height:"101px", position:"relative"}}/>
               
                    <h1 className="clubsTitle" style={{ fontWeight: "bold", letterSpacing:"15px", position:"absolute", 
                    // left:"10rem" 
                    }}>{data.title}</h1>
                    <h1 className="clubssubTitle" style={{ fontWeight: "200", fontFamily: "Montserrat Regular", fontSize:"14px", position:"absolute", top:"13rem", 
                    // left:"9.5rem" 
                    }}>{data.subtitle}</h1>
                </div> 
                <div className="row">
 
                    {data.clubs_components.map((item, index) => (
                        <div key={item.id} style={{ paddingLeft: "5px", paddingRight: "5px" }} className={` ${index % 2 !== 0 ? 'valign' : ''}`}>
                            <div className={`${index === 0 ? "borderTop mobileFlex" : "mobileFlex"}`} style={{ display: "flex", justifyContent: "space-between", gap: "50px", padding: "2rem 0", borderBottom: "1px solid" }}>
                                <div className="mobileWidthCont" style={{ display: "flex", flexDirection: "column", width: "40%" }}>
                                    <p style={{fontSize:"32px", color:"white"}}>{item.clubs_components_id.branch_name}</p>
                                    {parse(`${item.clubs_components_id.brief}`)}
                                    <a className="viewClub" style={{marginTop:"3rem", fontSize:"22px",textDecoration:"underline", fontFamily:"Montserrat Bold"}} href={item.clubs_components_id.button_link}>{item.clubs_components_id.button}</a>
                                </div> 
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{color:"#0090DF", marginBottom:"1rem", fontFamily:"Montserrat Bold"}}>{item.clubs_components_id.features}</p>
                                    {parse(`${item.clubs_components_id.features_brief}`)}
                                </div>
                                <div className="mobileWidthCont" style={{ width: "40%", display: "flex", justifyContent: "flex-end" }}>
                                    <img className="mobileImgWidth" style={{ width: "322px", height: "255px" }} src={`${image_url}${item.clubs_components_id.image?.id}`} alt="" />
                                </div>
                            </div>
                        </div>
                    ))} 
                </div> 
            </div>
        </section>
    );
};

export default Clubs;
