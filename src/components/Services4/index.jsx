import React from "react";
import Split from "../Split";
import parse from "html-react-parser";
import services4Data from "../../data/sections/services4.json";

const Services4 = ({ withBG, withPadding, halfBG, withOutTitle, data={}}) => {
  const getBoxShadow = (index) => {
    switch (index) {
      case 0:
        return { boxShadow: 'rgba(39, 142, 255, 0.26) 9px 7px 20px 0px', backgroundColor:"#151921" };
      case 1:
        return { boxShadow: 'rgba(249, 249, 249, 0.26) 9px 7px 20px 0px', backgroundColor:"#0090DF" };
      case 2:
        return { boxShadow: 'rgba(39, 142, 255, 0.26) 9px 7px 20px 0px' , backgroundColor:"#242930"};
      default:
        return { boxShadow: 'rgba(39, 142, 255, 0.26) 9px 7px 20px 0px' }; 
    }
  };
  return (
    <section
      className={`services ${withPadding ? "section-padding" : ""} ${
        withBG ? "sub-bg" : ""
      }`}
    >
      <div className="container">
        {!withOutTitle && (
          <div className="sec-head custom-font text-center">
            <h6 className="wow fadeIn" data-wow-delay=".5s">
              Best Features
            </h6>
            <Split>
              <h3 className="wow words chars splitting" data-splitting>
                Services.
              </h3>
            </Split>
            <span className="tbg">Services</span>
          </div>
        )}
        <div className="row">
        {
            data.card?.map((service, index) => (
            <div className={`col-lg-4`} key={service.card_components_id.id}>
              <div className={`item wow fadeInUp `} style={getBoxShadow(index)} data-wow-delay={service.card_components_id.id === 1 ? ".5s" : service.card_components_id.id === 2 ? ".3s" : ".8s"}>
                {/* <span className={`icon ${item.icon}`}></span> */}
                <h6 className={`text-white ${index === 1 ? "text-black" : ""}`} style={{fontSize:"32px"}}>{ service.card_components_id.title }</h6>
                  <p style={{ marginTop:"2rem"}} className={`color-blue ${index === 1 ? "text-blue" : ""}`}>{parse(`${service.card_components_id.description}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {halfBG && <div className="half-bg bottom"></div>}
    </section>
  );
};

export default Services4;
