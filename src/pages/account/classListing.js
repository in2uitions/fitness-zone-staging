
import React, { useState , useEffect} from 'react';
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import moment from 'moment';
import { BrowserView, MobileView } from "react-device-detect";
import { useRouter } from "next/router";
import PrivateMenu from "./private-menu";
import Cookies from 'js-cookie'
import { getTermsAndConditions } from "../../../api/server";
import parse from "html-react-parser";
import DarkTheme from "../../layouts/Dark";
import { Tab, TabList, Tabs } from 'react-tabs';

export default function ClassListing(Info) {
    var curr = new Date;
    const router = useRouter();
    const [books, setBooks] = useState(true)
    const [name, setName] = useState("");
    const [save, setSave] = useState('')
    const [filtered, setFiltered] = useState([]);
    const [data, setData] = useState([]);
    const [classs, setClasss] = useState([]);
    // const [info, setInfo] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet = (Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
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
        "Bearer " + Cookies.get("token")
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
                    // console.log(locationList)
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
                    // var memberType = fetchedData.membershipType.memberShipTypeName
                    setBooks(fetchedData);
                    handleCategoryChange({ target: { value: fetchedData.membershipLocation?.locationCode } })
                }
                // getDayByDay({ id: moment().toDate().getDay() })
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    // let filteredLocations = [];
    // membershipType.membershipTypeLocationList.forEach((location) => {
    //     if (location.isCheckin) {
    //         filteredLocations.push(location);
    //     }
    // });
    useEffect(() => {
        getFilteredList(selectedCategory);
    }, [])
    // var curr = new Date;
    // var first = curr.getDate() - curr.getDay();
    // var last = first + 6;
    const todayTime = moment().format("DD MMM YYYY HH:mm")
    // var firstday = new Date(curr.setDate(first)).toUTCString();
    // var lastday = new Date(curr.setDate(last)).toUTCString();
    var begin = moment().startOf('week').format("YYYY MM DD");
    var end = moment(todayTime).add(7, 'days').format("YYYY MM DD");
    function getFilteredList(value = null) {

        const getClassList = async (val) => {
            var registrationHeaders = new Headers();
            registrationHeaders.append(
                "Authorization",
                "Bearer " + Cookies.get("token")
            );
            registrationHeaders.append("Content-Type", "application/json");
            var registrationRequestOptions = {
                method: "GET",
                headers: registrationHeaders,
            };
            var query = '';
            var query = `?dateFrom=${begin}&dateTo=${end}`
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
                    let classes = dataClass.map((result) => {
                        return { ...result, toggle: "Book class", disabled: result.bookings >= (result.capacity + result.waitingListCapacity) }
                    });
                    if (response.status == 200) {
                        const fetchedData = await response.json();
                        classes = dataClass.map((result) => {
                            if (fetchedData.filter((res) => res.timetableId == result.timetableId).length == 1) {
                                return { ...result, toggle: "Booked", disabled: true }
                            }
                            return { ...result, toggle: "Book class", disabled: result.bookings >= (result.capacity + result.waitingListCapacity) }

                        })

                    }
                    setClasss(classes);
                    setFiltered(classes);

                } else {
                    setClasss([]);
                    setFiltered([]);
                    //<div>loading...</div>;

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

    const memberId = Cookies.get("Member");
    const reserveTennisClass = async ({ timetableId, e }) => {
        e.preventDefault();
        // console.log(timetableId)
        try {
            var registrationHeaders = new Headers();
            registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
            registrationHeaders.append("Content-Type", "application/json");
            var registrationRequestOptions = {
                method: 'GET',
                headers: registrationHeaders
            };
            const res = await fetch(
                `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Class/Reserve?timetableId=${timetableId}&memberId=${memberId}&memberId2=${e.target.memberId2.value}`,
                registrationRequestOptions
            );
            const data = await res.json();
            if (data.isValid == true) {

                let newClasssValue = classs.map((res) => {
                    if (res.timetableId == timetableId) {
                        console.log(timetableId)
                        // console.log(res.capacity)
                        let bookingStatus = "Booked";
                        if (res.bookings <= (res.capacity + res.waitingListCapacity) && res.bookings > res.capacity) {
                            bookingStatus = "Waiting";
                        }
                        return {
                            ...res,
                            toggle: bookingStatus,
                        }
                    }
                    return res;
                })
                setClasss(newClasssValue);
                setFiltered(newClasssValue)
                Cookies.set('MemberId2', e.target.memberId2.value);
            }
            
            else if (data.isValid == false) {
                alert("Class is not valid!");
            }

        } catch (err) {
            console.log(err);
        }
    };
    const useMemberId2 = Cookies.get('MemberId2')
    const removeTennisClass = async ({ timetableId, e }) => {
        e.preventDefault();
        try {
            var registrationHeaders = new Headers();
            registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
            registrationHeaders.append("Content-Type", "application/json");
            var registrationRequestOptions = {
                method: 'GET',
                headers: registrationHeaders
            };
            const res = await fetch(
                `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Class/Remove?timetableId=${timetableId}&memberId=${memberId}&memberId2=${useMemberId2}`,
                registrationRequestOptions
            );
            const data = await res.json();
            if (data.isValid == true) {

                let newClasssValue = classs.map((res) => {
                    if (res.timetableId == timetableId) {
                        // console.log(timetableId)
                        return {
                            ...res,
                            toggle: "Book class",
                        }
                    }
                    return res;
                })
                setClasss(newClasssValue);
                setFiltered(newClasssValue)
            }
            else {
                alert("Class is not valid");
            }

        } catch (err) {
            console.log(err);
        }

    };
    const reserveClass = async ({ timetableId, e }) => {
        e.preventDefault();
        // console.log(timetableId)
        try {
            var registrationHeaders = new Headers();
            registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
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
                        console.log(timetableId)
                        // console.log(res.capacity)
                        let bookingStatus = "Booked";
                        if (res.bookings <= (res.capacity + res.waitingListCapacity) && res.bookings > res.capacity) {
                            bookingStatus = "Waiting";
                        }
                        return {
                            ...res,
                            toggle: bookingStatus,
                        }
                    }
                    return res;

                })
                setClasss(newClasssValue);
                setFiltered(newClasssValue)
                console.log(newClasssValue.map(el => el.capacity?.length))
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
            registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
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
                            toggle: "Book class",
                        }
                    }
                    return res;
                })
                setClasss(newClasssValue);
                setFiltered(newClasssValue)
            }
            else {
                alert("Class is not valid");
            }

        } catch (err) {
            console.log(err);
        }

    };


    function handleClassChange(event) {
        if (event.target.id == "All") {
            setSave("")

            if (name == '') {
                setFiltered(classs)
            }
            else {

                const filteredValue = classs.filter((dt) =>
                    handleClassChangeWithSearch(dt, "", name)
                );
                setFiltered(filteredValue)
                // console.log(name)
                // console.log(event.target.id)
            }
        } 
        else {
            setSave(event.target.id)
            let newvalue = classs.filter((item) => handleClassChangeWithSearch(item, event.target.id, name))
            setFiltered(newvalue);
            console.log(classs)

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
            setFiltered(classs)
        }
        else {
            const filteredValue = classs.filter((dt) =>
                handleClassChangeWithSearch(dt, save, event.target.value)
            );
            setFiltered(filteredValue);
        }
    }
    const [dropdownState, setDropdownState] = useState(false);
    const [open, setOpen] = useState(false)
    const [dropdownValue, setDropdownValue] = useState("");
    const handleDropdownClick = () => {
        setDropdownState(!dropdownState);
    };

    const handleClose = () => {
        setDropdownState(false);
    };
    function handleSetDropdownValue(value, localValue, event) {
        Cookies.set("Location", localValue);
        // console.log(localValue)
        setDropdownValue(value);
        // console.log(value)
        setDropdownState(!dropdownState);
    };
    const handleClickAway = () => {
        setDropdownState(false);
    };
   

    const [isDisabledbutton, setDisabled] = useState(true);

    function onCheck(e) {
        const checked = e.target.checked;
        if (checked) {
            setDisabled(false)
        }
        if (!checked) {
            setDisabled(true)
        }
    }
    const [termsandconditions, setTermsandConditions] = useState([]);
    var getdata = async () => {
        const termandcondition = await getTermsAndConditions();
        setTermsandConditions(termandcondition);

    }
    useEffect(() => {
        getdata();
    }, []);
    return (
        <>
            <PrivateMenu />
            <DarkTheme>
            <section className="" style={{backgroundImage:'url("/PrivateArea.jpg")', objectFit:"cover"}}> 
                <div className="container mx-auto mt-40-top lg:px-28 md:px-20 pb-20-bottom w-screen px-2">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-colorblue font-bold lg:text-4xl md:text-4xl text-3xl montserrat-bold">LIST OF CLASSES</p>
                    </div>
                    <BrowserView>
                        <div className="flex w-full justify-between items-center mt-5 wrapContent">
                            <div className="flex items-center space-x-3">
                                <img src="/filterBy.png" style={{width:"10px", height:"12px"}} />
                                <p className="montserrat-book text-white lg:text-xl md:text-xl text-sm">Filter by</p>
                            </div>
                            {/* <p className="text-colorblue font-bold text-4xl">LIST OF CLASSES</p> */}
                            <div className="relative" style={{ width: "73%", position:"relative" }}>
                                <input type='text' name="search" id="search" className="w-full border border-gray-500 rounded-lg  bg-transparent pl-4 input-search" style={{height:"2.5rem" , marginTop:"2.5rem", marginBottom:"2.5rem"}}
                                    placeholder="Search" value={name}
                                    onChange={handleSearch} />
                                <div className=" items-center pointer-events-none"
                                style={{position:"absolute", top:"0", bottom:"0" , right:"0", paddingRight:"0.75rem", display:"flex", background:"transparent"}}>
                                    {/* <SearchOutlined
                                        className="h-4 w-4 text-gray-400"
                                        aria-hidden="true"
                                    /> */}
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <select style={{ height: "2.5rem", borderRadius: "5px", paddingLeft: "10px" }} disabled={isDisabled} name="location" id="location" value={selectedCategory} onChange={handleCategoryChange} >
                                    <option value="">{books.membershipLocation?.locationName}</option>
                                    {books?.membershipType?.membershipTypeLocationList?.map((locationName, i) => (
                                        <>
                                            {locationName.isCheckin ?
                                                <>
                                                    {locationName.location.locationName != books.membershipLocation?.locationName ?
                                                        <option key={i} value={locationName.location.locationCode} id="location" >{locationName.location.locationName}</option>
                                                        : null}

                                                </>
                                                : null}
                                        </>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </BrowserView>
                    
                    <MobileView>
                        <div className="flex w-full justify-between items-center mt-5">
                            <div className="flex items-center space-x-3">
                                <img src="/filterBy.png" className="w-3 h-3"  style={{width:"0.75rem", height:"0.75rem"}}/>
                                <p className="montserrat-book text-white text-sm">Filter by</p>
                            </div>
                            {/* <p className="text-colorblue font-bold text-4xl">LIST OF CLASSES</p> */}
                            <div className="relative" style={{ width: "35%" }}>
                                <input type='text' name="search" id="search" className="w-full border border-gray-500 rounded-lg h-8 mt-5 mb-5 bg-transparent pl-4"
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
                                <select className="loc" style={{ height: "2rem", borderRadius: "5px" }} disabled={isDisabled} name="location" id="location" value={selectedCategory} onChange={handleCategoryChange} >
                                <option value="">{books.membershipLocation?.locationName}</option>
                                    {books?.membershipType?.membershipTypeLocationList?.map((locationName, i) => (
                                        <>
                                            {locationName.isCheckin ?
                                                <>
                                                    {locationName.location.locationName != books.membershipLocation?.locationName ?
                                                        <option key={i} value={locationName.location.locationCode} id="location" >{locationName.location.locationName}</option>
                                                        : null}

                                                </>
                                                : null}
                                        </>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </MobileView>


                    <BrowserView>
                        <Tabs className="" style={{marginTop:"1.25rem"}}>
                            <TabList className="showDesktop flex justify-between w-full mx-auto tabs-container" >
                                <Tab className="notSelected cursor-pointer" id="All">
                                    <div className="flex items-center space-x-2 md:space-x-2 " onClick={handleClassChange} type="button" id="All">
                                        <p className="lg:text-2xl md:text-2xl text-xs font-bold montserrat-bold" id="All">All</p>
                                        <img src="/ONblue.png" className="on-tabs" id="All" />{" "}
                                    </div>
                                </Tab>
                                <Tab className="notSelected cursor-pointer">
                                    <div className="flex items-center space-x-2 md:space-x-2" onClick={handleClassChange} type="button">
                                        <p className="lg:text-2xl md:text-2xl text-xs font-bold montserrat-bold" id="NRG">ENERGY</p>
                                        <img src="/ONblue.png" className="on-tabs" id="NRG" />{" "}
                                    </div>
                                </Tab>
                                <Tab className="notSelected cursor-pointer">
                                    <div className="flex items-center space-x-2 md:space-x-2" onClick={handleClassChange} type="button">
                                        <p className="lg:text-2xl md:text-2xl text-xs font-bold montserrat-bold" id="BLNC">BALANCE</p>
                                        <img src="/ONblue.png" className="on-tabs" id="BLNC" />{" "}
                                    </div>
                                </Tab>
                                <Tab className="notSelected cursor-pointer">
                                    <div className="flex justify-end items-center space-x-2 md:space-x-2" onClick={handleClassChange} type="button">
                                        <p className="lg:text-2xl md:text-2xl text-xs font-bold montserrat-bold" id="PWR">POWER</p>
                                        <img src="/ONblue.png" className="on-tabs" id="PWR" />{" "}
                                    </div>
                                </Tab>
                                <Tab className="notSelected cursor-pointer">
                                    <div className="flex justify-end items-center space-x-2 md:space-x-2" onClick={handleClassChange} type="button">
                                        <p className="lg:text-2xl md:text-2xl text-xs font-bold montserrat-bold" id="POOL">POOL</p>
                                        <img src="/ONblue.png" className="on-tabs" id="POOL" />{" "}
                                    </div>
                                </Tab>
                                <Tab className="notSelected cursor-pointer">
                                    <div className="flex justify-end items-center space-x-2 md:space-x-2" onClick={handleClassChange} type="button">
                                        <p className="lg:text-2xl md:text-2xl text-xs font-bold montserrat-bold" id="Tennis Indoor">TENNIS</p>
                                        <img src="/ONblue.png" className="on-tabs" id="Tennis Indoor" />{" "}
                                    </div>
                                </Tab>
                            </TabList>
                        </Tabs>
                    </BrowserView>
                    <MobileView>
                        <Tabs className="" style={{marginTop:"1.25rem"}}>
                            <TabList className="grid grid-cols-3 w-full mx-auto tabs-container" >
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
                        {filtered.slice(0).sort((a, b) => new Date(a.classTime) - new Date(b.classTime)).map((item, index) => (
                            <>
                                {moment(item.classTime).format("DD MMM YYYY HH:mm") >= todayTime ? <div className="flex justify-between w-full classes-box flex-wrap" style={{marginTop:"2.5rem", marginBottom:"0.75rem", padding:"0.75rem"}} key={index}>
                                    <div className="flex justify-center items-center w-3/4">
                                        <p className="text-white text-md sizemobile montserrat-book w-1/5"
                                        style={{borderRight:"1px solid #008DDC", paddingRight:"0.75rem"}}>
                                            {item.class?.className}
                                        </p>
                                        <p className="lg:border-r md:border-r border-white text-white lg:pl-5 md:pl-5 pl-5 lg:pr-3 md:pr-3 montserrat-book text-md sizemobile w-1/5"
                                        style={{borderRight:"1px solid white", paddingRight:"0.75rem", paddingLeft:"1.25rem"}}>
                                            {item.studio?.studioName}
                                        </p>
                                        <p className='text-white montserrat-book lg:pl-5 md:pl-5 pl-5 lg:pr-5 md:pr-5 text-md sizemobile lg:border-r md:border-r border-[#008DDC] w-1/5'
                                        style={{borderRight:"1px solid #008DDC", paddingRight:"1.25rem", paddingLeft:"1.25rem"}}>{moment(item.classTime).format("DD MMM YYYY")}</p>
                                        <p style={{borderRight:"1px solid white", paddingRight:"1.25rem", paddingLeft:"1.25rem"}} className='text-white montserrat-book lg:pl-5 md:pl-5 pl-5 lg:pr-5 md:pr-5 text-md sizemobile lg:border-r md:border-r border-white w-1/5'>{moment(item.classTime).format("HH:mm")}</p>
                                        <p className="text-white text-md sizemobile montserrat-book lg:pl-5 md:pl-5 pl-5 w-1/5">
                                            {item.location?.locationName}
                                        </p>
                                    </div>
                                    <div>
                                        {item.class?.isSecondPlayerRequired === true ? (
                                            <>
                                                {item?.toggle == "Book class" ? (
                                                    <>
                                                        <Popup
                                                            trigger={
                                                                <button style={{outline:"none"}} className="flex space-x-2 items-center book-button" disabled={moment(item.classTime).format("DD MMM YYYY HH:mm") < todayTime ? true : false || item?.disabled}>
                                                                    <img src="/notBooked.png" style={{width:"14px", height:"16px"}} />
                                                                    <p className="montserrat-book text-md sizemobile" style={{outline:"none"}}>Book class</p>
                                                                </button>
                                                            } modal
                                                            className="popup-membership"
                                                            position="center"
                                                            closeOnDocumentClick={false}
                                                        >
                                                            {close => (
                                                                <>
                                                                    <button className="close-popup" onClick={close}>
                                                                        &times;
                                                                    </button>
                                                                    <div className="popups rounded-md px-20 py-20 flex flex-col">
                                                                        <p className="text-colorblue text-2xl " style={{color:"#008DDC", marginBottom:"1.25rem"}}> Terms & Conditions</p>
                                                                        <div className=" flex flex-col items-start space-y-2">
                                                                            {termsandconditions.map((term) => (
                                                                                <>
                                                                                    {term.booking_paragraph ? <p className="montserrat-book text-base text-white"> {parse(`${term.booking_paragraph}`)}</p> : null}
                                                                                    {term.canceling_paragraph ? <p className="montserrat-book text-base text-white">{parse(`${term.canceling_paragraph}`)}</p> : null}
                                                                                </>
                                                                            ))}
                                                                            <input type="checkbox" className="" onChange={onCheck} />
                                                                        </div>
                                                                        <form onSubmit={(e) => reserveTennisClass({ timetableId: item.timetableId, e })} className="container mx-auto px-10 py-10 w-full flex flex-col justify-center items-center space-y-5">
                                                                            <p className="text-colorblue text-2xl montserrat-book">Enter your second player MemberId:</p>
                                                                            <input id="memberId2" className="border border-[#008DDC] pl-2 w-full h-9 bg-transparent rounded text-white" placeholder="MemberId" />
                                                                            <button type="submit" disabled={isDisabledbutton} className="bg-blue montserrat-book text-white btn-bookClass rounded p-2"> Book </button>
                                                                        </form>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </Popup>
                                                        {/* <p>{message}</p> */}
                                                        {moment(item.classTime).format("DD MMM YYYY HH:mm") < todayTime ?
                                                            <p></p> :
                                                            <div>
                                                                {item.capacity - item.bookings >= 1 ? (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{color:"#008DDC"}}>Remaining seats: {item.capacity - item.bookings}</p>
                                                                ) : item.capacity - item.bookings >= -item.waitingListCapacity ? (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{color:"#008DDC"}}>
                                                                        Remaining seats: {item.capacity - item.bookings + item.waitingListCapacity}
                                                                    </p>
                                                                ) : (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{color:"#008DDC"}}>No more booking are allowed</p>
                                                                )}
                                                            </div>}
                                                    </>
                                                ) : (
                                                    <div className="flex space-x-2 items-center">
                                                        <img src="/Booked.png" />
                                                        <p className="montserrat-book text-white text-md sizemobile">{item?.toggle}</p>
                                                        <p className=" text-colorblue font-bold text-sm" onClick={(e) => removeTennisClass({ timetableId: item.timetableId, e })}>
                                                            Cancel
                                                            {/* <Close className="cancel-close" /> */}
                                                        </p>
                                                    </div>

                                                )}
                                            </>
                                        ) : (
                                            <button
                                                className="flex justify-end"
                                            >
                                                {item?.toggle == "Book class" ? (
                                                    <div className="flex flex-col">
                                                        {/* <button className="flex space-x-2 items-center book-button" disabled={moment(item.classTime).subtract(3, "hours").format("DD MMM YYYY HH:mm") < todayTime  ? true : false} onClick={(e) => reserveClass({ timetableId: item.timetableId, e })}>
                                                        <img src="/notBooked.png" />
                                                        <p className="montserrat-book text-md sizemobile">Book class</p>
                                                    </button> */}
                                                        <Popup 
                                                            trigger={
                                                                <button style={{outline:"none"}} className="flex space-x-2 items-center book-button" disabled={(moment(item.classTime).format("DD MMM YYYY HH:mm") < todayTime ? true : false) || item?.disabled}>
                                                                    <img src="/notBooked.png" style={{width:"14px", height:"16px"}}/>
                                                                    <p className="montserrat-book text-md sizemobile" style={{outline:"none" }}>Book class</p>
                                                                </button>

                                                            } modal
                                                            className="popup-membership"
                                                            position="center"
                                                            closeOnDocumentClick={false}
                                                        >
                                                            {close => (
                                                                <>
                                                                    <button className="close-popup" onClick={close}>
                                                                        &times;
                                                                    </button>
                                                                    <div className="popups rounded-md px-20 py-20">
                                                                        <div className="flex flex-col items-center space-y-2">
                                                                            <p className="text-colorblue text-2xl " style={{color:"#008DDC", marginBottom:"1.25rem"}}> Terms & Conditions</p>
                                                                            <div className=" flex flex-col items-start space-y-2">
                                                                                {termsandconditions.map((term) => (
                                                                                    <>
                                                                                        {term.booking_paragraph ? <p className="montserrat-book text-base text-white"> {parse(`${term.booking_paragraph}`)}</p> : null}
                                                                                        {term.canceling_paragraph ? <p className="montserrat-book text-base text-white">{parse(`${term.canceling_paragraph}`)}</p> : null}
                                                                                    </>
                                                                                ))}
                                                                                <input type="checkbox" className="" onChange={onCheck} />
                                                                            </div>
                                                                            <div>
                                                                                <button type="submit" disabled={isDisabledbutton}
                                                                                    onClick={(e) => reserveClass({ timetableId: item.timetableId, e })}
                                                                                    className="bg-blue mt-10 w-20 montserrat-book text-white rounded p-2 btn-bookClass"> Book </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </Popup>
                                                        {moment(item.classTime).format("DD MMM YYYY HH:mm") < todayTime ?
                                                            <p></p> :
                                                            <div>
                                                                {item.capacity - item.bookings >= 1 ? (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{ color:"#008DDC"}}>Remaining seats: {item.capacity - item.bookings}</p>
                                                                ) : item.capacity - item.bookings >= -item.waitingListCapacity ? (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{ color:"#008DDC"}}>
                                                                        Remaining seats: {item.capacity - item.bookings + item.waitingListCapacity}
                                                                    </p>
                                                                ) : (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{ color:"#008DDC"}}>No more booking are allowed</p>
                                                                )}
                                                            </div>}
                                                    </div>
                                                ) : (
                                                    <div className="flex space-x-2 items-baseline">
                                                        <img src="/Booked.png" />
                                                        <p className="montserrat-book text-white text-md sizemobile">{item?.toggle}</p>
                                                        <button disabled={moment(item.classTime).subtract(3, "hours").format("DD MMM YYYY HH:mm") < todayTime ? true : false} className=" text-colorblue font-bold text-sm cancel-button" onClick={(e) => removeClass({ timetableId: item.timetableId, e })}>
                                                            Cancel
                                                            {/* <Close className="cancel-close" /> */}
                                                        </button>
                                                    </div>

                                                )}
                                            </button>


                                        )}
                                    </div>
                                </div> : null}
                            </>
                        ))}
                    </BrowserView>
                    <MobileView>
                        {filtered.slice(0).sort((a, b) => new Date(a.classTime) - new Date(b.classTime)).map((item, index) => (
                            <>
                                {moment(item.classTime).format("DD MMM YYYY HH:mm") >= todayTime ? <div className="flex justify-between w-full classes-box mb-3 mt-10 p-3 gap-10" key={index}>
                                    <div className="flex justify-start space-x-8">
                                        <div className="flex flex-col" style={{paddingRight:"0.75rem"}}>
                                            <p className='text-white montserrat-book text-md sizemobile lg:border-r md:border-r border-[#008DDC]'>{moment(item.classTime).format("DD MMM YYYY")}</p>
                                            <p className=' text-white text-md sizemobile montserrat-book'>{moment(item.classTime).format("HH:mm")}</p>
                                        </div>
                                        <div className="border border-l border-[#008DDC]"></div>
                                        <div className="flex flex-col" style={{paddingLeft:"0.75rem"}}>
                                            <p className="text-white text-md sizemobile lg:border-r md:border-r border-[#008DDC] lg:pr-3 md:pr-3 montserrat-book"
                                            >
                                                {item.class?.className}
                                            </p>

                                            <p className="text-white montserrat-book text-md sizemobile lg:border-r md:border-r border-white">
                                                {item.location?.locationName}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        {item.class?.isSecondPlayerRequired === true ? (
                                            <>
                                                {item?.toggle == "Book class" ? (
                                                    <>
                                                        <Popup
                                                            trigger={
                                                                <button style={{outline:"none"}} className="flex space-x-2 items-center book-button" disabled={moment(item.classTime).format("DD MMM YYYY HH:mm") < todayTime ? true : false || item?.disabled}>
                                                                    <img src="/notBooked.png" style={{width:"14px", height:"16px"}} />
                                                                    <p className="montserrat-book text-md sizemobile" style={{outline:"none"}}>Book class</p>
                                                                </button>
                                                            } modal
                                                            className="popup-membership"
                                                            position="center"
                                                            closeOnDocumentClick={false}
                                                        >
                                                            {close => (
                                                                <>
                                                                    <button className="close-popup" onClick={close}>
                                                                        &times;
                                                                    </button>
                                                                    <div className="popups rounded-md px-20 px-20 px-8 py-20 flex flex-col">
                                                                        <p className="text-colorblue text-2xl" style={{color:"#008DDC", marginBottom:"1.25rem"}}> Terms & Conditions</p>
                                                                        <div className=" flex flex-col items-start space-y-2">
                                                                            {termsandconditions.map((term) => (
                                                                                <>
                                                                                    {term.booking_paragraph ? <p className="montserrat-book text-base text-white"> {parse(`${term.booking_paragraph}`)}</p> : null}
                                                                                    {term.canceling_paragraph ? <p className="montserrat-book text-base text-white">{parse(`${term.canceling_paragraph}`)}</p> : null}
                                                                                </>
                                                                            ))}
                                                                            <input type="checkbox" className="" onChange={onCheck} />
                                                                        </div>
                                                                        <form onSubmit={(e) => reserveTennisClass({ timetableId: item.timetableId, e })} className="container mx-auto lg:px-10 md:px-10 py-10 w-full flex flex-col justify-center items-center space-y-5">
                                                                            <p className="text-colorblue text-2xl montserrat-book">Enter your second player MemberId:</p>
                                                                            <input id="memberId2" className="border border-[#008DDC] pl-2 w-full h-9 bg-transparent rounded text-white" placeholder="MemberId" />
                                                                            <button type="submit" disabled={isDisabledbutton} className="bg-blue montserrat-book text-white btn-bookClass rounded p-2"> Book </button>
                                                                        </form>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </Popup>
                                                        {moment(item.classTime).format("DD MMM YYYY HH:mm") < todayTime ?
                                                            <p></p> :
                                                            <div>
                                                                {item.capacity - item.bookings >= 1 ? (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{ color:"#008DDC"}}>Remaining seats: {item.capacity - item.bookings}</p>
                                                                ) : item.capacity - item.bookings >= -item.waitingListCapacity ? (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{ color:"#008DDC"}}>
                                                                        Remaining seats: {item.capacity - item.bookings + item.waitingListCapacity}
                                                                    </p>
                                                                ) : (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{ color:"#008DDC"}}>No more booking are allowed</p>
                                                                )}
                                                            </div>}
                                                    </>
                                                ) : (
                                                    <div className="flex space-x-2 items-center">
                                                        <img src="/Booked.png" />
                                                        <p className="montserrat-book text-white text-md sizemobile">{item?.toggle}</p>
                                                        <p className=" text-colorblue font-bold text-sm" onClick={(e) => removeTennisClass({ timetableId: item.timetableId, e })}>
                                                            Cancel
                                                            {/* <Close className="cancel-close" /> */}
                                                        </p>
                                                    </div>

                                                )}
                                            </>
                                        ) : (
                                            <button
                                                className="flex justify-end"
                                            >
                                                {item?.toggle == "Book class" ? (
                                                    <div className="flex flex-col">
                                                        {/* <button className="flex space-x-2 items-center book-button" disabled={moment(item.classTime).subtract(3, "hours").format("DD MMM YYYY HH:mm") < todayTime  ? true : false} onClick={(e) => reserveClass({ timetableId: item.timetableId, e })}>
                                                        <img src="/notBooked.png" />
                                                        <p className="montserrat-book text-md sizemobile">Book class</p>
                                                    </button> */}
                                                        <Popup
                                                            trigger={
                                                                <button style={{outline:"none"}} className="flex space-x-2 items-center book-button" disabled={(moment(item.classTime).format("DD MMM YYYY HH:mm") < todayTime ? true : false) || item?.disabled}>
                                                                    <img src="/notBooked.png" style={{width:"14px", height:"16px"}} />
                                                                    <p className="montserrat-book text-md sizemobile" style={{outline:"none"}}>Book class</p>
                                                                </button>

                                                            } modal
                                                            className="popup-membership"
                                                            position="center"
                                                            closeOnDocumentClick={false}
                                                        >
                                                            {close => (
                                                                <>
                                                                    <button className="close-popup" onClick={close}>
                                                                        &times;
                                                                    </button>
                                                                    <div className="popups rounded-md px-20 px-20 px-8 py-20">
                                                                        <div className="flex flex-col items-center space-y-2">
                                                                            <p className="text-colorblue text-2xl" style={{color:"#008DDC", marginBottom:"1.25rem"}}> Terms & Conditions</p>
                                                                            <div className=" flex flex-col items-start space-y-2">
                                                                                {termsandconditions.map((term) => (
                                                                                    <>
                                                                                        {term.booking_paragraph ? <p className="montserrat-book text-base text-white"> {parse(`${term.booking_paragraph}`)}</p> : null}
                                                                                        {term.canceling_paragraph ? <p className="montserrat-book text-base text-white">{parse(`${term.canceling_paragraph}`)}</p> : null}
                                                                                    </>
                                                                                ))}
                                                                                <input type="checkbox" className="" onChange={onCheck} />
                                                                            </div>
                                                                            <div>
                                                                                <button type="submit" disabled={isDisabledbutton}
                                                                                    onClick={(e) => reserveClass({ timetableId: item.timetableId, e })}
                                                                                    className="bg-blue mt-10 w-20 montserrat-book text-white rounded p-2 btn-bookClass"> Book </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </Popup>
                                                        {moment(item.classTime).format("DD MMM YYYY HH:mm") < todayTime ?
                                                            <p></p> :
                                                            <div>
                                                                {item.capacity - item.bookings >= 1 ? (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{ color:"#008DDC"}}>Remaining seats: {item.capacity - item.bookings}</p>
                                                                ) : item.capacity - item.bookings >= -item.waitingListCapacity ? (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{ color:"#008DDC"}}>
                                                                        Remaining seats: {item.capacity - item.bookings + item.waitingListCapacity}
                                                                    </p>
                                                                ) : (
                                                                    <p className="text-colorblue opacity-70 text-base montserrat-book sizemobile" style={{ color:"#008DDC"}}>No more booking are allowed</p>
                                                                )}
                                                            </div>}
                                                    </div>
                                                ) : (
                                                    <div className="flex space-x-2 items-baseline">
                                                        <img src="/Booked.png" />
                                                        <p className="montserrat-book text-white text-md sizemobile">{item?.toggle}</p>
                                                        <button disabled={moment(item.classTime).subtract(3, "hours").format("DD MMM YYYY HH:mm") < todayTime ? true : false} className=" text-colorblue font-bold text-sm cancel-button" onClick={(e) => removeClass({ timetableId: item.timetableId, e })}>
                                                            Cancel
                                                            {/* <Close className="cancel-close" /> */}
                                                        </button>
                                                    </div>

                                                )}
                                            </button>


                                        )}
                                    </div>
                                </div> : null}
                            </>
                        ))}
                    </MobileView>
                </div>
                {/* <div ref={buttonRef} style={{ display: "none" }}>
                    <a id="buttonss" onClick={()=>{  $('html, body').animate({ scrollTop: 0 }, '300')}} className="m-10"><ArrowUpward/></a>
                </div> */}
            </section>
            </DarkTheme>
        </>
    );
}

export async function getServerSideProps(context) {
    const memberId = context.req.cookies["Member"];
    const token = context.req.cookies["token"];
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + token
    );
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: "GET",
        headers: registrationHeaders,
    };
    const response = await fetch(
        `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
        registrationRequestOptions
    );
    // const data = await response.json()
    if (response.status == 401) {
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        };
    } else {
        const info = await response.json()
        return {
            props: { info }
        }
    }
}