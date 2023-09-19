import Image from 'next/image'
import React, { Component } from 'react';
import { image_url } from '../../global_vars';
import parse from "html-react-parser";
import Split from './Split';

export default function CompSide({ data = {}, isFlipped = false, style = 'white' }) {


    return (
<>
        {data.image_position == "right" ?<div className="about section-padding" style={{ backgroundImage: 'url("MainSiteImg.png")', backgroundRepeat: "no-repeat" }}>
             <div className="container" >
                <div className="row">
                    <div className="col-lg-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="content">
                            <Split>
                                <h3
                                    className="words chars splitting main-title wow"
                                    style={{ width: "63%", fontSize: "60px" }}
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
            </div>: null}
            {data.image_position == "left" ?     <section className="intro-section section-padding pb-0"><div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4">
                        <div className="container">
                            <div className="belief-component">
                                <img src="/circleShaped.svg" style={{
                                    position: "relative", width: "100px",
                                    height: "100px"
                                }} />
                                <p>THE BELIEF</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 offset-lg-1 col-md-8">
                        <div className="text">
                            <Split>
                                <p className="wow txt words chars splitting" data-splitting>
                                {parse(`${data.brief}`)}
                                </p>
                            </Split>
                        </div>
                    </div>
                </div>
            </div></section> : null}
      
        </>
    )

}
