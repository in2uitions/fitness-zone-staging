
import React, { useState, useEffect } from "react";
import nextConfig from "../next.config";
import moment from "moment";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { SearchOutlined } from "@material-ui/icons";

export default function App() {
    const [data, setData] = useState([]);
    const [location, setLocation] = useState([])
    const [name, setName] = useState("");
    const [filtered, setFiltered] = useState([]);
    const LEBANON = 'LB';
    const UAE = "AE";
    const login_credentials = {
        [LEBANON]: 'Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234',
        [UAE]: 'Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1'
    }
    const [selectedCategory, setSelectedCategory] = useState(0);
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();

    try {
        useEffect(() => {

            getData();
            async function getData() {
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Account/Login?${login_credentials[nextConfig.country_code]}`,
                    {
                        method: 'POST'
                    }
                );
                const token = await res.json();
                var registrationLoginHeaders = new Headers();
                registrationLoginHeaders.append("Authorization", "Bearer " + token.token);
                registrationLoginHeaders.append("Content-Type", "application/json");
                var registrationRequestOptions = {
                    method: 'GET',
                    headers: registrationLoginHeaders
                };
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Administration/Location/List`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const locationData = await response.json();
                    setLocation(locationData);
                }
                else {
                    setLocation([]);
                }

            }

        }, []);
    } catch (err) {
        console.log(err);
    }
    function getFilteredList(value = null) {

        const getClassList = async (val) => {
            try {

                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Account/Login?${login_credentials[nextConfig.country_code]}`,
                    {
                        method: 'POST'
                    }
                );
                const token = await res.json();
                var query = '';
                var query = `?dateFrom=${firstday}&dateTo=${lastday}`
                if (val) {
                    query = query + `${query != '' ? '&' : '?'}LocationCode=${val}`
                }
                try {
                    var registrationLoginHeaders = new Headers();
                    registrationLoginHeaders.append("Authorization", "Bearer " + token.token);
                    registrationLoginHeaders.append("Content-Type", "application/json");
                    var registrationRequestOptions = {
                        method: 'GET',
                        headers: registrationLoginHeaders
                    };
                    const res = await fetch(
                        `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList${query}`,
                        registrationRequestOptions
                    );

                    const dataClass = await res.json();
                    let classes = dataClass;
                    setData(classes);
                    setFiltered(classes);
                } catch (err) {
                    console.log(err);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getClassList(value);
    };

    const handleSearch = (event) => {
        setName(event.target.value)
        const filteredValue = data.filter((dt) =>
            `${dt.class?.className} ${dt.studio?.studioName} ${dt.location?.locationName} ${moment(dt.classTime).format("DD MMM YYYY")} ${moment(dt.classTime).format("HH:mm")}`.toLowerCase().includes(event.target.value.toLowerCase())

        );
        setFiltered(filteredValue);
    }
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        getFilteredList(event.target.value);
    }
    useEffect(() => {
        getFilteredList(selectedCategory);
    }, []);

    function handleClassChange(event) {
        if (event.target.id == "All") {
            setFiltered(data)
            console.log(event.target.id)
        } else {
            let newvalue = data.filter((item) => item.studio?.studioName === event.target.id)
            setFiltered(newvalue);
            console.log(event.target.id)
        }

    }

    return (
        <div className="container mx-auto mt-40 lg:px-28 md:px-20 px-3">
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
                    <select style={{ height: "2.5rem", borderRadius: "5px", paddingLeft: "10px" }} name="location" id="location" onChange={handleCategoryChange}>
                        {location.map((item, i) => (
                            <option key={i} value={item.locationCode} id="location" >{item.locationName}</option>
                        ))}
                    </select>
                </div>
            </div>

            <Tabs className="mt-5">
                <TabList className="flex justify-between w-full mx-auto container tabs-container">
                    <Tab className="notSelected cursor-pointer" id="All" >
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
                    <div className="flex justify-between w-full classes-box mb-3 mt-10 p-3 flex-wrap" key={index} id={item.studio?.studioName}>
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
                    </div>
                </>
            ))}
        </div>
    );
}


