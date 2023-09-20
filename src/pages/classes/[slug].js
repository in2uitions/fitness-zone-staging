// import React from "react";
// import DarkTheme from "../../layouts/Dark";
// import Navbar from "../../components/Navbar";
// import SmallFooter from "../../components/Small-footer";
// import WorksStyle1 from "../../components/Works-style1";
// import addParlx from "../../common/addParlx";

// const WorksDark = () => {
//   const fixedHeader = React.useRef(null);
//   const MainContent = React.useRef(null);
//   const navbarRef = React.useRef(null);
//   const logoRef = React.useRef(null);

//   const [pageLoaded, setPageLoaded] = React.useState(false);
//   React.useEffect(() => {
//     setPageLoaded(true);
//     if (pageLoaded) {
//       addParlx();
//     }
//   }, [pageLoaded]);
//   React.useEffect(() => {
//     var navbar = navbarRef.current;
//     if (window.pageYOffset > 300) {
//       navbar.classList.add("nav-scroll");
//     } else {
//       navbar.classList.remove("nav-scroll");
//     }
//     window.addEventListener("scroll", () => {
//       if (window.pageYOffset > 300) {
//         navbar.classList.add("nav-scroll");
//       } else {
//         navbar.classList.remove("nav-scroll");
//       }
//     });
//     window.addEventListener("load", () => {
//       setTimeout(() => {
//         if (fixedHeader.current) {
//           var slidHeight = fixedHeader.current.offsetHeight;
//           if (MainContent.current) {
//             MainContent.current.style.marginTop = slidHeight + "px";
//           }
//         }
//       }, 0);
//     });
//   }, [fixedHeader, MainContent, navbarRef]);

//   return (
//     <DarkTheme>
//       <Navbar nr={navbarRef} lr={logoRef} />
//       {/* <header
//         ref={fixedHeader}
//         className="works-header fixed-slider hfixd valign"
//       > */}
//         {/* <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-9 col-md-11 static">
//               <div className="capt text-center mt-50">
//                 <h4 className="parlx">
//                   Creativity involves breaking out of expected &amp; repeatable
//                   patterns in order to look at things in different way than ever
//                   before.
//                 </h4>
//                 <div className="bactxt custom-font valign">
//                   <span className="full-width">Works</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//       {/* </header> */}
//       <div ref={MainContent} className="main-content">
//         <WorksStyle1 />
//         {/* <SmallFooter /> */}
//       </div>
//     </DarkTheme>
//   );
// };

// export default WorksDark;
import Header from '../../components/page-headers'
import { handleApi } from '../../../api/server'
import Sections from '../../../assets/section'
import { useRouter } from 'next/router'
import DarkTheme from '../../layouts/Dark'
import Navbar from '../../components/Navbar'
import React, { useEffect } from "react";
import MembershipServices from "../../components/MembershipServices";

function Slug({ data = {} }) {
    const navbarRef = React.useRef(null);
    const logoRef = React.useRef(null);
    const fixedSlider = React.useRef(null);
    const MainContent = React.useRef(null);
    const router = useRouter()
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
        <div>

            {/* <HeadTag data={data} /> */}
            {/* <HeaderContent /> */}

            <DarkTheme className="">
                <Navbar nr={navbarRef} lr={logoRef} />

                <Sections data={data} />



            </DarkTheme>




        </div>

    )
}


export async function getStaticPaths() {
    // ...

    let res = await handleApi({ url: `pages` })


    // Get the paths we want to pre-render based on posts
    const paths = res.map((item) => ({
        params: { slug: item.slug },
    }))

    return { paths, fallback: true }
}

// This function gets called at build time
export async function getStaticProps({ params }) {

    const { slug } = params

    // Call an external API endpoint to get posts
    let res = await handleApi({ url: `pages/`, slug: slug })
    const data = res[0];

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            data,
        },
        revalidate: 60,
    }
}

export default Slug

