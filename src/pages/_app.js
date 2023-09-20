import React from "react";
import Head from "next/head";
import Script from "next/script";
import Cursor from "../components/Cursor";
import ScrollToTop from "../components/Scroll-to-top";
import LoadingScreen from "../components/Loading-Screen";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import { handleApi } from "../../api/server";

function MyApp({ Component, pageProps }) {
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
