import { useState, useEffect, useRef, useCallback } from "react";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ArrowUpward } from "@material-ui/icons";
import $ from "jquery";
import { useRouter } from "next/router";
import moment from "moment";
import PrivateMenu from "./private-menu";
import Cookies from 'js-cookie'

export default function CheckIns() {
    const [data, setData] = useState([]);
    const memberId = Cookies.get('Member');
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet =(Cookies.get("OTP") != null)
    useEffect(() => {
    if (itemSet && tokenSet) {
        router.push({ pathname: "/account/myCheckIns"});
    }
    else{
        router.push({ pathname: "/account/login"});
    }
}, [])
    var registrationHeaders = new Headers();
    registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
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
                if(response.status == 200){
                const checkInList = await response.json()
                setData(checkInList)
                }
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
                if(response.status == 200){
                const fetchedData = await response.json();
                setBooks(fetchedData);
                }
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
   
    const format = (num, decimals) => num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    
    return (
        <>
           <PrivateMenu/>
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