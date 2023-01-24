import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState, useEffect, useRef, useCallback } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import moment from 'moment';
import { BrowserView, MobileView } from "react-device-detect";
import { useRouter } from "next/router";
import { SearchOutlined } from "@material-ui/icons";
import Close from "@material-ui/icons/Close";
import PrivateMenu from "./private-menu";

export default function ClassListing() {
    var curr = new Date;
    const router = useRouter();
    const [books, setBooks] = useState(true)
    const [name, setName] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [data, setData] = useState([]);
    const [classs, setClasss] = useState([]);
    const [info, setInfo] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const itemSet = (localStorage.getItem("token") !== null);
    useEffect(() => {
        if (itemSet) {
            router.push({ pathname: "/account/classListing" });
        }
        else {
            router.push({ pathname: "/account/login" });
        }
    }, [])

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        getFilteredList(event.target.value);
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
                if (response.status == 200) {
                    const locationList = await response.json();
                    setData(locationList);
                }
            }

        }, []);
    } catch (err) {
        console.log(err);
    }
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
                    var memberType = fetchedData.membershipType.memberShipTypeName
                    setBooks(memberType);

                    // console.log(memberType)
                    if (memberType != "PLATINUM LS CORPORATE.") {
                        setIsDisabled(true);
                        handleCategoryChange({ target: { value: fetchedData.membershipLocation?.locationCode } })
                    }
                }
                // getDayByDay({ id: moment().toDate().getDay() })
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    useEffect(() => {
        getFilteredList(selectedCategory);
    }, [])
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    function getFilteredList(value = null) {

        const getClassList = async (val) => {
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
            var query = '';
            var query = `?dateFrom=${firstday}&dateTo=${lastday}`
            if (val) {
                query = query + `${query != '' ? '&' : '?'}LocationCode=${val}`
            }
            try {
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList${query}`,
                    registrationRequestOptions
                );

                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Member/${memberId}${query}`,
                    registrationRequestOptions
                );
                if (res.status == 200) {
                    const dataClass = await res.json();
                    let classes = dataClass;
                    if (response.status == 200) {
                        const fetchedData = await response.json();
                        classes = dataClass.map((result) => {
                            if (fetchedData.filter((res) => res.timetableId == result.timetableId).length == 1) {
                                return { ...result, toggle: true }
                            }
                            return { ...result, toggle: false }
                        })
                    }
                    setClasss(classes);
                    setFiltered(classes);
                    // console.log(classes)
                } else {
                    setClasss([]);
                    //    <div>loading...</div>;

                }

            } catch (err) {
                console.log(err);
            }

        };
        getClassList(value);
    };

    // function getDayByDay({ id }) {
    //     var date = moment().isoWeekday(id).format("DD-MMM-YYYY")
    //     setDate({
    //         "firstday": date,
    //         "lastday": date
    //     })
    //     // setDateNb(id - 1);
    //     // console.log(moment().toDate().getDay() - 1 );
    //     // console.log(date)
    // }

    const memberId = localStorage.getItem("Member");

    const reserveClass = async ({ timetableId, e }) => {
        e.preventDefault();
        // console.log(timetableId)
        try {
            var registrationHeaders = new Headers();
            registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            registrationHeaders.append("Content-Type", "application/json");
            var registrationRequestOptions = {
                method: 'GET',
                headers: registrationHeaders
            };
            const res = await fetch(
                `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Class/Reserve?timetableId=${timetableId}&memberId=${memberId}`,
                registrationRequestOptions
            );
            const data = await res.json();
            if (data.isValid == true) {

                let newClasssValue = classs.map((res) => {
                    if (res.timetableId == timetableId) {
                        // console.log(timetableId)
                        return {
                            ...res,
                            toggle: true,
                        }
                    }
                    return res;
                })
                setClasss(newClasssValue);
            }
            else {
                alert("Class is not valid");
            }

        } catch (err) {
            console.log(err);
        }
    };
    const removeClass = async ({ timetableId, e }) => {
        e.preventDefault();
        try {
            var registrationHeaders = new Headers();
            registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            registrationHeaders.append("Content-Type", "application/json");
            var registrationRequestOptions = {
                method: 'GET',
                headers: registrationHeaders
            };
            const res = await fetch(
                `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Class/Remove?timetableId=${timetableId}&memberId=${memberId}`,
                registrationRequestOptions
            );
            const data = await res.json();
            if (data.isValid == true) {

                let newClasssValue = classs.map((res) => {
                    if (res.timetableId == timetableId) {
                        // console.log(timetableId)
                        return {
                            ...res,
                            toggle: false,
                        }
                    }
                    return res;
                })
                setClasss(newClasssValue);
            }
            else {
                alert("Class is not valid");
            }

        } catch (err) {
            console.log(err);
        }

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
                    setInfo(fetchedData);
                }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }

    const handleSearch = (event) => {
        setName(event.target.value)
        const filteredValue = classs.filter((dt) =>
            `${dt.class?.className} ${dt.studio?.studioName} ${dt.location?.locationName} ${moment(dt.classTime).format("DD MMM YYYY")} ${moment(dt.classTime).format("HH:mm")}`.toLowerCase().includes(event.target.value.toLowerCase())

        );
        setFiltered(filteredValue);
    }
    function handleClassChange(event) {
        if (event.target.id == "All") {
            setFiltered(classs)
            console.log(event.target.id)
            console.log(classs)
        } else {
            let newvalue = classs.filter((item) => item.studio?.studioName === event.target.id)
            setFiltered(newvalue);
            console.log(event.target.id)
        }
    }
    return (
        <>
            <PrivateMenu />
            <section className="">
                <div className="lg:container mx-auto mt-40 lg:px-28 md:px-20 px-3 w-screen">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-[#009FE3] futura-bold text-4xl">LIST OF CLASSES</p>
                    </div>
                    <div className="flex w-full justify-between items-center mt-5">
                        <div className="flex items-center space-x-3">
                            <img src="/filterBy.png" />
                            <p className="futura-book text-white">Filter by</p>
                        </div>
                        {/* <p className="text-[#009FE3] futura-bold text-4xl">LIST OF CLASSES</p> */}
                        <div className="relative" style={{ width: "73%" }}>
                            <input type='text' name="search" id="search" className="w-full border border-gray-500 rounded-lg h-10 mt-5 mb-5 bg-transparent pl-4"
                                placeholder="Search" value={name}
                                onChange={handleSearch} />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <SearchOutlined
                                    className="h-4 w-4 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <select style={{ height: "2.5rem", borderRadius: "5px", paddingLeft: "10px" }} disabled={isDisabled} name="location" id="location" value={selectedCategory} onChange={handleCategoryChange} >
                                {data.map((item, i) => (
                                    <option key={i} value={item.locationCode} id="location" >{item.locationName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Tabs className="mt-5">
                        <TabList className="flex justify-between w-full mx-auto container tabs-container">
                            <Tab className="notSelected cursor-pointer" id="All">
                                <div className="flex items-center space-x-2" onClick={handleClassChange} type="button" id="All">
                                    <p className="text-2xl font-extrabold" id="All">All</p>
                                    <img src="/ONblue.png" className="on-tabs" id="All" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex items-center space-x-2" onClick={handleClassChange} type="button">
                                    <p className="text-2xl font-extrabold" id="NRG">ENERGY</p>
                                    <img src="/ONblue.png" className="on-tabs" id="NRG" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex items-center space-x-2" onClick={handleClassChange} type="button">
                                    <p className="text-2xl font-extrabold" id="BLNC">BALANCE</p>
                                    <img src="/ONblue.png" className="on-tabs" id="BLNC" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex justify-end items-center space-x-2" onClick={handleClassChange} type="button">
                                    <p className="text-2xl font-extrabold" id="PWR">POWER</p>
                                    <img src="/ONblue.png" className="on-tabs" id="PWR" />{" "}
                                </div>
                            </Tab>
                        </TabList>
                    </Tabs>
                    {filtered.map((item, index) => (
                        <>
                            <div className="flex justify-between w-full classes-box mb-3 mt-10 p-3 flex-wrap" key={index}>
                                <div className="flex justify-start w-3/4">
                                    <p className="text-white text-md sizemobile lg:border-r md:border-r border-[#009FE3] lg:pr-3 md:pr-3 futura-book w-1/5">
                                        {item.class?.className}
                                    </p>
                                    <p className="lg:border-r md:border-r border-white text-white lg:pl-5 md:pl-5 pl-5 lg:pr-3 md:pr-3 futura-book text-md sizemobile w-1/5">
                                        {item.studio?.studioName}
                                    </p>
                                    <p className='text-white futura-book lg:pl-5 md:pl-5 pl-5 lg:pr-5 md:pr-5 text-md sizemobile lg:border-r md:border-r border-[#009FE3] w-1/5'>{moment(item.classTime).format("DD MMM YYYY")}</p>
                                    <p className='text-white futura-book lg:pl-5 md:pl-5 pl-5 lg:pr-5 md:pr-5 text-md sizemobile lg:border-r md:border-r border-white w-1/5'>{moment(item.classTime).format("HH:mm")}</p>
                                    <p className="text-white text-md sizemobile futura-book lg:pl-5 md:pl-5 pl-5 w-1/5">
                                        {item.location?.locationName}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        className="flex justify-end"
                                    >
                                        {!item?.toggle ? (
                                            <div className="flex space-x-2 items-center" onClick={(e) => reserveClass({ timetableId: item.timetableId, e })}>
                                                <img src="/notBooked.png" />
                                                <p className="text-[#009FE3] futura-book text-md sizemobile">Book class</p>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-2 items-center">
                                                <img src="/booked.png" />
                                                <p className="futura-book text-white text-md sizemobile">Booked</p>
                                                <p className=" text-[#009FE3] futura-bold text-sm" onClick={(e) => removeClass({ timetableId: item.timetableId, e })}>
                                                    Cancel
                                                    <Close className="cancel-close" />
                                                </p>
                                            </div>

                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                {/* <div ref={buttonRef} style={{ display: "none" }}>
                    <a id="buttonss" onClick={()=>{  $('html, body').animate({ scrollTop: 0 }, '300')}} className="m-10"><ArrowUpward/></a>
                </div> */}
            </section>
        </>
    );
}

