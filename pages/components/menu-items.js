import dynamic from 'next/dynamic'
import HeaderContent from './header-component';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { BrowserView, MobileView } from 'react-device-detect';
import Cookies from 'js-cookie';
import nextConfig from '../../next.config';

const MetisMenu = dynamic(() => import('react-metismenu'), { ssr: false })

export default function Menu(data = {}) {
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    const [search, updateSearch] = useState('');
    const [index, updateIndex] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [content, updateContent] = useState([]);
    const [isSent, setIsSent] = useState(false);
    const thankYouMessage = <h3>Thank you for your submission!</h3>;
    const submitmsg = <h3></h3>;
    const router = useRouter()
    const [show, setShow] = useState(false)
    var ct = [
        {
            "id": 1,
            "label": "HOME",
            "to": '/'
        },
        {
            "id": 2,
            "label": "ABOUT US",
            "to": '/about/about-us'
        },
        {
            "id": 3,
            "label": "SERVICES",
            "to": '/about/services'
        },
        {
            "id": 4,
            "label": "PERSONAL TRAINING",
            "to": '/about/personal-trainer'
        },
        {
            "id": 5,
            "label": "CLASSES",
            "to": '/about/classes'
        },
        {
            "id": 6,
            "label": "CONTACT US",
            "to": '/about/contact-us'
        },
        {
            "id": 7,
            "label": "",
            "to": '/about/franchise'
        },
        {
            "id": 8,
            "label": "",
            "to": "/about/career"
        },
        {
            "id": 9,
            "label": "",
            "to": "/about/offer"
        }
    ];

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {

            router.push('/results-page?search=' + search)
        }
    }




    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        // console.log(ct);
        updateContent(ct);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };



    }, [data]);

    useEffect(() => {
        const handleRouteChange = (url) => {

            setIsSidebarOpen(false)


            if (url.includes("software") || url.includes("deployment")) {
                updateIndex(0);
            }

            if (url.includes("business") || url.includes("industries") || url.includes("hardware")) {
                updateIndex(1);
            }
            if (url.includes("about")) {
                updateIndex(2);
            }

            if (url.includes("about") || url.includes("support")) {
                updateIndex(3);
            }

            if (url.includes("resources")) {
                updateIndex(4);
            }
        }



        handleRouteChange(router.pathname)

        router.events.on('routeChangeStart', handleRouteChange)


        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, []);
    const [button, setButton] = useState();
    const [signbtn, setSignBtn] = useState(true);
    const [memberBtn , setMemberBtn] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [logOut, setLogOut] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet = (Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
            setButton(<a href='/account/dashboard' className="h-6">DASHBOARD</a>)
            setMemberBtn(false)
            setLogOut(true)
        }
        else {
            setButton(<a href='/account/login' className="">LOG IN</a>)
            setMemberBtn(true)
            setLogOut(false)
        }
    }, [])

    function loading() {
        const skeletons = document.querySelectorAll('.popup-overlay');
        skeletons.forEach(skeleton => {
            skeleton.classList.remove('popup-overlay');
        });
    }
    const onSubmitLogOutForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            Cookies.remove('token');
            Cookies.remove('Member');
            Cookies.remove('Phone');
            Cookies.remove('Country');
            Cookies.remove('OTP');
            Cookies.remove('UserId')
            router.push({ pathname: "/" });
            setIsOpen(false);
            loading();
        };
        getTokenAPI();

    };
    const submitLebSignUp = async event => {
        event.preventDefault();


        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    'https://api.fitnessclubapp.com/api/Account/Login?Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234',
                    {
                        method: 'POST'
                    }
                    //.then(() => setIsSent(true))
                );

                const tokenData = await res.json();
                // console.log(tokenData);

                const submitContactForm = async () => {
                    try {
                        var registraitonRawData = JSON.stringify({
                            "GuestRegisterId": 0,
                            "FirstName": event.target.pp_first_name.value,
                            "LastName": event.target.pp_last_name.value,
                            "Mobile": event.target.pp_phone.value,
                            "Email": event.target.pp_email.value,
                            "Location": event.target.location.value,
                            "Source": {
                                "VisitSourceId": 9
                            },
                            // "LocationCode": 1
                        });

                        //   // console.log(registraitonRawData);
                        // }

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
                        // console.log(data);

                        if (data.isValid == true) {
                            setIsSent(true)
                            event.target.pp_first_name.value = '';
                            event.target.pp_last_name.value = '';
                            event.target.pp_phone.value = '';
                            event.target.pp_email.value = '';
                            event.target.location.value = '';
                            // setPhoneValue();
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
    const submitSignUp = async event => {
        event.preventDefault();


        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    'https://api.fitnessclubapp.com/api/account/login?Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1',
                    {
                        method: 'POST'
                    }
                    //.then(() => setIsSent(true))
                );

                const tokenData = await res.json();
                // console.log(tokenData);

                const submitContactForm = async () => {
                    try {
                        var registraitonRawData = JSON.stringify({
                            "GuestRegisterId": 0,
                            "FirstName": event.target.pp_first_name.value,
                            "LastName": event.target.pp_last_name.value,
                            "Mobile": event.target.pp_phone.value,
                            "Email": event.target.pp_email.value,
                            "Location": event.target.location.value,
                            "Source": {
                                "VisitSourceId": 9
                            },
                            "LocationCode": 1
                        });

                        //   // console.log(registraitonRawData);
                        // }

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
                        // console.log(data);

                        if (data.isValid == true) {
                            setIsSent(true)
                            event.target.pp_first_name.value = '';
                            event.target.pp_last_name.value = '';
                            event.target.pp_phone.value = '';
                            event.target.pp_email.value = '';
                            event.target.location.value = '';
                            // setPhoneValue();
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
    useEffect(() => {
        if (nextConfig.country_code == 'AE') {
            setShowPopup(true)
            setSignBtn(false)
        }
        else {
            setShowPopup(false)
            setSignBtn(true)
        }
    }, [nextConfig.country_code])
    return (
        <>
            {isOpen ? <div className="rounded-lg shadow-xl w-screen h-screen overflow-y-auto menu-fade overflow-x-hidden" id='MainMenu'>
                <div className="lg:grid lg:grid-cols-2">
                    <div className="lg:mt-36 md:mt-36 mt-28 lg:ml-40 md:ml-40 ml-5">
                        <MetisMenu
                            className="font-bold futura-book text-4xl menu-items "
                            content={content} activeLinkFromLocation
                        />
                        <div className='career-menubtn'>
                        <div className="flex flex-row mt-14">
                            <a
                                className="border-[#009FE3] border-2 w-48 p-2 rounded flex justify-center items-center mr-5 futura-bold"
                            >
                                {button}
                            </a>
                            {signbtn && memberBtn ? <Popup
                                trigger={

                                    <button className="bg-[#009FE3] flex justify-center p-2 items-center w-48 rounded mr-4 futura-bold text-white">BECOME A MEMBER</button>

                                } modal
                                position="center"
                                closeOnDocumentClick={false}
                            >
                                {close => (
                                    <>
                                        <BrowserView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form className='flex flex-col space-y-5' onSubmit={submitLebSignUp}>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="First Name" id="pp_first_name" name="pp_first_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="pp_last_name" name="pp_last_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="Email" id="pp_email" name='pp_email' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="pp_phone" name='pp_phone' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <select name="branches" id="location" className="w-full border border-[#009FE3] bg-transparent text-white pl-2 appearance-none rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2">
                                                            <option value="dbayeh">Dbayeh</option>
                                                            <option value="manara">Manara</option>
                                                            <option value="abc">ABC Achrafieh</option>
                                                            <option value="baabda">Baabda</option>
                                                            <option value="hamra">Hamra</option>
                                                            <option value="citywalkdubai">City Walk Dubai</option>
                                                        </select>
                                                    <button type="submit" className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md">Send</button>
                                                    {isSent ? thankYouMessage : submitmsg}
                                                </form>
                                            </div>
                                        </BrowserView>
                                        <MobileView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form>
                                                    <div className="flex flex-col w-full justify-between space-y-5" onSubmit={submitLebSignUp}>
                                                        <input placeholder="First Name" id="pp_first_name" name='pp_first_name' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="pp_last_name" name='pp_last_name' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />

                                                        <input placeholder="Email" id="pp_email" name='pp_email' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="pp_phone" name='pp_phone' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <button type="submit" className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md">Send</button>
                                                </form>
                                            </div>
                                        </MobileView>
                                    </>
                                )}
                            </Popup> : null}
                            {showPopup ? <Popup
                                trigger={

                                    <button className="bg-[#009FE3] flex justify-center p-2 items-center w-44 rounded mr-4 futura-bold text-white">BECOME A MEMBER</button>

                                } modal
                                position="center"
                                closeOnDocumentClick={false}
                            >
                                {close => (
                                    <>
                                        <BrowserView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form className='flex flex-col space-y-5' onSubmit={submitSignUp}>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="First Name" id="pp_first_name" name="pp_first_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="pp_last_name" name="pp_last_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="Email" id="pp_email" name='pp_email' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="pp_phone" name='pp_phone' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <select name="branches" id="location" className="w-full border border-[#009FE3] bg-transparent text-white pl-2 appearance-none rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2">
                                                            <option value="7">Dbayeh</option>
                                                            <option value="9">Manara</option>
                                                            <option value="6">ABC Achrafieh</option>
                                                            <option value="2">Baabda</option>
                                                            <option value="1">Hamra</option>
                                                            <option value="citywalkdubai">City Walk Dubai</option>
                                                        </select>
                                                    <button type="submit" className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md">Send</button>
                                                    {isSent ? thankYouMessage : submitmsg}
                                                </form>
                                            </div>
                                        </BrowserView>
                                        <MobileView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form>
                                                    <div className="flex flex-col w-full justify-between space-y-5" onSubmit={submitSignUp}>
                                                        <input placeholder="First Name" id="pp_first_name" name='pp_first_name' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="pp_last_name" name='pp_last_name' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />

                                                        <input placeholder="Email" id="pp_email" name='pp_email' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="pp_phone" name='pp_phone' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <button type="submit" className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md">Send</button>
                                                </form>
                                            </div>
                                        </MobileView>
                                    </>
                                )}
                            </Popup> : null}
                            {logOut ? <form onSubmit={onSubmitLogOutForm}>
                                <button type="submit" className="bg-[#009FE3] flex justify-center p-2 items-center w-44 rounded mr-4 futura-bold text-white h-11">Log Out</button>
                            </form> : null}
                        </div>
                        <a
                                href="/about/career"
                                className="border-[#009FE3] border-2 mt-5 p-2 rounded flex justify-center items-center mr-5 futura-bold "
                            >
                                WORK WITH US
                            </a>
                            </div>
                    </div>
                    {/* <div className="lg:mt-52 md:mt-52 mt-5 flex flex-col justify-center">
                        <div className="flex flex-row lg:ml-14 md:ml-14 ml-5">
                            <Popup
                                trigger={

                                    <button className="bg-[#009FE3] h-9 flex justify-center text-sm items-center p-2 rounded mr-4 futura-bold text-white">BECOME A MEMBER</button>

                                } modal
                                position="center"
                                closeOnDocumentClick={false}
                            >
                                {close => (
                                    <>
                                        <BrowserView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form className='flex flex-col space-y-5' onSubmit={submitLebSignUp}>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="First Name" id="pp_first_name" name='pp_first_name' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="pp_last_name" name='pp_last_name' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <div className="flex w-full justify-between space-x-5">
                                                        <input placeholder="Email" id="pp_email" name='pp_email' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="pp_phone" name='pp_phone' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <button className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md" type="submit">Send</button>
                                                </form>
                                            </div>
                                        </BrowserView>
                                        <MobileView>
                                            <div className="container w-screen flex flex-col justify-center py-12">
                                                <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                    <img src="/close-X.svg" />
                                                </button>
                                                <form>
                                                    <div className="flex flex-col w-full justify-between space-y-5" onSubmit={submitLebSignUp}>
                                                        <input placeholder="First Name" id="pp_first_name" name='pp_first_name' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Family Name" id="pp_last_name" name='pp_last_name' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />

                                                        <input placeholder="Email" id="pp_email" name="pp_email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        <input placeholder="Phone Number" id="pp_phone" name='pp_phone' className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                    </div>
                                                    <button className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md" type="submit">Send</button>
                                                </form>
                                            </div>
                                        </MobileView>
                                    </>
                                )}
                            </Popup>
                            <a
                                href="/about/career"
                                className="border-[#009FE3] border-2 w-36 h-9 rounded flex justify-center items-center futura-bold"
                            >
                                WORK WITH US
                            </a>
                        </div>
                    </div> */}
                </div>
            </div> : null}
        </>
    );
}

