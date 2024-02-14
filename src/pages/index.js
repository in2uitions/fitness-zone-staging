import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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
  // const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const getVisitorLocationAPI = async () => {
      try {
        // const res = await fetch(`https://ipapi.co/json/`);
        // const data = await res.json();
        // if (data.country_code === "AE") {
          // setShowUAE(true);
          // setShowPopup(true);
          // setShowLeb(false);
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
        // } 
        // else {
        //   // setShowLeb(true);
        //   // setShowUAE(false);
        //   // setShowPopup(false);
        //   setInterval(() => {
        //     if (fixedSlider.current) {
        //       var slidHeight = fixedSlider.current.offsetHeight;
        //     }
        //     if (MainContent.current) {
        //       MainContent.current.style.marginTop = slidHeight + "px";
        //     }
        //   }, 1000);

        //   var navbar = navbarRef.current;
        //   if (window.pageYOffset > 300) {
        //     navbar.classList.add("nav-scroll");
        //   } else {
        //     navbar.classList.remove("nav-scroll");
        //   }

        //   window.addEventListener("scroll", () => {
        //     if (window.pageYOffset > 300) {
        //       navbar.classList.add("nav-scroll");
        //     } else {
        //       navbar.classList.remove("nav-scroll");
        //     }
        //   });
        // }
      } catch (err) {
        console.log(err);
      }
    };

    getVisitorLocationAPI();
  }, [fixedSlider, MainContent, navbarRef, navbaraeRef]);

  return (
    <>
    
      {/* {showLeb ? ( */}
        <DarkTheme>
          <Navbar nr={navbarRef} lr={logoRef} />
          {data.header ? (
            <Header data={data.header} sliderRef={fixedSlider} />
          ) : null}
          <div ref={MainContent} className="main-content">
            <Sections data={data} />
          </div>
        </DarkTheme>
      {/* ) : null} */}
      {/* {showUAE ? (
        <div style={{
          backgroundImage: "url(/bannerPopupDuai.jpg)",
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
                  // background: "black",
                  // backgroundImage: "url(/popup.png)",
                  background: "rgba(0, 0, 0, 0.5)",
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
                        color: "white", fontFamily:"Montserrat Bold"
                      }}
                    >
                      Step into a World of Possibilities
                    </p>
                    <p style={{ textAlign: "center", color: "white" , fontFamily:"Montserrat Bold"}}>
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
                        fontFamily: 'Montserrat Bold'
                      }} onClick={() => { setShowLeb(false); setShowUAE(false); }}
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
                        cursor: "pointer", fontFamily:"Montserrat Bold"
                      }} onClick={() => { setShowLeb(true); setShowUAE(false);  }}
                    >
                      LEBANON
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </div>
      ) : null} */}
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
