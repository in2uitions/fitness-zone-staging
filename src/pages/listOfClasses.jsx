import React, { useState, useEffect } from "react";
import moment from "moment";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { BrowserView, MobileView } from "react-device-detect";
import DarkTheme from "../layouts/Dark";
import { useRouter } from "next/router";
import { PuffLoader } from "react-spinners";

export default function App() {
    const [data, setData] = useState([]);
    const [location, setLocation] = useState([])
    const [name, setName] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const LEBANON = 'LB';
    const UAE = "AE";
    const login_credentials = {
        [LEBANON]: 'Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234',
        [UAE]: 'Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1'
    }
    const router = useRouter();
    const locationValue = router.query;
    console.log(locationValue , "hello")
    const [selectedCategory, setSelectedCategory] = useState(1);
    const todayTime = moment().format("DD MMM YYYY HH:mm")
    var now = moment();
    var begin = moment().startOf('week').format("YYYY MM DD");
    var end = moment(todayTime).add(7, 'days').format("YYYY MM DD");
 


    useEffect(() => {
        const getVisitorLocationAPI = async () => {
            try {
                const res = await fetch(`https://ipapi.co/json/`);
                const locationCode = await res.json();
                if (locationCode.country_code === 'LB') {
                    try {
                        const res = await fetch(`https://api.fitnessclubapp.com/api/Account/Login?Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234`, {
                            method: 'POST'
                        });
                        const token = await res.json();
                        var registrationLoginHeaders = new Headers();
                        registrationLoginHeaders.append(
                            'Authorization',
                            'Bearer ' + token.token
                        );
                        registrationLoginHeaders.append(
                            'Content-Type',
                            'application/json'
                        );
                        var registrationRequestOptions = {
                            method: 'GET',
                            headers: registrationLoginHeaders
                        };
                        const response = await fetch(
                            `https://api.fitnessclubapp.com/api/Administration/Location/List`,
                            registrationRequestOptions
                        );
                        if (response.status === 200) {
                            const locationData = await response.json();
                            setLocation(locationData);
                            handleCategoryChange({ target: { value: locationValue.locationCode } })
                        } else {
                            setLocation([]);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                } 
                else if (locationCode.country_code === 'AE') {
                    try {
                        const res = await fetch(`https://api.fitnessclubapp.com/api/account/login?Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1`, {
                            method: 'POST'
                        });
                        const token = await res.json();
                        var registrationLoginHeaders = new Headers();
                        registrationLoginHeaders.append(
                            'Authorization',
                            'Bearer ' + token.token
                        );
                        registrationLoginHeaders.append(
                            'Content-Type',
                            'application/json'
                        );
                        var registrationRequestOptions = {
                            method: 'GET',
                            headers: registrationLoginHeaders
                        };
                        const response = await fetch(
                            `https://api.fitnessclubapp.com/api/Administration/Location/List`,
                            registrationRequestOptions
                        );
                        if (response.status === 200) {
                            const locationData = await response.json();
                            setLocation(locationData);
                        } else {
                            setLocation([]);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        getVisitorLocationAPI();
    }, [locationValue.locationCode]);



    function getFilteredList(value = null) {

        const getClassList = async (val) => {
            try {
                const res = await fetch(`https://ipapi.co/json/`);
                const locationCode = await res.json();
                if (locationCode.country_code === 'LB') {
            try {

                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Account/Login?Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234`,
                    {
                        method: 'POST'
                    }
                );
                const token = await res.json();
                var query = '';
                var query = `?dateFrom=${begin}&dateTo=${end}`
                if (locationValue && locationValue.locationCode) {
                    query = query + `${query !== '' ? '&' : '?'}LocationCode=${locationValue.locationCode}`;
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
                    setLoading(false);
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        else if(locationCode.country_code === 'AE'){
            try {

                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/account/login?Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1`,
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
                    setLoading(false);
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            } 
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
                handleClassChangeWithSearch(dt, save, event.target.value)
            );
            setFiltered(filteredValue);
        }
        // console.log(data)
    }

    return (
        <DarkTheme>
        {loading ? 
            (
                <div className="spinner" style={{display:"flex",width:"100vw", height:"100vh", justifyContent:"center", alignItems:"center"}}>
                <PuffLoader style={{width:"40px"}}/>
               </div>
            ) : 
            (
        <div className="container mx-auto mt-40 lg:px-28 md:px-20 px-3"
            style={{width:"100%", marginLeft:"auto", marginRight:"auto", paddingLeft:"0.75rem", paddingRight:"0.75rem"}}>
            <div className="flex flex-col justify-center items-center"
                style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <p className="text-[#009FE3] futura-bold lg:text-4xl md:text-4xl text-3xl"
                style={{color:"rgb(25, 144, 223)", fontFamily:"Montserrat", fontSize:"2rem"}}>LIST OF CLASSES</p>
            </div>
            <BrowserView>
                <div className="flex w-full justify-between items-center "
                style={{display:"flex", width:"100%", justifyContent:"space-between", alignItems:"center", marginTop:"1.25rem"}}>
                    <div className="flex items-center space-x-3" style={{display:"flex", alignItems:"center", gap:"0.75rem"}}>
                        <img src="/filterBy.png" />
                        <p style={{whiteSpace:"nowrap"}} className="futura-book text-white">Filter by</p>
                    </div>
                    {/* <p className="text-[#009FE3] futura-bold text-4xl">LIST OF CLASSES</p> */}
                    <div className="relative" style={{ width: "73%", position:"relative" }}>
                        <input type='text' name="search" id="search" 
                        className="w-full border border-gray-500 rounded-lg h-10 mb-5 bg-transparent pl-4 input-search"
                        style={{width:"100%",color:"white", border:"1px solid grey", borderRadius:"10px", height:"2.5rem", marginTop:"1.25rem", marginBottom:"1.25rem" , background:"transparent", paddingLeft:"1rem"}}
                            placeholder="Search" value={name}
                            onChange={handleSearch} />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            {/* <SearchOutlined
                                className="h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            /> */}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <select style={{ height: "2.5rem", borderRadius: "5px", paddingLeft: "10px" }} name="location" id="location" value={selectedCategory} onChange={handleCategoryChange}>
                            {location.map((item, i) => (
                                <>
                                    {item.isActive ? <option key={i} value={item.locationCode} id="location" >{item.locationName}</option> : null}
                                </>
                            ))}
                        </select>
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div className="flex w-full justify-between items-center" style={{marginTop:"1.25rem"}}>
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
                            {/* <SearchOutlined
                                className="h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            /> */}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <select style={{ height: "2.5rem", borderRadius: "5px" }} name="location" id="location" onChange={handleCategoryChange}>
                            {location.map((item, i) => (
                                <>
                                    {item.isActive ? <option key={i} value={item.locationCode} id="location" >{item.locationName}</option> : null}
                                </>
                            ))}
                        </select>
                    </div>
                </div>
            </MobileView>
            <BrowserView>
                <Tabs className="" style={{marginTop:"1.25rem"}}>
                    <TabList className="flex justify-between w-full mx-auto container tabs-container"
                    style={{display:"flex", justifyContent:"space-between", width:"100%", marginLeft:"auto", marginRight:"auto", background:"hsla(0,0%,56%,.1)", padding:"1rem 10px"}} >
                        <Tab className="notSelected cursor-pointer" id="All">
                            <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1"
                            style={{display:"flex", alignItems:"center", gap:"5px", cursor:"pointer"}}
                                onClick={handleClassChange} type="button" id="All">
                                <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" 
                                style={{fontFamily:"Montserrat", fontSize:"1.5rem"}}
                                id="All">All</p>
                                <img src="/ONblue.png" className="on-tabs" id="All" />{" "}
                            </div>
                        </Tab> 
                        <Tab className="notSelected cursor-pointer">
                            <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" 
                            style={{display:"flex", alignItems:"center", gap:"5px", cursor:"pointer"}}
                            onClick={handleClassChange} type="button">
                                <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" 
                                style={{fontFamily:"Montserrat", fontSize:"1.5rem"}}
                                id="NRG">ENERGY</p>
                                <img src="/ONblue.png" className="on-tabs" id="NRG" />{" "}
                            </div>
                        </Tab>
                        <Tab className="notSelected cursor-pointer">
                            <div className="flex items-center lg:space-x-2 md:space-x-2 space-x-1" 
                            style={{display:"flex", alignItems:"center", gap:"5px", cursor:"pointer"}}
                            onClick={handleClassChange} type="button">
                                <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" 
                                style={{fontFamily:"Montserrat", fontSize:"1.5rem"}}
                                id="BLNC">BALANCE</p>
                                <img src="/ONblue.png" className="on-tabs" id="BLNC" />{" "}
                            </div>
                        </Tab>
                        <Tab className="notSelected cursor-pointer">
                            <div className="flex justify-end items-center lg:space-x-2 md:space-x-2 space-x-1" 
                            style={{display:"flex", alignItems:"center", gap:"5px", cursor:"pointer"}}
                            onClick={handleClassChange} type="button">
                                <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" 
                                style={{fontFamily:"Montserrat", fontSize:"1.5rem"}}
                                id="PWR">POWER</p>
                                <img src="/ONblue.png" className="on-tabs" id="PWR" />{" "}
                            </div>
                        </Tab>
                        <Tab className="notSelected cursor-pointer">
                            <div className="flex justify-end items-center lg:space-x-2 md:space-x-2 space-x-1" 
                            style={{display:"flex", alignItems:"center", gap:"5px", cursor:"pointer"}}
                            onClick={handleClassChange} type="button">
                                <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" 
                                style={{fontFamily:"Montserrat", fontSize:"1.5rem"}}
                                id="POOL">POOL</p>
                                <img src="/ONblue.png" className="on-tabs" id="POOL" />{" "}
                            </div>
                        </Tab>
                        <Tab className="notSelected cursor-pointer">
                            <div className="flex justify-end items-center lg:space-x-2 md:space-x-2 space-x-1" 
                            style={{display:"flex", alignItems:"center", gap:"5px", cursor:"pointer"}}
                            onClick={handleClassChange} type="button">
                                <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" 
                                style={{fontFamily:"Montserrat", fontSize:"1.5rem"}}
                                id="Tennis Indoor">TENNIS</p>
                                <img src="/ONblue.png" className="on-tabs" id="Tennis Indoor" />{" "}
                            </div>
                        </Tab>
                    </TabList> 
                </Tabs>
            </BrowserView>
            <MobileView>
                <Tabs className="" style={{marginTop:"1.25rem"}}>
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
                                <p className="text-base font-extrabold" id="Tennis Indoor">TENNIS</p>
                                <img src="/ONblue.png" className="on-tabs" id="Tennis Indoor" />{" "}
                            </div>
                        </Tab>

                    </TabList>
                </Tabs>
            </MobileView>
            <BrowserView>
            
                {filtered.sort((a, b) => new Date(a.classTime) - new Date(b.classTime)).map((item, index) => (
                    <>
                        {moment(item.classTime).format("DD MMM YYYY HH:mm") >= todayTime ? 
                        <div className="flex justify-between w-full classes-box mb-3 mt-10 p-3 flex-wrap" 
                        style={{display:"flex", justifyContent:"space-between", width:"100%", marginBottom:"0.75rem", marginTop:"2.5rem", padding:"0.75rem", flexWrap:"wrap"}}
                        key={index} id={item.studio?.studioName}>
                            <div className="flex justify-start w-full"
                            style={{display:"flex", justifyContent:"start", width:"100%"}}>
                                <p className="text-white text-md lg:border-r md:border-r border-[#009FE3] lg:pr-3 md:pr-3 futura-book sizemobile w-1/5"
                                style={{width:"20%", color:"white", borderRight:"1px solid #009fe3", paddingRight:"0.75rem"}}
                                >
                                    {item.class?.className}
                                </p>
                                <p 
                                className="lg:border-r md:border-r border-white text-white lg:pl-5 md:pl-5 pl-5 lg:pr-3 md:pr-3 futura-book text-md sizemobile w-1/5"
                                style={{width:"20%", color:"white", borderRight:"1px solid white", paddingRight:"0.75rem", paddingLeft:"1.25rem"}}>
                                    {item.studio?.studioName}
                                </p>
                                <p className='text-white futura-book lg:pl-5 md:pl-5 pl-5 lg:pr-5 md:pr-5 text-md sizemobile lg:border-r md:border-r border-[#009FE3] w-1/5'
                                style={{width:"20%", color:"white", borderRight:"1px solid #009fe3", paddingRight:"1.25rem", paddingLeft:"1.25rem"}}>{moment(item.classTime).format("DD MMM YYYY")}</p>
                                <p className='text-white futura-book lg:pl-5 md:pl-5 pl-5 lg:pr-5 md:pr-5 text-md sizemobile lg:border-r md:border-r border-white w-1/5'
                                style={{width:"20%", color:"white", borderRight:"1px solid white", paddingRight:"1.25rem", paddingLeft:"1.25rem"}}>{moment(item.classTime).format("HH:mm")}</p>
                                <p className="text-white text-md futura-book lg:pl-5 md:pl-5 pl-5 sizemobile w-1/5"
                                style={{width:"20%", color:"white", paddingRight:"0.75rem"}}>
                                    {item.location?.locationName}
                                </p>
                            </div>
                        </div> : null}
                    </>
                ))
            
                }
            </BrowserView>
            <MobileView>
                {filtered.map((item, index) => (
                    <>
                        {moment(item.classTime).format("DD MMM YYYY HH:mm") >= todayTime ? <div className="flex justify-between w-full classes-box mb-3 mt-10 p-3" key={index}>
                            <div className="flex justify-between w-full space-x-8">
                                <div className="flex flex-col w-2/5">
                                    <p className='text-white futura-book text-md sizemobile lg:border-r md:border-r border-[#009FE3]'>{moment(item.classTime).format("DD MMM YYYY")}</p>
                                    <p className=' text-white text-md sizemobile futura-book'>{moment(item.classTime).format("HH:mm")}</p>
                                </div>
                                <div className="border border-l border-[#009FE3]"></div>
                                <div className="flex flex-col w-2/5">
                                    <p className="text-white text-md sizemobile lg:border-r md:border-r border-[#009FE3] lg:pr-3 md:pr-3 futura-book">
                                        {item.class?.className}
                                    </p>

                                    <p className="text-white futura-book text-md sizemobile lg:border-r md:border-r border-white">
                                        {item.location?.locationName}
                                    </p>
                                </div>
                            </div>
                        </div> : null}
                    </>
                ))}
            </MobileView>
        </div>
            )}
        </DarkTheme>
    );
}
