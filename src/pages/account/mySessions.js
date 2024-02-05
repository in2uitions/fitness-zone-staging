import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import PrivateMenu from './private-menu';
import { ArrowDropDown } from '@material-ui/icons';
import moment from 'moment';
import Close from "@material-ui/icons/Close";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { BrowserView, MobileView } from 'react-device-detect';
import DarkTheme from '../../layouts/Dark';
export default function MySessions(Info) {
    const memberId = Cookies.get("Member");
    const { query } = useRouter()
    console.log(query)
    const router = useRouter()
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet = (Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
            router.push({ pathname: "/account/mySessions" });
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
    function dateButif(d) {
        const newd = new Date(d).toLocaleDateString("en-UG", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        return newd;
    }
    var userValueTrainer =  Cookies.get("userId");
    const [filtered, setFiltered] = useState([]);
    const [session, setSession] = useState([]);
    const [toggle, setToggle] = useState("Book class");
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
            var queryy = '';
            var queryy = `dateFrom=${begin}&dateTo=${end}`
            if (val) {
                queryy = queryy + `${queryy != '' ? '&' : '?'}&isNotReserved=true`
            }
            var queryyy = '';
            var queryyy = `dateFrom=${begin}&dateTo=${end}`
            if (val) {
                queryyy = queryyy + `${queryyy != '' ? '&' : '?'}`
            }
            try {
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/Administration/SecurityUser/Schedule?UserId=${userValueTrainer}&${queryy}`,
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
                    console.log(dataClass)
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
                    console.log(classes)
                    // setFiltered(classes);
                }
                // else {
                //     setSessions([]);
                //     setFiltered([]);
                // }

                if (response.status == 200) {
                    const fetchedData = await response.json();
                    console.log(fetchedData)
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
    }, [])
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
                        console.log(scheduleId)
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
                console.log(newClasssValue.map(el => el.capacity?.length))
            }
            else {
                alert("Class is not valid");
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
                alert("Class is not valid");
            }

        } catch (err) {
            console.log(err);
        }

    };
    console.log(filtered)
    var userValue = Cookies.get("contractNumber");
    var userValue2 = Cookies.get("userId");
    const route = (contractNumber, id) => router.push({ pathname: "/account/reserveSession", query: { contractNumber, id } });
    return (
        <>
        <DarkTheme>
            <PrivateMenu />
            <section style={{backgroundImage:'url("/PrivateArea.jpg")', objectFit:"cover"}}>
                <div className="container lg:px-28 px-20 mx-auto flex flex-col justify-center items-center mt-40-top pb-20-bottom h-full sessionspage">
                    
                    <BrowserView className='flex flex-col w-3/5 space-y-4 mb-5'>
                    {/* <p className='text-[#009fe3] futura-bold text-2xl'>Click here to Reserve a Session with your Trainer</p> */}
                        {userValue && userValue2 ? <button onClick={() => route(userValue, userValue2)} className="futura-bold menu-member flex items-center justify-between rounded-md" style={{background:"rgba(143, 143, 143, 0.1)", width:"100%", fontSize:"1.25rem"}}>
                        Click here to Book a Session with your Trainer
                            <ChevronRightIcon className="arrow-membership" />
                        </button> : null}
                        <p className='text-colorblue montserrat-bold text-2xl px-2' style={{marginTop:"2.5rem"}}>My Recent Sessions</p>
                        {sessions.map(session => (
                            <div

                            ><div className="flex flex-col lg:mx-auto md:max-auto justify-start lg:w-full md:w-full items-start mt-2 px-2 lg:px-0 md:px-0">
                                    <div className="flex justify-start lg:w-full items-center classes-box mb-3 p-3 mx-auto container">
                                        <div className="space-x-2 flex w-full">
                                            <p className="border-r pr-1 border-[#009FE3] text-white w-1/2 flex justify-start items-start whitespace-nowrap">
                                                {/* {dateButif(session.sessionDate)} */}
                                                {moment(session.sessionDate).format("DD MMM YYYY")}
                                            </p>
                                            {/* <p className="border-r pr-1 border-[#009FE3] text-white w-1/3 flex justify-center items-start whitespace-nowrap">
                                               
                                            {moment(session.sessionDate).format("HH:mm")}

                                            </p> */}
                                            <p className="text-white text-base lg:text-xl md:text-xl w-1/2 flex justify-center items-center whitespace-nowrap">
                                                {session.location.locationName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start space-x-3 lg:mx-auto md:max-auto  lg:w-full md:w-full items-start px-2 lg:px-0 md:px-0 ul-list">
                                    {exercises[session.sessionNumber] &&
                                        exercises[session.sessionNumber]
                                            .filter(exercise => exercise.isChecked)
                                            .map(exercise => (
                                                <p className='border p-2 rounded-md text-md futura-book' key={exercise.exerciseId}>{exercise.exerciseName}</p>
                                            ))}
                                </div>

                            </div>
                        ))}
                    </BrowserView>
                    <MobileView>
                    <div className='flex flex-col w-full space-y-4 mb-5 px-2'>
                    {/* <p className='text-[#009fe3] futura-bold text-2xl'>Click the Reserve Session button to lock in your spot for a new session.</p> */}
                        {userValue && userValue2 ? <button onClick={() => route(userValue, userValue2)} className="futura-bold menu-member flex items-center justify-between rounded-md text-left" style={{background:"rgba(143, 143, 143, 0.1)", width:"100%"}}>
                        Click here to Book a Session with your Trainer
                            <ChevronRightIcon className="arrow-membership" />
                        </button> : null}
                    </div>
                    <div className='flex flex-col w-full'>
                        <p className='text-[#009FE3] futura-bold mt-5 text-2xl mb-3 px-2'>My Recent Sessions</p>
                        {sessions.map(session => (
                            <div

                            ><div className="flex flex-col lg:mx-auto md:max-auto justify-start lg:w-full md:w-full items-start mt-5 px-2 lg:px-0 md:px-0">
                                    <div className="flex justify-start lg:w-full items-center classes-box mb-3 p-3 mx-auto container">
                                        <div className="space-x-2 flex w-full">
                                            <p className="border-r pr-1 border-[#009FE3] text-white w-1/2 flex justify-start items-start whitespace-nowrap">
                                                {/* {dateButif(session.sessionDate)} */}
                                                {moment(session.sessionDate).format("DD MMM YYYY")}
                                            </p>
                                            {/* <p className="border-r pr-1 border-[#009FE3] text-white w-1/3 flex justify-center items-start whitespace-nowrap">
                                               
                                            {moment(session.sessionDate).format("HH:mm")}

                                            </p> */}
                                            <p className="text-white text-base lg:text-xl md:text-xl w-1/2 flex justify-center items-center whitespace-nowrap">
                                                {session.location.locationName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="flex justify-start space-x-3 lg:mx-auto md:max-auto  lg:w-full md:w-full items-start px-2 lg:px-0 md:px-0 ul-list">
                                    {exercises[session.sessionNumber] &&
                                        exercises[session.sessionNumber]
                                            .filter(exercise => exercise.isChecked)
                                            .map(exercise => (
                                                <p className='border p-2 rounded-md text-md futura-book' key={exercise.exerciseId}>{exercise.exerciseName}</p>
                                            ))}
                                </div> */}
                                <div className="grid grid-cols-2 gap-3 lg:mx-auto md:max-auto lg:w-full md:w-full items-start px-2 lg:px-0 md:px-0 ul-list">
    {exercises[session.sessionNumber] &&
        exercises[session.sessionNumber]
            .filter(exercise => exercise.isChecked)
            .map(exercise => (
                <p className='border p-2 rounded-md text-md futura-book' key={exercise.exerciseId}>{exercise.exerciseName}</p>
            ))}
</div>

                            </div>
                        ))}
                    </div>
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




