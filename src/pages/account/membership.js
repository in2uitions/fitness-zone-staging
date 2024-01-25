import Slider from "react-slick";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PrivateMenu from "./private-menu";
import Cookies from "js-cookie";
import { BrowserView, MobileView } from "react-device-detect";
import moment from "moment";
import DarkTheme from "../../layouts/Dark";

export default function Membership({ style = "white", data }) {
    const memberId = Cookies.get("Member");
    const [test, setTest] = useState([]);
    const [state, toggle] = useState(true);
    const itemSet =
        Cookies.get("token") != null || Cookies.get("token") != undefined;
    const tokenSet = Cookies.get("OTP") != null;
    useEffect(() => {
        if (itemSet && tokenSet) {
            router.push({ pathname: "/account/membership" });
        } else {
            router.push({ pathname: "/account/login" });
        }
    }, []);
    try {
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
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/membership/member/PaymentListItem/${memberId}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const membership = await response.json();
                    setTest(membership);
                }
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    const [noOfElements, setnoOfElements] = useState(4);
    const slice = test.slice(0, noOfElements);
    const loadMoreLess = () => {
        if (noOfElements == 4) {
            setnoOfElements(test.length);
        } else {
            setnoOfElements(4);
        }
    };
    function dateButif(d) {
        const newd = new Date(d).toLocaleDateString("en-UG", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        return newd;
    }

    function dateButif(d) {
        const newd = new Date(d)
            .toLocaleDateString("en-UG", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            .replaceAll("/", "-");
        return newd;
    }
    // console.log({data})
    // const buttonRef = useRef(null);

    // var btn = $('#buttonss');

    // $(window).on("scroll", function () {
    //     if ($(window).scrollTop() > 300) {
    //         // btn.addClass('show');
    //         buttonRef.current.style.display = "block"

    //     } else if(($(window).scrollTop() == 0)){
    //         buttonRef.current.style.display = "none"
    //     }
    // });
    const router = useRouter();
    // const onSubmitForm = async event => {
    //     event.preventDefault();
    //     const getTokenAPI = async () => {
    //         localStorage.clear();
    //         router.push({ pathname: "/account/login"});
    //     };
    //     getTokenAPI();

    // };
    const [userReasons, setUserReasons] = useState([])
    try {
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
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Administration/CancellationReason/List`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const userReasons = await response.json();
                    setUserReasons(userReasons);
                }
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    const [requestMessage, setRequestMessage] = useState("");
    function sendReason() {
        const dropdown = document.getElementById("cancel-request");
        const selectedValue = dropdown.options[dropdown.selectedIndex].value;
        const getVisitorLocationAPI = async () => {
            try {
                const res = await fetch(
                    `https://ipapi.co/json/`
                );
                const code = await res.json();
                if (code.country_code == 'LB') {
                    fetch('https://fzcms.diastora.com/items/lebanon_cancel_requests', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ cancel_request: selectedValue, date: selectedDate, member_id: memberId, name: data.firstName, last_name: data.lastName, email: data.email, phone_number: data.mobile , location: data.membershipLocation.locationName})
                    })
                        .then(response => {
                            if (response.ok) {
                                setTimeout(() => {
                                    setRequestMessage('Request successfully sent')
                                }, 100);
                                //     setTimeout( () => {
                                //     setIsPopupOpen(!isPopupOpen)
                                // }, 1000 );
                                setRequestMessage(' ')

                            } else {
                                console.error('Request failed');
                            }
                        })
                        .catch(error => {
                            console.error('Request failed', error);
                        });
                } else if (code.country_code == 'AE') {
                    fetch('https://fzcms.diastora.com/items/uae_cancel_requests', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ cancel_request: selectedValue, date: selectedDate, member_id: memberId, name: data.firstName, last_name: data.lastName, email: data.email, phone_number: data.mobile, location: data.membershipLocation.locationName })
                    })
                        .then(response => {
                            if (response.ok) {
                                setTimeout(() => {
                                    setRequestMessage('Request successfully sent')
                                }, 100);
                                //     setTimeout( () => {
                                //     setIsPopupOpen(!isPopupOpen)
                                // }, 1000 );
                                setRequestMessage(' ')
                            } else {
                                console.error('Request failed');
                            }
                        })
                        .catch(error => {
                            console.error('Request failed', error);
                        });
                }
            } catch (err) {
                console.log(err);
            }
        };

        getVisitorLocationAPI();

    }
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM'));

    function handleDateChange(event) {
        setSelectedDate(event.target.value);
    }
    const [showCancel, setShowButtonCancel] = useState(true);
    try {
        useEffect(() => {
        if (data.membershipType.duration != "6" && data.membershipType.duration != "12") {
            setShowButtonCancel(true);
        }
        else(
            setShowButtonCancel(false)
        )
    }, []);
    } catch (err) {
        console.log(err);
    }

    return (
        <>
            {/* <div className={styles.container}>
                <nav className={styles.nav}>
                    <a href="/">
                        <img src="/logo.svg" className="logo" />
                    </a>
                    <Popup
                        trigger={
                            <div className="flex items-center space-x-2">
                                <button className="img-btn">
                                    <img src="/blue-rectangle.svg" className="menu-icon" />
                                </button>
                                <p className="font-bold text-white futura-book cursor-pointer">
                                    Menu
                                </p>
                            </div>
                        }
                        modal
                        closeOnDocumentClick
                        position=""
                    >
                        <div className="w-screen h-screen container mx-auto flex flex-col justify-center items-center">
                            <a href="/account/dashboard" className="flex space-x-1 border-4 border-[#008DDC] rounded-full w-40 h-40 items-center justify-center">
                            <p className="font-bold text-6xl text-[#008DDC]">{data.firstName?.charAt(0)}</p>
                            <p className="font-bold text-6xl text-[#008DDC]">{data.lastName?.charAt(0)}</p>
                            </a>
                            <p className="font-bold text-[#008DDC] mt-5">{data.fullName}</p>
                            <div className="flex flex-col mt-10">
                                <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a
                                        href="/account/myProfile"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        {" "}
                                        My Profile
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a href='/account/membership' className="futura-book menu-member flex items-center justify-between">
                                        Membership Settings
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                </div>
                                <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a href="/account/classListing" className="futura-book menu-member flex items-center justify-between text-white">
                                        Classes / Book a class
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a href='/account/trainers' className="futura-book menu-member flex items-center justify-between">
                                        Trainers / Book a package
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                </div>
                                <form onSubmit={onSubmitForm}>
                                    <div className="flex justify-center items-center">
                                        <button type="submit" className="text-white border-2 border-[#008DDC] w-1/2 mt-5 p-2 futura-book">Log Out</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Popup>
                </nav>
            </div> */}
            <PrivateMenu />
            <DarkTheme>
            <section>
                <div className="container lg:px-28 md:px-20 px-3 mx-auto flex flex-col justify-center mt-40" style={{marginBottom:"2rem"}}>
                    <div className="flex flex-col justify-center items-center">
                        <img src="/homepage/gold-member.png" style={{width:"130px"}}/>
                        <p className="font-bold text-white" style={{marginTop:"1.25rem", fontSize:"18px"}}>
                            {data.membershipType?.memberShipTypeName.slice(
                                0,
                                data.membershipType?.memberShipTypeName.length - 1
                            )}
                        </p>
                    </div>
                    <div className=" flex gap-x-1 justify-evenly items-center px-3 lg:px-0 md:px-0 mobile-flex-col" style={{marginTop:"2.5rem"}}>
                        <div className="col-span-6">
                            <div className="flex flex-col">
                                <p className="text-sm text-white ">Status</p>
                                <p className=" text-white uppercase font-bold"  style={{fontSize:"18px", marginTop:"0.5rem"}}>
                                    {data.status?.statusDescription}
                                </p>
                            </div>
                            <div className="flex flex-col" style={{marginTop:"1.25rem"}}>
                                <p className="text-sm text-white">Start Date</p>
                                <p className=" text-white font-bold" style={{fontSize:"18px", marginTop:"0.5rem"}}>
                                    {dateButif(data.startDate)}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col">
                                <p className="text-sm text-white">Default Club</p>
                                <p className="font-bold text-white " style={{fontSize:"18px", marginTop:"0.5rem"}}>
                                    {data.membershipLocation?.locationName}
                                </p>
                            </div>
                            <div className="flex flex-col" style={{marginTop:"1.25rem"}}>
                                <p className="text-sm text-white">Expiry Date</p>
                                <p className=" text-white font-bold" style={{fontSize:"18px", marginTop:"0.5rem"}}>
                                    {dateButif(data.expiryDate)}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-4 lg:mt-0 md:mt-0 mt-5">
                            <div className="flex flex-col">
                                {/* <button className='bg-[#008DDC] font-bold p-3 rounded-md text-white'>CANCEL REQUEST</button> */}
                                {showCancel ? (
                                    <Popup
                                        trigger={
                                            <button
                                                className="bg-blue font-bold p-3 rounded-md text-white"
                                                onClick={() => setIsPopupOpen(!isPopupOpen)}
                                            >
                                                CANCEL REQUEST
                                            </button>
                                        }
                                        modal
                                        open={isPopupOpen}
                                        onOpen={() => setIsPopupOpen(!isPopupOpen)}
                                        closeOnDocumentClick={false}
                                        position=""
                                    >
                                        {(close) => (
                                            <>
                                                <button className="close-popup mr-2 lg:mr-0 md:mr-0" onClick={close}>
                                                    &times;
                                                </button>
                                                <div
                                                    className="popups container mx-auto flex flex-col justify-center items-center lg:p-20 md:p-20 p-4 rounded-md w-full"
                                                    style={{
                                                        // backgroundImage: "url(/solid-concrete-wall-textured-backdrop.jpg)",
                                                    }}
                                                >
                                                    <BrowserView>
                                                        <p className="text-white futura-book">
                                                            We're sorry to hear that you're canceling your subscription.
                                                            <br />
                                                            We value your feedback and would like to understand the reason
                                                            <br />
                                                            behind your decision. By providing us with your reason for canceling,
                                                            <br />
                                                            you'll help us improve our service and better meet the needs of our
                                                            <br />
                                                            customers. Please take a moment to let us know why you're canceling
                                                            <br />
                                                            your subscription by filling out the form below. Your feedback is
                                                            greatly
                                                            <br />
                                                            appreciated and will be kept confidential.{" "}
                                                        </p>
                                                    </BrowserView>
                                                    <MobileView>
                                                        <p className="text-white futura-book">
                                                            We're sorry to hear that you're canceling your subscription. We
                                                            value your feedback and would like to understand the reason behind
                                                            your decision. By providing us with your reason for canceling,
                                                            you'll help us improve our service and better meet the needs of our
                                                            customers. Please take a moment to let us know why you're canceling
                                                            your subscription by filling out the form below. Your feedback is
                                                            greatly appreciated and will be kept confidential.{" "}
                                                        </p>
                                                    </MobileView>
                                                    <select
                                                        name="cancel-request"
                                                        id="cancel-request"
                                                        style={{
                                                            height: "3rem",
                                                            color: "white",
                                                            backgroundColor: "#008DDC",
                                                            textAlign: "center",
                                                            width: "50%",
                                                            borderRadius: "5px",
                                                            padding: "10px",
                                                            marginTop: "2rem",
                                                            marginBottom: "1rem",
                                                        }}
                                                    >
                                                        <option>Select your reason:</option>
                                                        {userReasons.map((item) => (
                                                            <option value={item.reasonName}>{item.reasonName}</option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="month"
                                                        id="month-year-picker"
                                                        value={selectedDate}
                                                        className="rounded-md w-1/2 text-[#008DDC] bg-white text-center h-12 month-picker" style={{height:"3rem",marginBottom:"1.25rem", color:"#008DDC"}}
                                                    
                                                        onChange={handleDateChange}
                                                    />
                                                    <button
                                                        className="bg-blue font-bold w-1/2 rounded-md text-white"
                                                        style={{padding:"0.75rem"}}
                                                        onClick={sendReason}
                                                    >
                                                        Send
                                                    </button>
                                                    <p className="text-white futura-book mt-5">{requestMessage}</p>
                                                </div>
                                            </>
                                        )}
                                    </Popup>
                                ) : (
                                    <div>
                                        <button className="bg-[transparent] font-bold p-3 rounded-md text-white h-12"></button>
                                    </div>
                                )}


                                <a
                                    href="/account/freezing"
                                    className="bg-white text-[#008DDC] p-3 rounded-md text-center mt-5 font-bold freez"
                                >
                                    FREEZING REQUEST
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="container flex flex-col lg:mx-auto md:max-auto justify-start lg:w-3/5 md:w-3/5 items-start px-2 lg:px-0 md:px-0" style={{marginTop:"2.5rem"}}>
                        <p className="text-[#008DDC] font-bold mb-3" style={{fontSize:"18px"}}>Payment History</p>
                        {slice.map((item) => (
                            <>
                                <div className="flex justify-start lg:w-full items-center classes-box mb-3 p-3 mx-auto container">
                                    <div className="space-x-2 flex w-full">
                                        <p className=" pr-1 text-white w-2/5 flex justify-start items-start whitespace-nowrap"
                                        style={{borderRight:"1px solid #008DDC"}}>
                                            {dateButif(item.value)}
                                        </p>
                                        <p className="text-white text-base lg:text-xl md:text-xl w-3/5 flex justify-center items-center whitespace-nowrap">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                                {/* <div className='flex justify-between  classes-box mb-3 p-3'>
                                    <p className='w-1/2'>{dateButif(item.value)}</p>
                                    <p className='w-1/2 whitespace-nowrap'>{item.text}</p>
                                </div> */}
                            </>
                        ))}
                        <div
                            className="flex lg:justify-center text-white items-center cursor-pointer font-bold"
                            onClick={() => {
                                toggle(!state);
                                loadMoreLess();
                            }}
                        >
                            {state ? "VIEW ALL" : "VIEW LESS"}
                            {/* <ChevronRightIcon className="arrow-membership" /> */}
                        </div>
                    </div>
                </div>
                {/* <div ref={buttonRef} style={{ display: "none" }}>
                <a id="buttonss" onClick={()=>{  $('html, body').animate({ scrollTop: 0 }, '300')}} className='m-10'><ArrowUpward/></a>
            </div> */}
            </section>
            </DarkTheme>
        </>
    );
}

export async function getServerSideProps(context) {
    const memberId = context.req.cookies["Member"];
    const token = context.req.cookies["token"];
    var registrationHeaders = new Headers();
    registrationHeaders.append("Authorization", "Bearer " + token);
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
        const data = await response.json();
        return {
            props: { data },
        };
    }
}
