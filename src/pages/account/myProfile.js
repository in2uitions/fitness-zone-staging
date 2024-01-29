import Slider from "react-slick";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PrivateMenu from "./private-menu";
import moment from "moment";
import Popup from "reactjs-popup";
import OtpTimer from "otp-timer";
import Cookies from 'js-cookie'
import axios from "axios";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import DarkTheme from "../../layouts/Dark";

export default function Dashboard({ style = "white", data }) {
    const [valid, setIsValid] = useState([])
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");
    const memberId = Cookies.get("Member");
    const [isOpen, setIsOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet = (Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
            router.push({ pathname: "/account/myProfile" });
        }
        else {
            router.push({ pathname: "/account/login" });
        }
    }, [])
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + Cookies.get("token")
    );
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: "GET",
        headers: registrationHeaders,
    };

    const handleSubmitPhoneNumer = async event => {
        event.preventDefault();

        const getSubmitNumber = async () => {
            try {
                var registraitonRawData = JSON.stringify({
                    "Phone": event.target.mobile?.value,
                });
                // console.log(registraitonRawData);
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'POST',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/SaveMobile?memberId=${memberId}&mobile=${event.target.mobile.value}`,
                    registrationRequestOptions
                );
                if (res.status == 200) {
                    const data = await res.json();
                    if (data.isValid == true) {
                        Cookies.get("Phone", event.target.mobile.value);
                        // alert("You have changed your Info. Congratulations!")
                    }
                    else {
                        //alert("Wrong data");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        getSubmitNumber();
    };
    const handleChange = (e, index) => {
        const object = {
            [index]: e.target?.value,
        };
        setData(object);
    };
    const [state, toggle] = useState(true);
    const [scdstate, scdtoggle] = useState(true);
    const [thirdstate, thirdtoggle] = useState(true);
    const [countrydata, setCountryData] = useState([])
    var registrationHeaders = new Headers();
    registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: 'GET',
        headers: registrationHeaders
    };
    try {

        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Administration/Country/List`,
                    registrationRequestOptions

                );
                if (response.status == 200) {
                    const checkInList = await response.json()
                    setCountryData(checkInList)
                    // console.log(checkInList)
                }
            }
            // getData()
        }, [])
    } catch (err) {
        console.log(err);
    }
    const [select, setSelect] = useState("LEBANON");
    const onSelect = (code) => setSelect(code);
    const LEBANON = "LB";
    const UAE = "AE";
    useEffect(() => {
        const getVisitorLocationAPI = async () => {
            try {
                const res = await fetch(
                    `https://ipapi.co/json/`
                );
                const data = await res.json();
                if (data.country_code == 'AE') {
                    setSelect(UAE);
                }
                else {
                    setSelect(LEBANON);
                }
            } catch (err) {
                console.log(err);
            }
        };

        getVisitorLocationAPI();
    }, []);
    const router = useRouter();
    const [showbutton, setShowButton] = useState(false);
    const [showpopupbutton, setShowpopupButton] = useState(false);
    function onAddBtnClick() {
        setShowButton(true);
    };
    function onpopupBtnClick() {
        setShowpopupButton(true);
    };
    // const sendOTPEmail = async event => {
    //     event.preventDefault();

    //     const getValidOtp = async () => {
    //         try {
    //             var registrationHeaders = new Headers();
    //             registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
    //             registrationHeaders.append("Content-Type", "application/json");
    //             var registrationRequestOptions = {
    //                 method: 'GET',
    //                 headers: registrationHeaders
    //             };
    //             const response = await fetch(
    //                 `https://api.fitnessclubapp.com/api/Email/SendOTPMessage/${event.target.newEmailAddress.value}`,
    //                 registrationRequestOptions
    //             );
    //             const data = await response.json();
    //             if (data.isValid == true) {
    //                 Cookies.set('newEmail', event.target.newEmailAddress.value);
    //             }
    //             else {
    //                 alert("Wrong Email");
    //             }

    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getValidOtp();
    // };

    const OTPEmail = async event => {
        event.preventDefault();

        const getValidOtp = async () => {
            try {
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Email/SendOTPMessage/${event.target.newEmailAddress.value}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                if (data.isValid == true) {
                    Cookies.set('newEmail', event.target.newEmailAddress.value);
                }
                else {
                    // alert("Wrong Phone number");
                    Cookies.set('newEmail', event.target.newEmailAddress.value);
                }

            } catch (err) {
                console.log(err);
            }
        };
        getValidOtp();
        if (handleFormValidation()) {
            // alert("You have been successfully logged in.");
            setState(initialState);
            event.target.value = '';
        }
    };

    const sendOTPPhone = async event => {
        event.preventDefault();

        const getValidOtp = async () => {
            try {
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/SMS/SendOTPMessage/${event.target.newphone.value.replace("+","")}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                if (data.isValid == true) {
                    Cookies.set('PhoneUpdated', event.target.newphone.value);
                }
                else {
                    // alert("Wrong Phone number");
                    Cookies.set('PhoneUpdated', event.target.newphone.value);
                }

            } catch (err) {
                console.log(err);
            }
        };
        getValidOtp();
        if (handleFormValidation()) {
            // alert("You have been successfully logged in.");
            setState(initialState);
            event.target.value = '';
        }
    };
    const useEmail = Cookies.get('newEmail')
    const usePhone = Cookies.get('PhoneUpdated')
    const resendOTP = () => {

        const getOTP = async () => {
            try {
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Email/SendOTPMessage/${useEmail}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                if (data.isValid == true) {
                }
                else {
                    // alert("Wrong OTP");
                }

            } catch (err) {
                console.log(err);
            }
        };
        getOTP();
        console.log("button clicked");
    };
    const submitOTPEmail = async event => {
        event.preventDefault();

        const getValidOtp = async () => {
            try {
                // var registraitonRawData = JSON.stringify({
                //     "OTP": event.target.otp?.value
                // });
                // console.log(registraitonRawData);
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'POST',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/SaveEmailWithOTPValidation?MemberId=${memberId}&Email=${useEmail}&OtpNumber=${event.target.otpNumber.value}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                if (data.isValid == true) {
                    console.log("testing....")

                    setIsOpen(false);
                }
                else {
                    // alert("Wrong OTP");
                    setIsOpen(false);
                    setIsValid(data)
                    // console.log(data)
                }

            } catch (err) {
                console.log(err);
            }
        };
        getValidOtp();
    };
    const resendPhoneOTP = () => {

        const getOTP = async () => {
            try {
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Email/SendOTPMessage/${usePhone}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                if (data.isValid == true) {
                }
                else {
                    // alert("Wrong OTP");
                }

            } catch (err) {
                console.log(err);
            }
        };
        getOTP();
        console.log("button clicked");
    };
    const submitOTPPhone = async event => {
        event.preventDefault();

        const getValidOtp = async () => {
            try {
                // var registraitonRawData = JSON.stringify({
                //     "OTP": event.target.otp?.value
                // });
                // console.log(registraitonRawData);
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'POST',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/SaveMobileWithOTPValidation?MemberId=${memberId}&Mobile=${usePhone}&OtpNumber=${event.target.otpPhoneNumber.value}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                if (data.isValid == true) {
                    console.log("testing....")

                    setIsPopupOpen(false);
                }
                else {
                    // alert("Wrong OTP");
                    setIsPopupOpen(false);
                    setIsValid(data)
                    // console.log(data)
                }

            } catch (err) {
                console.log(err);
            }
        };
        getValidOtp();
    };
    const [text, setText] = useState("");
    const [scdInput, setScdInput] = useState("");
    const autoComplete = (e) => {
        setText({ value: e.target.value });
    };
    const autoscdComplete = (e) => {
        setScdInput({ value: e.target.value });
    };
    const openPopup = () => {
        setIsOpen(true);
    }
    const closePopup = () => {
        setIsValid(valid)
        const test = valid.isValid
        console.log(test)
        if (test == true) {
            setIsOpen(false)
        }
        else {
            setIsOpen(false)
        }
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('MemberId', memberId);
            bodyFormData.append('street', e.target.street.value);
            bodyFormData.append('city', e.target.city.value);
            bodyFormData.append('building', e.target.building.value);
            bodyFormData.append('floor', e.target.floor.value);
            const res = await axios.post(
                `https://api.fitnessclubapp.com/api/Membership/Member/SaveAddress`, bodyFormData, {
                headers: {
                    Authorization: "Bearer " + Cookies.get("token")
                }
            });
            if (res.status === 200) {
                setMessage("User created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };
    const MOBILE = 'mobileNumber';
    const [statee, setState] = useState({
        mobileNumber: '',
        formErrors: {}
    })
    const formErrors = '';
    const [
        phoneNumberErr, setphoneNumberErr
    ] = useState(formErrors);
    const initialState = statee;


    function handleFormValidation() {
        const { mobileNumber } = statee;
        let formErrors = {};
        let formIsValid = true;


        if (!mobileNumber) {
            // formIsValid = false;
            // setphoneNumberErr("Phone number is required.");
        } else {
            var mobPattern = /^((\+?971)|0)5[024568]\d{7}$/;
            let reg = /^(?:\+961|961)(1|0?3[0-9]?|[4-6]|70|71|76|78|79|7|81?|9)\d{6}$/;
            if (!mobPattern.test(mobileNumber) && !reg.test(mobileNumber)) {
                formIsValid = false;
                setphoneNumberErr("Invalid phone number. You must enter your country code!");
            }
            else {
                // console.log("isValid")
            }
        }
        setState({ formErrors: formErrors });
        return formIsValid;
    }
    function handleTabsChange({ event, index }) {
        const { name, value } = event.target;
        setState({ [name]: value });
        setText({ value: event.target.value });
    }
    const [value1, setValue1] = useState();
    return (
        <>
            <PrivateMenu />
            <DarkTheme>
            <section style={{marginBottom:"2rem"}}>
                <div className="flex flex-col justify-center items-center " style={{marginTop:"10rem"}}>
                    <a href="/account/dashboard" className="space-x-1 "
                    style={{border:"4px solid #008DDC", display:"flex", borderRadius:"100%", width:"10rem", height:"10rem", justifyContent:"center", alignItems:"center"}}>
                        <p className="font-bold text-6xl text-colorblue montserrat-bold">{data.firstName?.charAt(0)}</p>
                        <p className="font-bold text-6xl text-colorblue montserrat-bold">{data.lastName?.charAt(0)}</p>
                    </a>
                    <p className="font-bold text-colorblue montserrat-bold" style={{fontSize:"18px", marginTop:"1.25rem"}}>{data.fullName}</p>
                </div>
                <div className="w-full" style={{marginBottom:"5rem"}}>
                    <form onSubmit={handleSubmit} className=" mx-auto flex flex-col justify-center items-center " style={{marginTop:"5rem"}}>
                        {/* <div className="grid lg:grid-cols-12 gap-x-3 items-start mt-10 space-y-5 lg:space-y-0 md:space-y-0"> */}
                        <div className="w-full flex mobile-flex-col container mx-auto lg:flex lg:flex-row md:flex space-x-3 md:space-x-3 justify-center items-start lg:space-y-0 md:space-y-0 px-4 lg:px-4 md:px-4">

                            <div className="flex flex-col lg:w-1/3 md:w-1/3">

                                <div className="flex flex-col space-y-2">

                                    <p className="text-colorblue font-bold fontSize montserrat-bold">General Info</p>
                                    <input
                                        disabled={true}
                                        className="border-in bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        value={data.firstName}
                                    />
                                    <input
                                        disabled={true}
                                        className="border-in bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        value={data.lastName}
                                    />
                                    <div className="border-in flex justify-between items-center bg-black lg:h-10 md:h-10 h-16 rounded-md p-1">
                                        <input
                                            type="date"
                                            disabled={true}
                                            className="bg-transparent dateInput pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#008DDC] text-white"
                                            value={moment(data.birthdate).format("YYYY-MM-DD")} id="birthdate"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="border-in  flex items-center bg-black rounded-md lg:h-10 md:h-10 h-16 p-1 text-white">
                                        <input
                                            type="text"
                                            disabled={scdstate}
                                            className="bg-transparent inputChange pl-2 w-3/5 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#008DDC] text-white"
                                            value={data.mobile} id="mobile"
                                            onChange={handleChange}
                                        />
                                        {/* <button
                                            className="bg-[#008DDC] p-1 rounded-md font-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2"
                                            onClick={() => {
                                                scdtoggle(!scdstate);
                                                handleChange;
                                            }}
                                            onSubmit={scdstate ? handleSubmitPhoneNumer : () => { }}
                                        >
                                            {scdstate ? "CHANGE PHONE" : "SAVE"}
                                        </button> */}
                                        <div className="bg-blue p-1 flex items-center justify-center rounded-md font-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2 text-white">
                                            <Popup
                                                trigger={
                                                    <button style={{outline:"none"}}>
                                                        <button onClick={() => setIsPopupOpen(!isPopupOpen)} className="w-full font-bold" style={{color:"white",outline:"none"}}> CHANGE PHONE</button>
                                                    </button>
                                                } modal nested
                                                position="center"
                                                open={isPopupOpen}
                                                onOpen={() => setIsPopupOpen(!isPopupOpen)}
                                                closeOnDocumentClick={false}
                                            // onClose={() => setVisible(false)}
                                            >
                                                {close => (
                                                    <>
                                                        <button className="close-popup" onClick={close}>
                                                            &times;
                                                        </button>
                                                        <div className="popups rounded-md">
                                                            <div className="container mx-auto flex flex-col space-y-5 py-8 lg:px-40 md:px-20 px-6">
                                                                <p className="text-colorblue text-lg font-bold">Change Phone Number</p>
                                                                <form className="flex flex-col space-y-5" onSubmit={sendOTPPhone}>
                                                                    {/* <input onChange={autoComplete} className="bg-transparent p-1 border border-[#008DDC] h-9 rounded-md text-white focus:outline-none  focus:border-[#008DDC]"
                                                                        placeholder="Insert your new Phone Number" id="newphone" /> */}
                                                                    {/* <input
                                                                        type="input"
                                                                        name="mobileNumber"
                                                                        onChange={(e) => handleTabsChange({ event: e, index: MOBILE })}
                                                                        value={state.mobileNumber}
                                                                        placeholder="Insert your new Phone Number" id='newphone'
                                                                        className={phoneNumberErr ? " bg-transparent p-1 border border-[#008DDC] h-9 rounded-md text-white focus:outline-none  focus:border-[#008DDC]" : "bg-transparent p-1 border border-[#008DDC] h-9 rounded-md text-white focus:outline-none  focus:border-[#008DDC]"}
                                                                    /> */}
                                                                    <PhoneInput
                                                                        international={false}
                                                                        country={select.toLowerCase()}
                                                                        countryCodeEditable={false}
                                                                        // countries={["lb", "ae"]}
                                                                        onlyCountries={['lb', 'ae']}
                                                                        autoFormat={false}
                                                                        countrySelectProps={{ unicodeFlags: true }}
                                                                        name="phoneNumber"
                                                                        value={value1}
                                                                        disableDropdown={true}
                                                                        inputProps={{
                                                                            name: "mobileNumber",
                                                                            id: "newphone",
                                                                            required: true,
                                                                            // autoFocus: true,
                                                                        }}
                                                                        // onChange={setValue1}
                                                                        // onSelect={(e) => handleTabsChange({ event: e, index: MOBILE })}
                                                                        onChange={setValue1}
                                                                        addInternationalOption={false}
                                                                        placeholder="Insert your new Phone Number" className="border-in h-9 rounded-md border-2 pt-2 pb-2 my-4 w-full flex justify-center items-center montserrat-book bg-black text-white login-placeholder" id='phone'
                                                                    />
                                                                    {/* {phoneNumberErr && (
                                                                        <div style={{ color: "red", paddingBottom: 10 }}>
                                                                            {phoneNumberErr}
                                                                        </div>
                                                                    )} */}
                                                                    <button disabled={!value1} type="submit" className="text-white bg-blue button-disabled h-9 montserrat-book rounded-md" onClick={onpopupBtnClick}>Send OTP</button>
                                                                </form>
                                                                {showpopupbutton ? <form className="flex flex-col space-y-5" onSubmit={submitOTPPhone}>
                                                                    <input onChange={autoscdComplete} className="border border-[#008DDC] bg-transparent h-9 rounded-md p-1 text-white" id="otpPhoneNumber" placeholder="OTP" />
                                                                    <button onClick={closePopup} disabled={!scdInput} type="submit" className="text-white bg-blue button-disabled h-9 montserrat-book rounded-md">Save</button>
                                                                </form> : null}
                                                                {showpopupbutton ? <p className="flex items-center space-x-2 mb-5"><span className="text-white">Did not receive OTP?</span> <span className="text-colorblue"><OtpTimer
                                                                    minutes={3}
                                                                    seconds={1}
                                                                    text=""
                                                                    ButtonText="Resend Now"
                                                                    resend={resendPhoneOTP}
                                                                    onClick={resendPhoneOTP}
                                                                    textColor="#008DDC"
                                                                    background="#00000000"
                                                                    buttonColor="#008DDC"
                                                                /></span></p> : null}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </Popup>
                                        </div>
                                    </div>
                                    <div className="border-in flex items-center bg-black lg:h-10 md:h-10 h-16 p-1 rounded-md text-white">
                                        <input
                                            type="text"
                                            disabled={thirdstate}
                                            className="bg-transparent inputChange pl-2 w-3/5 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#008DDC] text-white"
                                            value={data.email} id="email"
                                            onChange={handleChange}
                                        />
                                        {/* <button type="submit"
                                            className="bg-[#008DDC] p-1 rounded-md font-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2"
                                            // onClick={() => {
                                            //     thirdtoggle(!thirdstate);
                                            //     handleChange;
                                            // }}
                                            // onSubmit={thirdstate ? handleSubmitEmail : () => {}}
                                        >
                                            {thirdstate ? "CHANGE EMAIL" : "SAVE"}
                                            
                                            CHANGE EMAIL
                                        </button> */}
                                        <div className="bg-blue p-1 flex items-center justify-center rounded-md font-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2 h-btn">
                                            <Popup
                                                trigger={
                                                    <button style={{outline:"none"}}>
                                                        <button onClick={() => setIsOpen(!isOpen)} style={{color:"white", outline:"none"}} className="font-bold"> CHANGE EMAIL</button>
                                                    </button>
                                                } modal nested
                                                position="center"
                                                open={isOpen}
                                                onOpen={() => setIsOpen(!isOpen)}
                                                closeOnDocumentClick={false}
                                            // onClose={() => setVisible(false)}
                                            >
                                                {close => (
                                                    <>
                                                        <button className="close-popup" onClick={close}>
                                                            &times;
                                                        </button>
                                                        <div className="popups rounded-md">
                                                            <div className="container mx-auto flex flex-col space-y-5 py-8 lg:px-40 md:px-20 px-6">
                                                                <p className="text-colorblue text-lg font-bold">Change Email Address</p>
                                                                <form className="flex flex-col space-y-5" onSubmit={OTPEmail}>
                                                                    <input onChange={autoComplete} className="bg-transparent p-1 border border-in h-9 rounded-md text-white focus:outline-none  focus:border-[#008DDC]"
                                                                        placeholder="Insert your new Email" id="newEmailAddress" />
                                                                    <button disabled={!text} type="submit" className="text-white bg-blue button-disabled h-9 montserrat-book rounded-md" onClick={onAddBtnClick}>Send OTP</button>
                                                                </form>
                                                                {showbutton ? <form className="flex flex-col space-y-5" onSubmit={submitOTPEmail}>
                                                                    <input onChange={autoscdComplete} className="border border-[#008DDC] bg-transparent h-9 rounded-md p-1 text-white" id="otpNumber" placeholder="OTP" />
                                                                    <button onClick={closePopup} disabled={!scdInput} type="submit" className="text-white bg-blue button-disabled h-9 montserrat-book rounded-md">Save</button>
                                                                </form> : null}
                                                                {showbutton ? <p className="flex items-center space-x-2 mb-5"><span className="text-white">Did not receive OTP?</span> <span className="text-colorblue"><OtpTimer
                                                                    // minutes={3}
                                                                    seconds={10}
                                                                    text=""
                                                                    ButtonText="Resend Now"
                                                                    resend={resendOTP}
                                                                    onClick={resendOTP}
                                                                    textColor="#008DDC"
                                                                    background="#00000000"
                                                                    buttonColor="#008DDC"
                                                                /></span></p> : null}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </Popup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:w-1/3 md:w-1/3 mobileTop">
                                <div className="flex flex-col space-y-2 text-white">
                                    <p className="text-colorblue font-bold fontSize montserrat-bold">Address</p>

                                    <input
                                        className="border-in  bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        name="city"
                                        id="city"
                                        value={data.city}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border-in bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        name="street"
                                        id="street"
                                        value={data.street}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border-in bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        name="building"
                                        id="building"
                                        value={data.building}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border-in bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        name="floor"
                                        id="floor"
                                        value={data.floor}
                                        onChange={handleChange}
                                    />
                                    {/* <input
                                        className="border border-[#008DDC] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={data.mobile}
                                    /> */}
                                    {/* <select name="country">
                                    {countrydata.map((item) => (
                                            <option value={item.countryCode}>{item.countryName}</option>
                                        ))}
                                    </select> */}
                                </div>
                            </div>

                        </div>
                        <button type="submit" className="bg-blue p-2 lg:w-1/6 rounded-md font-bold  text-white" style={{marginTop:"1.25rem"}}>UPDATE PROFILE</button>
                    </form>
                </div>
                {/* </div> */}
            </section>
            </DarkTheme>
        </>
    );
}
export async function getServerSideProps(context) {
    const memberId = context.req.cookies["Member"];
    const token = context.req.cookies["token"];
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + token
    );
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: "GET",
        headers: registrationHeaders,
    };
    const response = await fetch(
        `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
        registrationRequestOptions
    );
    // const data = await response.json()
    if (response.status == 401) {
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        };
    } else {
        const data = await response.json()
        return {
            props: { data }
        }
    }
}