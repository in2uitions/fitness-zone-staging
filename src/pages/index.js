import React, { useEffect, useState } from "react";
import AboutUs1 from "../components/About-us1";
import BlogsTwoColumnSlider from "../components/Blogs-two-column-slider";
import CallToAction from "../components/Call-to-action";
import Clients1 from "../components/Clients1";
import Footer from "../components/Footer";
import IntroWithSlider1 from "../components/Intro-with-slider1";
import Navbar from "../components/Navbar";
import Split from "../components/Split";
import NavbarUAE from "../components/Navbaruae";
import Numbers1 from "../components/Numbers";
import Services1 from "../components/Services1";
import SkillsCircle from "../components/Skills-circle";
import VideoWithTestimonials from "../components/Video-with-testimonials";
import ArcContent from "../components/Arc-content";
import Works1Slider from "../components/Works1-slider";
import DarkTheme from "../layouts/Dark";
import Header from "../components/page-headers";
import { handleApi } from "../../api/server";
import Sections from "../../assets/section";
import Popup from "reactjs-popup";
import LoadingScreen from "../components/Loading-Screen";

const Homepage1 = ({ data = {} }) => {
  const fixedSlider = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const navbaraeRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const [showLeb, setShowLeb] = useState(false);
  const [showUAE, setShowUAE] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showUAEComponent, setShowUAEComponent] = useState(false);
  // const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const getVisitorLocationAPI = async () => {
      try {
        const res = await fetch(`https://ipapi.co/json/`);
        const data = await res.json();
        if (data.country_code === "AE") {
          setShowUAE(true);
          setShowPopup(true);
          setShowLeb(false);
          setInterval(() => {
            if (fixedSlider.current) {
              var slidHeight = fixedSlider.current.offsetHeight;
            }
            if (MainContent.current) {
              MainContent.current.style.marginTop = slidHeight + "px";
            }
          }, 1000);
          var navbar = navbaraeRef.current;
          if (window.pageYOffset > 300) {
            navbar.classList.add("nav-scroll");
          } else {
            navbar.classList.remove("nav-scroll");
          }

          window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
              navbar.classList.add("nav-scroll");
            } else {
              navbar.classList.remove("nav-scroll");
            }
          });
        } else {
          setShowLeb(true);
          setShowUAE(false);
          setShowPopup(false);
          setInterval(() => {
            if (fixedSlider.current) {
              var slidHeight = fixedSlider.current.offsetHeight;
            }
            if (MainContent.current) {
              MainContent.current.style.marginTop = slidHeight + "px";
            }
          }, 1000);

          var navbar = navbarRef.current;
          if (window.pageYOffset > 300) {
            navbar.classList.add("nav-scroll");
          } else {
            navbar.classList.remove("nav-scroll");
          }

          window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
              navbar.classList.add("nav-scroll");
            } else {
              navbar.classList.remove("nav-scroll");
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getVisitorLocationAPI();
  }, [fixedSlider, MainContent, navbarRef, navbaraeRef]);

  return (
    <>
      {/* {showLoader && <LoadingScreen />} */}
      {showLeb ? (
        <DarkTheme>
          <Navbar nr={navbarRef} lr={logoRef} />
          {data.header ? (
            <Header data={data.header} sliderRef={fixedSlider} />
          ) : null}
          <div ref={MainContent} className="main-content">
            <Sections data={data} />
            {/* <Works1Slider /> */}
            {/* <VideoWithTestimonials /> */}
          </div>
        </DarkTheme>
      ) : null}
      {showUAEComponent ? (
        <DarkTheme>
          <NavbarUAE nr={navbarRef} lr={logoRef} />
          {data.header ? (
            <Header data={data.header} sliderRef={fixedSlider} />
          ) : null}
          <div ref={MainContent} className="main-content">
            <AboutUs1 />
            <Services1 />
            <Numbers1 />
            <VideoWithTestimonials />
            <CallToAction subBG />
          </div>
        </DarkTheme>
      ) : null}
      {showUAE ? (
        <div style={{
          backgroundImage: "url(/bg-grey.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", position: "absolute", inset: "0"
        }}>
          <Popup
            trigger={
              <button style={{ display: "none" }} className="request">
                REQUEST A CALL
              </button>
            }
            modal
            position="center"
            className="popupDubai"
            open={showPopup}
            closeOnDocumentClick={false}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  background: "black",
                  backgroundImage: "url(/popup.png)",
                  padding: "5rem",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderRadius: "10px",
                  border: "1px solid lightgrey"
                }}
              >
                <div style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "2.2em",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "white",
                      }}
                    >
                      Step into a World of Possibilities
                    </p>
                    <p style={{ textAlign: "center", color: "white" }}>
                      Choose your destination and embark on an extraordinary
                      journey!
                    </p>
                    <a href="https://ae.fitnesszone.me/"
                      style={{
                        width: "50%",
                        animation: "fadeIn 5s",
                        marginBottom: "10px",
                        height: "2rem",
                        background: "rgb(221 221 221)",
                        borderRadius: "5px",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                        fontFamily: 'Montserrat-Bold'
                      }} onClick={() => { setShowLeb(false); setShowUAE(false); setShowUAEComponent(true) }}
                    >
                      UAE
                    </a>
                    <button
                      style={{
                        width: "50%",
                        animation: "fadeIn 5s",
                        height: "2rem",
                        background: "rgb(221 221 221)",
                        borderRadius: "5px",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }} onClick={() => { setShowLeb(true); setShowUAE(false); setShowUAEComponent(false) }}
                    >
                      LEBANON
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </div>
      ) : null}
    </>
  );
};

// export async function getStaticProps() {
//   const res = await fetch(`https://ipapi.co/json/`);
//   const data = await res.json();
//   const countryCode = data.country_code;

//   let resData;
//   if (countryCode === "LB") {
//     resData = await handleApi({ url: "homepage" });
//   } else if (countryCode === "AE") {
//     resData = await handleApi({ url: "uaehomepage" });
//   } else {
//     resData = await handleApi({ url: "homepage" });
//   }

//   const responseData = resData[0];

//   return {
//     props: {
//       data: responseData,
//     },
//     revalidate: 60,
//   };
// }
export async function getStaticProps() {
  let res = await handleApi({ url: "homepage" });
  const data = res[0];
  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
export default Homepage1;
