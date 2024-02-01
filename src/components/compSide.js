import React, { useState } from 'react';
import { image_url } from '../../global_vars';
import parse from "html-react-parser";
import Split from './Split';
import PhoneInput from 'react-phone-input-2';
import { useRouter } from 'next/router';
import 'react-phone-input-2/lib/style.css';

export default function CompSide({ data = {}, isFlipped = false, style = 'white' }) {
    const router = useRouter();

    const getLocationCode = () => {
        const { pathname } = router;

        if (pathname.includes("/baabda/") || pathname.includes("/baabda-homepage/")) {
            return 2;
        } else if (pathname.includes("/manara/") || pathname.includes("/manara-homepage/")) {
            return 9;
        } else if (pathname.includes("/hamra/") || pathname.includes("/hamra-homepage/")) {
            return 1;
        } else if (pathname.includes("/dbayeh/") || pathname.includes("/dbayeh-homepage/")) {
            return 7;
        } else if (pathname.includes("/achrafieh/") || pathname.includes("/achrafieh-homepage/")) {
            return 6;
        }

        return 1;
    };

    const locationCode = getLocationCode();
    const submitLebSignUp = async event => {
        event.preventDefault();


        const getTokenAPI = async () => {
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
        };

        getTokenAPI();


    };
    const [value, setValue] = useState();
    const [branch, setBranch] = useState();
    return (
        <>
            {data.image_position == "right" ? <div className="about section-padding"
            // style={{ backgroundImage: 'url("MainSiteImg.png")', backgroundRepeat: "no-repeat" }}
            >
                <div className="container" >
                    <div className="row">
                        <div className="col-lg-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="content">
                                <Split>
                                    <h3
                                        className="words chars splitting main-title wow"
                                        // style={{ fontSize: "60px" }}
                                        data-splitting
                                    >
                                        {data.title}
                                    </h3>
                                </Split>
                                <Split>
                                    <p className="words chars splitting wow txt" data-splitting style={{ color: "white" }}>
                                        {parse(`${data.brief}`)}
                                    </p>
                                </Split>
                            </div>

                        </div>
                        <div className="col-lg-6 offset-lg-1 valign">
                            <div className="img-mons">
                                <div className="row">
                                    <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
            {data.image_position == "left" && data.free_trial ? <div id='free_trial' className="about section-padding"
                style={{ backgroundImage: 'url("MainSiteImg.png")', backgroundRepeat: "no-repeat" }}
            >
                <div className="container" >

                    {data.free_trial ? <div className="row" style={{ justifyContent: "space-between" }}>
                        <div className="col-lg-5">
                            <div className="img-mons">
                                <div className="row">
                                    <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />
                                </div>
                            </div>
                        </div>
                        <form onSubmit={submitLebSignUp} className="col-lg-6" style={{ display: "flex", flexDirection: "column", justifyContent: "start", paddingTop: "1rem", gap: "10px" }}>
                            <h6 style={{ fontWeight: "lighter", fontFamily: "Montserrat Regular" }}>REQUEST</h6>
                            <h1 style={{ fontWeight: "bold" }}>FREE TRYOUT</h1>
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
                                                            className="w-full appearance-none block bg-transparent leading-tight "
                                                            value={value}

                                                        />
                                <input className='inputInfo inputfree' style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} id="pp_email" name="pp_email" placeholder='EMAIL' />
                            </div>
                            {/* <select defaultValue={branch} onChange={(value) => {
                                                        setBranch(value);
                                                        setMessage(value)
                                                    }} name="branches" id="location" className="w-full border border-[#009FE3] bg-transparent text-white pl-2 appearance-none rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2">
                                                        <option disabled selected>SELECT BRANCH</option>
                                                        <option value="1">Hamra</option>
                                                        <option value="2">Baabda</option>
                                                        <option value="6">ABC Achrafieh</option>
                                                        <option value="7">Dbayeh</option>
                                                        <option value="9">Dalfa</option>
                                                    </select> */}
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
                                {locationCode === 1 && <option value={locationCode}>Hamra</option>}
                                {locationCode === 2 && <option value={locationCode}>Baabda</option>}
                                {locationCode === 6 && <option value={locationCode}>Achrafieh</option>}
                                {locationCode === 7 && <option value={locationCode}>Dbayeh</option>}
                                {locationCode === 9 && <option value={locationCode}>Manara</option>}
                            </select>
                            <button className='submitPopup' type='submit' style={{ width: "25%", background: "#1990DF", height: "3rem", color: "white", borderRadius: "5px", border: "0px solid transparent" }}>SUBMIT REQUEST</button>
                        </form>
                    </div> : null}
                </div>
            </div> : null}
            {data.image_position == "left" && !data.free_trial ? <div className="about "
             
            >
                <div className="container" >
                    <div className="row"><div className="col-lg-6" style={{position:"relative"}}>
                    <div style={{position:"absolute", right:"-10.5rem"}} className='onMobileBackSlash'><img src='/Backslash-Cut.png'/></div>
                        <div className="img-mons">
                            <div className="row">
                                <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />
                            </div>
                        </div>
                    </div><div className="col-lg-5 offset-lg-1" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="content">
                                <Split>
                                    <h3
                                        className="words chars splitting main-title wow"
                                        // style={{ fontSize: "60px" }}
                                        data-splitting
                                    >
                                        {data.title}
                                    </h3>
                                </Split>
                                <Split>
                                    <p className="words chars splitting wow txt" data-splitting style={{ color: "white" }}>
                                        {parse(`${data.brief}`)}
                                    </p>
                                </Split>
                            </div>

                        </div>

                    </div>
                </div>
            </div> : null}
        </>
    )

}
