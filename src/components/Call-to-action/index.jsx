import React from "react";
import Split from "../Split";
import Link from "next/link";

const CallToAction = ({ img, theme, subBG }) => {
  return (
    <>
    <section
      className={`call-action section-padding ${subBG ? "sub-bg" : ""} bg-img`}
      style={{ backgroundImage: `url(${img ? img : "/img/pattern.png"})` }}
    >
      <div className="container">
      <div className="absolute-component">
  <img src="/bar.svg" style={{ position: "relative",    width: "100px",
    height: "100px"
 }} />
  <p>CONTACT US</p>
</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:"2rem"}}>
          <div className="">
            <div style={{display:"flex", flexDirection:"column"}}>
        
<p style={{letterSpacing:"10px", fontWeight:"bold", fontSize:"36px"}}>BEIRUT</p>
<p>+961 01 2345 678923</p>
<p>Contact@fitnesszone.com.lb</p>
</div>
          </div>
          <div className="">
          <img src="contact-yellowLogo.svg" style={{height:"75%"}}/>
          </div>
          <div className="">
            {/* <img src="contactUs.png"/> */}
            <div style={{display:"flex", flexDirection:"column"}}>
        
        <p style={{letterSpacing:"10px", fontWeight:"bold", fontSize:"36px"}}>DUBAI</p>
        <p>+961 01 2345 678923</p>
        <p>Contact@fitnesszone.com.lb</p>
        </div>

          </div>
          
        </div>
        <div style={{display:"flex", flexDirection:"column"}}>
          <p style={{color:"white", fontSize:"36px"}}>SUBSCRIBE TO OUR BLOG <span style={{fontWeight:"bolder"}}>FITNESS SCIENCE</span></p>
          <input type="text" style={{background:"#80808073",border:"none", padding:"5px", width:"50%"}} placeholder="EMAIL ADDRESS"/>
          
        </div>
      </div>
    </section>
    <section>
<img src="/finalImage.png"/>
    </section>
    </>
  );
};

export default CallToAction;
