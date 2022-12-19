import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Close from "@material-ui/icons/Close";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { getTrainers } from "../../api/server";

export default function TrainersProfile({ style = "white" }) {
    const [data, setData] = useState([]);
    const { query } = useRouter()
    const router = useRouter()
    const memberId = localStorage.getItem("Member");
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
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Billing/SubscriberUser/${query.id}`,
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
    const [trainers, setTrainers] = useState([]);
    const [trainersloaded, setTrainersLoaded] = useState(false);
    const getdata = async () => {
        const trainer = await getTrainers();
        setTrainers(trainer);
        setTrainersLoaded(true)
    }
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
                                <img src="/icons-person.png" />
                                <p className="futura-bold text-[#009FE3] mt-5">CHARLES KHOURY</p>
                                <div className="flex flex-col mt-10">
                                    <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0 md:space-y-0">
                                        <a
                                            href="/login-process/myProfile"
                                            className="futura-book menu-member flex items-center justify-between"
                                        >
                                            {" "}
                                            My Profile
                                            <ChevronRightIcon className="fill-[#009FE3]" />
                                        </a>
                                        <p className="futura-book menu-member flex items-center justify-between">
                                            Membership Settings
                                            <ChevronRightIcon className="fill-[#009FE3]" />
                                        </p>
                                    </div>
                                    <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                        <p className="futura-book menu-member flex items-center justify-between">
                                            Classes / Book a class
                                            <ChevronRightIcon className="fill-[#009FE3]" />
                                        </p>
                                        <a href='/login-process/trainers' className="futura-book menu-member flex items-center justify-between">
                                            Trainers / Book a package
                                            <ChevronRightIcon className="fill-[#009FE3]" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </nav>
                </div>
            <section>
                <div className="container mx-auto flex flex-col justify-start mt-40">
                    <p className="text-[#009FE3] futura-bold">Trainers List</p>
                    <div className="grid grid-cols-12 gap-x-3 gap-y-3 items-start mt-10">
                        {/* {data.map((item) => ( */}
                            <div className="col-span-3">
                                <div className='flex flex-col space-y-3 membership-box p-10 items-center'>
                                    <>
                                        <img className="w-20 h-20 rounded-full" src='/noImg.webp' />
                                        <p className='futura-bold flex space-x-2 cursor-pointer text-white'>{data.fullName}</p>
                                        <p className='futura-book cursor-pointer text-white'>{data.securityGroupName}</p>
                                        {/* {data.packageList?.map((item, id) =>(
                                        <p key={id}>{item.category?.categoryName}</p>
                                        ))} */}
                                        <div className="flex space-x-3 items-center rounded-md p-2 active-button">
                                        <img className="" src="/location-marker.png"/>
                                        <p>{data.locationName}</p>
                                        </div>
                                    </>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <p></p>
                            </div>
                            <div className="col-span-3">
                            <div className="membership-box p-3 rounded-md">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <p className="futura-bold">SINGLE SESSION</p>
                                    <p>The classes are in 3 speciality Studios, Energy Studio,</p>
                                </div>
                                <p>$60</p>
                                </div>
                            </div>
                            <div className="membership-box mt-10 p-3 rounded-md">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <p className="futura-bold">BASIC PACKAGE</p>
                                    <p>The classes are in 3 speciality Studios, Energy Studio,</p>
                                </div>
                                <p>$1200</p>
                                </div>
                            </div>
                                {/* {data.packageList?.map((item)=>(
                                <p>{item.packageName}</p>
                                ))} */}
                            </div>
                        {/* ))} */}
                    </div>
                </div>
            </section>
        </>
    );
}
