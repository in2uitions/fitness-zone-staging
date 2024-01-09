/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import tooltipEffect from "../../common/tooltipEffect";
import worksData from "../../data/sections/worksData.json";
import { image_url } from "../../../global_vars";

const BranchFacilities = ({ data = {} }) => {
    // const [data, setData] = useState([]);

    useEffect(() => {
        tooltipEffect();
        // setData(worksData);
    }, []);

    return (
        <section className="works pb-70">
            <h2 style={{ display: 'none' }}> &nbsp; </h2>
            <div className="">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", marginBottom: "3rem" }}>
                    {data.branch_name ? <h1 style={{ fontWeight: "bold" }}>{data.branch_name}</h1> : null}
                    {data.title ? <h1 style={{ fontWeight: "200" }}>{data.title}</h1> : null}
                </div>
                <div className=" container" style={{ display: "flex" , justifyContent:"space-between"}}>

                    {data.facility.map((item, index) => (
                        <div key={item.id} style={{ padding: "2rem", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" ,background:"#151921"}} className={``}>
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
