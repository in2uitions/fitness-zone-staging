/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Router } from "next/router";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactFlagsSelect from "react-flags-select";
import axios from "axios";
import Cookies from "js-cookie";
import nextConfig from "../../../next.config";
import HeaderContent from "../../components/header-components";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import DarkTheme from "../../layouts/Dark";
import Head from "next/head";

export default function Login() {
    const [isSent, setIsSent] = useState(false);
    const [isNotSent, setIsNotSent] = useState(false);
    const [old, setOld] = useState(0)
    const [value1, setValue1] = useState();
    const [books, setBooks] = useState(true)
    const thankYouMessage = <h3>Thank you for your submission!</h3>;
    const MEMBER = "memberId";
    const MOBILE = "phoneNumber";
    const [selectedTab, setSelectedTab] = useState({});
    const submitmsg = <h3></h3>;
    const router = useRouter();
    const LEBANON = "LB";
    const UAE = "AE";
    const [select, setSelect] = useState(LEBANON);
    const login_credentials = {
        [LEBANON]: "Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234",
        [UAE]: "Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1",
    };
    const countryCodeNumber = {
        [LEBANON]: "961",
        [UAE]: "971",
    };
    const [input, setInput] = useState("");

    function handleTabsChange({ event, index }) {
        let inputValue = event.target?.value;
        if (index === MOBILE) {
            // console.log({ cond: event.target?.value.startsWith(countryCodeNumber[select] + '03'), select: countryCodeNumber[select] + '03', value: event.target?.value })
            if (inputValue.startsWith(countryCodeNumber[select] + '03')) {
                inputValue = inputValue.replace('0', "");
            }
            setValue1(inputValue)
        }
        const object = {
            ...selectedTab,
            [index]: inputValue,
        };
        const newObject = {};
        Object.keys(object)
            .sort()
            .forEach(function (v, i) {
                newObject[v] = object[v];
            });
        setSelectedTab(newObject);
        const { name, value } = event.target;
        setState({ [name]: value });

    }

    const submitLogIn = async (event) => {
        event.preventDefault();
        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Account/Login?${login_credentials[select]}`,
                    {
                        method: "POST",
                    }
                );
                const tokenData = await res.json();
                Cookies.set("token", tokenData.token, { expires: 1 });
                const submitLoginForm = async () => {
                    const params = "";
                    const endPoints = "";

                    for (const key in selectedTab) {
                        if (selectedTab[key] != 0 && selectedTab[key] != "") {
                            params = `${key}=${selectedTab[key]}`;
                            endPoints = key;
                        }
                    }
                    console.log(selectedTab)
                    try {
                        console.log(value1)
                        var registraitonLoginData = JSON.stringify({
                            Country: select,
                            Phone_member: event.target.phone_member?.value,
                            Member: event.target.memberId.value,
                            // Phone: event.target.phone.value.replace(/-| /g, ''),
                            Phone: value1,
                        });
                        console.log(registraitonLoginData);
                        var registrationLoginHeaders = new Headers();
                        registrationLoginHeaders.append(
                            "Authorization",
                            "Bearer " + tokenData.token
                        );
                        registrationLoginHeaders.append("Content-Type", "application/json");
                        var registrationRequestOptions = {
                            method: "GET",
                            headers: registrationLoginHeaders,
                        };
                        const memberValidation = await fetch(
                            `https://api.fitnessclubapp.com/api/Membership/Member/IsValid?${params.replace(/-| /g, '')}`,
                            registrationRequestOptions
                        );
                        const data = await memberValidation.json();

                        // console.log("testing", data)
                        // const phoneNumber = event.target.phoneNumber.value.replace(/-| /g, '');
                        const phoneNumber = value1;
                        const memberId = event.target.memberId.value;
                        console.log('tt', phoneNumber)
                        // if (data.isValid == false) {
                        //     alert("Wrong Phone Number")
                        // }
                        if (endPoints == MEMBER) {
                            const getMobile = await axios.get(
                                `https://api.fitnessclubapp.com/api/Membership/Member/GetMobile/${selectedTab[endPoints]}`,
                                {
                                    headers: {
                                        Authorization: "Bearer " + tokenData.token,
                                    },
                                }
                            );
                            const data = getMobile.data;
                            phoneNumber = data.toString();

                            // phoneNumber = phoneNumber.replace("-", "");
                            // phoneNumber = phoneNumber.replace(" ", "");
                            const mapObj = {
                                " ": "",
                                "-": "",
                            };
                            phoneNumber = phoneNumber.replace("+", "")
                            // console.log("test" + phoneNumber)
                        } else if (endPoints == MOBILE) {
                            const getMemberId = await fetch(
                                `https://api.fitnessclubapp.com/api/Membership/Member/IsValid?${params.replace(/-| /g, '')}`,
                                registrationRequestOptions
                            );
                            const data = await getMemberId.json();
                            memberId = data.tranasctionNo;
                            // console.log("memberId" + memberId)
                            // phoneNumber = selectedTab[endPoints]
                        }
                        // console.log("phoneeee" , phoneNumber)
                        // console.log("memberrrrr" ,memberId)

                        const response = await fetch(
                            `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                            registrationRequestOptions
                        );
                        const fetchedData = await response.json();
                        setBooks(fetchedData);
                        // console.log(fetchedData.status.statusDescription)



                        if (data.isValid == true && phoneNumber && memberId && fetchedData.status.statusDescription != "Blocked") {
                            if (Cookies.get("Member") != null || Cookies.get("Member") != undefined) {
                                alert("you have already submitted your otp!")
                                router.push({
                                    pathname: "/account/otp"
                                });
                            }
                            else {
                                const SendOTPMessage = await fetch(
                                    `https://api.fitnessclubapp.com/api/SMS/SendOTPMessage/${phoneNumber}`,
                                    registrationRequestOptions
                                );
                                const data = await SendOTPMessage.json();
                                setIsSent(true);
                                Cookies.remove("Country");
                                Cookies.remove("Phone");
                                Cookies.remove("Member");
                                Cookies.set("Country", select);
                                Cookies.set("Phone", phoneNumber.replace(/-| /g, ''));
                                Cookies.set("Member", memberId);
                                // event.target.country.value = '';
                                // event.target.phone.value = "";
                                event.target.memberId.value = "";
                                router.push({
                                    pathname: "/account/otp",
                                    query: { phoneNumber, memberId },
                                });
                            }
                        }
                        else if (fetchedData.status.statusDescription === "Blocked") {
                            alert("Kindly note that your account is no longer active. For more info, kindly send us an email to info@fitnesszone.com.lb")
                        }
                        else {
                            setIsNotSent(true);
                            alert(
                                "You should contact the admin in order to register your phone number."
                            );
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

        // if (handleFormValidation()) {
        //     // alert("You have been successfully logged in.");
        //     setState(initialState);
        //     event.target.value = "";
        // }
    };
    const [state, setState] = useState({
        phoneNumber: "",
        formErrors: {},
    });

    // const [phoneNumberErr, setphoneNumberErr] = useState(formErrors);
    const formErrors = "";
    const initialState = state;


    // function handleFormValidation() {
    //     const { phoneNumber } = state;
    //     // phoneNumber = phoneNumber.replace("-", "");
    //     // phoneNumber = phoneNumber.replace(" ", "");
    //     let formErrors = {};
    //     let formIsValid = true;

    //     if (!phoneNumber) {
    //         // formIsValid = false;
    //         // setphoneNumberErr("Phone number is required.");
    //     } else {
    //         var mobPattern = /^((\+?971)|0)?5[024568]\d{7}$/;
    //         let reg =
    //             /^(?:\+961|961)?(1|0?3[0-9]?|[4-6]|70|71|76|78|79|7|81?|9)\d{6}$/;
    //         if (!mobPattern.test(phoneNumber.replace(/-| /g, '')) && !reg.test(phoneNumber.replace(/-| /g, ''))) {
    //             formIsValid = false;
    //             setphoneNumberErr("Invalid phone number.");
    //             console.log('sss',state)
    //         } else {
    //             // console.log("isValid")
    //         }
    //     }
    //     setState({ formErrors: formErrors });
    //     return formIsValid;
    // }

    const onSelect = (code) => {
        setSelect(code);
        setInput("")
        // console.log(code)

    }
    // console.log('', select)
    useEffect(() => {
        if (nextConfig.country_code == "AE") {
            setSelect(UAE);
        }
        else if (nextConfig.country_code == "LB") {
            setSelect(LEBANON);
        }

    }, []);
    const limit = 11;
    const limitnb = 90;
    return (
        <DarkTheme>
        <div>
        <Head>
        <script src="https://cdn.tailwindcss.com"/>
        </Head>
            {/* <HeaderContent /> */}
            <div style={{backgroundImage:'url("/PrivateArea.jpg")', objectFit:"cover", backgroundRepeat:"no-repeat"}}>
            <div className="w-screen h-screen container mx-auto flex flex-col items-center justify-center"
            // style={{width:"100vw", height:"100vh", marginLeft:"auto", marginRight:"auto", display:"flex", flexDirection:"column" , alignItems:"center", justifyContent:"center"}}
            >
                <div className="flex flex-col justify-center"
                style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    {/* <img src="/logo.svg" className='w-full h-auto' /> */}

                    <p className="font-bold text-4xl mt-28 text-[#008DDC] hi" style={{fontFamily:"'Montserrat', sans-serif", fontWeight:"900"}}>COUNTRY</p>
                    <form className="w-full flex flex-col" onSubmit={submitLogIn}>
                        {/* <select name='country' id='country' className='border-[#008DDC] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center montserrat-book bg-black text-white login-placeholder'>
                            <option value={LEBANON}>Lebanon</option>
                            <option value={UAE}>UAE</option>
                        </select> */}
                        <ReactFlagsSelect
                            selected={select}
                            onSelect={onSelect}
                            countries={["LB", "AE"]}
                            className="border-[#008DDC] h-12 border-2 p-2 my-4 rounded flex justify-center items-center montserrat-book bg-black text-white login-placeholder w-80"
                            defaultCountry="LB"
                            customLabels={{ LB: "LEBANON", AE: "UNITED ARAB EMIRATES" }}
                            id="country"
                        />

                        {/* <pre>
                            {value1 && isValidPhoneNumber(value1) ? "Your phone number is valid" : ""}
                        </pre> */}
                        <input
                            onChange={(e) => handleTabsChange({ event: e, index: MEMBER })}
                            className="border-input h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center montserrat-book bg-black text-white login-placeholder"
                            style={{borderColor:"#008DDC"}}
                            placeholder="Member ID"
                            id="memberId"
                            maxLength="11"
                            type="input"
                        />
                        <label className="text-[#008DDC] font-bold or-label">OR</label>
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
                            // onChange={setValue1}
                            // onSelect={(e) => handleTabsChange({ event: e, index: MOBILE })}
                            onChange={(e) => handleTabsChange({ event: { target: { value: e } }, index: MOBILE })}
                            addInternationalOption={false}
                            placeholder="Mobile Number" className="border-[#008DDC] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center montserrat-book bg-black text-white login-placeholder" id='phone'
                        />
                        {/* <input onChange={(e) => handleTabsChange({ event: e, index: MOBILE })} className="border-[#008DDC] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center montserrat-book bg-black text-white login-placeholder" placeholder="Mobile Number" id='phone' /> */}

                        {/* <input
                            type="input"
                            name="phoneNumber"
                            onChange={(e) => handleTabsChange({ event: e, index: MOBILE })}
                            value={input}
                            placeholder="Mobile Number"
                            id="phone"
                            onInput={(event) => {
                                event.preventDefault();
                                setInput(event.target.value);
                                if (select == LEBANON) {
                                    setInput(event.target.value.slice(0, limitnb));
                                    // event.preventDefault();
                                    if (event.target.value.length === 3 && event.target.value.includes("-")) {
                                        setInput(event.target.value.replace("-", ""));
                                    }
                                    if (event.target.value.length === 2) {
                                        setInput(event.target.value + "-");
                                    }
                                    // else if (event.target.value.length >= 10) {
                                    //     setphoneNumberErr("Invalid phone number.");
                                    // }
                                }
                                else if (select == UAE) {
                                    setInput(event.target.value.slice(0, limit));
                                    if (old < event.target.value.length) {
                                        if (event.target.value.length === 6) {
                                            setInput(event.target.value + " ");
                                        }
                                        if (event.target.value.length === 7 &&
                                            event.target.value.includes(" ")
                                        ) {
                                            setInput(event.target.value.replaceAll(" ", ""));
                                        }
                                        if (event.target.value.length === 3 &&
                                            event.target.value.includes(" ")
                                        ) {
                                            setInput(event.target.value.replaceAll(" ", ""));
                                        }
                                        if (event.target.value.length === 2) {
                                            setInput(event.target.value + " ");
                                        }

                                        // if (event.target.value.length >= 12) {
                                        //     setphoneNumberErr("Invalid phone number.");
                                        // }
                                    } else {
                                        setInput(event.target.value)
                                    }

                                    setOld(event.target.value.length)
                                }

                            }

                            }
                            className={
                                phoneNumberErr
                                    ? " showError border-[#008DDC] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center montserrat-book bg-black text-white login-placeholder"
                                    : "border-[#008DDC] h-12 border-2 p-2 my-4 w-full rounded flex justify-center items-center montserrat-book bg-black text-white login-placeholder"
                            }
                        /> */}
                        {/* {phoneNumberErr && (
                            <div style={{ color: "red", paddingBottom: 10 }}>
                                {phoneNumberErr}
                            </div>
                        )} */}
                        {/* <input
                            value={input}
                            onChange={(event) => {
                                setInput(event.target.value);
                                if (select == LEBANON) {
                                    if (event.target.value.length === 3 && event.target.value.includes("-")) 
                                    {
                                        setInput(event.target.value.replace("-", ""));
                                    }
                                    if (event.target.value.length === 2) {
                                        setInput(event.target.value + "-");
                                    }
                                }
                                else if (select == UAE) {
                                    if (
                                        event.target.value.length === 7 || event.target.value.length === 3 &&
                                        event.target.value.includes(" ")
                                    ) {
                                        setInput(event.target.value.replace(" ", ""));
                                    }
                                    if (event.target.value.length === 6 || event.target.value.length === 2) {
                                        setInput(event.target.value + " ");
                                    }
                                    // if (event.target.value.length === 3 && 
                                    //     event.target.value.includes(" ")
                                    // ) {
                                    //     setInput(event.target.value.replace(" ", ""));
                                    // }
                                    // if (event.target.value.length === 2) {
                                    //     setInput(event.target.value + " ");
                                    // }
                                    console.log(input)
                                    
                                }
                            }

                            }
                        /> */}
                        <button
                            type="submit"
                            className="bg-blue rounded-md p-3 font-bold text-white h-12"
                        >
                            LOGIN
                        </button>
                        {isSent ? thankYouMessage : submitmsg}
                    </form>
                    <a href="/" className="text-[#008DDC] montserrat-book mt-4 text-center">
                        Back to website
                    </a>
                </div>
            </div>
            </div>
        </div>
        </DarkTheme>
    );
}

