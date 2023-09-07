import React, { useEffect } from "react";
import AboutUs1 from "../components/About-us1";
import BlogsTwoColumnSlider from "../components/Blogs-two-column-slider";
import CallToAction from "../components/Call-to-action";
import Clients1 from "../components/Clients1";
import Footer from "../components/Footer";
import IntroWithSlider1 from "../components/Intro-with-slider1";
import Navbar from "../components/Navbar";
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

const Homepage1 = ({ data = {}}) => {
  const fixedSlider = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  useEffect(() => {
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
  }, [fixedSlider, MainContent, navbarRef]);

  return (
    <DarkTheme>
      <Navbar nr={navbarRef} lr={logoRef} />
      {data.header ? <Header data={data.header} sliderRef={fixedSlider} /> : null}
      {/* <IntroWithSlider1 sliderRef={fixedSlider} /> */}
      <div ref={MainContent} className="main-content">
      <Sections data={data} />
        {/* <AboutUs1 /> */}
        {/* <Services1 /> */}
        {/* <Numbers1 /> */}
        <Works1Slider />
        {/* <ArcContent/> */}
        <VideoWithTestimonials />
        {/* <SkillsCircle theme="dark" subBG /> */}
        {/* <Clients1 theme="dark" /> */}
        {/* <BlogsTwoColumnSlider /> */}
        <CallToAction subBG />
        {/* <Footer /> */}
      </div>
    </DarkTheme>
  );
};
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
// import Sections from '@assets/sections'
// import Header from "../components/page-headers";
// import { handleApi } from "../../api/server";
// import Sections from "../../assets/section";

// function HomePage({ data = {} }) {

//     return (
//         <>
//             {/* <HeaderContent /> */}
//             <main>
//                 {data.header ? <Header data={data.header} /> : null}
//                 <Sections data={data} />
//             </main>
//         </>
//     );
// }

// export async function getStaticProps() {
//     let res = await handleApi({ url: "homepage" });
//     const data = res[0];
//     return {
//         props: {
//             data,
//         },
//         revalidate: 60,
//     };
// }

// export default HomePage;