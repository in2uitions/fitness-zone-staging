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
import ToggleText from "../login-process/test";

export default function Dashboard({ style = "white" }) {
    const [data, setData] = useState([]);
    try {
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





    








    const handleChange = (e, prevState, index) => {
        const object = {
            ...prevState,
            [index]: e.target?.value,
        };
        setData(object);
    };
    const [state, toggle] = useState(true);
    const [scdstate, scdtoggle] = useState(true);
    const [thirdstate, thirdtoggle] = useState(true);
    function handleSave(e) {
        e.preventDefault();
        setData(prevState => ({
            showButton: !prevState.showButton,
            showButtonName: "SAVING..."
        }));
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
                                        <a href='/login-process/membership' className="futura-book menu-member flex items-center justify-between">
                                            Membership Settings
                                            <ChevronRightIcon className="fill-[#009FE3]" />
                                        </a>
                                    </div>
                                    <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                        <p className="futura-book menu-member flex items-center justify-between text-white">
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
                    <div className=" mx-auto flex flex-col justify-center items-center mt-40">
                        {/* <div className="grid lg:grid-cols-12 gap-x-3 items-start mt-10 space-y-5 lg:space-y-0 md:space-y-0"> */}
                        <div className="w-full container mx-auto lg:flex lg:flex-row md:flex lg:space-x-3 md:space-x-3 justify-center items-start space-y-5 lg:space-y-0 md:space-y-0 px-4 lg:px-4 md:px-4">
                            <div className="flex flex-col lg:w-1/3 md:w-1/3">
                                <div className="flex flex-col space-y-2">
                                    <p className="text-[#009FE3]">General Info</p>
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        value={data.firstName}
                                    />
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md text-white"
                                        value={data.lastName}
                                    />
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black lg:h-10 md:h-10 h-16 rounded-md p-1">
                                        <input
                                            type="text"
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] text-white"
                                            value={data.birthdate}
                                            onChange={handleChange}
                                        />
                                        <button
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2 text-white"
                                            onClick={() => {
                                                toggle(!state);
                                                handleChange;
                                            }}
                                        >
                                            {state ? "CHANGE DATE OF BIRTH" : "SAVE"}
                                        </button>
                                    </div>
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black rounded-md lg:h-10 md:h-10 h-16 p-1 text-white">
                                        <input
                                            type="text"
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3]"
                                            value={data.mobile}
                                            onChange={handleChange}
                                        />
                                        <button
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2"
                                            onClick={() => {
                                                scdtoggle(!scdstate);
                                                handleChange;
                                            }}
                                        >
                                            {scdstate ? "CHANGE PHONE" : "SAVE"}
                                        </button>
                                    </div>
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black lg:h-10 md:h-10 h-16 p-1 rounded-md text-white">
                                        <input
                                            type="text"
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3]"
                                            value={data.email}
                                            onChange={handleChange}
                                        />
                                        <button
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold lg:text-sm md:text-sm text-xs lg:h-9 md:h-9 h-14 w-1/2"
                                            onClick={() => {
                                                thirdtoggle(!thirdstate);
                                                handleSave;
                                            }}
                                        >
                                            {thirdstate ? "CHANGE EMAIL" : "SAVE"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:w-1/3 md:w-1/3">
                                <div className="flex flex-col space-y-2 text-white">
                                    <p className="text-[#009FE3]">General Info</p>
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={data.country?.countryName}
                                    />
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={data.building}
                                    />
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={data.birthdate}
                                    />
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 lg:h-10 md:h-10 h-16 rounded-md"
                                        value={data.mobile}
                                    />
                                </div>
                            </div>
                            
                        </div>
                        <button className="bg-[#009FE3] p-2 lg:w-1/6 rounded-md futura-bold mt-5 text-white">UPDATE PROFILE</button>
                        </div>
                    {/* </div> */}
                </section>
            </>
        );
    }
