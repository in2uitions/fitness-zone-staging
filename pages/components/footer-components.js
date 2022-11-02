import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import PopupContent from "./try-now";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import nextConfig from "../../next.config.js"
import FooterPopup from "./footerPopup";
// import 'reactjs-popup/dist/index.css';
import dynamic from "next/dynamic";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
const MetisMenu = dynamic(() => import('react-metismenu'), { ssr: false })

export default function Footer(data = {}) {
    const [showPopup, setShowPopup] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [phoneValue, setPhoneValue] = useState()
    const [phone, setPhone] = useState()
    const [whatsappNumber, setWhatsappNumber] = useState();
    const [facebookLink, setFaceBookLink] = useState();
    const [instaLink, setInstaLink] = useState();
    const [isSent, setIsSent] = useState(false);
    const thankYouMessage = <h3>Thank you for your submission!</h3>;
    const submitmsg = <h3></h3>;
    const [content, updateContent] = useState([]);
    function setShowPopupFunction() {
        alert('test');
    }

    setTimeout(() => {
        if (nextConfig.country_code == 'AE') {
            setShowPopup(true)
            setShowForm(true)
            setWhatsappNumber('//api.whatsapp.com/send?phone=971547274777')
            setFaceBookLink('https://www.facebook.com/FitnessZoneUAE')
            setInstaLink('https://www.instagram.com/fitnesszoneuae/')
        }
        else {
            setShowPopup(false)
            setShowForm(false)
            setWhatsappNumber('//api.whatsapp.com/send?phone=9613505250')
            setFaceBookLink('https://www.facebook.com/fitnesszonelb/')
            setInstaLink('https://www.instagram.com/fitnesszonelb/')
        }
    }, 1000);
    const submitSignUp = async event => {
        event.preventDefault();


        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    'https://api.fitnessclubapp.com/api/account/login?Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1',
                    {
                        method: 'POST'
                    }
                    //.then(() => setIsSent(true))
                );

                const tokenData = await res.json();
                // console.log(tokenData);

                const submitContactForm = async () => {
                    try {
                        var registraitonRawData = JSON.stringify({
                            "GuestRegisterId": 0,
                            "FirstName": event.target.firstname.value,
                            "LastName": event.target.lastname.value,
                            "Mobile": event.target.phone.value,
                            "Email": event.target.email.value,
                            "Source": {
                                "VisitSourceId": 9
                            },
                            "LocationCode": 1
                        });

                        //   // console.log(registraitonRawData);
                        // }

                        var registrationHeaders = new Headers();
                        registrationHeaders.append("Authorization", "Bearer " + tokenData.token);
                        registrationHeaders.append("Content-Type", "application/json");
                        var registrationRequestOptions = {
                            method: 'POST',
                            headers: registrationHeaders,
                            body: registraitonRawData
                        };


                        const res = await fetch(
                            'https://api.fitnessclubapp.com/api/Crm/GuestRegister', registrationRequestOptions);
                        const data = await res.json();
                        // console.log(data);

                        if (data.isValid == true) {
                            setIsSent(true)
                            event.target.firstname.value = '';
                            event.target.lastname.value = '';
                            event.target.phone.value = '';
                            event.target.email.value = '';
                            // setPhoneValue();
                        }


                    } catch (err) {
                        console.log(err);
                    }
                };

                submitContactForm();

            } catch (err) {
                console.log(err);
            }
        };

        getTokenAPI();


    };
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    var ct = [
        {
            "id": 1,
            "label": "HOME",
            "to":"/"
        },
        {
            "id": 2,
            "label": "ABOUT US",
            "to": '../about/about-us'
        },
        {
            "id": 3,
            "label": "SERVICES",
            "to": '../about/services'
        },
        {
            "id": 4,
            "label": "PT",
            "to": '/about/personal-trainer'
        },
        {
            "id": 5,
            "label": "CLASSES",
            "to": '/about/classes'
        },
        {
            "id": 6,
            "label": "CONTACT US",
            "to": '/about/contact-us'
        }
    ];

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        console.log(ct);
        updateContent(ct);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };



    }, [data]);
    return (
        <>
            <section>
                <div className="flex flex-col space-y-10 justify-start items-center fixed right-0 bg-[#009FE3] box">
                    <a href={facebookLink} target="_blank" rel="noreferrer">
                        <img src="/path.png" className="w-4" />
                    </a>

                    <a href={instaLink} target="_blank" rel="noreferrer">
                        <img src="/fblink.png" className="w-7" />
                    </a>

                    <a
                        href="https://www.linkedin.com/company/fitness-zone/"
                        target="_blank" rel="noreferrer"
                    >
                        <img src="/linkedinlink.png" className="w-6" />
                    </a>

                    <a
                        href="https://www.youtube.com/channel/UCxaK9VYi8cBP_Y1rgRfwumw"
                        target="_blank" rel="noreferrer"
                    >
                        <img src="/youtube.png" className="w-8" />
                    </a>
                </div>
                <div className="flex justify-end m-10 wtsp-widget">
                    <BrowserView>
                        <a href={whatsappNumber} target="_blank">
                            <img src="/wtspwidget.png" className="h-28" />
                        </a>
                    </BrowserView>
                    <MobileView>
                        <a href={whatsappNumber} target="_blank">
                            <img src="/wtspWidgetMobile.png" className="h-16" />
                        </a>
                    </MobileView>
                </div>
            </section>
            <div className=" bg-black">
                <div className="lg:grid lg:grid-cols-12 space-x-4">
                    <div className="lg:col-span-2 sm:col-span-12">
                        <div className="lg:ml-28">
                            <MetisMenu
                                className="mt-3 ml-4 lg:ml-0 md:ml-0 futura-book footer-link"
                                content={content} activeLinkFromLocation
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-4 sm:col-span-12">
                        <div className="pt-5">
                            <div className="flex flex-row pr-5 lg:pr-0">
                                <Popup
                                    trigger={
                                        <button>
                                            {showForm ? <a
                                                href="#"
                                                className="bg-[#009FE3] flex justify-center items-center p-2 lg:h-9 md:h-9 h-12 rounded mr-4 futura-bold"
                                            >
                                                BECOME A MEMBER
                                            </a> : null}
                                        </button>
                                    } modal

                                    position="center"
                                    open={showPopup}
                                    closeOnDocumentClick={false}
                                >
                                    {close => (
                                        <>
                                            <button className="close" onClick={close}>
                                                &times;
                                            </button>
                                            <FooterPopup />
                                        </>
                                    )}
                                </Popup>

                                <a
                                    href="#"
                                    className="border-[#009FE3] border-2 p-2 lg:h-9 md:h-9 h-12 rounded flex futura-bold justify-center items-center"
                                >
                                    WORK WITH US
                                </a>
                            </div>

                            {showForm ?
                                <p className="text-white pt-7 futura-bold mb-3">ENQUIRE NOW</p>
                                : null}
                            {showForm ?
                                <form onSubmit={submitSignUp}>
                                    <input type="hidden" name="enquire_request" value="footer-request" />
                                    <div className="flex flex-col pr-5 lg:pr-0">
                                        <div className="flex space-x-2">
                                            <input
                                                className="pl-2 lg:w-1/2 w-1/2 appearance-none  bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 mb-3"
                                                placeholder="FIRST NAME"
                                                required name="firstname" id="firstname"
                                            />
                                            <input
                                                className="pl-2 lg:w-1/2 w-1/2 appearance-none  bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 mb-3"
                                                placeholder="LAST NAME"
                                                required name="lastname" id="lastname"
                                            />
                                        </div>
                                        <div className="flex space-x-2 w-full">
                                            <input
                                                className="pl-2 lg:w-1/2 w-1/2 appearance-none  bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 mb-3"
                                                placeholder="PHONE NUMBER"
                                                required name="phone" id="phone"
                                            />
                                            {/* <input
                  className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 mb-3"
                  placeholder="PHONE NUMBER"
                /> */}
                                            <input
                                                className="pl-2 lg:w-1/2 w-1/2 appearance-none h-10  bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 mb-3"
                                                placeholder="EMAIL"
                                                name="email" id="email"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="mt-5 bg-[#009FE3] learnMoreBtns p-2 w-40 flex justify-start items-center rounded-md futura-bold">REQUEST A CALL</button>
                                </form>
                                : null}
                            <div>
                                {/* <a href="#">REQUEST A CALL</a> */}

                                <Popup
                                    trigger={
                                        <button>
                                            <a href="#" style={{ display: "none" }} className="request">REQUEST A CALL</a>
                                        </button>
                                    } modal

                                    position="center"
                                    open={showPopup}
                                    closeOnDocumentClick={false}
                                >
                                    {close => (
                                        <>
                                            <button className="close" onClick={close}>
                                                &times;
                                            </button>
                                            <FooterPopup />
                                        </>
                                    )}
                                </Popup>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 sm:col-span-12">
                        <p className="text-[#009FE3] pt-5 futura-bold">GET IN TOUCH</p>
                        <div className="pt-5 grid grid-cols-2 md:grid-cols-3  gap-2">
                            <div className="text-white">
                                {/* <p className="text-[#009FE3] futura-bold">GET IN TOUCH</p> */}

                                <p className="font-bold mt-2 futura-bold">DBAYEH</p>
                                <p className="futura-book">+961 4 543 433</p>

                                <p className="font-bold mt-2 futura-bold">BAABDA</p>
                                <p className="futura-book">+961 5 958 158 </p>


                            </div>

                            <div className=" text-white">
                                <p className="font-bold mt-2 futura-bold">MANARA</p>
                                <p className="futura-book">+961 1 369 777</p>
                                <p className="font-bold mt-2 futura-bold">HAMRA</p>
                                <p className="futura-book">+961 1 751 666 </p>


                            </div>

                            <div className=" text-white">
                                <p className="font-bold mt-2 futura-bold">ABC ACHRAFIEH</p>
                                <p className="futura-book">+961 1 328 428 </p>
                                <p className="font-bold mt-2 futura-bold">CITY WALK DUBAI</p>
                                <p className="futura-book">+971 54 727 4777</p>
                                {/* 
                <p className="font-bold mt-2 futura-bold">ABC ACHRAFIYEH</p>
                <p className="futura-book">+961 4 543 433</p> */}
                            </div>
                        </div>
                        <p className="futura-book mt-10 text-white">Copyright © 2022. All Rights Reserved.</p>
                    </div>

                </div>
                <div className="border-b-2 border-[#009FE3] w-full my-14" />

                <div className="lg:grid lg:grid-cols-4 px-10 lg:ml-28">
                    <div className="flex flex-row">
                        <p className="text-[#009FE3] font-bold mr-2">M</p>
                        <p className="futura-book text-white">+961 3 505 250</p>
                    </div>

                    <div className="flex flex-row">
                        <p className="text-[#009FE3] font-bold mr-2">FAX</p>
                        <p className="futura-book text-white">+961 5 958 058</p>
                    </div>

                    <div className="flex flex-row">
                        <p className="text-[#009FE3] font-bold mr-2">E</p>
                        <p><a href="mailto:" className="futura-book text-white">info@fitnesszone.me</a></p>
                    </div>

                    <div className="lg:ml-24">
                        <p className="text-[#009FE3] mb-3 font-bold futura-bold">FOLLOW OUR SOCIALS</p>
                        <div className="flex flex-row mb-5">
                            <a
                                href={facebookLink}
                                target="_blank"
                                className="mt-0.5"
                            >
                                <img src="/fb.png" className="mr-5 w-3.5" />
                            </a>

                            <a
                                href={instaLink}
                                target="_blank"
                                className="mt-0.5"
                            >
                                <img src="/insta.png" className="mr-5 w-7" />
                            </a>

                            <a
                                href="https://www.linkedin.com/company/fitness-zone/"
                                target="_blank"
                                className="mt-0"
                            >
                                <img src="/linkedin.png" className="mr-5 w-7" />
                            </a>

                            <a
                                href="https://www.youtube.com/channel/UCxaK9VYi8cBP_Y1rgRfwumw"
                                target="_blank"
                                className="mt-1"
                            >
                                <img src="/youtubechannel.png" className="w-8" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

