import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-magic-slider-dots/dist/magic-dots.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PrivateMenu from "./private-menu";
import moment from "moment";

export default function Dashboard({ style = "white" }) {
    const [data, setData] = useState([]);
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");
    const memberId = localStorage.getItem("Member");
    const itemSet = (localStorage.getItem("token") !== null);
    useEffect(() => {
    if (itemSet) {
        router.push({ pathname: "/account/myProfile"});
    }
    else{
        router.push({ pathname: "/account/login"});
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
                if(response.status == 200){
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
                if(res.status == 200){
                const data = await res.json();
                if (data.isValid == true ) {
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
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/SaveEmail?memberId=${memberId}&email=${event.target.email.value}`,
                    registrationRequestOptions
                );
                if(response.status == 200){
                const emailData = await response.json();
                if (emailData.isValid == true ) {
                    localStorage.setItem("Email", event.target.email.value);
                    // alert("You have changed your Email. Congratulations!")
                }
                else {
                    //alert("Wrong data");
                }
            }
            } catch (err) {
                console.log(err);
            }


            if (data.isValid == true ){
                alert("You have changed your data successfully!")
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
                if(res.status == 200){
                const data = await res.json();
                if (data.isValid == true ) {
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
                if(res.status == 200){
                const data = await res.json();
                if (data.isValid == true ) {
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
                if(response.status == 200){
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
    return (
        <>
           <PrivateMenu/>
            <section>
            <div className="flex flex-col justify-center items-center mt-40">
            <div className="flex space-x-1 border-4 border-[#009FE3] rounded-full w-40 h-40 items-center justify-center">
                            <p className="futura-bold text-6xl text-[#009FE3]">{data.firstName?.charAt(0)}</p>
                            <p className="futura-bold text-6xl text-[#009FE3]">{data.lastName?.charAt(0)}</p>
                        </div>
                        <p className="futura-bold text-[#009FE3] mt-5">{data.fullName}</p>
                        </div>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className=" mx-auto flex flex-col justify-center items-center mt-20">
                        {/* <div className="grid lg:grid-cols-12 gap-x-3 items-start mt-10 space-y-5 lg:space-y-0 md:space-y-0"> */}
                        <div className="w-full container mx-auto lg:flex lg:flex-row md:flex lg:space-x-3 md:space-x-3 justify-center items-start space-y-5 lg:space-y-0 md:space-y-0 px-4 lg:px-4 md:px-4">

                            <div className="flex flex-col lg:w-1/3 md:w-1/3">

                                <div className="flex flex-col space-y-2">

                                    <p className="text-[#009FE3]">General Info</p>
                                    <input
                                        disabled = {true}
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        value={data.firstName}
                                    />
                                    <input
                                        disabled = {true}
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        value={data.lastName}
                                    />
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black lg:h-10 md:h-10 h-16 rounded-md p-1">
                                        <input
                                            type="date"
                                            disabled ={true} 
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] text-white"
                                            value={moment(data.birthdate).format("YYYY-MM-DD")} id="birthdate"
                                            onChange={handleChange}
                                        />
                                        {/* <button
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2 text-white"
                                            onClick={() => {
                                                toggle(!state);
                                                handleChange;
                                            }}
                                            onSubmit={state ? handleSubmitBirthDate : () => {}}
                                        >
                                            {state ? "CHANGE DOB" : "SAVE"}
                                        </button> */}
                                    </div>
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black rounded-md lg:h-10 md:h-10 h-16 p-1 text-white">
                                        <input
                                            type="text"
                                            disabled = {scdstate}
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3]"
                                            value={data.mobile} id="mobile"
                                            onChange={handleChange}
                                        />
                                        <button
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2"
                                            onClick={() => {
                                                scdtoggle(!scdstate);
                                                handleChange;
                                            }}
                                            onSubmit={scdstate ? handleSubmitPhoneNumer : () => {}}
                                        >
                                            {scdstate ? "CHANGE PHONE" : "SAVE"}
                                        </button>
                                    </div>
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black lg:h-10 md:h-10 h-16 p-1 rounded-md text-white">
                                        <input
                                            type="text"
                                            disabled = {thirdstate}
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3]"
                                            value={data.email} id="email"
                                            onChange={handleChange}
                                        />
                                        <button type="submit"
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2"
                                            onClick={() => {
                                                thirdtoggle(!thirdstate);
                                                handleChange;
                                            }}
                                            onSubmit={thirdstate ? handleSubmitEmail : () => {}}
                                        >
                                            {thirdstate ? "CHANGE EMAIL" : "SAVE"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:w-1/3 md:w-1/3">
                                <div className="flex flex-col space-y-2 text-white">
                                    <p className="text-[#009FE3]">Address</p>
                                    <input
                                        disabled = {true}
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={[data.city, data.street]}
                                    />
                                    <input
                                        disabled = {true}
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={data.building}
                                    />
                                    <input
                                        disabled = {true}
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
                </form>
                {/* </div> */}
            </section>
        </>
    );
}
