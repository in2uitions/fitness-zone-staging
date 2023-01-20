import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState, useEffect } from "react";
import moment from 'moment';
import nextConfig from "../next.config";
import { BrowserView, MobileView } from "react-device-detect";
import { SearchOutlined } from "@material-ui/icons";

export default function ClassListing() {
    var curr = new Date;
    const [classs, setClasss] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [listData, setListData] = useState([]);
    const [dateNb, setDateNb] = useState(0)
    const [firstDate, setDate] = useState({
        "firstday": new Date(curr.setDate(curr.getDate() - curr.getDay())).toUTCString(),
        "lastday": new Date(curr.setDate((curr.getDate() - curr.getDay()) + 6)).toUTCString()
    })
    const LEBANON = 'LB';
    const UAE = "AE";
    const login_credentials = {
        [LEBANON]: 'Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234',
        [UAE]: 'Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1'
    }
    const [selectedCategory, setSelectedCategory] = useState(0);
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        getFilteredList(event.target.value);
    }
    const location = localStorage.getItem("Location");
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
        getFilteredList();
    }, [firstDate])
    function getFilteredList() {

        const getClassList = async () => {
            try {

                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Account/Login?${login_credentials[nextConfig.country_code]}`,
                    {
                        method: 'POST'
                    }
                );
                const token = await res.json();

                try {
                    var registrationLoginHeaders = new Headers();
                    registrationLoginHeaders.append("Authorization", "Bearer " + token.token);
                    registrationLoginHeaders.append("Content-Type", "application/json");
                    var registrationRequestOptions = {
                        method: 'GET',
                        headers: registrationLoginHeaders
                    };
                    const res = await fetch(
                        `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList?dateFrom=${firstDate.firstday}&dateTo=${firstDate.lastday}`,
                        registrationRequestOptions
                    );
                    const response = await fetch(
                        `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Member/${memberId}?dateFrom=${firstDate.firstday}&dateTo=${firstDate.lastday}`,
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
                    } else {
                        setClasss([]);
                    }

                } catch (err) {
                    console.log(err);
                }

            } catch (err) {
                console.log(err);
            }
        };
        getClassList();
    };
    function getDayByDay({ id }) {
        var date = moment().isoWeekday(id).format("DD-MMM-YYYY")
        setDate({
            "firstday": date,
            "lastday": date
        })
        setDateNb(id - 1);
    }
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
    try {
        useEffect(() => {

            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Administration/Location/List`,
                    registrationRequestOptions
                );
                const checkInList = await response.json();
                setListData(checkInList);
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    return (
        <>
            <div className="container mx-auto mt-40 lg:px-28 md:px-20 px-3">

                <div className="flex justify-between mt-5">
                    <div className="flex items-center space-x-5">
                        <img src="/filterBy.png" />
                        <p className="futura-book text-white">Filter by</p>
                    </div>
                    <p className="text-[#009FE3] futura-bold text-4xl">LIST OF CLASSES</p>

                    <select name="location" id="location" >
                        {listData.map((item, i) => (
                            <option key={i} value={item.locationCode} id="location" >{item.locationName}</option>
                        ))}
                    </select>
                </div>
                <div className="relative">
                    <input type='text' name="search" id="search" className="w-full border border-gray-500 rounded-lg h-10 mt-5 mb-5 bg-transparent pl-4"
                        placeholder="Search" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <SearchOutlined
                            className="h-4 w-4 text-gray-400"
                            aria-hidden="true"
                        />
                    </div>
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
                <MobileView>
                    <Tabs selectedIndex={dateNb} className="mt-10">
                        <TabList className="flex justify-between w-full lg:mx-auto lg:container tabs-container">
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 1 })}>
                                <div className="flex justify-start tab">M</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 2 })}>
                                <div className="flex justify-center tab">T</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 3 })}>
                                <div className="flex justify-center tab">W</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 4 })}>
                                <div className="flex justify-center tab">TH</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 5 })}>
                                <div className="flex justify-center tab">F</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 6 })}>
                                <div className="flex justify-center tab">S</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 7 })}>
                                <div className="flex justify-end tab">S</div>
                            </Tab>
                        </TabList>
                    </Tabs>
                </MobileView>
                <BrowserView>
                    <Tabs selectedIndex={dateNb} className="mt-10">
                        <TabList className="flex justify-between w-full lg:mx-auto lg:container tabs-container">
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 1 })}>
                                <div className="flex justify-start tab">Monday</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 2 })}>
                                <div className="flex justify-center tab">Tuesday</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 3 })}>
                                <div className="flex justify-center tab">Wednesday</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 4 })}>
                                <div className="flex justify-center tab">Thursday</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 5 })}>
                                <div className="flex justify-center tab">Friday</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 6 })}>
                                <div className="flex justify-center tab">Saturday</div>
                            </Tab>
                            <Tab className="tabColor" onClick={() => getDayByDay({ id: 7 })}>
                                <div className="flex justify-end tab">Sunday</div>
                            </Tab>
                        </TabList>
                    </Tabs>
                </BrowserView>
                {classs.map((item, index) => (
                    <>
                        <div className="flex justify-between w-full classes-box mb-3 mt-10 p-3 flex-wrap" key={index}>
                            <div className="flex justify-start w-full">
                                <p className="text-white text-md lg:border-r md:border-r border-[#009FE3] lg:pr-3 md:pr-3 futura-book sizemobile w-1/5">
                                    {item.class?.className}
                                </p>
                                <p className="lg:border-r md:border-r border-white text-white lg:pl-5 md:pl-5 pl-5 lg:pr-3 md:pr-3 futura-book text-md sizemobile w-1/5">
                                    {item.studio?.studioName}
                                </p>
                                <p className='text-white futura-book lg:pl-5 md:pl-5 pl-5 lg:pr-5 md:pr-5 text-md sizemobile lg:border-r md:border-r border-[#009FE3] w-1/5'>{moment(item.classTime).format("DD MMM YYYY")}</p>
                                <p className='text-white futura-book lg:pl-5 md:pl-5 pl-5 lg:pr-5 md:pr-5 text-md sizemobile lg:border-r md:border-r border-white w-1/5'>{moment(item.classTime).format("HH:mm")}</p>
                                <p className="text-white text-md futura-book lg:pl-5 md:pl-5 pl-5 sizemobile w-1/5">
                                    {item.location?.locationName}
                                </p>
                            </div>
                            {/* <div>
                                <button
                                    className="flex justify-end"
                                    onClick={(e) =>  reserveClass({ timetableId: item.timetableId, e })}
                                >
                                    {!item?.toggle ? (
                                        <div className="flex space-x-2 items-center">
                                            <img src="/notBooked.png" />
                                            <p className="text-[#009FE3] futura-book lg:text-md md:text-md text-sm ">Book class</p>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-2 items-center">
                                            <img src="/booked.png" />
                                            <p className="futura-book text-white lg:text-md md:text-md text-sm ">Booked</p>
                                        </div>
                                    )}
                                </button>
                            </div> */}
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}