/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import tooltipEffect from "../../common/tooltipEffect";
import worksData from "../../data/sections/worksData.json";
import { image_url } from "../../../global_vars";

const WorksStyle1 = ({data={}}) => {
  // const [data, setData] = useState([]);

  useEffect(() => {
    tooltipEffect();
    // setData(worksData);
  }, []);

  return (
    <section className="works pb-70">
      <h2 style={{ display: 'none' }}> &nbsp; </h2>
      <div className="container">
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"20px", marginBottom:"5rem"}}>
                    {data.branch_name? <h1 style={{fontWeight:"bold", fontFamily:"Montserrat ExtraBold"}}>{data.branch_name}</h1>:null}
                    {data.title? <h1 style={{fontWeight:"200",fontFamily:"Montserrat Regular"}}>{data.title}</h1>:null}
                </div>
        <div className="row lg-space">
          {data.class.map((item, index) => (
            <div key={item.id} className={`col-lg-4 col-md-6 ${index % 2 !== 0 ? 'valign' : ''}`}>
              <div className="item">
                <Link href="#">
                  <img src={`${image_url}${item.classes_content_id.image?.id}`} alt="" />
                </Link>
                <div className="image-text" style={{display:"flex", justifyContent:"center", alignItems:"center", textAlign:"center", marginTop:"1rem"}}>
                  {index % 3 === 0 && <div style={{fontWeight:"bold", fontFamily:"Montserrat ExtraBold"}}>{item.classes_content_id.title[0]?.first}<br></br><span style={{fontWeight:"normal", color:"#1990df", fontFamily:"Montserrat Regular"}}>{item.classes_content_id.title[0]?.second}</span></div>}
                  {index % 3 === 1 && <div style={{fontWeight:"bold", fontFamily:"Montserrat ExtraBold"}}>{item.classes_content_id.title[0]?.first}<br></br><span style={{fontWeight:"normal", color:"#1990df", fontFamily:"Montserrat Regular"}}>{item.classes_content_id.title[0]?.second}</span></div>}
                  {index % 3 === 2 && <div style={{fontWeight:"bold", fontFamily:"Montserrat ExtraBold"}}>{item.classes_content_id.title[0]?.first}<br></br><span style={{fontWeight:"normal", color:"#1990df", fontFamily:"Montserrat Regular"}}>{item.classes_content_id.title[0]?.second}</span></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksStyle1;
