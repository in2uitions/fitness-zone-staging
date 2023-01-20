
import React, { useState, useEffect } from "react";
import nextConfig from "../next.config";
import moment from "moment";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { SearchOutlined } from "@material-ui/icons";

export default function App() {
    const [data, setData] = useState([]);
    const [location, setLocation] = useState([])
    const [name, setName] = useState("");
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
        console.log(event.target.value)
    }
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();

    const getTokenAPI = async () => {
        try {
            const res = await fetch(
                `https://api.fitnessclubapp.com/api/Account/Login?${login_credentials[nextConfig.country_code]}`,
                {
                    method: 'POST'
                }
            );
            const tokenData = await res.json();
            localStorage.setItem('tokenData', tokenData.token);


        } catch (err) {
            console.log(err);
        }
    };
    getTokenAPI();

    var registrationHeaders = new Headers();
    registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("tokenData"));
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
                
                    const dataClass = await res.json();
                    let classes = dataClass;
                    setData(classes);
               
            } catch (err) {
                console.log(err);
            }

        };
        getClassList(value);
    };

    const filtered = data.filter((dt) =>
        `${dt.class?.className} ${dt.studio?.studioName} ${dt.location?.locationName} ${moment(dt.classTime).format("DD MMM YYYY")} ${moment(dt.classTime).format("HH:mm")}`.toLowerCase().includes(name.toLowerCase())
    );
    useEffect(() => {
        getFilteredList(selectedCategory);
    }, []);
    return (
        <div className="container mx-auto mt-40 lg:px-28 md:px-20 px-3">

            <div className="flex justify-between mt-5">
                <div className="flex items-center space-x-5">
                    <img src="/filterBy.png" />
                    <p className="futura-book text-white">Filter by</p>
                </div>
                <p className="text-[#009FE3] futura-bold text-4xl">LIST OF CLASSES</p>

                <select name="location" id="location" onChange={handleCategoryChange}>
                    {location.map((item, i) => (
                        <option key={i} value={item.locationCode} id="location" >{item.locationName}</option>
                    ))}
                </select>
            </div>
            <div className="relative">
                <input type='text' name="search" id="search" className="w-full border border-gray-500 rounded-lg h-10 mt-5 mb-5 bg-transparent pl-4"
                    placeholder="Search" value={name}
                    onChange={(e) => setName(e.target.value)} />
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
            {filtered.map((item, index) => (
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
                    </div>
                </>
            ))}
        </div>
    );
}


