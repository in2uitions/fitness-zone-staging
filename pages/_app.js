import "../styles/globals.css";
import "../styles/globals.scss";
import "../styles/Header.module.css"
import Script from "next/script";
import Head from "next/head";
import HeaderContent from "./components/header-component";
import Footer from "./components/footer-components";
import dynamic from "next/dynamic";
import React from "react";
import nextConfig from "../next.config";
import { handleApi } from "../api/server";
// import Menu from "./components/menu-items";

// const Menu = dynamic(() => import('./components/menu-items'), { ssr: false })
function MyApp({ Component, pageProps, data = {}, about=[] }) {
 const getVisitorLocationAPI = async () => {
    try {
        const res = await fetch(
            `https://ipapi.co/json/`
        );
        const data = await res.json();
        // console.log(data);
  if(data.country_code == 'AE'){
    // console.log('User is coming from UAE');
    //show UAE Social Media Accounts
    //show Popup after 3 seconds when website loads
  }
  else{
    // console.log('User is coming from outside UAE');
    // console.log(data.country_code);
    nextConfig.country_code = data.country_code;
    //Show social media accounts of Lebanon
    //Do not show popup
  }
  // if(isMobile){
  //   console.log('device is mobile');
  // }
  // else{
  //   console.log('device is desktop');
  // }
    } catch (err) {
        console.log(err);
    }
};

getVisitorLocationAPI();
return <>

    <Head>
    {/* <link rel="icon" href="/favicon.png"/>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-LWF5H6GTPM" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LWF5H6GTPM');
          `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MX2V36F');
`,
        }}
      />
       */}
    </Head>
    {/* <noscript  dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MX2V36F"
height="0" width="0" style="display:none;visibility:hidden"></iframe>   `,
        }}
      /> */}
    <HeaderContent />
    <Component {...pageProps} />
    <Footer />
  </>;
}

// export default MyApp;

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});

MyApp.getInitialProps = async (ctx) => {
  const about = (await handleApi({ url: `pages`, fields: ['*'], load: false }))
  let res = await handleApi({ url: `homepage`, fields: ['*'], load: false })
  const data = (res[0])


  return { data, about, industries }
}



