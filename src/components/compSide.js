import Image from 'next/image'
import React, { Component } from 'react';
import { image_url } from '../../global_vars';
import parse from "html-react-parser";
import Split from './Split';
// import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

export default function CompSide({ data = {}, isFlipped = false, style = 'white' }) {


    return (
        <>
            {data.image_position == "right" ? <div className="about section-padding"
            // style={{ backgroundImage: 'url("MainSiteImg.png")', backgroundRepeat: "no-repeat" }}
            >
                <div className="container" >
                    <div className="row">
                        <div className="col-lg-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="content">
                            <Split>
                                    <h3
                                        className="words chars splitting main-title wow"
                                        // style={{ fontSize: "60px" }}
                                        data-splitting
                                    >
                                        {data.title}
                                    </h3>
                                </Split>
                                <Split>
                                    <p className="words chars splitting wow txt" data-splitting style={{ color: "white" }}>
                                        {parse(`${data.brief}`)}
                                    </p>
                                </Split>
                            </div>

                        </div>
                        <div className="col-lg-6 offset-lg-1 valign">
                            <div className="img-mons">
                                <div className="row">
                                    <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
            {data.image_position == "left" && data.free_trial ? <div className="about section-padding"
                style={{ backgroundImage: 'url("MainSiteImg.png")', backgroundRepeat: "no-repeat" }}
            >
                <div className="container" >

                    {data.free_trial ? <div className="row" style={{ justifyContent: "space-between" }}>
                        <div className="col-lg-5">
                            <div className="img-mons">
                                <div className="row">
                                    <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" style={{ display: "flex", flexDirection: "column", justifyContent: "start", paddingTop: "1rem", gap: "10px" }}>
                            <h6 style={{ fontWeight: "lighter", fontFamily: "Montserrat Regular" }}>REQUEST</h6>
                            <h1 style={{ fontWeight: "bold" }}>FREE TRYOUT</h1>
                            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                <input style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} placeholder='FIRST NAME' />
                                <input style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} placeholder='LAST NAME' />
                            </div>
                            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                <PhoneInput style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} />
                                <input style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} placeholder='EMAIL' />
                            </div>
                            <select style={{ width: "100%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px", color: "white" }}>
                                <option>Baabda</option>
                            </select>
                            <button type='submit' style={{ width: "25%", background: "#1990DF", height: "3rem", color: "white", borderRadius: "5px", border: "0px solid transparent" }}>SUBMIT REQUEST</button>
                        </div>
                    </div> : null}
                </div>
            </div> : null}
            {data.image_position == "left" && !data.free_trial ? <div className="about "
            //  style={{ backgroundImage: 'url("MainSiteImg.png")', backgroundRepeat: "no-repeat" }}
            >
                <div className="container" >
                    <div className="row"><div className="col-lg-6">
                        <div className="img-mons">
                            <div className="row">
                                <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />
                            </div>
                        </div>
                    </div><div className="col-lg-5 offset-lg-1" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="content">
                                <Split>
                                    <h3
                                        className="words chars splitting main-title wow"
                                        // style={{ fontSize: "60px" }}
                                        data-splitting
                                    >
                                        {data.title}
                                    </h3>
                                </Split>
                                <Split>
                                    <p className="words chars splitting wow txt" data-splitting style={{ color: "white" }}>
                                        {parse(`${data.brief}`)}
                                    </p>
                                </Split>
                            </div>

                        </div>

                    </div>
                </div>
            </div> : null}
        </>
    )

}
