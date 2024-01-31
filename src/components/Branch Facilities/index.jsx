/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import tooltipEffect from "../../common/tooltipEffect";
import { image_url } from "../../../global_vars";

const BranchFacilities = ({ data = {} }) => {

    useEffect(() => {
        tooltipEffect();
    }, []);

    return (
        <section className="works pb-70 sectionPadding">
            <h2 style={{ display: 'none' }}> &nbsp; </h2>
            <div className="">
                <div className="mobileFlex" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "3rem" }}>
                    {data.branch_name ? <h1 className="globalTitle" style={{ fontWeight: "bold" }}>{data.branch_name}</h1> : null}
                    {data.title ? <h1 className="globalSubtitle" style={{ fontWeight: "200", fontFamily:'Montserrat Regular' }}>{data.title}</h1> : null}
                </div>
                <div className=" container mobileFlex" style={{ display: "flex" , justifyContent:"space-between"}}>

                    {data.facility.map((item, index) => (
                        <div key={item.id} style={{ padding: "2rem", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}} className={``}>
                                    <img src={`${image_url}${item.facilities_id.icon?.id}`} alt="" style={{ width: "60px", height: "54px" }} />
                                <div className="image-text">
                                <p style={{color:"white", marginTop:"2rem"}}>{item.facilities_id.title}</p>
                                </div>
                        </div>
                    ))}
                </div>
                {data.button_title ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
                    <button style={{ background: "#1990DF", border: "0px solid transparent", borderRadius: "5px", color: "white", height: "3rem", padding: "5px 30px 5px 30px" }}>
                        {data.button_title}
                    </button>
                </div> : null}
            </div>
        </section>
    );
};

export default BranchFacilities;