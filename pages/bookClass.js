import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState, useEffect } from "react";
import moment from 'moment';
import nextConfig from "../next.config";
import { BrowserView, MobileView } from "react-device-detect";

export default function ClassListing() {
    var curr = new Date;
    const [classs, setClasss] = useState([]);
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
                        `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList?dateFrom=${firstDate.firstday}&dateTo=${firstDate.lastday}&LocationCode=${location}`,
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
    }
    const memberId = localStorage.getItem("Member");

    const reserveClass = async ({ timetableId, e }) => {
        e.preventDefault();
        console.log(timetableId)
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
    return (
        <>
            <div className="container mx-auto mt-40 lg:px-28 md:px-20 px-3">
                <p className="text-[#009FE3] futura-bold text-4xl">BOOK A CLASS</p>
                {/* <div className="flex justify-between mt-5">
                    <div className="flex items-center space-x-5">
                        <img src="/filterBy.png" />
                        <p className="futura-book text-white">Filter by</p>
                    </div>
                </div> */}
                <MobileView>
                <Tabs className="mt-10">
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
                <Tabs className="mt-10">
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
                            <div className="flex justify-start">
                                <p className="text-white text-md lg:border-r md:border-r border-[#009FE3] lg:pr-3 md:pr-3 futura-book sizemobile">
                                    {item.class?.className}
                                </p>
                                <p className="lg:border-r md:border-r border-white text-white lg:pl-5 md:pl-5 pl-5 lg:pr-3 md:pr-3 futura-book text-md sizemobile">
                                    {item.studio?.studioName}
                                </p>
                                <p className="text-white futura-book lg:pl-5 md:pl-5 pl-5 text-md sizemobile">
                                    {item.classTime}
                                </p>
                                <p className="text-white text-md futura-book lg:pl-5 md:pl-5 pl-5 sizemobile">
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
