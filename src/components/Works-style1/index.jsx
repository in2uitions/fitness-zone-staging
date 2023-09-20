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
    <section className="works section-padding pb-70">
      <h2 style={{ display: 'none' }}> &nbsp; </h2>
      <div className="container">
        <div className="row lg-space">
          {data.class.map((item, index) => (
            <div key={item.id} className={`col-lg-4 col-md-6 ${index % 2 !== 0 ? 'valign' : ''}`}>
              <div className="item">
                <Link href="#">
                  <img src={`${image_url}${item.classes_content_id.image?.id}`} alt="" />
                </Link>
                <div className="image-text">
                  {index % 3 === 0 && <div className="text top-left">{item.classes_content_id.title[0]?.first}<br></br>{item.classes_content_id.title[0]?.second}</div>}
                  {index % 3 === 1 && <div className="text top-center">{item.classes_content_id.title[0]?.first}<br></br>{item.classes_content_id.title[0]?.second}</div>}
                  {index % 3 === 2 && <div className="text top-right">{item.classes_content_id.title[0]?.first}<br></br>{item.classes_content_id.title[0]?.second}</div>}
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
