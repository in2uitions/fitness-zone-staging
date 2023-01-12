import Router, { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export default function TrainerDetails() {
    const { query } = useRouter()
    const router = useRouter()
    // console.log(query.name)
    const memberId = localStorage.getItem("Member");
    const format = (num, decimals) => num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
    );
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: "GET",
        headers: registrationHeaders,
    };
    const [info, setInfo] = useState(true)
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                const fetchedData = await response.json();
                setInfo(fetchedData);
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            localStorage.clear();
            router.push({ pathname: "/account/login"});
        };
        getTokenAPI();

    };
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
                            <p className="futura-bold text-6xl text-[#009FE3]">{info.firstName?.charAt(0)}</p>
                            <p className="futura-bold text-6xl text-[#009FE3]">{info.lastName?.charAt(0)}</p>
                            </a>
                            <p className="futura-bold text-[#009FE3] mt-5">{info.fullName}</p>
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
            <div className="lg:grid lg:grid-cols-12 gap-x-10 gap-y-10 container mx-auto lg:px-20 md:px-20 px-3 mt-40 w-screen h-screen">
                <div className="col-span-4">
                    <div className="membership-box p-3 flex flex-col justify-center items-center mt-8">
                        <p className="text-white text-2xl futura-bold">{query.categoryName}</p>
                        <p className="rounded-md flex space-x-2 mt-2 cursor-pointer text-white p-3 active-button futura-book">{query.name}</p>
                        <div className="flex flex-col mt-4">
                            <p><span className="text-2xl text-[#009FE3] futura-book">$</span><span className='text-4xl futura-book text-[#009FE3]'>
                                {format(query.sessionPrice)}
                            </span>
                            </p>
                            <p className='text-[#009FE3] -mt-4 tracking text-xs'>per session</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <p className="text-[#009FE3] futura-bold">Package Details</p>
                    <p className="text-white">The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                    </br>The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                        </br>The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                        </br>The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                        </br>
                    </p>
                </div>
                <div className="col-span-4">
                    <button className="bg-[#009FE3] p-2 text-white futura-bold mt-8 rounded-md">BOOK PACKAGE</button>
                </div>

            </div>
        </>
    )
}