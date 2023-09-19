// import React from "react";
// import NavbarFullMenu from "../../components/Navbar-full-menu/navbar-full-menu";
// import Navbar from "../../components/Navbar";
// import ShowcasesOneCenter from "../../components/Showcases-one-center";
// import DarkTheme from "../../layouts/Dark";

// const Showcase4Dark = () => {
//   return (
//     <DarkTheme>
//       <Navbar />
//       <ShowcasesOneCenter />
//     </DarkTheme>
//   );
// };

// export default Showcase4Dark;
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
                {/* {data.header ? <Header data={data.header} /> : null} */}

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

