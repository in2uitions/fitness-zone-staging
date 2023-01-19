import { useState, useEffect, useRef, useCallback } from "react";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ArrowUpward } from "@material-ui/icons";
import $ from "jquery";
import { useRouter } from "next/router";
import moment from "moment";

export default function CheckIns() {
    const [data, setData] = useState([]);
    const memberId = localStorage.getItem('Member');
    var registrationHeaders = new Headers();
    registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: 'GET',
        headers: registrationHeaders
    };
    try {

        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/membership/member/CheckinListItem/${memberId}`,
                    registrationRequestOptions

                );
                const checkInList = await response.json()
                setData(checkInList)
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
    const [books, setBooks] = useState(true)
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                const fetchedData = await response.json();
                setBooks(fetchedData);
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const [state, toggle] = useState(true);
    const [noOfElements, setnoOfElements] = useState(4);
    const slice = data.slice(0, noOfElements);
    const loadMoreLess = () => {
        if (noOfElements == 4) {
            setnoOfElements(data.length);
        } else {
            setnoOfElements(4);
        }
    };
    // const buttonRef = useRef(null);
    // var btn = $('#buttonss');

    // $(window).on("scroll", function () {
    //     if ($(window).scrollTop() > 300) {
    //         buttonRef.current.style.display = "block"

    //     } else {
    //         buttonRef.current.style.display = "none"
    //     }
    // });


    const router = useRouter();
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            localStorage.clear();
            router.push({ pathname: "/account/login"});
        };
        getTokenAPI();

    };
    const format = (num, decimals) => num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return (
        <>
            <div className={styles.container}>
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
                            {/* <img src="/icons-person.png" /> */}
                            <a href="/account/dashboard" className="flex space-x-1 border-4 border-[#009FE3] rounded-full w-40 h-40 items-center justify-center">
                            <p className="futura-bold text-6xl text-[#009FE3]">{books.firstName?.charAt(0)}</p>
                            <p className="futura-bold text-6xl text-[#009FE3]">{books.lastName?.charAt(0)}</p>
                            </a>
                            <p className="futura-bold text-[#009FE3] mt-5">{books.fullName}</p>
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
            </div>
            <section>
                <div className='flex flex-col justify-center mt-40 ' id="btnScrollToTop">
                    <div className='flex flex-col mx-auto justify-start items-start lg:w-1/3 md:w-1/3 w-full lg:px-0 md:px-0 px-3'>
                        <p className='text-[#009FE3] futura-bold mb-3'>My Recent Check-ins</p>
                        {slice.map((item) => (
                            <>
                                <div className='flex justify-start items-start classes-box mb-3 p-3' >
                                    <div className='space-x-2 flex w-full'>
                                        <p className='text-white lg:text-md md:text-md pr-2 border-r border-[#009FE3] futura-book w-2/5 flex justify-center items-center checkins-labels'>{moment(item.value).format("DD MMM YYYY")}</p>
                                        <p className='text-white lg:text-md md:text-md pr-2 border-r border-[#009FE3] futura-book w-2/5 flex justify-center items-center checkins-labels'>{moment(item.value).format("HH:mm")}</p>
                                        {/* <p className='border-r border-[#009FE3] text-white'>{item.time}</p> */}
                                        <p className='text-white lg:text-md md:text-md futura-book w-3/5 flex justify-center items-center checkins-labels'>{item.text}</p>
                                    </div>
                                </div>
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
                    {/* <div ref={buttonRef} style={{ display: "none" }}>
                    <a id="buttonss" onClick={()=>{  $('html, body').animate({ scrollTop: 0 }, '300')}} className=" m-10"><ArrowUpward /></a>
                </div> */}
                </div>
            </section>
        </>
    )
}