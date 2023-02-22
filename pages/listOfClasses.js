
import React, { useState, useEffect } from "react";
import nextConfig from "../next.config";
import moment from "moment";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { SearchOutlined } from "@material-ui/icons";
import { BrowserView, MobileView } from "react-device-detect";

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
    const [selectedCategory, setSelectedCategory] = useState(1);
    // var curr = new Date;
    // var first = curr.getDate() - curr.getDay();
    // var last = first + 6;

    // var firstday = new Date(curr.setDate(first)).toUTCString();
    // var lastday = new Date(curr.setDate(last)).toUTCString();
    
    var now = moment();
    var begin = moment().startOf('week').format("YYYY MM DD");
    var end = moment().endOf('week').format("YYYY MM DD");
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
                var query = `?dateFrom=${begin}&dateTo=${end}`
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
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        getFilteredList(event.target.value);
    }
    useEffect(() => {
        getFilteredList(selectedCategory);
    }, []);
    const [save, setSave] = useState('')
    function handleClassChange(event) {
        if (event.target.id == "All") {
        setSave("")

            // setFiltered(data)
            if (name == '') {
                setFiltered(data)
            }
            else {

                const filteredValue = data.filter((dt) =>
                    handleClassChangeWithSearch(dt, "", name)
                );
                setFiltered(filteredValue)
                // console.log(name)
                // console.log(event.target.id)
            }
            
        } else {
        setSave(event.target.id)

            let newvalue = data.filter((item) => handleClassChangeWithSearch(item, event.target.id, name))
            setFiltered(newvalue);

        }
    }
    function handleClassChangeWithSearch(item, valuename, value) {
        if (value != '' && valuename != '') {
            return item.studio.studioName === valuename && `${item.class?.className} ${item.studio?.studioName} ${item.location?.locationName} ${moment(item.classTime).format("DD MMM YYYY")} ${moment(item.classTime).format("HH:mm")}`.toLowerCase().includes(value.toLowerCase())
        }
        else if (value == '' && valuename != '') {
            return item.studio.studioName === valuename
        }
        else if (value != '' && valuename == '') {
            return `${item.class?.className} ${item.studio?.studioName} ${item.location?.locationName} ${moment(item.classTime).format("DD MMM YYYY")} ${moment(item.classTime).format("HH:mm")}`.toLowerCase().includes(value.toLowerCase())
        }
    }
    const handleSearch = (event) => {
        setName(event.target.value)
        if (event.target.value == '') {
            setFiltered(data)
        }
        else {
            const filteredValue = data.filter((dt) =>
                handleClassChangeWithSearch(dt, save , event.target.value)
            );
            setFiltered(filteredValue);
        }
        console.log(data)
    }

    return (
        <div className="container mx-auto mt-40 lg:px-28 md:px-20 px-3">
            <div className="flex flex-col justify-center items-center">
                <p className="text-[#009FE3] futura-bold lg:text-4xl md:text-4xl text-3xl">LIST OF CLASSES</p>
            </div>
            <BrowserView>
            <div className="flex w-full justify-between items-center mt-5">
                <div className="flex items-center space-x-3">
                    <img src="/filterBy.png" />
                    <p className="futura-book text-white">Filter by</p>
                </div>
                {/* <p className="text-[#009FE3] futura-bold text-4xl">LIST OF CLASSES</p> */}
                <div className="relative" style={{ width: "73%" }}>
                    <input type='text' name="search" id="search" className="w-full border border-gray-500 rounded-lg h-10 mt-5 mb-5 bg-transparent pl-4 input-search"
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
                            <>
                            {item.isActive ?<option key={i} value={item.locationCode} id="location" >{item.locationName}</option>:null}
                            </>
                        ))}
                    </select>
                </div>
            </div>
            </BrowserView>
            <MobileView>
            <div className="flex w-full justify-between items-center mt-5">
                <div className="flex items-center space-x-3">
                    <img src="/filterBy.png" />
                    <p className="futura-book text-white">Filter by</p>
                </div>
                {/* <p className="text-[#009FE3] futura-bold text-4xl">LIST OF CLASSES</p> */}
                <div className="relative" style={{ width: "35%" }}>
                    <input type='text' name="search" id="search" className="w-full border border-gray-500 rounded-lg h-10 mt-5 mb-5 bg-transparent pl-4 input-search"
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
                    <select style={{ height: "2.5rem", borderRadius: "5px"}} name="location" id="location" onChange={handleCategoryChange}>
                        {location.map((item, i) => (
                            <>
                            {item.isActive ?<option key={i} value={item.locationCode} id="location" >{item.locationName}</option>:null}
                            </>
                        ))}
                    </select>
                </div>
            </div>
            </MobileView>
            <BrowserView>
            <Tabs className="mt-5">
                        <TabList className="flex justify-between w-full mx-auto container tabs-container" >
                            <Tab className="notSelected cursor-pointer" id="All">
                                <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button" id="All">
                                    <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" id="All">All</p>
                                    <img src="/ONblue.png" className="on-tabs" id="All" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" id="NRG">ENERGY</p>
                                    <img src="/ONblue.png" className="on-tabs" id="NRG" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" id="BLNC">BALANCE</p>
                                    <img src="/ONblue.png" className="on-tabs" id="BLNC" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex justify-end items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" id="PWR">POWER</p>
                                    <img src="/ONblue.png" className="on-tabs" id="PWR" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex justify-end items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" id="POOL">POOL</p>
                                    <img src="/ONblue.png" className="on-tabs" id="POOL" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex justify-end items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" id="Tennis">TENNIS</p>
                                    <img src="/ONblue.png" className="on-tabs" id="Tennis" />{" "}
                                </div>
                            </Tab>
                        </TabList>
                    </Tabs>
                    </BrowserView>
                    <MobileView>
                    <Tabs className="mt-5">
                        <TabList className="grid grid-cols-3 w-full mx-auto container tabs-container" >
                            <Tab title="nested" className="notSelected cursor-pointer" id="All">
                                <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button" id="All">
                                    <p className="text-base font-extrabold" id="All">All</p>
                                    <img src="/ONblue.png" className="on-tabs" id="All" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="text-base font-extrabold" id="NRG">ENERGY</p>
                                    <img src="/ONblue.png" className="on-tabs" id="NRG" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="text-base font-extrabold" id="BLNC">BALANCE</p>
                                    <img src="/ONblue.png" className="on-tabs" id="BLNC" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="text-base font-extrabold" id="PWR">POWER</p>
                                    <img src="/ONblue.png" className="on-tabs" id="PWR" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="text-base font-extrabold" id="POOL">POOL</p>
                                    <img src="/ONblue.png" className="on-tabs" id="POOL" />{" "}
                                </div>
                            </Tab>
                            <Tab className="notSelected cursor-pointer">
                                <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" onClick={handleClassChange} type="button">
                                    <p className="text-base font-extrabold" id="Tennis">TENNIS</p>
                                    <img src="/ONblue.png" className="on-tabs" id="Tennis" />{" "}
                                </div>
                            </Tab>
                           
                        </TabList>
                    </Tabs>
                    </MobileView>
                    <BrowserView>
            {filtered.sort((a, b) => new Date(a.classTime) - new Date(b.classTime)).map((item, index) => (
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
            </BrowserView>
            <MobileView>
            {filtered.map((item, index) => (
                <>
                    <div className="flex justify-between w-full classes-box mb-3 mt-10 p-3 flex-wrap" key={index} id={item.studio?.studioName}>
                        <div className="flex justify-between w-full">
                            <p className="text-white text-md border-r border-[#009FE3] futura-book sizemobile pr-3">
                                {item.class?.className}
                            </p>
                            <p className="border-r border-white text-white futura-book text-md sizemobile pr-3">
                                {item.studio?.studioName}
                            </p>
                            <p className='text-white futura-book text-md sizemobile border-r border-[#009FE3] pr-3'>{moment(item.classTime).format("DD MMM YYYY")}</p>
                            <p className='text-white futura-book text-md sizemobile border-r border-white pr-3'>{moment(item.classTime).format("HH:mm")}</p>
                            <p className="text-white text-md futura-book sizemobile">
                                {item.location?.locationName}
                            </p>
                        </div>
                    </div>
                </>
            ))}
            </MobileView>
        </div>
    );
}


