
import Router, { useRouter } from "next/router";
import OtpTimer from "otp-timer";

export default function Otp() {
    const { query } = useRouter()
    const router = useRouter()
    const submitOTP = async event => {
        event.preventDefault();

        const getTokenAPI = async () => {
            try {
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/SMS/ValidateOTP?mobileNumber=${query.phoneNumber}&otpNumber=${event.target.otp.value}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                console.log(data + "otp")
                if (data.isValid = true) {
                    router.push({ pathname: "/login-process/dashboard" })
                }
                else {
                    alert("Wrong OTP");
                }

            } catch (err) {
                console.log(err);
            }
        };
        getTokenAPI();
    };
    const submit = () => {

        const getTokenAPI = async () => {
            try {
                var registrationHeaders = new Headers();
                registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
                registrationHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationHeaders
                };
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/SMS/SendOTPMessage/${query.phoneNumber}`,
                    registrationRequestOptions
                );
                const data = await res.json();
                console.log(data + "otp")
                // if (data.isValid = true) {
                //     router.push({ pathname: "/dashboard" })
                // }
                // else {
                //     alert("Wrong OTP");
                // }

            } catch (err) {
                console.log(err);
            }
        };
        getTokenAPI();
        // console.log("button clicked");
    };
    return (
        <div>

            <div className="w-screen h-screen container mx-auto flex flex-col items-center justify-center">
                <div className='flex flex-col justify-center '>
                    <img src="/logo.png" className='w-full h-auto' />

                    <p className="futura-book text-xl mt-28 mb-5 text-white">We have sent you an OTP to proceed with your login process.</p>
                    <p className="flex items-center space-x-2 mb-5"><span>Did not receive OTP?</span> <span className="text-[#009FE3]"><OtpTimer
                        // minutes={2}
                        seconds={3}
                        text=""
                        ButtonText="Resend Now"
                        resend={submit}
                        onClick={submit}
                        textColor="#009FE3"
                        background="#00000000"
                        buttonColor="#009FE3"
                    /></span></p>

                    <label className="text-[#009FE3] futura-bold">ENTER OTP</label>
                    <form onSubmit={submitOTP}>
                        <input className="border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder" id="otp" placeholder="OTP" />
                        <button type="submit" className="bg-[#009FE3] w-full p-3 rounded-md futura-bold text-center items-center">SUBMIT OTP</button>
                    </form>
                    <a href="/login-process/login" className='text-[#009FE3] futura-book mt-4 text-center'>Back to login</a>
                </div>
            </div>
        </div>
    );
}


