import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import PrivateMenu from './private-menu';
import { ArrowDropDown } from '@material-ui/icons';
import moment from 'moment';
import Close from "@material-ui/icons/Close";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BrowserView, MobileView } from 'react-device-detect';
import Popup from 'reactjs-popup';
import DarkTheme from '../../layouts/Dark';

export default function MySessions(Info) {
    const memberId = Cookies.get("Member");
    const { query } = useRouter()
    var userValueTrainer =  Cookies.get("userId");
    const router = useRouter()
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet = (Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
            router.push({ pathname: "/account/reserveSession" });
        }
        else {
            router.push({ pathname: "/account/login" });
        }
    }, [])
    const todayTime = moment().format("DD MMM YYYY HH:mm")
    const [sessions, setSessions] = useState([]);
    const [exercises, setExercises] = useState({});

    useEffect(() => {
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

        getData();

        async function getData() {
            const response = await fetch(
                `https://api.fitnessclubapp.com/api/Training/Session/List/${query.contractNumber}`,
                registrationRequestOptions
            );

            if (response.status === 200) {
                const membership = await response.json();
                setSessions(membership);

                for (const session of membership) {
                    const sessionResponse = await fetch(
                        `https://api.fitnessclubapp.com/api/Training/Session/${session.sessionNumber}`,
                        registrationRequestOptions
                    );

                    if (sessionResponse.status === 200) {
                        const sessionData = await sessionResponse.json();
                        // Store exercise data associated with the session
                        setExercises(prevExercises => ({
                            ...prevExercises,
                            [session.sessionNumber]: sessionData.exerciseList
                        }));
                    }
                }
            }
        }
    }, [query.contractNumber, userValueTrainer]);

    const [filtered, setFiltered] = useState([]);
    const [session, setSession] = useState([]);
    const [toggle, setToggle] = useState("Book class");
    var begin = moment(todayTime).format("YYYY MM DD");
    var end = moment(todayTime).add(5, 'days').format("YYYY MM DD");
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
            var queryy = '';
            var queryy = `dateFrom=${begin}&dateTo=${end}`
            if (val) {
                queryy = queryy + `${queryy != '' ? '&' : '?'}`
            }
            var queryyy = '';
            var queryyy = `dateFrom=${begin}&dateTo=${end}`
            if (val) {
                queryyy = queryyy + `${queryyy != '' ? '&' : '?'}`
            }

            try {
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Administration/SecurityUser/Schedule?UserId=${userValueTrainer}&${queryy}&isNotReserved=true`,
                    registrationRequestOptions
                );
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Administration/SecurityUser/Schedule/Reserved/Member?memberId=${memberId}&${queryyy}`,
                    registrationRequestOptions
                );
                let sessionsData = [];
                let filteredData = [];

                if (res.status == 200) {
                    const dataClass = await res.json();
                    let classes = dataClass.map((result) => {
                        return { ...result, toggle: "Reserve Session" }; // Set toggle to "Book class"
                    });
                    // setSessions(classes);
                    sessionsData = [
                        ...sessionsData,
                        ...classes
                    ]
                    filteredData = [
                        ...filteredData,
                        ...classes
                    ]
                    // setFiltered(classes);
                }
                // else {
                //     setSessions([]);
                //     setFiltered([]);
                // }

                if (response.status == 200) {
                    const fetchedData = await response.json();
                    let bookedClasses = fetchedData.map((result) => {
                        return { ...result, toggle: "Unreserve" }; // Set toggle to "Booked"
                    });
                    // setSessions(bookedClasses);
                    // setFiltered(bookedClasses);
                    sessionsData = [
                        ...sessionsData,
                        ...bookedClasses
                    ]
                    filteredData = [
                        ...filteredData,
                        ...bookedClasses
                    ]
                    setToggle("Unreserve"); // Update toggle state to "Booked"
                }
                setSession(sessionsData)
                setFiltered(filteredData)

            } catch (err) {
                console.log(err);
            }
        };
        getClassList(value);
    };
    useEffect(() => {
        getFilteredList();
    }, [query.contractNumber, userValueTrainer])
    
    const reserveClass = async ({ scheduleId, e }) => {
        e.preventDefault();
        // console.log(scheduleId)
        try {
            var registrationHeaders = new Headers();
            registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
            registrationHeaders.append("Content-Type", "application/json");
            var registrationRequestOptions = {
                method: 'GET',
                headers: registrationHeaders
            };
            
            const res = await fetch(
                `https://api.fitnessclubapp.com/api/Administration/SecurityUser/ReserveSession?scheduleId=${scheduleId}&memberId=${memberId}`,
                registrationRequestOptions
            );
            const data = await res.json();
            if (data.isValid == true) {

                let newClasssValue = session.map((res) => {
                    if (res.scheduleId == scheduleId) {
                        // console.log(res.capacity)
                        let bookingStatus = "Unreserve";
                        return {
                            ...res,
                            toggle: bookingStatus,
                        }
                    }
                    return res;

                })
                setSession(newClasssValue);
                setFiltered(newClasssValue)
            }
            else {
                alert("Session is not valid");
            }

        } catch (err) {
            console.log(err);
        }
    };
    const removeClass = async ({ scheduleId, e }) => {
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
                `https://api.fitnessclubapp.com/api/Administration/SecurityUser/UnReserveSession?scheduleId=${scheduleId}&memberId=${memberId}`,
                registrationRequestOptions
            );
            const data = await res.json();
            if (data.isValid == true) {

                let newClasssValue = session.map((res) => {
                    if (res.scheduleId == scheduleId) {
                        // console.log(scheduleId)
                        return {
                            ...res,
                            toggle: "Reserve Session",
                        }
                    }
                    return res;
                })
                setSession(newClasssValue);
                setFiltered(newClasssValue)
            }
            else {
                alert("Session is not valid");
            }

        } catch (err) {
            console.log(err);
        }

    };
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const today = moment().format("DD MMM YYYY HH:mm");
        const filteredDates = filtered
            .map(session => moment(session.scheduleDateTime).format("DD MMM YYYY"))
            .filter(date => moment(date, "DD MMM YYYY").isSameOrAfter(today, "day"))
            .sort((a, b) => moment(a, "DD MMM YYYY") - moment(b, "DD MMM YYYY"));

        const uniqueDates = Array.from(new Set(filteredDates));
        setDates(uniqueDates);
    }, [filtered]);
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
    return (
        <>
        <DarkTheme>
            <PrivateMenu />
            <section style={{backgroundImage:'url("/PrivateArea.jpg")', objectFit:"cover"}}>
                <div className="lg:container mx-auto pt-40-top pb-20-bottom lg:px-28 px-20  w-screen px-2">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-colorblue montserrat-bold lg:text-4xl md:text-4xl text-3xl mb-10">RESERVE SESSION</p>
                    </div>
                    <BrowserView>
                        <Tabs>
                            <TabList className="flex justify-between w-full mx-auto container tabs-container" >
                                {dates.map(date => (
                                    <>
                                        <Tab key={date} className="notSelected cursor-pointer">
                                            <p className="lg:text-2xl md:text-2xl text-xs font-extrabold">{date}</p>
                                        </Tab>
                                        {/* <Tab key={date}  className="notSelected cursor-pointer">
                                <p className="lg:text-2xl md:text-2xl text-xs font-extrabold">{date}</p>
                                </Tab> */}
                                    </>
                                ))}
                            </TabList>

                            {dates.map(date => (
                                <TabPanel key={date} className="mt-5">
                                    {filtered
                                        .filter(session => moment(session.scheduleDateTime).format("DD MMM YYYY") === date)
                                        .sort((a, b) => new Date(a.scheduleDateTime) - new Date(b.scheduleDateTime))
                                        .map(session => (
                                            <>
                                                <div key={session.scheduleDateTime} className="lg:w-full md:w-full">
                                                    <div className="flex flex-col lg:mx-auto md:max-auto justify-start items-start mt-3 px-2 lg:px-0 md:px-0">
                                                        <>
                                                            <div className="flex justify-start lg:w-full items-center classes-box mb-3 p-3 mx-auto container">
                                                                <div className="space-x-2 flex w-full">
                                                                    <p className="border-r pr-1 border-[#009FE3] text-white w-1/3 flex justify-start items-start whitespace-nowrap">

                                                                        {moment(session.scheduleDateTime).format("DD MMM YYYY")}
                                                                    </p>
                                                                    <p className="border-r pr-1 border-[#009FE3] text-white w-1/3 flex justify-center items-start whitespace-nowrap">

                                                                        {moment(session.scheduleDateTime).format("HH:mm")}

                                                                    </p>
                                                                    <button
                                                                        className="flex justify-end w-1/3"
                                                                    >
                                                                        {session.toggle === "Reserve Session" ? (

                                                                            <Popup
                                                                                trigger={
                                                                                    <button className="flex space-x-2 items-center book-button" 
                                                                                    // disabled={(moment(session.scheduleDateTime).format("DD MMM YYYY HH:mm") < todayTime ? true : false) || session?.disabled}
                                                                                    >
                                                                                        <img src="/notBooked.png" />
                                                                                        <p className="futura-book text-md sizemobile">Reserve Session</p>
                                                                                    </button>

                                                                                } modal
                                                                                position="center"
                                                                                closeOnDocumentClick={false}
                                                                            >
                                                                                {close => (
                                                                                    <>
                                                                                        <button className="close" onClick={close}>
                                                                                            &times;
                                                                                        </button>
                                                                                        <div className="popup-bg rounded-md px-20 py-20">
                                                                                            <div className="flex flex-col items-center space-y-2">
                                                                                                <p className="text-[#009fe3] text-2xl mb-5"> Terms & Conditions</p>
                                                                                                <div className=" flex flex-col items-start space-y-2">
                                                                                                {/* <p className="futura-book text-base text-white">Reserving any session should be during the 10 hours prior to the session</p> */}
                                                                                                    <p className="futura-book text-base text-white">

                                                                                                        Canceling any session should be minimum before 10 hours of the session</p>

                                                                                                    <input type="checkbox" className="" onChange={onCheck} />
                                                                                                </div>
                                                                                                <div>
                                                                                                    {/* <button type="submit" disabled={isDisabledbutton}
                                                                                    onClick={(e) => reserveClass({ timetableId: item.timetableId, e })}
                                                                                    className="bg-[#009fe3] mt-10 w-20 futura-book text-white rounded p-2 btn-bookClass"> Book </button> */}
                                                                                                    <button className="bg-[#009fe3] mt-10 futura-book text-white rounded p-2 btn-bookClass" type="submit" disabled={isDisabledbutton}
                                                                                                        onClick={(e) => reserveClass({ scheduleId: session.scheduleId, e })}>
                                                                                                        {/* <img src="/notBooked.png" /> 
                                                                            <p className="futura-book text-md sizemobile">Reserve Session</p> */}
                                                                                                        Reserve Session
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                )}
                                                                            </Popup>
                                                                        ) : (
                                                                            <div className="flex space-x-2 items-baseline">
                                                                                <img src="/booked.png" />
                                                                                <p className="futura-book text-white text-md sizemobile">{session?.toggle}</p>
                                                                                <button className=" text-[#009FE3] futura-bold text-sm cancel-button"
                                                                                    onClick={(e) => removeClass({ scheduleId: session.scheduleId, e })}>
                                                                                    Cancel
                                                                                    <Close className="cancel-close" />
                                                                                </button>
                                                                            </div>

                                                                        )}
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </>
                                                    </div>
                                                </div> 
                                            </>
                                        ))
                                    }
                                </TabPanel>
                            ))}
                        </Tabs>
                    </BrowserView>
                    <MobileView>
                        <Tabs>
                            <TabList className="flex justify-between w-full mx-auto container tabs-container" >
                                {dates.map(date => (
                                    <>
                                        <Tab key={date} className="notSelected cursor-pointer">
                                            <p className="lg:text-2xl md:text-2xl text-xs font-extrabold" style={{lineHeight:"14px"}}>{moment(date).format("DD MMM")}</p>
                                        </Tab>
                                        {/* <Tab key={date}  className="notSelected cursor-pointer">
                                <p className="lg:text-2xl md:text-2xl text-xs font-extrabold">{date}</p>
                                </Tab> */}
                                    </>
                                ))}
                            </TabList>

                            {dates.map(date => (
                                <TabPanel key={date} className="mt-5">
                                    {filtered
                                        .filter(session => moment(session.scheduleDateTime).format("DD MMM YYYY") === date)
                                        .sort((a, b) => new Date(a.scheduleDateTime) - new Date(b.scheduleDateTime))
                                        .map(session => (
                                            <>
                                                <div key={session.scheduleDateTime} className="lg:w-full md:w-full">

                                                    <div className="flex flex-col lg:mx-auto md:max-auto justify-start items-start mt-3 px-2 lg:px-0 md:px-0">
                                                        <>
                                                            <div className="flex justify-start lg:w-full items-center classes-box mb-3 p-3 mx-auto container">
                                                                <div className="space-x-2 flex w-full items-center">
                                                                    <p className=" text-white w-1/3 flex justify-start items-start whitespace-nowrap">

                                                                        {moment(session.scheduleDateTime).format("DD MMM YYYY")}
                                                                    </p>
                                                                    <p className=" text-white w-1/3 flex justify-center items-start whitespace-nowrap">

                                                                        {moment(session.scheduleDateTime).format("HH:mm")}

                                                                    </p>
                                                                    <button
                                                                        className="flex justify-end w-1/3"
                                                                    >
                                                                        {session.toggle === "Reserve Session" ? (
                                                                            <Popup
                                                                                trigger={
                                                                                    <button className="flex space-x-2 items-center book-button" 
                                                                                    // disabled={(moment(session.scheduleDateTime).format("DD MMM YYYY HH:mm") < todayTime ? true : false) || session?.disabled}
                                                                                    >
                                                                                        <img src="/notBooked.png" />
                                                                                        <p className="futura-book text-md sizemobile">Reserve Session</p>
                                                                                    </button>

                                                                                } modal
                                                                                position="center"
                                                                                closeOnDocumentClick={false}
                                                                            >
                                                                                {close => (
                                                                                    <>
                                                                                        <button className="close" onClick={close}>
                                                                                            &times;
                                                                                        </button>
                                                                                        <div className="popup-bg rounded-md px-20 py-20">
                                                                                            <div className="flex flex-col items-center space-y-2">
                                                                                                <p className="text-[#009fe3] text-2xl mb-5"> Terms & Conditions</p>
                                                                                                <div className=" flex flex-col items-start space-y-2">
                                                                                                {/* <p className="futura-book text-base text-white">Reserving any session should be during the 10 hours prior to the session</p> */}
                                                                                                    <p className="futura-book text-base text-white">

                                                                                                        Canceling any session should be minimum before 10 hours of the session</p>

                                                                                                    <input type="checkbox" className="" onChange={onCheck} />
                                                                                                </div>
                                                                                                <div>
                                                                                                    {/* <button type="submit" disabled={isDisabledbutton}
                                                                                    onClick={(e) => reserveClass({ timetableId: item.timetableId, e })}
                                                                                    className="bg-[#009fe3] mt-10 w-20 futura-book text-white rounded p-2 btn-bookClass"> Book </button> */}
                                                                                                    <button className="bg-[#009fe3] mt-10 futura-book text-white rounded p-2 btn-bookClass" type="submit" disabled={isDisabledbutton}
                                                                                                        onClick={(e) => reserveClass({ scheduleId: session.scheduleId, e })}>
                                                                                                        {/* <img src="/notBooked.png" /> 
                                                                            <p className="futura-book text-md sizemobile">Reserve Session</p> */}
                                                                                                        Reserve Session
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                )}
                                                                            </Popup>
                                                                        ) : (
                                                                            <div className="flex space-x-2 items-baseline">
                                                                                <img src="/booked.png" />
                                                                                <p className="futura-book text-white text-md sizemobile">{session?.toggle}</p>
                                                                                <button className=" text-[#009FE3] futura-bold text-sm cancel-button" onClick={(e) => removeClass({ scheduleId: session.scheduleId, e })}>
                                                                                    Cancel
                                                                                    <Close className="cancel-close" />
                                                                                </button>
                                                                            </div>

                                                                        )}
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                                </TabPanel>
                            ))}
                        </Tabs>
                    </MobileView>
                </div>
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




