import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect, useMemo } from 'react';
import styles from "../../styles/Header.module.css";
import Popup from 'reactjs-popup';
import { useRouter } from "next/router";
import PrivateMenu from './private-menu';
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic';
import { getAllRecords } from '../../../api/server.js';
import DarkTheme from '../../layouts/Dark';

const localizer = momentLocalizer(moment)
const CalendarComponent = dynamic(
    () => import('../../components/fullcalendar.js'),
    {
        ssr: false,
    }
);
export default function Frezzing(books) {

    const { views } = useMemo(() => ({
        views: {
            month: true
        }
    }), [])
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet = (Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
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
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [eventsloaded, setEventsloaded] = useState(false);
    useEffect(() => {
        getsdata();
    }, []);
    const getsdata = async () => {
        const event = await getAllRecords("lebanon_freezing_requests");
        setEvents(event);
        setEventsloaded(true)
    }
    return (
        <>
            <PrivateMenu />
            <DarkTheme>
            <div  style={{marginBottom:"2rem"}} className='container mx-auto px-20 mt-40-top mb-20-bottom'>
                <CalendarComponent events={events} />
            </div>
            </DarkTheme>
        </>
    )
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
    if (response.status == 401) {
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        };
    } else {
        const books = await response.json()
        return {
            props: { books }
        }
    }
}