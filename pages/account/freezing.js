import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState,useEffect, useMemo } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "../../styles/Header.module.css";
import Popup from 'reactjs-popup';
import { useRouter } from "next/router";

const localizer = momentLocalizer(moment)

export default function Frezzing() {
    const events = [
        {
            'title': 'All Day Event very long title',
            'allDay': true,
            'start': new Date(2022, 3, 0),
            'end': new Date(2022, 3, 1)
        },
        {
            'title': 'Long Event',
            'start': new Date(2022, 3, 7),
            'end': new Date(2022, 3, 10)
        },
    
        {
            'title': 'DTS STARTS',
            'start': new Date(2016, 2, 13, 0, 0, 0),
            'end': new Date(2016, 2, 20, 0, 0, 0)
        },
    
        {
            'title': 'DTS ENDS',
            'start': new Date(2016, 10, 6, 0, 0, 0),
            'end': new Date(2016, 10, 13, 0, 0, 0)
        },
    
        {
            'title': 'Some Event',
            'start': new Date(2022, 3, 9, 0, 0, 0),
            'end': new Date(2022, 3, 9, 0, 0, 0)
        },
        {
            'title': 'Conference',
            'start': new Date(2022, 3, 11),
            'end': new Date(2022, 3, 13),
            desc: 'Big conference for important people'
        },
        {
            'title': 'Meeting',
            'start': new Date(2022, 3, 12, 10, 30, 0, 0),
            'end': new Date(2022, 3, 12, 12, 30, 0, 0),
            desc: 'Pre-meeting meeting, to prepare for the meeting'
        },
        {
            'title': 'Lunch',
            'start': new Date(2022, 3, 12, 12, 0, 0, 0),
            'end': new Date(2022, 3, 12, 13, 0, 0, 0),
            desc: 'Power lunch'
        },
        {
            'title': 'Meeting',
            'start': new Date(2022, 3, 12, 14, 0, 0, 0),
            'end': new Date(2022, 3, 12, 15, 0, 0, 0)
        },
        {
            'title': 'Happy Hour',
            'start': new Date(2022, 3, 12, 17, 0, 0, 0),
            'end': new Date(2022, 3, 12, 17, 30, 0, 0),
            desc: 'Most important meal of the day'
        },
        {
            'title': 'Dinner',
            'start': new Date(2022, 3, 12, 20, 0, 0, 0),
            'end': new Date(2022, 3, 12, 21, 0, 0, 0)
        },
        {
            'title': 'Birthday Party',
            'start': new Date(2022, 3, 13, 7, 0, 0),
            'end': new Date(2022, 3, 13, 10, 30, 0)
        },
        {
            'title': 'Birthday Party 2',
            'start': new Date(2022, 3, 13, 7, 0, 0),
            'end': new Date(2022, 3, 13, 10, 30, 0)
        },
        {
            'title': 'Birthday Party 3',
            'start': new Date(2022, 3, 13, 7, 0, 0),
            'end': new Date(2022, 3, 13, 10, 30, 0)
        },
        {
            'title': 'Late Night Event',
            'start': new Date(2022, 3, 17, 19, 30, 0),
            'end': new Date(2022, 3, 18, 2, 0, 0)
        },
        {
            'title': 'Multi-day Event',
            'start': new Date(2022, 3, 20, 19, 30, 0),
            'end': new Date(2022, 3, 22, 2, 0, 0)
        }
    ]
    
    const { views } = useMemo(() => ({
        views: {
            month: true
        }
    }), [])
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
    const memberId = localStorage.getItem('Member');
    const [books, setBooks] = useState(true)
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                const fetchedData = await response.json();
                setBooks(fetchedData);
                // console.log(fetchedData)
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const router = useRouter();
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            localStorage.clear();
            router.push({ pathname: "/account/login"});
        };
        getTokenAPI();

    };
    return (
        <>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <a href="/">
                        <img src="/logo.svg" className="logo" />
                    </a>
                    <Popup
                        trigger={
                            <div className="flex items-center space-x-2">
                                <button className="img-btn">
                                    <img src="/blue-rectangle.svg" className="menu-icon" />
                                </button>
                                <p className="font-bold text-white futura-book cursor-pointer">
                                    Menu
                                </p>
                            </div>
                        }
                        modal
                        closeOnDocumentClick
                        position=""
                    >
                        <div className="w-screen h-screen container mx-auto flex flex-col justify-center items-center">
                            {/* <img src="/icons-person.png" /> */}
                            <a href="/account/dashboard" className="flex space-x-1 border-4 border-[#009FE3] rounded-full w-40 h-40 items-center justify-center">
                            <p className="futura-bold text-6xl text-[#009FE3]">{books.firstName?.charAt(0)}</p>
                            <p className="futura-bold text-6xl text-[#009FE3]">{books.lastName?.charAt(0)}</p>
                            </a>
                            <p className="futura-bold text-[#009FE3] mt-5">{books.fullName}</p>
                            <div className="flex flex-col mt-10">
                                <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a
                                        href="/account/myProfile"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        {" "}
                                        My Profile
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a
                                        href="/account/membership"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        Membership Settings
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                </div>
                                <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a href="/account/classListing" className="futura-book menu-member flex items-center justify-between text-white">
                                        Classes / Book a class
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a
                                        href="/account/trainers"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        Trainers / Book a package
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                </div>
                                <form onSubmit={onSubmitForm}>
                                    <div className="flex justify-center items-center">
                                        <button type="submit" className="text-white border-2 border-[#009FE3] w-1/2 mt-5 p-2 futura-book">Log Out</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Popup>
                </nav>
            </div>
            <div className='container mx-auto lg:px-20 md:px-20 px-3 mt-40'>
                <Calendar
                    defaultView="month"
                    localizer={localizer}
                    // events={events}
                    views={views}
                    // startAccessor="start"
                    // endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        </>
    )
}