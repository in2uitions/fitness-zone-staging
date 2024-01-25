import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import events from "./events";
import Cookies from "js-cookie";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllRecords } from "../../api/server";
import 'moment/locale/en-gb';

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
    const memberId = Cookies.get('Member');
    const [books, setBooks] = useState(true)
    try {
        var registrationHeaders = new Headers();
        registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
        registrationHeaders.append("Content-Type", "application/json");
        var registrationRequestOptions = {
            method: 'GET',
            headers: registrationHeaders
        };
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
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }

    const [events, setEvents] = useState([]);
    const [eventsloaded, setEventsloaded] = useState(false);
    useEffect(() => {
        getsdata();
    }, []);
    const getsdata = async () => {
        const event = await getAllRecords("lebanon_freezing_requests");
        setEvents(event);
        setEventsloaded(true);
    };
    const [eventsData, setEventsData] = useState(events);
    useEffect(() => {
        const getVisitorLocationAPI = async () => {
            try {
                const res = await fetch(
                    `https://ipapi.co/json/`
                );
                const data = await res.json();
                if (data.country_code == 'LB') {
                    const fetchData = async () => {
                        const eventList = await getAllRecords("lebanon_freezing_requests");
                        setEventsData(
                            eventList.map((event) => ({
                                start: moment(event.start).toDate(),
                                end: moment(event.end).add(1, "days").toDate(),
                                title: event.title,
                            }))
                        );
                        setEventsloaded(true);
                    };
                    fetchData();
                }
                else if (data.country_code == 'AE') {
                    const fetchData = async () => {
                        const eventList = await getAllRecords("uae_freezing_requests");
                        setEventsData(
                            eventList.map((event) => ({
                                start: moment(event.start).toDate(),
                                end: moment(event.end).add(1, "days").toDate(),
                                title: event.title,
                            }))
                        );
                        setEventsloaded(true);
                    };
                    fetchData();
                }
            } catch (err) {
                console.log(err);
            }
        };

        getVisitorLocationAPI();
    }, []);


    const memberShipTypeName = books.membershipType?.memberShipTypeName;
    const duration = books.membershipType?.duration;

    const handleSelect = async ({ start, end }) => {
        if (memberShipTypeName === "CORPORATE." && memberShipTypeName !== 'undefined') {
            const startDate = moment(start).startOf("day");
            const endDate = moment(end).subtract(1, "day").startOf("day");

            if (
                startDate.date() !== 1 ||
                endDate.date() !== moment(endDate).endOf("month").date()
            ) {
                alert("Freezing requests can only be made for a full month, starting from the 1st of the month and ending on the last day of the month.");
                return;
            }

        } else {
            const startDate = moment(start).startOf("day");
            const endDate = moment(end).subtract(1, "day").startOf("day");

            const diffInDays = endDate.diff(startDate, 'days') + 1;

            const fullMonthEndDate = moment(startDate).endOf("month");
            const fullMonthDuration = fullMonthEndDate.diff(startDate, 'days') + 1;
            // console.log("startDate: ", startDate);
            // console.log("endDate: ", endDate);
            if (diffInDays !== 15 && diffInDays !== fullMonthDuration) {
                // console.log("startDate: ", startDate);
                // console.log("endDate: ", endDate);
                alert("Dates must be either a 15-day range or a full month.");
                return;
            }
        }
        const getVisitorLocationAPI = async () => {
            try {
                const res = await fetch(
                    `https://ipapi.co/json/`
                );
                const data = await res.json();
                if (data.country_code == 'LB') {
                    const title = window.prompt("Freezing Request Date");
                    if (title) {
                        end = moment(end).subtract(1, "days").toDate();

                        const member_id = memberId;
                        const color = ["#FF0000"];
                        const status = "published";
                        const name = books.firstName;
                        const last_name = books.lastName;
                        const phone_number = books.mobile;
                        const email = books.email;
                        const location = books.membershipLocation.locationName;
                        const newEvent = {
                            start: moment(start).format("YYYY-MM-DD"),
                            end: moment(end).format("YYYY-MM-DD"),
                            member_id,
                            title,
                            name,
                            last_name,
                            phone_number,
                            email,
                            color,
                            location,
                            status,
                        };

                        try {
                            const response = await fetch("https://fzcms.diastora.com/items/lebanon_freezing_requests", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(newEvent),
                            });
                            if (response.ok) {
                                const newEventWithId = await response.json();
                                setEventsData((prevEvents) => [...prevEvents, newEventWithId]);
                                const fetchData = async () => {
                                    const eventList = await getAllRecords("lebanon_freezing_requests");
                                    setEventsData(
                                        eventList.map((event) => ({
                                            start: moment(event.start).toDate(),
                                            end: moment(event.end).add(1, "days").toDate(),
                                            title: event.title,
                                        }))
                                    );
                                    setEventsloaded(true);
                                };
                                fetchData();
                            } else {
                                throw new Error("Failed to create event");
                            }

                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
                else if (data.country_code == 'AE') {
                    const title = window.prompt("Freezing Request Date");
                    if (title) {
                        end = moment(end).subtract(1, "days").toDate();

                        const member_id = memberId;
                        const color = ["#FF0000"];
                        const status = "published";
                        const name = books.firstName;
                        const last_name = books.lastName;
                        const phone_number = books.mobile;
                        const email = books.email;
                        const location = books.membershipLocation.locationName;
                        const newEvent = {
                            start: moment(start).format("YYYY-MM-DD"),
                            end: moment(end).format("YYYY-MM-DD"),
                            member_id,
                            title,
                            name,
                            last_name,
                            phone_number,
                            email,
                            location,
                            color,
                            status,
                        };

                        try {
                            const response = await fetch("https://fzcms.diastora.com/items/uae_freezing_requests", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(newEvent),
                            });
                            if (response.ok) {
                                const newEventWithId = await response.json();
                                setEventsData((prevEvents) => [...prevEvents, newEventWithId]); // Add new event to eventsData array
                                const fetchData = async () => {
                                    const eventList = await getAllRecords("uae_freezing_requests");
                                    setEventsData(
                                        eventList.map((event) => ({
                                            start: moment(event.start).toDate(),
                                            end: moment(event.end).add(1, "days").toDate(),
                                            title: event.title,
                                        }))
                                    );
                                    setEventsloaded(true);
                                };
                                fetchData();
                            } else {
                                throw new Error("Failed to create event");
                            }

                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        getVisitorLocationAPI();

    };
    const getStartOfMonth = () => {
        const now = moment();
        const startOfMonth = now.startOf('month');
        const nearestSunday = startOfMonth.clone().startOf('week');
        return nearestSunday.toDate();
    };
    return (
        <>
            <div className="App">
                <Calendar
                    views={["month"]}
                    selectable
                    localizer={localizer}
                    defaultDate={new Date()}

                    defaultView="month"
                    step="month"
                    events={eventsData}
                    style={{ height: "100vh" }}
                    onSelectEvent={(event) => alert(event.title)}
                    onSelectSlot={handleSelect}
                    // startAccessor={getStartOfMonth}
                    endAccessor="end"

                />

            </div>
            {/* <p>{books.firstName}</p> */}
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