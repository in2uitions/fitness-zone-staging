import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState, useEffect } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";

export default function ClassListing() {
    const [data, setData] = useState([]);
    const [classs, setClasss] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('0');
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        console.log(event.target.value)
        getFilteredList(event.target.value);
        console.log(event.target.value)
        console.log(selectedCategory + "categoryy")
    }
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
                    `https://api.fitnessclubapp.com/api/Administration/Location/List`,
                    registrationRequestOptions
                );
                const checkInList = await response.json();
                setData(checkInList);
                console.log(checkInList + "wyy");
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    // const submitLogIn = async event => {
        // setSelectedCategory(event.target.value);
        // console.log(event.target.value + "---___---")
        
        function getFilteredList() {
            
        const getValidOtp = async () => {
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
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList?dateFrom=18-Dec-2022&dateTo=24-Dec-2022&LocationCode=${selectedCategory}`,
                    registrationRequestOptions
                );
                const dataClass = await res.json();
                setClasss(dataClass);
            } catch (err) {
                console.log(err);
            }
        };
        getValidOtp();
    };
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList?dateFrom=18-Dec-2022&dateTo=24-Dec-2022&LocationCode=${selectedCategory}`,
                    registrationRequestOptions
                );
                const fetchedData = await response.json();
                setClasss(fetchedData);
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const [state, toggle] = useState(true);
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
                                    <a
                                        href="/login-process/membership"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        Membership Settings
                                        <ChevronRightIcon className="fill-[#009FE3]" />
                                    </a>
                                </div>
                                <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a
                                        href="/login-process/classListing"
                                        className="futura-book menu-member flex items-center justify-between text-white"
                                    >
                                        Classes / Book a class
                                        <ChevronRightIcon className="fill-[#009FE3]" />
                                    </a>
                                    <a
                                        href="/login-process/trainers"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        Trainers / Book a package
                                        <ChevronRightIcon className="fill-[#009FE3]" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </nav>
            </div>

            <div className="container mx-auto mt-40 px-20">
                <p className="text-[#009FE3] futura-bold text-4xl">BOOK A CLASS</p>
                <div className="flex justify-between mt-5">
                    <div className="flex items-center space-x-5">
                        <img src="/filterBy.png" />
                        <p className="futura-book">Filter by</p>
                    </div>
                    <select name="type" className="text-white futura-bold">
                        <option key="">Type/class</option>
                    </select>
                    {/* <select name="location" id='location' onChange={submitOTP}> */}
                    {/* {data.map((item) => ( */}
                    {/* <form onSubmit={getValidOtp}>
                        <input id='location'  />
                        <button type='submit'>submit</button>
                        </form> */}
                    {/* ))} */}
                    {/* </select> */}
                    <select name="location" id="location" onChange={handleCategoryChange} >
                        {data.map((item, i) => (
                            <option key={i} value={item.locationCode} id="location" >{item.locationName}</option>
                        ))}
                    </select>
                </div>
                <Tabs className="mt-5">
                    <TabList className="flex justify-between w-full mx-auto container tabs-container">
                        <Tab className="notSelected">
                            <div className="flex items-start space-x-2">
                                <p className="text-2xl futura-bold">ENERGY</p>
                                <img src="/ONblue.png" className="on-tabs" />{" "}
                            </div>
                        </Tab>
                        <Tab className="notSelected">
                            <div className="flex items-start space-x-2">
                                <p className="text-2xl futura-bold">BALANCE</p>
                                <img src="/ONblue.png" className="on-tabs" />{" "}
                            </div>
                        </Tab>
                        <Tab className="notSelected">
                            <div className="flex justify-end items-start space-x-2">
                                <p className="text-2xl futura-bold">POWER</p>
                                <img src="/ONblue.png" className="on-tabs" />{" "}
                            </div>
                        </Tab>
                    </TabList>
                </Tabs>
                <Tabs className="mt-3">
                    <TabList className="flex justify-between w-full mx-auto container tabs-container">
                        <Tab className="tabColor">
                            <div className="flex justify-start tab">M</div>
                        </Tab>
                        <Tab className="tabColor">
                            <div className="flex justify-center tab">T</div>
                        </Tab>
                        <Tab className="tabColor">
                            <div className="flex justify-center tab">W</div>
                        </Tab>
                        <Tab className="tabColor">
                            <div className="flex justify-center tab">TH</div>
                        </Tab>
                        <Tab className="tabColor">
                            <div className="flex justify-center tab">F</div>
                        </Tab>
                        <Tab className="tabColor">
                            <div className="flex justify-center tab">S</div>
                        </Tab>
                        <Tab className="tabColor">
                            <div className="flex justify-end tab">S</div>
                        </Tab>
                    </TabList>
                </Tabs>
                {classs.map((item) => (
                    <>
                        <div className="flex justify-between w-full classes-box mb-3 mt-10 p-3">
                            <div className="flex justify-start">
                                <p className="text-white text-md border-r border-[#009FE3] pr-3 futura-book">
                                    {item.class?.className}
                                </p>
                                <p className="border-r border-white text-white pl-10 pr-3 futura-book">
                                    {item.studio?.studioName}
                                </p>
                                <p className="text-white text-lg futura-book pl-5">
                                    {item.classTime}
                                </p>
                                <p className="text-white text-lg futura-book pl-5">
                                    {item.location?.locationName}
                                </p>
                            </div>
                            <button
                                className="flex justify-end"
                                onClick={() => {
                                    toggle(!state);
                                }}
                            >
                                {state ? (
                                    <div className="flex space-x-2 items-center">
                                        <img src="/notBooked.png" />
                                        <p className="text-[#009FE3] futura-book">Book class</p>
                                    </div>
                                ) : (
                                    <div className="flex space-x-2 items-center">
                                        <img src="/booked.png" />
                                        <p className="futura-book">Booked</p>
                                    </div>
                                )}
                            </button>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}
