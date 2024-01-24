import Popup from "reactjs-popup"
import styles from "../../styles/Header.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'

export default function PrivateMenu() {
    const memberId = Cookies.get('Member');
    const [data, setData] = useState(true)
    const router = useRouter();
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
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const fetchedData = await response.json();
                    setData(fetchedData);
                }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            Cookies.remove('token');
            Cookies.remove('Member');
            Cookies.remove('Phone');
            Cookies.remove('Country');
            Cookies.remove('OTP');
            Cookies.remove('UserId')
            router.push({ pathname: "/account/login" });
        };
        getTokenAPI();

    };
    const [colorChange, setColorchange] = useState(false);
    // const changeNavbarColor = () => {
    //     if (window.scrollY >= 80) {
    //         setColorchange(true);
    //     }
    //     else {
    //         setColorchange(false);
    //     }
    // };
    // window.addEventListener('scroll', changeNavbarColor);
    return (
        <div className={styles.container}>
            <nav className={colorChange ? styles.navWithBg : styles.nav}>
                <a href="/">
                    <img src="/homepage/logo.svg" className="logo" style={{width:"60%"}} />
                </a>
                <Popup
                    trigger={
                        <div className="flex items-center space-x-2">
                            <button className="img-btn">
                                <img src="/homepage/blue-rectangle.svg" className="menu-icon" style={{width:"60px"}}/>
                            </button>
                            {/* <p className="font-bold text-white futura-book cursor-pointer">
                                Menu
                            </p> */}
                        </div>
                    }
                    modal
                    closeOnDocumentClick
                    position=""
                >
                    <div className="w-screen h-screen flex flex-col justify-center items-center popup-overlay">
                        <a href="/account/dashboard" className=" space-x-1 border-4 border-[#008DDC] rounded-full w-40 h-40 items-center justify-center"
                        style={{border:"2px solid #008DDC", display:"flex"}}>
                            <p className="font-bold text-6xl text-[#008DDC]">{data.firstName?.charAt(0)}</p>
                            <p className="font-bold text-6xl text-[#008DDC]">{data.lastName?.charAt(0)}</p>
                        </a>
                        <p className="font-bold text-[#008DDC] " style={{marginTop:"1.25rem", fontSize:"18px"}}>{data.fullName}</p>
                        <div className="flex flex-col " style={{marginTop:"2.5rem"}}>
                            <div className="lg:space-x-3  lg:space-y-0 md:space-y-0 mobile-flex-col" style={{display:"flex"}}>
                                <a
                                    href="/account/myProfile"
                                    className="futura-book menu-member flex items-center justify-between rounded-md"
                                    style={{marginRight:"10px", display:"flex"}}
                                >
                                    {" "}
                                    My Profile
                                    {/* <ChevronRightIcon className="forward-blue" /> */}
                                </a>
                                <a href='/account/membership' className="futura-book menu-member flex items-center justify-between rounded-md"
                                style={{display:"flex"}}>
                                    Membership Settings
                                    {/* <ChevronRightIcon className="forward-blue" /> */}
                                </a>
                            </div>
                            <div className="mobile-flex-col margin0" style={{display:"flex", marginTop:"1.25rem"}}>
                                <a href="/account/classListing" className="futura-book menu-member  items-center justify-between text-white rounded-md"
                                 style={{marginRight:"10px", display:"flex"}}>
                                    Classes / Book a class
                                    {/* <ChevronRightIcon className="forward-blue" /> */}
                                </a>
                                <a href='/account/trainers' className="futura-book menu-member  items-center justify-between rounded-md"
                                style={{display:"flex"}}>
                                    Trainers / Buy a package
                                    {/* <ChevronRightIcon className="forward-blue" /> */}
                                </a>
                            </div>
                            <form onSubmit={onSubmitForm}>
                                <div className="flex justify-center items-center">
                                    <button type="submit" className="logOUT text-white border-2 bg-transparent w-1/2 p-2 futura-book rounded-md " style={{border:"2px solid #008DDC",marginTop:"2.5rem"}}>Log Out</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Popup>
            </nav>
        </div>
    )
}