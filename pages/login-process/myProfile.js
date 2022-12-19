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
                    <div className="w-3/4 mx-auto flex flex-col justify-center mt-40">
                        <div className="grid lg:grid-cols-12 gap-x-3 items-start mt-10 space-y-5 lg:space-y-0 md:space-y-0">
                            <div className="col-span-6">
                                <div className="flex flex-col space-y-2">
                                    <p className="text-[#009FE3]">General Info</p>
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 h-10 rounded-md"
                                        value={data.firstName}
                                    />
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 h-10 rounded-md"
                                        value={data.lastName}
                                    />
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black h-10 rounded-md">
                                        <input
                                            type="text"
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3]"
                                            value={data.birthdate}
                                            onChange={handleChange}
                                        />
                                        <div
                                            className="bg-[#009FE3] lg:p-1 rounded-md futura-bold "
                                            onClick={() => {
                                                toggle(!state);
                                                handleChange;
                                            }}
                                        >
                                            {state ? "CHANGE DATE OF BIRTH" : "SAVE"}
                                            <ChevronRightIcon className="arrow-membership" />
                                        </div>
                                    </div>
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black h-10 rounded-md">
                                        <input
                                            type="text"
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3]"
                                            value={data.mobile}
                                            onChange={handleChange}
                                        />
                                        <div
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold "
                                            onClick={() => {
                                                scdtoggle(!scdstate);
                                                handleChange;
                                            }}
                                        >
                                            {scdstate ? "CHANGE PHONE" : "SAVE"}
                                            <ChevronRightIcon className="arrow-membership" />
                                        </div>
                                    </div>
                                    <div className="border border-[#009FE3] flex justify-between items-center bg-black h-10 rounded-md">
                                        <input
                                            type="text"
                                            className="bg-transparent pl-2 border-none focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3]"
                                            value={data.email}
                                            onChange={handleChange}
                                        />
                                        <div
                                            className="bg-[#009FE3] p-1 rounded-md futura-bold "
                                            onClick={() => {
                                                thirdtoggle(!thirdstate);
                                                handleSave;
                                            }}
                                        >
                                            {thirdstate ? "CHANGE EMAIL" : "SAVE"}
                                            <ChevronRightIcon className="arrow-membership" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="flex flex-col space-y-2">
                                    <p className="text-[#009FE3]">General Info</p>
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 h-10 rounded-md"
                                        value={data.country?.countryName}
                                    />
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 h-10 rounded-md"
                                        value={data.building}
                                    />
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 h-10 rounded-md"
                                        value={data.birthdate}
                                    />
                                    <input
                                        className="border border-[#009FE3] bg-black pl-2 h-10 rounded-md"
                                        value={data.mobile}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
