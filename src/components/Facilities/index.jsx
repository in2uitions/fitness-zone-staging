import React from "react";
import Link from "next/link";
import Split from '../Split';
import { image_url } from "../../../global_vars";

const Facilities = ({ subBG, newHome, data = {} }) => {
    return (
        <section className={`blog-gridd section-padding ${subBG ? "sub-bg" : ""}`}>
            <div className="container">
                <div className="custom-font text-center">
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%",position:"relative"}}>
                        <img src="/demi-circle.svg" style={{height:"20rem"}}/>
                        <div style={{position: "absolute", top:"3.5rem"}}>
                            <p style={{fontSize:"42px", color:"white",lineHeight:1, fontFamily:"Montserrat Regular"}}>{data.title}</p>
                            <p style={{fontSize:"62px", fontWeight:"bold", color:"white",lineHeight:1, fontFamily:'Montserrat ExtraBold'}}>{data.subtitle}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                {data.facilities.map((item, index) => (
                    <div className="col-lg-4 wow fadeInUp" data-wow-delay=".3s">
                    
                        <div
                            className={`item `}
                            style={{ backgroundImage: `url(${image_url}${item.facilities_id?.image?.id})`,height:"20rem", backgroundRepeat:"no-repeat", backgroundSize:"cover" }}
                        >
                            <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100%"}}>
                            <p style={{fontWeight:"bold" ,color:"white", fontFamily:"Montserrat ExtraBold"}}>{item.facilities_id.title}</p>
                                <div style={{background:"#1990df", padding:"10px",marginTop:"1rem", borderRadius:"5px", fontWeight:"lighter"}}>
                                    <Link href="/account/login">
                                        <a className="">{item.facilities_id.button_title}</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                
                    </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Facilities;
