import { createContactUsDubaiUser, createContactUsUser } from "../../api/server";
import Popup from "reactjs-popup";
import { BrowserView, MobileView } from "react-device-detect";
import nextConfig from "../../next.config";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";

export default function CompContact({ data = {}, style = 'white' }) {
    const [showPopup, setShowPopup] = useState(false)
    const [showlebpopup, setShowLebPopup] = useState(false)
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            if (nextConfig.country_code == 'LB') {
                Cookies.set('full_name', event.target.full_name.value);
                Cookies.set('email', event.target.email.value);
                Cookies.set('mobile_number', event.target.phone.value);
                Cookies.set('message', event.target.message.value)
                createContactUsUser();
                event.target.full_name.value = '';
                event.target.email.value = '';
                event.target.phone.value ='';
                event.target.message.value = '';
                Cookies.set('full_name', event.target.full_name.value = '');
                Cookies.set('email', event.target.email.value = '');
                Cookies.set('mobile_number', event.target.phone.value);
                Cookies.set('message', event.target.message.value = '')
                console.log('LB USER')
            } else if (nextConfig.country_code == 'AE') {
                Cookies.set('full_name', event.target.full_name.value);
                Cookies.set('email', event.target.email.value);
                Cookies.set('mobile_number', event.target.phone.value);
                Cookies.set('message', event.target.message.value)
                createContactUsDubaiUser();
                event.target.full_name.value = '';
                event.target.email.value = '';
                event.target.phone.value = '';
                event.target.message.value = '';
                Cookies.set('full_name', event.target.full_name.value = '');
                Cookies.set('email', event.target.email.value = '');
                Cookies.set('mobile_number', event.target.phone.value);
                Cookies.set('message', event.target.message.value = '')
                console.log('AE USER')
            }
        };
        getTokenAPI();

    };
    const submitLebSignUp = async event => {
        event.preventDefault();


        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    'https://api.fitnessclubapp.com/api/Account/Login?Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234',
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
                            "FirstName": event.target.pp_first_name.value,
                            "LastName": event.target.pp_last_name.value,
                            "Mobile": event.target.pp_phone.value,
                            "Email": event.target.pp_email.value,
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
                            event.target.pp_first_name.value = '';
                            event.target.pp_last_name.value = '';
                            event.target.pp_phone.value = '';
                            event.target.pp_email.value = '';
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
                            "FirstName": event.target.pp_first_name.value,
                            "LastName": event.target.pp_last_name.value,
                            "Mobile": event.target.pp_phone.value,
                            "Email": event.target.pp_email.value,
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
                            event.target.pp_first_name.value = '';
                            event.target.pp_last_name.value = '';
                            event.target.pp_phone.value = '';
                            event.target.pp_email.value = '';
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
    useEffect(() => {
        if (nextConfig.country_code == 'AE') {
            setShowPopup(true)
            setShowLebPopup(false)
        }
        else {
            setShowPopup(false)
            setShowLebPopup(true)
        }
    }, [nextConfig.country_code])
    return (
        <div>
            <div className="lg:flex mt-20 mb-20 lg:px-14 md:px-14 px-6">
                <div className="lg:w-1/2">
                    <p className="text-color text-2xl futura-bold mb-5">{data.title}</p>
                    <form onSubmit={onSubmitForm}>
                        <div className="pb-5">
                            <input className="contact-inputs" id="full_name" placeholder="FULL NAME" />
                        </div>
                        <div className="pb-5">
                            <input className="contact-inputs" id="email" placeholder="EMAIL" />
                        </div>
                        <div className="pb-5">
                            <input className="contact-inputs" id="phone" placeholder="PHONE NUMBER" />
                        </div>
                        <textarea className="textArea mb-5" id="message" rows="10" cols="80" maxlength="200" placeholder="MESSAGE" />
                        <div className="pb-5">
                            <button className="mt-5 bg-[#009FE3] text-white w-20 h-9 flex items-center flex-row justify-around rounded-md futura" type="submit">
                                {data.button_title}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="lg:w-1/2">
                    <p className="text-color text-2xl futura-bold mb-5">{data.get_in_touch}</p>
                    <div className="grid lg:grid-rows-2 md:grid-rows-2 grid-rows-3 grid-flow-col gap-4">
                        {/* <div className="lg:w-1/3 text-white" ></div>  */}
                        {data.contact?.map((item, i) => (
                            <div className="flex flex-col text-white">
                                <p className="font-bold futura-bold">{item.comp_contact_items_id?.location}</p>
                                <p className="futura-book">{item.comp_contact_items_id?.number}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex space-x-3 mt-20">
                        <div className="">
                            {/* <button className="p-2 bg-[#009FE3] text-white flex items-center flex-row justify-around rounded-md futura lg:h-10">
                                BECOME A MEMBER
                            </button> */}
                            {showlebpopup ? <Popup
                                trigger={

                                    <button className="p-2 bg-[#009FE3] text-white flex items-center flex-row justify-around rounded-md futura lg:h-10">BECOME A MEMBER</button>

                                } modal
                                position="center"
                                closeOnDocumentClick={false}
                            >
                                {close => (
                                    <>
                                        <BrowserView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form className='flex flex-col space-y-5' onSubmit={submitLebSignUp}>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="First Name" id="pp_first_name" name="pp_first_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="pp_last_name" name="pp_last_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="Email" id="pp_email" name="pp_email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="pp_phone" name="pp_phone" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <button className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md" type="submit">Send</button>
                                                </form>
                                            </div>
                                        </BrowserView>
                                        <MobileView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form>
                                                    <div className="flex flex-col w-full justify-between space-y-5">
                                                        <input placeholder="First Name" id="name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="f_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />

                                                        <input placeholder="Email" id="email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="ph_number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <button className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md" type="submit">Send</button>
                                                </form>
                                            </div>
                                        </MobileView>
                                    </>
                                )}
                            </Popup> : null}
                            {showPopup ? <Popup
                                trigger={

                                    <button className="p-2 bg-[#009FE3] text-white flex items-center flex-row justify-around rounded-md futura lg:h-10">BECOME A MEMBER</button>

                                } modal
                                position="center"
                                closeOnDocumentClick={false}
                            >
                                {close => (
                                    <>
                                        <BrowserView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form className='flex flex-col space-y-5' onSubmit={submitSignUp}>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="First Name" id="pp_first_name" name="pp_first_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="pp_last_name" name="pp_last_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="Email" id="pp_email" name="pp_email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="pp_phone" name="pp_phone" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <button className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md" type="submit">Send</button>
                                                </form>
                                            </div>
                                        </BrowserView>
                                        <MobileView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form>
                                                    <div className="flex flex-col w-full justify-between space-y-5">
                                                        <input placeholder="First Name" id="name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="f_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />

                                                        <input placeholder="Email" id="email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="ph_number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <button className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md" type="submit">Send</button>
                                                </form>
                                            </div>
                                        </MobileView>
                                    </>
                                )}
                            </Popup> : null}
                        </div>
                        <div className="">
                            <a href="/about/career" className="border-[#009FE3] border-2 p-2 lg:h-10 text-white flex items-center flex-row justify-around rounded-md futura ">WORK WITH US</a>
                        </div>
                        <div className="">
                            <a href="/about/franchise" className="border-[#009FE3] border-2 p-2 lg:h-10 text-white flex items-center flex-row justify-around rounded-md futura ">GROW WITH US</a>
                        </div>
                    </div>
                    {/* <div className="mt-10">
                        <p className=" futura-bold text-white">ENQUIRE NOW</p>
                        <input
                            className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 py-2 mb-3"
                            placeholder="FULL NAME"
                        />
                        <input
                            className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 py-2 mb-3"
                            placeholder="PHONE NUMBER"
                        />

                        <div className="mt-5 bg-[#009FE3] learnMoreBtns p-2 w-40 flex justify-start items-center rounded-md futura-bold">
                            <a href="#">REQUEST A CALL</a>
                        </div>
                    </div> */}
                </div>
            </div></div>
    );
}


