import React from "react";
import Split from "../Split";
import Link from "next/link";
import GoogleMapReact from 'google-map-react';

const ContactUs = ({ img, theme, subBG, noSubBG, data = {} }) => {
    const defaultProps = {
        center: {
            lat:  33.325721,
            lng: 44.462091
        },
        zoom: 13
    };
    const pin = "/location-marker.png"

    const markerStyle = {
        position: "absolute",
        top: "0%",
        left: "0%",
        bottom:"0%",
        right:"0%"
        // transform: "translate(-50%, -100%)"
    };
    return (
        <>
            <section
                className={`call-action section-padding ${subBG ? "sub-bg" : ""} bg-img`}
                style={{ backgroundImage: `url(${img ? img : "/img/pattern.png"})` }}
            >
                <div className="container">
                    <div className="">
                        <p style={{ fontSize: "42px" }}>{data.title}</p>
                    </div>
                    <div className="mobileFlex" style={{ display: "flex", marginTop: "2rem" }}>
                        <div className="">
                            <div style={{ display: "flex", flexDirection: "column" }}>

                                <p style={{ fontFamily: "Montserrat Bold", letterSpacing: "10px", fontWeight: "bold", fontSize: "28px" }}>BEIRUT</p>
                                <p>+961 01 2345 678923</p>
                                <p>Contact@fitnesszone.com.lb</p>
                            </div>
                        </div>
                        <div className="">
                            <img className="imgHeight" src="/contact.svg" style={{ height: "60%" }} />
                        </div>
                        <div className="">
                            {/* <img src="contactUs.png"/> */}
                            <div style={{ display: "flex", flexDirection: "column" }}>

                                <p style={{ fontFamily: "Montserrat Bold", letterSpacing: "10px", fontWeight: "bold", fontSize: "28px" }}>DUBAI</p>
                                <p>+961 01 2345 678923</p>
                                <p>Contact@fitnesszone.com.lb</p>

                            </div>

                        </div>

                    </div>
                    <div className="mobileFlex flexCenter" style={{ display: "flex", justifyContent: "space-between" }}>
                        {data?.contact?.map((item, i) => (
                            <div className="spacing" style={{ display: "flex", flexDirection: "column" }}>
                                <p style={{ fontFamily: "Montserrat Bold" }}>{item.comp_contact_items_id.location}</p>
                                <p>{item.comp_contact_items_id.number}</p>
                                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "0.5rem" }}>
                                    {/* <img src="/phoneIcon.svg" style={{width:"25px", height:"25px"}}/>
                            <p>call now</p> */}
                                    <a href={`tel:${item.comp_contact_items_id.number}`} target="_blank" style={{ display: "flex", alignItems: "center" }}>
                                        <img src="/phoneIcon.svg" style={{ width: '30px', height: '30px', marginRight: '15px' }} />
                                        call now
                                    </a>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
            <section className={` ${noSubBG ? '' : 'sub-bg'}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5" style={{display:"flex", justifyContent:"center"}}>
                            <div className="cont" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <div className="con-info custom-font">
                                    <ul>
                                        <li>
                                            <a href="//api.whatsapp.com/send?phone=971547274777" target="_blank" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <img src="/WTSP.png" style={{ width: '40px', height: "40px", marginBottom: "5px" }} /><span>Instant Whatsapp </span>
                                            </a>
                                        </li>
                                        {/* <li>
                    <span>Address : </span> A32 , Ave 15th Street, Door 211, San
                    Franciso, USA 32490.
                  </li> */}
                                        {/* <li>
                                            <span>Phone : </span> +961 3 505 250
                                        </li> */}
                                    </ul>
                                </div>
                                <div className="social-icon">
                                    <h6 className="custom-font stit simple-btn">Follow Us</h6>
                                    <div className="social">
                                        <a href="#0" className="icon">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#0" className="icon">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="#0" className="icon">
                                            <i className="fab fa-pinterest"></i>
                                        </a>
                                        <a href="#0" className="icon">
                                            <i className="fab fa-behance"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                                <div style={{ height: '50vh', width: '47vw', padding: '0,0,0,0' }} className="map-border ">
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: "AIzaSyAl7GsTSNoZ3a-jLWJ41tky7HHTaSojqVI" }}
                                        defaultCenter={defaultProps.center}
                                        defaultZoom={defaultProps.zoom}
                                    >
                                                <div className='flex flex-col justify-center items-center' lat="44.462091" lng="43.462091">

                                                    <a target="_blank" href={"http://maps.google.com/maps?z=12&t=m&q=loc:" + 43.462091 + "," + 44.462091}>
                                                        <img style={markerStyle} className="w-4" src={pin} alt="pin" />
                                                    </a>
                                                </div>
                                            
                                    </GoogleMapReact>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default ContactUs;
