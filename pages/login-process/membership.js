import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useState, useEffect } from 'react';
import { ArrowDropUpOutlined } from "@material-ui/icons";
import $ from "jquery";
import { useRouter } from "next/router";

export default function Membership({ style = 'white' }) {
    // const membership =[
    //     {
    //         date:'18/10/2022',
    //         text:'Membership Renewal (1 Year)'
    //     },
    //     {
    //         date:'18/10/2022',
    //         text:'Personal Training Package'
    //     },
    //     {
    //         date:'18/10/2022',
    //         text:'Personal Training Package'
    //     }
    // ]
    const memberId = localStorage.getItem('Member');
    const [test, setTest] = useState([])
    try {
        
        var registrationHeaders = new Headers();
        registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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
                const membership = await response.json()
                setTest(membership)
            }
            // getData()
        }, [])
    } catch (err) {
        console.log(err);
    }
    function dateButif(d) {
        const newd = new Date(d).toLocaleDateString("en-UG", {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
        return newd;
    }
    const[data, setData]=useState(true)
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                const fetchedData = await response.json();
                setData(fetchedData);
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    function dateButif(d) {
        const newd = new Date(d).toLocaleDateString("en-UG", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).replaceAll('/', '-');
        return newd;
    }
    var btn = $('#buttonss');

    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });
    const router = useRouter();
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            localStorage.clear();
            router.push({ pathname: "/login-process/login"});
        };
        getTokenAPI();

    };
    return (
        <>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <a href="/">
                        <img src="/logo.png" className="logo" />
                    </a>
                    <Popup
                        trigger={
                            <div className="flex items-center space-x-2">
                                <button className="img-btn">
                                    <img src="/blue-rectangle.png" className="menu-icon" />
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
                            {/* <img src="/icons-person.png" /> */}
                            <a href="/login-process/dashboard" className="flex space-x-1 border-4 border-[#009FE3] rounded-full w-40 h-40 items-center justify-center">
                            <p className="futura-bold text-6xl text-[#009FE3]">{data.firstName?.charAt(0)}</p>
                            <p className="futura-bold text-6xl text-[#009FE3]">{data.lastName?.charAt(0)}</p>
                            </a>
                            <p className="futura-bold text-[#009FE3] mt-5">{data.fullName}</p>
                            <div className="flex flex-col mt-10">
                                <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a
                                        href="/login-process/myProfile"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        {" "}
                                        My Profile
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a href='/login-process/membership' className="futura-book menu-member flex items-center justify-between">
                                        Membership Settings
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                </div>
                                <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a href="/login-process/classListing" className="futura-book menu-member flex items-center justify-between text-white">
                                        Classes / Book a class
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a href='/login-process/trainers' className="futura-book menu-member flex items-center justify-between">
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
            </div>
            <section>
                <div className='container lg:px-28 md:px-20 px-3 mx-auto flex flex-col justify-center mt-40'>
                    <div className='flex flex-col justify-center items-center'>
                        <img src='/gold-member.png' />
                        <p className='futura-bold mt-5 text-white'>{data.membershipType?.memberShipTypeName}</p>
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
                                <a href='/login-process/freezing' target="_blank" className='bg-white text-[#009FE3] p-3 rounded-md text-center mt-5 futura-bold'>FREEZING REQUEST</a>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mx-auto justify-start items-start mt-10 px-2 lg:px-0 md:px-0'>
                        <p className='text-[#009FE3] futura-bold mb-3'>Payment History</p>
                        {test.map((item) => (
                            <>
                                <div className='flex justify-start lg:w-full items-center classes-box mb-3 p-3'>
                                    <div className='space-x-2 flex'>
                                        <p className='border-r pr-1 border-[#009FE3] text-white'>{dateButif(item.value)}</p>
                                        <p className='text-white text-base lg:text-xl md:text-xl'>{item.text}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <a id="buttonss"><ArrowDropUpOutlined className="arrow-backtop" /></a>
            </section>

        </>
    );
}


