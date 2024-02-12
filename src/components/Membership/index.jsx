import React, { useState } from "react";
import parse from "html-react-parser";
import { image_url } from "../../../global_vars";
import Popup from "reactjs-popup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Membership = ({ withBG, withPadding, halfBG, withOutTitle, data = {} }) => {
    const [value, setValue] = useState();
    const [branch, setBranch] = useState();
    const submitLebSignUp = async (event) => {
        event.preventDefault();
        const getTokenAPI = async () => {
            try {
                const res = await fetch(`https://ipapi.co/json/`);
                const data = await res.json();
                if (data.country_code == "LB") {
                    try {
                        const res = await fetch(
                            'https://api.fitnessclubapp.com/api/Account/Login?Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234',
                            {
                                method: 'POST'
                            }
                        );

                        const tokenData = await res.json();

                        const submitContactForm = async () => {
                            try {
                                var registraitonRawData = JSON.stringify({
                                    "GuestRegisterId": 0,
                                    "FirstName": event.target.pp_first_name.value,
                                    "LastName": event.target.pp_last_name.value,
                                    "Mobile": event.target.pp_phone.value,
                                    "Email": event.target.pp_email.value,
                                    "LocationCode": parseInt(event.target.location.value),
                                    "Source": {
                                        "VisitSourceId": 9
                                    },
                                });

                                // console.log(registraitonRawData);


                                var registrationHeaders = new Headers();
                                registrationHeaders.append(
                                    "Authorization",
                                    "Bearer " + tokenData.token
                                );
                                registrationHeaders.append("Content-Type", "application/json");
                                var registrationRequestOptions = {
                                    method: "POST",
                                    headers: registrationHeaders,
                                    body: registraitonRawData,
                                };
                                let param = '';
                                Object.keys(router.query).map((key) => {
                                    param = `${param}${param == '' ? '' : '&'}${key}=${router.query[key]}`
                                })
                                const res = await fetch(
                                    `https://api.fitnessclubapp.com/api/Crm/GuestRegister?${param}`,
                                    registrationRequestOptions
                                );
                                const data = await res.json();
                                // console.log(data);

                                if (data.isValid == true) {
                                    setIsSent(true)
                                    event.target.pp_first_name.value = '';
                                    event.target.pp_last_name.value = '';
                                    event.target.pp_phone.value = '';
                                    event.target.pp_email.value = '';
                                    setValue(" ")
                                } else {
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
                } else if (data.country_code == 'AE') {
                    try {
                        const res = await fetch(
                            "https://api.fitnessclubapp.com/api/account/login?Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1",
                            {
                                method: 'POST'
                            }
                        );

                        const tokenData = await res.json();

                        const submitContactForm = async () => {
                            try {
                                var registraitonRawData = JSON.stringify({
                                    "GuestRegisterId": 0,
                                    "FirstName": event.target.pp_first_name.value,
                                    "LastName": event.target.pp_last_name.value,
                                    "Mobile": event.target.pp_phone.value,
                                    "Email": event.target.pp_email.value,
                                    "LocationCode": parseInt(event.target.location.value),
                                    "Source": {
                                        "VisitSourceId": 9
                                    },
                                });

                                // console.log(registraitonRawData);


                                var registrationHeaders = new Headers();
                                registrationHeaders.append(
                                    "Authorization",
                                    "Bearer " + tokenData.token
                                );
                                registrationHeaders.append("Content-Type", "application/json");
                                var registrationRequestOptions = {
                                    method: "POST",
                                    headers: registrationHeaders,
                                    body: registraitonRawData,
                                };
                                let param = '';
                                Object.keys(router.query).map((key) => {
                                    param = `${param}${param == '' ? '' : '&'}${key}=${router.query[key]}`
                                })
                                const res = await fetch(
                                    `https://api.fitnessclubapp.com/api/Crm/GuestRegister?${param}`,
                                    registrationRequestOptions
                                );
                                const data = await res.json();
                                // console.log(data);

                                if (data.isValid == true) {
                                    setIsSent(true)
                                    event.target.pp_first_name.value = '';
                                    event.target.pp_last_name.value = '';
                                    event.target.pp_phone.value = '';
                                    event.target.pp_email.value = '';
                                    setValue(" ")
                                } else {
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
                }
            } catch (err) {
                console.log(err);
            }
        };

        getTokenAPI();
    };
    return (
        <section
            className={`services ${withPadding ? "section-padding" : ""} ${withBG ? "sub-bg" : ""
                }`}
        >
            <div className="">
                <div className="membershipTitle" style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
                    {data.title ? <p style={{ fontSize: "32px", letterSpacing: "15px", color: "white" }}>{data.title}</p> : null}
                </div>
                <div className="row mobileRow">
                    {
                        data.membership_components?.map((service, index) => (
                            <div className={`contact_block col-lg-4`} key={service.membership_components_id.id}>
                                <div className={` wow fadeInUp `} data-wow-delay={service.membership_components_id.id === 1 ? ".5s" : service.membership_components_id.id === 2 ? ".3s" : ".8s"}>
                                    <div style={{ position: "relative" }}>
                                        <img
                                            src={`${image_url}${service.membership_components_id?.image?.id}`}
                                            alt=""
                                            className="branch-img"
                                            style={{ height: "450px", objectFit: "cover" }}
                                        />
                                        <div className="img_start" style={{ position: "absolute", bottom: "2rem", transform: "translateX(40%)" }}>
                                            <h6 style={{ fontSize: "32px" }}>{service.membership_components_id.title[0].first}</h6>
                                            <h6 style={{ fontSize: "32px", fontFamily: "Montserrat Regular" }}>{service.membership_components_id.title[0].second}</h6>
                                        </div>
                                        <div className='img__description'>
                                            <p>{parse(`${service.membership_components_id.brief}`)}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        ))}

                    <Popup trigger={
                        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                            <div className="rounded-md" style={{
                                marginTop: "4rem", display: "flex",
                                justifyContent: "center",
                                // width: "50%", 
                                padding: "10px 30px",
                                background: "#3498db"
                            }} >
                                <a style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }} className=" cursor-pointer">{data.button}</a>
                            </div>
                        </div>
                    } modal nested
                        closeOnDocumentClick
                        className="popupModule"
                        position="">
                        {(close) => (
                            <>
                                <div className="" onClick={close}>
                                    <img src="/closeButton.svg"
                                        className='closePop' style={{ width: "30px", height: "30px", position: "absolute", right: "0rem" }} />
                                </div>
                                <div className="row container" style={{ justifyContent: "space-between" }}>
                                    <div className="col-lg-5">
                                        <div className="img-mons">
                                            <div className="row">
                                                <img src="/layer-MC0.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={submitLebSignUp} className="col-lg-6" style={{ display: "flex", flexDirection: "column", justifyContent: "start", paddingTop: "1rem", gap: "10px" }}>
                                        <h6 style={{ fontWeight: "lighter", fontFamily: "Montserrat Regular" }}>REQUEST</h6>
                                        <div className="startAlignFlex mobileFlex flex items-center" style={{ gap: "15px" }}>
                                            <h1 className='mobiletitlePop' style={{ fontWeight: "bold", fontSize: "36px" }}>ENQUIRE NOW</h1>
                                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                                                <a href="tel:+961 3 505 250" target="_blank" style={{ display: "flex", alignItems: "center" }}>

                                                    <img src="/phoneIcon.svg" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                                                    call now
                                                </a>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                            <input className='inputfree' style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} id="pp_first_name" name="pp_first_name" placeholder='FIRST NAME' />
                                            <input className='inputfree' style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} id="pp_last_name" name="pp_last_name" placeholder='LAST NAME' />
                                        </div>
                                        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                            {/* <PhoneInput style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} /> */}
                                            <PhoneInput
                                                country={"lb"}
                                                countryCodeEditable={false}
                                                autoFormat={false}
                                                enableAreaCodes={true}
                                                placeholder='PHONE NUMBER'
                                                onChange={(value) => {
                                                    setValue(value);
                                                }}
                                                required={true}
                                                inputClass='PhoneNumberInputPopup'
                                                inputProps={{
                                                    name: "pp_phone",
                                                    id: "pp_phone",
                                                    required: true,
                                                    // autoFocus: true,
                                                    maxLength: 12,
                                                }}
                                                excludeCountries={['us']}
                                                style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px" }}
                                                className="w-full appearance-none block bg-transparent leading-tight"
                                                value={value}

                                            />
                                            <input className='inputInfo inputfree' style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} id="pp_email" name="pp_email" placeholder='EMAIL' />
                                        </div>
                                        <select
                                            defaultValue={branch} onChange={(value) => {
                                                setBranch(value);
                                            }}
                                            name="branches" id="location"
                                            style={{
                                                width: "100%",
                                                height: "3rem",
                                                border: "1px solid #1990DF",
                                                background: "transparent",
                                                borderRadius: "5px",
                                                paddingLeft: "5px",
                                                color: "white"
                                            }}
                                        >
                                            <option value='1'>Hamra</option>
                                            <option value='2'>Baabda</option>
                                            <option value='6'>Achrafieh</option>
                                            <option value='7'>Dbayeh</option>
                                            <option value='9'>Manara</option>
                                        </select>
                                        <button className='submitPopup' type='submit' style={{ width: "25%", background: "#1990DF", height: "3rem", color: "white", borderRadius: "5px", border: "0px solid transparent" }}>SUBMIT REQUEST</button>
                                    </form>
                                </div>
                            </>
                        )}
                    </Popup>
                </div>
            </div>
            {halfBG && <div className="half-bg bottom"></div>}

        </section>
    );
};

export default Membership;