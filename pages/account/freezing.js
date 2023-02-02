import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect, useMemo } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "../../styles/Header.module.css";
import Popup from 'reactjs-popup';
import { useRouter } from "next/router";
import PrivateMenu from './private-menu';
import Cookies from 'js-cookie'

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
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    useEffect(() => {
        if (itemSet) {
            router.push({ pathname: "/account/freezing" });
        }
        else {
            router.push({ pathname: "/account/login" });
        }
    }, [])
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
    const memberId = Cookies.get('Member');
    const [books, setBooks] = useState(true)
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
                    setBooks(fetchedData);
                }
                // console.log(fetchedData)
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const router = useRouter();
    return (
        <>
            <PrivateMenu />
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