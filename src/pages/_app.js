import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Cursor from "../components/Cursor";
import ScrollToTop from "../components/Scroll-to-top";
import LoadingScreen from "../components/Loading-Screen";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import { handleApi } from "../../api/server";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const getVisitorLocationAPI = async () => {
      try {
        const res = await fetch(
          `https://ipapi.co/json/`
        );
        const data = await res.json();
        // console.log(data);
        if (data.country_code == 'LB') {
          router.push('https://ae.fitnesszone.me/');
          // console.log('User is coming from UAE');
          //show UAE Social Media Accounts
          //show Popup after 3 seconds when website loads
        }
        else if (data.country_code == 'AE') {
          nextConfig.country_code = data.country_code;
        }
      } catch (err) {
        console.log(err);
      }
    };

    getVisitorLocationAPI();
  }, []);
  return (
    <>
      <Head>
        <title className="futura-bold">FITNESS ZONE</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Cursor />
      <LoadingScreen />
      <ScrollToTop />
      <Component {...pageProps} />

      <Script
        strategy="beforeInteractive"
        id="wow"
        src="/js/wow.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        id="splitting"
        src="/js/splitting.min.js"
      ></Script>
      <Script id="simpleParallax" src="/js/simpleParallax.min.js"></Script>
      <Script
        strategy="beforeInteractive"
        id="isotope"
        src="/js/isotope.pkgd.min.js"
      ></Script>
      <Script strategy="lazyOnload" id="initWow" src="/js/initWow.js"></Script>
    </>
  );
}

export default MyApp;


export async function getInitialProps(ctx) {
  const about = await handleApi({ url: `pages`, fields: ['*'], load: false });
  const res = await handleApi({ url: `homepage`, fields: ['*'], load: false });
  const data = res[0];

  return { data, about };
}
