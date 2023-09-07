/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from '../Split';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

const ArcContent = () => {
  const [isOpen, setOpen] = React.useState(false);
  React.useEffect(() => {
    console.clear();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="block-sec">
    <div  style={{ backgroundImage: 'url("circle.png")', backgroundRepeat:"no-repeat" ,backgroundSize: "contain",
    height: "27.75vh", position:"relative", display:"flex" , justifyContent:"center", alignItems:'center'}}><p style={{position:"absolute", fontSize:"36px"}}>WE ARE <bold>OUR PEOPLE</bold></p></div>
    
    </section>
  );
};

export default ArcContent;
