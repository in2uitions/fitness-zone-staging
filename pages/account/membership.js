import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useState, useEffect , useRef} from 'react';
import { ArrowUpward } from '@material-ui/icons';
import $ from "jquery";
import { useRouter } from "next/router";
import PrivateMenu from './private-menu';
import Cookies from 'js-cookie'

export default function Membership({ style = 'white' ,data}) {
    const memberId = Cookies.get('Member');
    const [test, setTest] = useState([])
    const [state, toggle] = useState(true);
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet =(Cookies.get("OTP") != null)
    useEffect(() => {
    if (itemSet && tokenSet) {
        router.push({ pathname: "/account/membership"});
    }
    else{
        router.push({ pathname: "/account/login"});
    }
}, [])
    try {
        
        var registrationHeaders = new Headers();
        registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
        registrationHeaders.append("Content-Type", "application/json");
        var registrationRequestOptions = {
            method: 'GET',
            headers: registrationHeaders
        };
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/membership/member/PaymentListItem/${memberId}`,
                    registrationRequestOptions

                );
                if(response.status == 200){
                const membership = await response.json()
                setTest(membership)
                }
            }
        }, [])
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
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
        return newd;
    }
   
    function dateButif(d) {
        const newd = new Date(d).toLocaleDateString("en-UG", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).replaceAll('/', '-');
        return newd;
    }
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
                            <a href="/account/dashboard" className="flex space-x-1 border-4 border-[#009FE3] rounded-full w-40 h-40 items-center justify-center">
                            <p className="futura-bold text-6xl text-[#009FE3]">{data.firstName?.charAt(0)}</p>
                            <p className="futura-bold text-6xl text-[#009FE3]">{data.lastName?.charAt(0)}</p>
                            </a>
                            <p className="futura-bold text-[#009FE3] mt-5">{data.fullName}</p>
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
                                        <button type="submit" className="text-white border-2 border-[#009FE3] w-1/2 mt-5 p-2 futura-book">Log Out</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Popup>
                </nav>
            </div> */}
            <PrivateMenu/>
            <section>
                <div className='container lg:px-28 md:px-20 px-3 mx-auto flex flex-col justify-center mt-40'>
                    <div className='flex flex-col justify-center items-center'>
                        <img src='/gold-member.png' />
                        <p className='futura-bold mt-5 text-white'>{data.membershipType?.memberShipTypeName.slice(0,data.membershipType?.memberShipTypeName.length - 1)}</p>
                    </div>
                    <div className='lg:grid lg:grid-cols-12 gap-x-1 items-center mt-10 px-3 lg:px-0 md:px-0'>
                        <div className='col-span-4'>
                            <div className='flex flex-col'>
                                <p className='text-sm text-white'>Status</p>
                                <p className='futura-bold text-white uppercase'>{data.status?.statusDescription}</p>
                            </div>
                            <div className='flex flex-col  mt-5'>
                                <p className='text-sm text-white'>Start Date</p>
                                <p className='futura-bold text-white'>{dateButif(data.startDate)}</p>
                            </div>
                        </div>
                        <div className='col-span-4'>
                            <div className='flex flex-col'>
                                <p className='text-sm text-white'>Default Club</p>
                                <p className='futura-bold text-white'>{data.membershipLocation?.locationName}</p>
                            </div>
                            <div className='flex flex-col  mt-5'>
                                <p className='text-sm text-white'>Expiry Date</p>
                                <p className='futura-bold text-white'>{dateButif(data.expiryDate)}</p>
                            </div>
                        </div>
                        <div className='col-span-4'>
                            <div className='flex flex-col'>
                                <button className='bg-[#009FE3] futura-bold p-3 rounded-md text-white'>RENEW MEMBERSHIP</button>
                                <a href='/account/freezing' className='bg-white text-[#009FE3] p-3 rounded-md text-center mt-5 futura-bold'>FREEZING REQUEST</a>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mx-auto justify-start lg:w-3/5 md:w-3/5 items-start mt-10 px-2 lg:px-0 md:px-0'>
                        <p className='text-[#009FE3] futura-bold mb-3'>Payment History</p>
                        {slice.map((item) => (
                            <>
                                <div className='flex justify-start lg:w-full items-center classes-box mb-3 p-3 mx-auto container'>
                                    <div className='space-x-2 flex w-full'>
                                        <p className='border-r pr-1 border-[#009FE3] text-white w-2/5 flex justify-start items-start whitespace-nowrap'>{dateButif(item.value)}</p>
                                        <p className='text-white text-base lg:text-xl md:text-xl w-3/5 flex justify-center items-center whitespace-nowrap'>{item.text}</p>
                                    </div>
                                </div>
                                {/* <div className='flex justify-between  classes-box mb-3 p-3'>
                                    <p className='w-1/2'>{dateButif(item.value)}</p>
                                    <p className='w-1/2 whitespace-nowrap'>{item.text}</p>
                                </div> */}
                            </>
                        ))}
                        <div
                            className="flex lg:justify-center text-white items-center cursor-pointer futura-bold"
                            onClick={() => {
                                toggle(!state);
                                loadMoreLess();
                            }}
                        >
                            {state ? "VIEW ALL" : "VIEW LESS"}
                            <ChevronRightIcon className="arrow-membership" />
                        </div>
                    </div>
                </div>
                {/* <div ref={buttonRef} style={{ display: "none" }}>
                <a id="buttonss" onClick={()=>{  $('html, body').animate({ scrollTop: 0 }, '300')}} className='m-10'><ArrowUpward/></a>
            </div> */}
            </section>

        </>
    );
}

export async function getServerSideProps(context) {
    const memberId = context.req.cookies["Member"];
    const token = context.req.cookies["token"];
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + token
    );
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
    if(response.status == 401){
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        };
        }else{
            const data = await response.json()
            return {
                props:{data}
            }
        }

}
