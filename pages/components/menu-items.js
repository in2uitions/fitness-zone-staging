import dynamic from 'next/dynamic'
import HeaderContent from './header-component';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { BrowserView, MobileView } from 'react-device-detect';
import Cookies from 'js-cookie';

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
    const [logOut, setLogOut] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet = (Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
            setButton(<a href='/account/dashboard' className="h-6">DASHBOARD</a>)
            setSignBtn(false)
            setLogOut(true)
        }
        else {
            setButton(<a href='/account/login' className="">LOG IN</a>)
            setSignBtn(true)
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
                );

                const tokenData = await res.json();

                const submitContactForm = async () => {
                    try {
                        if (event.target.enquire_request.value == "popup-request") {
                            var registraitonRawData = JSON.stringify({
                                "GuestRegisterId": 0,
                                "FirstName": event.target.pp_first_name.value,
                                "LastName": event.target.pp_last_name.value,
                                "Mobile": event.target.pp_phone.value,
                                "Email": event.target.pp_email.value,
                                "Source": {
                                    "VisitSourceId": 9
                                },
                                "LocationCode": 1
                            });
                        }
                        else {
                            var registraitonRawData = JSON.stringify({
                                "FirstName": event.target.firstname.value,
                                "LastName": event.target.lastname.value,
                                "Mobile": event.target.pp_phone.value,
                                "Email": event.target.email.value,
                            });
                        }

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
                        if (data.isValid == true) {
                            setIsSent(true)
                            event.target.pp_first_name.value = '';
                            event.target.pp_last_name.value = '';
                            event.target.pp_phone.value = '';
                            event.target.pp_email.value = '';
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
        <>
            {isOpen ? <div className="rounded-lg shadow-xl w-screen h-screen overflow-y-auto menu-fade overflow-x-hidden" id='MainMenu'>
                <div className="lg:grid lg:grid-cols-2">
                    <div className="lg:mt-52 md:mt-52 mt-28 lg:ml-40 md:ml-40 ml-5">
                        <MetisMenu
                            className="font-bold futura-book text-4xl menu-items "
                            content={content} activeLinkFromLocation
                        />
                        <div className="flex flex-row mt-14">
                            <a
                                className="border-[#009FE3] border-2 w-36 p-2 rounded flex justify-center items-center mr-5 futura-bold"
                            >
                                {button}
                            </a>
                            {signbtn ? <Popup
                                trigger={

                                    <button className="bg-[#009FE3] flex justify-center p-2 items-center w-40 rounded mr-4 futura-bold text-white">SIGN UP</button>

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
                                                    <button type="submit" className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md">Send</button>
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
                            {logOut ? <form onSubmit={onSubmitLogOutForm}>
                                <button type="submit" className="bg-[#009FE3] flex justify-center p-2 items-center w-40 rounded mr-4 futura-bold text-white h-11">Log Out</button>
                            </form> : null}
                        </div>
                    </div>
                    <div className="lg:mt-52 md:mt-52 mt-5 flex flex-col justify-center">
                        <div className="flex flex-row lg:ml-14 md:ml-14 ml-5">
                            {/* <a
                                href="#"
                                className="bg-[#009FE3] h-9 flex justify-center text-sm items-center p-2 rounded mr-4 futura-bold"
                            >
                                BECOME A MEMBER
                            </a> */}
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

                        {/* <p className="pt-7 futura-bold lg:ml-14 md:ml-14 ml-5 text-white">ENQUIRE NOW</p>
                        <input
                            className="lg:ml-14 md:ml-14 ml-5 pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 md:w-80 w-72 py-2 mb-3"
                            placeholder="FULL NAME"
                        />
                        <input
                            className="lg:ml-14 md:ml-14 ml-5 pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 md:w-80 w-72 py-2 mb-3"
                            placeholder="PHONE NUMBER"
                        />

                        <div className="lg:ml-14 md:ml-14 ml-5 mt-5 bg-[#009FE3] learnMoreBtns p-2 lg:w-40 md:w-40 w-40 mb-20 flex justify-center items-center rounded-md futura-bold">
                            <a href="#">REQUEST A CALL</a>
                        </div> */}
                    </div>
                </div>
            </div> : null}
        </>
    );
}

