
import Router, { useRouter } from "next/router";
import OtpTimer from "otp-timer";
import { useEffect } from "react";
import Cookies from 'js-cookie'

export default function Otp() {
    const { query } = useRouter()
    const router = useRouter()
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined)
    useEffect(() => {
    if (itemSet) {
        router.push({ pathname: "/account/otp"});
    }
    else{
        router.push({ pathname: "/account/login"});
    }
}, [])
const phone = Cookies.get("Phone")
    const submitOTP = async event => {
        event.preventDefault();

        const getValidOtp = async () => {
            try {
                var registraitonRawData = JSON.stringify({
                    "OTP": event.target.otp?.value
                });
                // console.log(registraitonRawData);
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/SMS/ValidateOTP?mobileNumber=${phone}&otpNumber=${event.target.otp.value}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                if (data.isValid == true) {
                    Cookies.set("OTP", event.target.otp.value);
                    // Cookies.set("Country", JSON.stringify(event.target.country.value));
                    // Cookies.set("Phone", phoneNumber);
                    // Cookies.set("Member", JSON.stringify(event.target.member.value));
                    router.push({ pathname: "/account/dashboard" })
                }
                else {
                    alert("Wrong OTP");
                }

            } catch (err) {
                console.log(err);
            }
        };
        getValidOtp();
    };
    
    const resendOTP = () => {

        const getOTP = async (event) => {
            try {
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/SMS/SendOTPMessage/${phone}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                if (data.isValid == true) {
                    // router.push({ pathname: "/account/dashboard" })
                    const res = await fetch(
                        `https://api.fitnessclubapp.com/api/SMS/ValidateOTP?mobileNumber=${phone}&otpNumber=${event.target.otp.value}`,
                        registrationRequestOptions
                    );
                    const data = await res.json();
                if (data.isValid == true) {
                    Cookies.set("OTP", JSON.stringify(event.target.otp.value));
                    // Cookies.set("Country", JSON.stringify(event.target.country.value));
                    // Cookies.set("Phone", phoneNumber);
                    // Cookies.set("Member", JSON.stringify(event.target.member.value));
                    router.push({ pathname: "/account/dashboard" })
                }
                else {
                    alert("Wrong OTP");
                }
                }
                else {
                    alert("Wrong OTP");
                }

            } catch (err) {
                console.log(err);
            }
        };
        getOTP();
        // console.log("button clicked");
    };
    return (
        <div>

            <div className="w-screen h-screen container mx-auto flex items-center justify-center">
            <div className="lg:w-1/2"></div>
                <div className='flex flex-col justify-center px-5 lg:px-0 md:px-0'>
                    {/* <img src="/fitnessZoneLogo.png" className='w-full h-auto' /> */}

                    <p className="futura-book text-xl mt-28 mb-5 text-white">We have sent you an OTP to proceed with your login process.</p>
                    <p className="flex items-center space-x-2 mb-5"><span className="text-white">Did not receive OTP?</span> <span className="text-[#009FE3]"><OtpTimer
                        minutes={2}
                        seconds={1}
                        text=""
                        ButtonText="Resend Now"
                        resend={resendOTP}
                        onClick={resendOTP}
                        textColor="#009FE3"
                        background="#00000000"
                        buttonColor="#009FE3"
                    /></span></p>

                    <label className="text-[#009FE3] futura-bold">ENTER OTP</label>
                    <form onSubmit={submitOTP}>
                        <input
                            maxlength="6" type="input" className="border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder" id="otp" placeholder="OTP" />
                        <button type="submit" className="bg-[#009FE3] w-full p-3 rounded-md futura-bold text-center items-center text-white">SUBMIT OTP</button>
                    </form>
                    <a href="/account/login" className='text-[#009FE3] futura-book mt-4 text-center'>Back to login</a>
                </div>
                <div className="lg:w-1/2"></div>
            </div>
        </div>
    );
}


