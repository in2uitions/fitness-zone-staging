import { Router } from 'next/router';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import dynamic from 'next/dynamic';
import Input from "react-phone-number-input/input-mobile";
import "react-phone-number-input/style.css";
import ReactFlagsSelect from "react-flags-select";
import axios from 'axios';

export default function Login() {

    const [isSent, setIsSent] = useState(false);
    const [isNotSent, setIsNotSent] = useState(false)
    const [value1, setValue1] = useState();
    const thankYouMessage = <h3>Thank you for your submission!</h3>;
    const MEMBER = 'memberId';
    const MOBILE = 'phoneNumber';
    const [selectedTab, setSelectedTab] = useState({});
    const submitmsg = <h3></h3>;
    const router = useRouter()
    const LEBANON = 'LB';
    const UAE = "AE";
    const login_credentials = {
        [LEBANON]: 'Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234',
        [UAE]: 'Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1'
    }
    function handleTabsChange({ event, index }) {
        const object = {
            ...selectedTab,
            [index]: event.target?.value
        }
        const newObject = {};
        Object.keys(object).sort().forEach(function (v, i) {
            newObject[v] = object[v];
        });
        setSelectedTab(newObject);
        const { name, value } = event.target;
        setState({ [name]: value });
    }

    const submitLogIn = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Account/Login?${login_credentials[select]}`,
                    {
                        method: 'POST'
                    }
                );
                const tokenData = await res.json();
                localStorage.setItem('token', tokenData.token);
                const submitLoginForm = async () => {
                    const params = '';
                    const endPoints = '';

                    for (const key in selectedTab) {
                        if (selectedTab[key] != 0 && selectedTab[key] != '') {
                            params = `${key}=${selectedTab[key]}`;
                            endPoints = key
                        }

                    }
                    try {
                        var registraitonLoginData = JSON.stringify({
                            "Country": select,
                            "Phone_member": event.target.phone_member?.value,
                            "Member": event.target.memberId.value,
                            "Phone": event.target.phone.value,
                        });
                        // console.log(registraitonLoginData);
                        var registrationLoginHeaders = new Headers();
                        registrationLoginHeaders.append("Authorization", "Bearer " + tokenData.token);
                        registrationLoginHeaders.append("Content-Type", "application/json");
                        var registrationRequestOptions = {
                            method: 'GET',
                            headers: registrationLoginHeaders
                        };
                        const memberValidation = await fetch(
                            `https://api.fitnessclubapp.com/api/Membership/Member/IsValid?${params}`, registrationRequestOptions);
                        const data = await memberValidation.json();
                        // console.log("testing" , data)
                        const phoneNumber = event.target.phoneNumber.value;
                        const memberId = event.target.memberId.value;
                        // if (data.isValid == false) {
                        //     alert("Wrong Phone Number")
                        // }
                        if (endPoints == MEMBER) {
                            const getMobile = await axios.get
                            (
                                `https://api.fitnessclubapp.com/api/Membership/Member/GetMobile/${selectedTab[endPoints]}`, {
                                    headers:{
                                        Authorization: "Bearer " + tokenData.token
                                    }
                                });
                            const data = getMobile.data;
                            phoneNumber = data;
                            // console.log("test" + phoneNumber)

                        } else if (endPoints == MOBILE) {
                            const getMemberId = await fetch(
                                `https://api.fitnessclubapp.com/api/Membership/Member/IsValid?${params}`, registrationRequestOptions);
                            const data =await getMemberId.json();
                            memberId = data.tranasctionNo
                            // console.log("memberId" + memberId)
                            // phoneNumber = selectedTab[endPoints]
                        }
                        // console.log("phoneeee" , phoneNumber)
                        // console.log("memberrrrr" ,memberId)
                        if (data.isValid == true && phoneNumber && memberId) {
                            // const SendOTPMessage = await fetch(`https://api.fitnessclubapp.com/api/SMS/SendOTPMessage/${phoneNumber}`, registrationRequestOptions);
                            // const data = await SendOTPMessage.json();
                            // setIsSent(true)
                            localStorage.setItem("Country", JSON.stringify(select));
                            localStorage.setItem("Phone", phoneNumber);
                            localStorage.setItem("Member", memberId);
                            // event.target.country.value = '';
                            event.target.phone.value = '';
                            event.target.memberId.value = '';
                            router.push({ pathname: "/login-process/otp", query: { phoneNumber, memberId } })
                        }
                        else {
                            setIsNotSent(true)
                        }
                    } catch (err) {
                        console.log(err);
                    }
                };

                submitLoginForm();

            } catch (err) {
                console.log(err);
            }
        };
        getTokenAPI();


        if (handleFormValidation()) {
            alert("You have been successfully logged in.");
            setState(initialState);
            event.target.value = '';
        }
    };
    const [state, setState] = useState({
        phoneNumber: '',
        formErrors: {}
    })
    const [
        phoneNumberErr, setphoneNumberErr
    ] = useState(formErrors);
    const initialState = state;

    const formErrors = '';
    function handleFormValidation() {
        const { phoneNumber } = state;
        let formErrors = {};
        let formIsValid = true;


        if (!phoneNumber) {
            // formIsValid = false;
            // setphoneNumberErr("Phone number is required.");
        } else {
            var mobPattern = /^((\+?971)|0)?5[024568]\d{7}$/;
            let reg = /^(?:\+961|961)?(1|0?3[0-9]?|[4-6]|70|71|76|78|79|7|81?|9)\d{6}$/;
            if (!mobPattern.test(phoneNumber) && !reg.test(phoneNumber)) {
                formIsValid = false;
                setphoneNumberErr("Invalid phone number.");
            }
            else {
                console.log("isValid")
            }
        }
        setState({ formErrors: formErrors });
        return formIsValid;
    }
    const [select, setSelect] = useState(LEBANON);
    const onSelect = (code) => setSelect(code);
    // console.log("SELECT", select);
    return (
        <div>

            <div className="w-screen h-screen container mx-auto flex flex-col items-center justify-center">
                <div className='flex flex-col justify-center'>
                    <img src="/logo.png" className='w-full h-auto' />

                    <p className="futura-bold text-4xl mt-28 text-[#009FE3]">COUNTRY</p>
                    <form className='w-full flex flex-col' onSubmit={submitLogIn}>
                        {/* <select name='country' id='country' className='border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder'>
                            <option value={LEBANON}>Lebanon</option>
                            <option value={UAE}>UAE</option>
                        </select> */}
                        <ReactFlagsSelect
                        selected={select}
                        onSelect={onSelect}
                        countries={["LB", "AE"]}
                        className="border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder "
                        defaultCountry="LB"
                        customLabels={{"LB": "LEBANON","AE": "UAE"}}
                        id="country"
            />
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
                        <input onChange={(e) => handleTabsChange({ event: e, index: MEMBER })} className="border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder" placeholder="Member ID" id='memberId' />
                        <label className='text-[#009FE3]'>OR</label>
                        {/* <input onChange={(e) => handleTabsChange({ event: e, index: MOBILE })} className="border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder" placeholder="Mobile Number" id='phone' /> */}

                        <input
                            type="input"
                            name="phoneNumber"
                            onChange={(e) => handleTabsChange({ event: e, index: MOBILE })}
                            value={state.phoneNumber}
                            placeholder="Mobile Number" id='phone'
                            className={phoneNumberErr ? " showError border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder" : "border-[#009FE3] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center futura-book bg-black text-white login-placeholder"}
                        />
                        {phoneNumberErr && (
                            <div style={{ color: "red", paddingBottom: 10 }}>
                                {phoneNumberErr}
                            </div>
                        )}
                        <button type='submit' className='bg-[#009FE3] rounded-md p-3 futura-bold text-white'>LOGIN</button>
                        {isSent ? thankYouMessage : submitmsg}

                    </form>
                    <a href="/" className='text-[#009FE3] futura-book mt-4 text-center'>Back to website</a>
                </div>
            </div>
        </div>
    );
}
