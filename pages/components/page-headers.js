import Image from 'next/image'
import React, { Component } from 'react';
// import { gsap } from "gsap";
import { useState } from 'react';
import $ from 'jquery';
import { image_url } from '../../global_vars';
import Popup from 'reactjs-popup';
import { BrowserView, MobileView } from 'react-device-detect';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function Header({ color = "orange", data = {} }) {
    const [isSent, setIsSent] = useState(false);
    const [isNotSent, setIsNotSent] = useState(false)
    const thankYouMessage = <h3>Thank you for your submission!</h3>;
    const submitmsg = <h3></h3>;
    const [alternateImage, setAlternateImage] = useState(true);

    const changeImage = () => {
        setAlternateImage((alternateImage) => !alternateImage);
    };

    function unmuteVideo() {
        var video = document.getElementById("myVideo");

        video.muted = !video.muted;
    }
    
    const submitSignUp = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    'https://api.fitnessclubapp.com/api/account/login?Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1',
                    {
                        method: 'POST'
                    }
                );

                const tokenData = await res.json();

                const submitContactForm = async () => {
                    try {
                        if (event.target.enquire_request.value == "popup-request") {
                            var registraitonRawData = JSON.stringify({
                                "GuestRegisterId": 0,
                                "FirstName": event.target.pp_first_name.value,
                                "LastName": event.target.pp_last_name.value,
                                "Mobile": event.target.pp_phone.value,
                                "Email": event.target.pp_email.value,
                                "Source": {
                                    "VisitSourceId": 9
                                },
                                "LocationCode": 1
                            });
                        }
                        else {
                            var registraitonRawData = JSON.stringify({
                                "GuestRegisterId": 0,
                                "FirstName": event.target.firstname.value,
                                "LastName": event.target.lastname.value,
                                "Mobile": event.target.pp_phone.value,
                                "Email": event.target.email.value,
                                "Source": {
                                    "VisitSourceId": 9
                                },
                                "LocationCode": 1
                            });
                        }

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
                        if (data.isValid == true) {
                            setIsSent(true)
                            event.target.pp_first_name.value = '';
                            event.target.pp_last_name.value = '';
                            event.target.pp_phone.value = '';
                            event.target.pp_email.value = '';
                        }
                        else {
                            setIsNotSent(true)
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
    return (
        <div className="relative" id="">
            <div className="overflow-hidden">
            {data.layout_type == 'regular' || data.layout_type == null ?
                    <div className="">
                        <div id="" style={{ "backgroundImage": `url("${image_url}${data.image?.id}")` }}  className=" aboutUs-bg" >

                            {/* <img src={`${image_url}${data.image?.id}`} className=" aboutUs-bg" /> */}

                        </div>
                    </div>
                    : null}
                {data.layout_type == 'video' || data.layout_type == null ?
                    <div className="">
                        <div id="" className="" >
                            <video loop autoPlay muted playsInline className="video w-100" id="myVideo">
                                <source src={`${image_url}${data.video?.id}`} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    : null}
                <div className="grid grid-cols-2">
                    <div className="absolute lg:left-36 md:left-36 left-2 lg:bottom-14 text-homePage">
                        {data.image_title ? <h1 className="text-[#009FE3] font-bold futura-bold lg:text-5xl md:text-4xl text-3xl">{data.image_title}</h1> : null}
                        <div className='flex lg:space-x-6 md:space-x-6 space-x-2 items-baseline'>
                        {data.image_description ? <h1 className="font-bold lg:text-7xl md:text-6xl text-white text-2xl futura-bold">{data.image_description}</h1> : null}
                        <div className=''>{data.icon_on ?<img src={`${image_url}${data.icon_on?.id}`} className="lg:h-16 md:h-16 h-5"/> :null}</div>
                        </div>
                        {data.button_url ? <a href={data.button_url} className=" bg-[#009FE3] learnMoreBtns p-2 text-center rounded-md futura-bold">{data.button_title}
                            <ChevronRightIcon className="ml-1" /></a> : null}
                            {data.signup_button ? <Popup
                        trigger={
                            <button>
                                <button className="bg-[#009FE3] p-2 rounded-md mt-5 futura-bold text-white outline-none">{data.signup_button}<ChevronRightIcon /></button>
                            </button>
                        } modal
                        position="center"
                        closeOnDocumentClick={true}
                    >
                        {close => (
                            <>
                                <button className="close text-white" onClick={close}>
                                    {/* &times; */}
                                    <img src="/close-X.svg" />
                                </button>
                                <form onSubmit={submitSignUp} className="flex">
                                    <BrowserView>
                                        <div className="popup-overlay">
                                            <div className="lg:flex backdrop-blur-xl rounded-lg shadow-xl justify-center items-center popup-bg popup-measures">

                                                <input type="hidden" name="enquire_request" value="popup-request" />
                                                <div className="lg:flex lg:w-full">
                                                    <div className="w-1/3">
                                                        <img src="/popup-image.png" className="image-popup none-event object-cover" />
                                                    </div>
                                                    <div className="lg:flex lg:flex-col justify-center lg:w-2/3 px-8 pt-6 lg:pt-0 md:pt-0">
                                                        <p href="/" className="font-bold text-2xl  futura-bold text-[#009FE3] ">SIGN UP FOR OUR PRE-OPENING OFFER IN CITY WALK DUBAI!</p>

                                                        <input placeholder="FIRST NAME"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            name="pp_first_name"
                                                            id="pp_first_name"
                                                            required
                                                        />
                                                        <input placeholder="LAST NAME"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            name="pp_last_name"
                                                            id="pp_last_name"
                                                            required
                                                        />
                                                        {/* <input placeholder="PHONE NUMBER" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-5 h-12" /> */}
                                                        <input placeholder="EMAIL"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            name="pp_email"
                                                            id="pp_email"
                                                        />
                                                        <input placeholder="0501234567"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            name="pp_phone"
                                                            id="pp_phone"
                                                            required
                                                        />

                                                        <button type="submit" className="bg-[#009FE3] text-white flex justify-center p-2 items-center w-24 rounded mr-4 futura-bold mb-2">SIGN UP</button>
                                                        {isSent ? thankYouMessage : submitmsg}
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </BrowserView>
                                    <MobileView>
                                        <div className="popup-overlay">
                                            <div className="lg:flex backdrop-blur-xl rounded-lg shadow-xl justify-center items-center popup-bg popup-measures">

                                                <input type="hidden" name="enquire_request" value="popup-request" />
                                                <div className="lg:flex lg:w-full">
                                                    <div className="lg:flex lg:flex-col justify-center lg:w-2/3 px-8 pt-6 lg:pt-0 md:pt-0">
                                                        <p href="/" className="font-bold text-2xl  futura-bold text-[#009FE3] ">SIGN UP FOR OUR PRE-OPENING OFFER IN CITY WALK DUBAI!</p>

                                                        <input placeholder="FIRST NAME"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_first_name"
                                                            id="first_name"
                                                            required
                                                        />
                                                        <input placeholder="LAST NAME"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_last_name"
                                                            id="last_name"
                                                            required
                                                        />
                                                        {/* <input placeholder="PHONE NUMBER" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-5 h-12" /> */}
                                                        <input placeholder="EMAIL"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_email"
                                                            id="email"
                                                        />
                                                        <input placeholder="0501234567"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_phone"
                                                            id="phone_number"
                                                            required
                                                        />

                                                        <button type="submit" className="bg-[#009FE3] text-white flex justify-center p-2 items-center w-24 rounded mr-4 futura-bold mb-2">SIGN UP</button>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </MobileView>
                                </form>
                            </>
                        )}
                    </Popup> : null}
                    </div>

                    {data.icon_sound_off?<div className="absolute lg:right-44 lg:bottom-14 md:right-44  right-0 flex flex-row items-center sound">
                        
                        <button className="flex"
                            onClick={() => {
                                changeImage();
                                unmuteVideo();
                            }}
                        >
                            <p className="lg:text-3xl md:text-3xl text-2xl futura-book text-white">{data.sound}</p>
                            {alternateImage && (
                                <img src={`${image_url}${data.icon_sound_off?.id}`} className="w-9 h-6 mt-1 ml-1" />
                            )}
                            {!alternateImage && (
                                <img src={`${image_url}${data.icon_sound_on?.id}`} className="w-9 h-6 mt-1 ml-1" />
                            )}
                            {/* </button> */}
                        </button>
                    </div>:null}
                </div>
            
            </div>

        </div>
    )
}
