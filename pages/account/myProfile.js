import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-magic-slider-dots/dist/magic-dots.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PrivateMenu from "./private-menu";
import moment from "moment";
import Popup from "reactjs-popup";
import OtpTimer from "otp-timer";

export default function Dashboard({ style = "white" }) {
    const [data, setData] = useState([]);
    const [valid , setIsValid] = useState([])
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");
    const memberId = localStorage.getItem("Member");
    const [isOpen, setIsOpen] = useState(false);
    const itemSet = (localStorage.length !== 0);
    useEffect(() => {
        if (itemSet) {
            router.push({ pathname: "/account/myProfile" });
        }
        else {
            router.push({ pathname: "/account/login" });
        }
    }, [])
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
    );
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: "GET",
        headers: registrationHeaders,
    };
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const fetchedData = await response.json();
                    setData(fetchedData);
                }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const handleSubmit = async event => {
        event.preventDefault();

        const getSubmit = async () => {
            try {
                var registraitonRawData = JSON.stringify({
                    "Phone": event.target.mobile?.value,
                });
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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
                        localStorage.setItem("Phone", event.target.mobile.value);
                        // alert("You have changed your Phone Number. Congratulations!")
                    }
                    else {
                        //alert("Wrong data");
                    }
                }

            } catch (err) {
                console.log(err);
            }


            if (data.isValid == true) {
                // alert("You have changed your data successfully!")
            }
        };
        getSubmit();
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
                registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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
                        localStorage.setItem("Phone", event.target.mobile.value);
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
    const handleSubmitEmail = async event => {
        event.preventDefault();

        const getSubmitEmail = async () => {
            try {
                var registraitonRawData = JSON.stringify({
                    "Email": event.target.email?.value,
                });
                // console.log(registraitonRawData);
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'POST',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/SaveEmail?memberId=${memberId}&mobile=${event.target.mobile.value}`,
                    registrationRequestOptions
                );
                if (res.status == 200) {
                    const data = await res.json();
                    if (data.isValid == true) {
                        localStorage.setItem("Email", event.target.email.value);
                        //alert("You have changed your Email. Congratulations!")
                    }
                    else {
                        //alert("Wrong data");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        getSubmitEmail();
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
    registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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
    const router = useRouter();
    const [showbutton, setShowButton] = useState(false);

    function onAddBtnClick() {
        setShowButton(true);
    };

    const sendOTPEmail = async event => {
        event.preventDefault();

        const getValidOtp = async () => {
            try {
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Email/SendOTPMessage/${event.target.newemail.value}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                if (data.isValid == true) {
                    localStorage.setItem('EmailUpdated', event.target.newemail.value);
                }
                else {
                    alert("Wrong Email");
                }

            } catch (err) {
                console.log(err);
            }
        };
        getValidOtp();
    };
    const useEmail = localStorage.getItem('EmailUpdated')
    const resendOTP = () => {

        const getOTP = async () => {
            try {
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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
                registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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
    const [text, setText] = useState("");
    const [scdInput, setScdInput] = useState("");
    const autoComplete = (e) => {
        setText({ value: e.target.value });
    };
    const autoscdComplete = (e) => {
        setScdInput({ value: e.target.value });
    };
    const openPopup = () =>{
    setIsOpen(true);
    }
    const closePopup = () =>{
        setIsValid(valid)
        const test = valid.isValid
        console.log(test)
        if(test == true){
            setIsOpen(false)
        }
        else{
            setIsOpen(false)
        }
        }
        
    return (
        <>
            <PrivateMenu />
            <section>
                <div className="flex flex-col justify-center items-center mt-40">
                    <a href="/account/dashboard" className="flex space-x-1 border-4 border-[#009FE3] rounded-full w-40 h-40 items-center justify-center">
                        <p className="futura-bold text-6xl text-[#009FE3]">{data.firstName?.charAt(0)}</p>
                        <p className="futura-bold text-6xl text-[#009FE3]">{data.lastName?.charAt(0)}</p>
                    </a>
                    <p className="futura-bold text-[#009FE3] mt-5">{data.fullName}</p>
                </div>
                <div className="w-full" >
                    <div className=" mx-auto flex flex-col justify-center items-center mt-20">
                        {/* <div className="grid lg:grid-cols-12 gap-x-3 items-start mt-10 space-y-5 lg:space-y-0 md:space-y-0"> */}
                        <div className="w-full container mx-auto lg:flex lg:flex-row md:flex lg:space-x-3 md:space-x-3 justify-center items-start space-y-5 lg:space-y-0 md:space-y-0 px-4 lg:px-4 md:px-4">

                            <div className="flex flex-col lg:w-1/3 md:w-1/3">

                                <div className="flex flex-col space-y-2">

                                    <p className="text-[#009FE3]">General Info</p>
                                    <input
                                        disabled={true}
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        value={data.firstName}
                                    />
                                    <input
                                        disabled={true}
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        value={data.lastName}
                                    />
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black lg:h-10 md:h-10 h-16 rounded-md p-1">
                                        <input
                                            type="date"
                                            disabled={true}
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] text-white"
                                            value={moment(data.birthdate).format("YYYY-MM-DD")} id="birthdate"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="border border-[#009FE3] flex items-center bg-black rounded-md lg:h-10 md:h-10 h-16 p-1 text-white">
                                        <input
                                            type="text"
                                            disabled={scdstate}
                                            className="bg-transparent pl-2 w-3/5 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3]"
                                            value={data.mobile} id="mobile"
                                            onChange={handleChange}
                                        />
                                        <button
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2"
                                            onClick={() => {
                                                scdtoggle(!scdstate);
                                                handleChange;
                                            }}
                                            onSubmit={scdstate ? handleSubmitPhoneNumer : () => { }}
                                        >
                                            {scdstate ? "CHANGE PHONE" : "SAVE"}
                                        </button>
                                    </div>
                                    <div className="border border-[#009FE3] flex items-center bg-black lg:h-10 md:h-10 h-16 p-1 rounded-md text-white">
                                        <input
                                            type="text"
                                            disabled={thirdstate}
                                            className="bg-transparent pl-2 w-3/5 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3]"
                                            value={data.email} id="email"
                                            onChange={handleChange} 
                                        />
                                        {/* <button type="submit"
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2"
                                            // onClick={() => {
                                            //     thirdtoggle(!thirdstate);
                                            //     handleChange;
                                            // }}
                                            // onSubmit={thirdstate ? handleSubmitEmail : () => {}}
                                        >
                                            {thirdstate ? "CHANGE EMAIL" : "SAVE"}
                                            
                                            CHANGE EMAIL
                                        </button> */}
                                        <div className="bg-[#009FE3] p-1 flex items-center justify-center rounded-md futura-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2">
                                            <Popup
                                                trigger={
                                                    <button>
                                                        <button onClick={() => setIsOpen(!isOpen)}> CHANGE EMAIL</button>
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
                                                        <button className="close" onClick={close}>
                                                            &times;
                                                        </button>
                                                        <div className="popup-bg rounded-md">
                                                            <div className="container mx-auto flex flex-col space-y-5 py-8 lg:px-40 md:px-20 px-6">
                                                                <p className="text-[#009FE3] text-lg futura-bold">Change Email Address</p>
                                                                <form className="flex flex-col space-y-5" onSubmit={sendOTPEmail}>
                                                                    <input onChange={autoComplete} className="bg-transparent p-1 border border-[#009FE3] h-9 rounded-md text-white focus:outline-none  focus:border-[#009FE3]"
                                                                        placeholder="Insert your new Email" id="newemail" />
                                                                    <button disabled={!text} type="submit" className="text-white bg-[#009fe3] button-disabled h-9 futura-book rounded-md" onClick={onAddBtnClick}>Send OTP</button>
                                                                </form>
                                                                {showbutton ? <form className="flex flex-col space-y-5" onSubmit={submitOTPEmail}>
                                                                    <input onChange={autoscdComplete} className="border border-[#009fe3] bg-transparent h-9 rounded-md p-1 text-white" id="otpNumber" placeholder="OTP" />
                                                                    <button onClick={closePopup} disabled={!scdInput} type="submit" className="text-white bg-[#009fe3] button-disabled h-9 futura-book rounded-md">Save</button>
                                                                </form> : null}
                                                                {showbutton ?<p className="flex items-center space-x-2 mb-5"><span className="text-white">Did not receive OTP?</span> <span className="text-[#009FE3]"><OtpTimer
                                                                    minutes={3}
                                                                    seconds={1}
                                                                    text=""
                                                                    ButtonText="Resend Now"
                                                                    resend={resendOTP}
                                                                    onClick={resendOTP}
                                                                    textColor="#009FE3"
                                                                    background="#00000000"
                                                                    buttonColor="#009FE3"
                                                                /></span></p>:null}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </Popup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:w-1/3 md:w-1/3">
                                <div className="flex flex-col space-y-2 text-white">
                                    <p className="text-[#009FE3]">Address</p>
                                    <input
                                        disabled={true}
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={[data.city, data.street]}
                                    />
                                    <input
                                        disabled={true}
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={data.building}
                                    />
                                    <input
                                        disabled={true}
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={data.country?.countryName}
                                    />
                                    {/* <input
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
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
                        <button type="submit" className="bg-[#009FE3] p-2 lg:w-1/6 rounded-md futura-bold mt-5 text-white">UPDATE PROFILE</button>
                        <div className="message">{message ? <p>{message}</p> : null}</div>
                    </div>
                </div>
                {/* </div> */}
            </section>
        </>
    );
}
