import { Router } from 'next/router';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PhoneInput, {
    isPossiblePhoneNumber,
    isValidPhoneNumber,
    formatPhoneNumberIntl,
    parsePhoneNumber
} from "react-phone-number-input";
import Input from "react-phone-number-input/input-mobile";
import "react-phone-number-input/style.css";

export default function Login() {
    const [isSent, setIsSent] = useState(false);
    const [isNotSent, setIsNotSent] = useState(false)
    // const [value, setvalue] = useState();
    const [value1, setValue1] = useState();
    const thankYouMessage = <h3>Thank you for your submission!</h3>;
    const MEMBER = 'memberId';
    const MOBILE = 'phoneNumber';
    const [selectedTab, setSelectedTab] = useState({});
    const submitmsg = <h3></h3>;
    const router = useRouter()
    const LEBANON = 'lebanon';
    const UAE = "uae";
    const login_credentials = {
        [LEBANON]: 'Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234',
        [UAE]: 'Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1'
    }
    function handleTabsChange({ event, index }) {
        const object = {
            ...selectedTab,
            [index]: event.target?.value
        }
        console.log(event.target?.value + "test")
        const newObject = {};
        Object.keys(object).sort().forEach(function (v, i) {
            newObject[v] = object[v];
        });
        setSelectedTab(newObject);
    }

    const submitLogIn = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Account/Login?${login_credentials[event.target.country.value]}`,
                    {
                        method: 'POST'
                    }
                );
                const tokenData = await res.json();
                localStorage.setItem('token', tokenData.token);
                const submitContactForm = async () => {
                    const params = '';
                    const apiEndPoint = '';

                    for (const key in selectedTab) {
                        if (selectedTab[key] != 0 && selectedTab[key] != '') {
                            params = `${key}=${selectedTab[key]}`;
                            apiEndPoint = key
                        }

                    }
                    console.log(apiEndPoint)
                    try {
                        var registraitonRawData = JSON.stringify({
                            "Country": event.target.country?.value,
                            "Phone_member": event.target.phone_member?.value,
                            "Member": event.target.member.value,
                            "Phone": event.target.phone.value,
                        });
                        console.log(registraitonRawData);
                        var registrationHeaders = new Headers();
                        registrationHeaders.append("Authorization", "Bearer " + tokenData.token);
                        registrationHeaders.append("Content-Type", "application/json");
                        var registrationRequestOptions = {
                            method: 'GET',
                            headers: registrationHeaders
                        };
                        const res = await fetch(
                            `https://api.fitnessclubapp.com/api/Membership/Member/IsValid?${params}`, registrationRequestOptions);
                        const data = await res.json();
                        console.log(data);
                        const phoneNumber = '';
                        if (data.isValid != true) {
                            alert("The member does not exist in our database")
                        }
                        if (apiEndPoint == MEMBER) {
                            var registrationRequestOptions = {
                                method: 'GET',
                                headers: registrationHeaders,
                            };
                            const res = await fetch(
                                `https://api.fitnessclubapp.com/api/Membership/Member/GetMobile/${selectedTab[apiEndPoint]}`, registrationRequestOptions);
                            const data = await res.json();
                            phoneNumber = data;

                        } else if (apiEndPoint == MOBILE) {
                            phoneNumber = selectedTab[apiEndPoint]
                        }
                        if (data.isValid == true && phoneNumber) {
                            const res = await fetch(`https://api.fitnessclubapp.com/api/SMS/SendOTPMessage/${phoneNumber}`, registrationRequestOptions);
                            const data = await res.json();
                            setIsSent(true)
                            localStorage.setItem("Country", JSON.stringify(event.target.country.value));
                            localStorage.setItem("Phone", phoneNumber);
                            localStorage.setItem("Member", JSON.stringify(event.target.member.value));
                            event.target.country.value = '';
                            event.target.phone.value = '';
                            event.target.member.value = '';
                                router.push({ pathname: "/login-process/otp", query: { phoneNumber } })
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
        <div>

            <div className="w-screen h-screen container mx-auto flex flex-col items-center justify-center">
                <div className='flex flex-col justify-center'>
                    <img src="/logo.png" className='w-full h-auto' />

                    <p className="futura-bold text-4xl mt-28 text-[#009FE3]">COUNTRY</p>
                    <form className='w-full flex flex-col' onSubmit={submitLogIn}>
                        <select name='country' id='country' className='border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder'>
                            <option value={LEBANON}>Lebanon</option>
                            <option value={UAE}>UAE</option>
                        </select>

                        {/* <PhoneInput
                            international={false}
                            countryCallingCodeEditable={true}
                            defaultCountry="LB"
                            countries={["LB", "AE"]}
                            countrySelectProps={{ unicodeFlags: true }}
                            value={value1}
                            onSelect={(e) => handleTabsChange({ event: e, index: MOBILE })}
                            onChange={setValue1}
                            addInternationalOption={false}
                            placeholder="Mobile Number" className="border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder" id='phone'
                        />
                        <pre>
                            {value1 && isValidPhoneNumber(value1) ? "Your phone number is valid" : ""}
                        </pre> */}
                       
                        <input onChange={(e) => handleTabsChange({ event: e, index: MEMBER })} className="border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder" placeholder="Member ID" id='member' />
                        <label className='text-[#009FE3]'>OR</label>
                        <input onChange={(e) => handleTabsChange({ event: e, index: MOBILE })} className="border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder" placeholder="Mobile Number" id='phone' />
                        <button type='submit' className='bg-[#009FE3] rounded-md p-3 futura-bold'>LOGIN</button>
                        {isSent ? thankYouMessage : submitmsg}
                    </form>
                    <a href="/" className='text-[#009FE3] futura-book mt-4 text-center'>Back to website</a>
                </div>
            </div>
        </div>
    );
}



