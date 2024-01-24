/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import PrivateMenu from "./private-menu";
import { getPrivateCarousel } from "../../api/server";
import { image_url } from "../../../global_vars";
import parse from "html-react-parser";
import Cookies from "js-cookie";
import moment from "moment";
import DarkTheme from "../../layouts/Dark";
import Post from "../../components/trainers/homePageTrainer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export default function Dashboard({ style = "white", books }) {
    // const [books, setBooks] = useState([]);
    const [data, setcheckInData] = useState([]);
    const [trainer, setTrainer] = useState([]);
    const [bookedClass, setBookedClass] = useState([]);
    const memberId = Cookies.get("Member");
    const itemSet =
        Cookies.get("token") != null || Cookies.get("token") != undefined;
    const tokenSet = Cookies.get("OTP") != null;
    useEffect(() => {
        if (itemSet && tokenSet) {
            router.push({ pathname: "/account/dashboard" });
        } else {
            router.push({ pathname: "/account/login" });
        }
    }, []);

    var registrationHeaders = new Headers();
    registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
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
                    `https://api.fitnessclubapp.com/api/membership/member/CheckinListItem/${memberId}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const checkInList = await response.json();
                    setcheckInData(checkInList);
                }
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    var curr = new Date();
    var first = curr.getDate() - curr.getDay();
    var last = first + 7;

    // var firstday = new Date(curr.setDate(first)).toUTCString();
    // var lastday = new Date(curr.setDate(last)).toUTCString();
    var begin = moment().startOf("week").format("YYYY MM DD");
    var end = moment().endOf("week").format("YYYY MM DD");
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Member/${memberId}?dateFrom=${begin}&dateTo=${end}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const checkInList = await response.json();
                    setBookedClass(checkInList);
                }
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    // var settings = {
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //     ],
    //     dots: true,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     appendDots: (dots) => {
    //         return <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />;
    //     },
    // };

    const handleInputChange = (event, index) => {
        const { value } = event.target;
        const newclassesList = [...classesList];
        newclassesList[index].input = value;
        newclassesList[index].input_rank = index + 1;
        setClassesList(newclassesList);
    };

    const [noOfCheckInElements, setnoOfCheckInElements] = useState(3);
    const sliceCheckIn = data.slice(0, noOfCheckInElements);
    const loadMoreLessCheckIn = () => {
        if (noOfCheckInElements == 3) {
            setnoOfCheckInElements(data.length);
        } else {
            setnoOfCheckInElements(3);
        }
    };
    // const [stateCheckIn, toggleCheckIn] = useState(true);
    const [noOfElements, setnoOfElements] = useState(4);
    const slice = bookedClass.slice(0, noOfElements);
    const loadMoreLess = () => {
        if (noOfElements == 4) {
            setnoOfElements(bookedClass.length);
        } else {
            setnoOfElements(4);
        }
    };
    const [state, toggle] = useState(true);
    function dateButif(d) {
        const newd = new Date(d)
            .toLocaleDateString("en-UG", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            .replaceAll("/", "-");
        return newd;
    }
    function dateOnly(d) {
        const newd = new Date(d).toLocaleTimeString("en-UG", {
            hour12: "false",
            hour: "numeric",
            minute: "numeric",
        });
        return newd;
    }
    const [{ posts, users }, setData] = useState({ post: [], user: [{}] });
    try {
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
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Training/Contract/List/${memberId}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const res = await fetch(`https://cms.fitnesszone.me/items/trainers`);

                    const checkInList = await response.json();
                    const test = await res.json();
                    setData({ posts: checkInList, users: test.data });
                } else {
                    setData({ post: [], user: [{}] });
                }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }

    const filteredPosts = useMemo(() => {
        const filteredPosts = [];
        if (posts && users)
            for (let i = 0; i < posts.length && i < users.length; i++) {
                filteredPosts.push({
                    post: posts[i],
                    user: users.find(
                        ({ userId }) => posts[i]?.trainerUser?.userId === userId
                    ),
                });

                const userId = posts[i]?.trainerUser?.userId;
                console.log(userId);
                if (userId) {
                    Cookies.set("UserId", userId);
                }
            }
        return filteredPosts;
    }, [posts, users]);
    const router = useRouter();
    const [privateCarousel, setPrivateCarousel] = useState([]);
    var getdata = async () => {
        const carousel = await getPrivateCarousel();
        setPrivateCarousel(carousel);
    };

    useEffect(() => {
        getdata();
    }, []);
    var userValue = Cookies.get("UserId");
    const route = (id) =>
        router.push({ pathname: "/account/trainers-profile", query: { id } });
    return (
        <DarkTheme>
            <PrivateMenu/>
            <section  style={{marginBottom:"2rem"}}>
                <div
                    className="container mx-auto flex flex-col justify-center lg:px-20 md:px-20 px-0"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginTop: "10rem",
                    }}
                >
                    <p
                        className="text-[#008DDC] font-bold flex space-x-2 lg:px-0 md:px-0 px-2"
                        style={{
                            color: "#008DDC",
                            display: "flex",
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: "bold",
                            fontSize: "18px",
                        }}
                    >
                        <span style={{ marginRight: "5px" }}>HELLO</span>
                        <span>{books.fullName}</span>
                    </p>

                    <p
                        className="futura-book text-white lg:px-0 md:px-0 px-2"
                        style={{
                            color: "white",
                            display: "flex",
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: "normal",
                            fontSize: "18px",
                        }}
                    >
                        Let’s burn some calories
                    </p>

                    {/* <Slider className="mt-10" {...settings}>
                        {privateCarousel.map((item) => (
                            <div className="relative">
                                {item.image ? <img src={`${image_url}${item.image}`} className="tintImg" /> : null}
                                <div className="absolute flex flex-col bottom-8 px-10">
                                    <div className="flex space-x-2 items-start">
                                        {item.on_icon ? <img src={`${image_url}${item.on_icon}`} className="h-6" /> : null}
                                        {item.title ? <p className="font-bold text-3xl text-white">
                                            {item.title}
                                        </p> : null}
                                    </div>
                                    {item.description ? <p className="desc-dashboard text-white">{parse(`${item.description}`)} </p> : null}
                                </div>
                            </div>
                        ))}
                    </Slider> */}
                </div>
            </section>
            <section className="mt-10">
                <div
                    className="container lg:mx-auto lg:px-20 md:px-20 px-3  lg:grid lg:grid-cols-12 gap-x-10 lg:space-y-0 md:space-y-0 space-y-10 w-screen"
                    style={{
                        marginTop: "2.5rem",
                        marginBottom: "5rem",
                        display: "grid",
                        columnGap: "2.5rem",
                    }}
                >
                    <div className="col-span-3">
                        <p
                            className="text-[#008DDC] font-bold"
                            style={{
                                fontSize: "18px",
                                color: "#008DDC",
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: "bold",
                            }}
                        >
                            Membership Details
                        </p>
                        <div
                            className="flex flex-col space-y-3 membership-box p-10 items-center"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "2.5rem",
                                alignItems: "center",
                                padding: "2.5rem",
                            }}
                        >
                            <img
                                src="/homepage/gold-member.png"
                                className="w-20 h-20"
                                style={{ width: "5rem", height: "5rem" }}
                            />
                            <p className="font-bold text-white"
                                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bold", fontSize: "18px", marginTop: "1rem", marginBottom: "1rem" }}>
                                {books.membershipType?.memberShipTypeName}
                            </p>
                            <p className="rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button btnActive"
                                style={{ borderRadius: "0.375rem" }}>
                                <span className="text-white text-base futura-book"
                                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "normal", marginRight: "5px" }}>
                                    Active till:
                                </span>
                                <span className="text-white font-bold exipryDate"
                                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bold" }}>
                                    {dateButif(books.expiryDate)}
                                </span>
                            </p>
                            <a
                                href="/account/membership"
                                className="font-bold cursor-pointer text-white text-lg btn-nowrap"
                                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bold", fontSize: "1.125rem", display:"flex" }}
                            >
                                VIEW MEMBERSHIP DETAILS
                                <ChevronRightIcon className="arrow-membership" />
                            </a>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <p
                            className="text-[#008DDC] font-bold "
                            style={{
                                fontSize: "18px",
                                color: "#008DDC",
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: "bold",
                                marginBottom: "2.5rem"
                            }}
                        >
                            My Upcoming Classes
                        </p>
                        {slice.map((item, index) => (
                            <>
                                <div
                                    className="flex classes-box "
                                    style={{ display: "flex", alignItems: "center", padding: "0.5rem", width: "100%", flexWrap: "wrap", marginBottom: "0.75rem" }}
                                    onChange={(event) => handleInputChange(event, index)}
                                >
                                    <div className="space-x-2"
                                        style={{ width: "75%", display: "flex", alignItems: "center" }}>
                                        <p className="w-full futura-book text-white text-lg"
                                            style={{ fontSize: "1.125rem", width: "100%", borderRight: "1px solid #008DDC", paddingRight: "0.75rem" }}>
                                            {dateOnly(item.classTime)}
                                        </p>

                                        <p className="w-full futura-book border-r  border-white text-white text-lg"
                                            style={{ borderRight: "1px solid white", paddingRight: "0.75rem" }}>
                                            {item.instructor?.type}
                                        </p>
                                        <p className="w-full futura-book border-r  border-[#008DDC] text-white text-lg"
                                            style={{ borderRight: "1px solid #008DDC", paddingRight: "0.75rem" }}>
                                            {item.instructor?.firstName}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2 sizing pl-3">
                                        <p className="futura-book text-white text-lg"
                                            style={{ paddingLeft: "0.75rem" }}>
                                            {item.location?.locationName}
                                        </p>
                                        {/* <button onClick={(e, index) => removeClass({ timetableId: item.timetableId, e, index })}>
                                            <p className="flex items-center text-[#8F8F8F] font-bold text-sm">
                                                Cancel
                                                <Close className="x-close" />
                                            </p>
                                        </button> */}
                                    </div>
                                </div>
                            </>
                        ))}

                        <div
                            // className="flex lg:justify-center text-white items-center cursor-pointer font-bold"
                            className={
                                "" +
                                (bookedClass.length > 4
                                    ? "flex lg:justify-center text-white items-center cursor-pointer font-bold"
                                    : "hidden")
                            }
                            onClick={() => {
                                toggle(!state);
                                loadMoreLess();
                            }}
                            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bold", display:"flex" }}
                        >
                            {state ? "VIEW ALL" : "VIEW LESS"}
                            <ChevronRightIcon className="arrow-membership" />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <p
                            className="text-[#008DDC] font-bold"
                            style={{
                                fontSize: "18px",
                                color: "#008DDC",
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: "bold",
                                marginBottom: "2.5rem"
                            }}
                        >
                            My Recent Checkins
                        </p>
                        {data.slice(0, 4).map((item) => (
                            <>
                                <div className="flex justify-start items-start classes-box mb-3 "
                                    style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", padding: "0.75rem" }}>
                                    <div className="space-x-2 flex items-center w-full"
                                        style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                        <p className="text-lg futura-book w-3/5"
                                            style={{ width: "60%", borderRight: "1px solid #008DDC", fontSize: "1.125rem", fontFamily: "'Montserrat', sans-serif" }}>
                                            {dateButif(item.value)}
                                        </p>
                                        {/* <p className='border-r border-[#008DDC] text-white'>{item.time}</p> */}
                                        <p className="text-white text-lg futura-book w-2/5 text-right flex justify-end pr-3"
                                            style={{ width: "40%", fontSize: "1.125rem", fontFamily: "'Montserrat', sans-serif" }}>
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ))}
                        <a
                            href="/account/myCheckIns"
                            className="flex lg:justify-center items-center cursor-pointer font-bold text-white"
                            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bold", fontSize: "1.125rem", display:"flex" }}
                        >
                            VIEW ALL
                            <ChevronRightIcon className="arrow-membership" />
                        </a>
                    </div>
                    <div className="col-span-3">
                        <p
                            className="text-[#008DDC] font-bold"
                            style={{
                                fontSize: "18px",
                                color: "#008DDC",
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: "bold",
                                marginBottom: "2.5rem"
                            }}
                        >
                            My Training Packages
                        </p>
                        {userValue != "undefined" &&
                            filteredPosts.slice(0, 1).map((post, index) => (
                                <div className="flex flex-col space-y-3 membership-box  items-center"
                                style={{marginTop:"2.5rem", padding:"2.5rem"}}>
                                    <Post post={post?.post} users={post?.user} key={index} />
                                    {/* <p className="rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button btnActive">
                                    <span className="text-white text-base futura-book">Sessions:</span>
                                    <span className="text-white font-bold exipryDate">09/15</span>
                                </p> */}
                                    {userValue ? (
                                        <button
                                            onClick={() => route(userValue)}
                                            className="font-bold cursor-pointer text-white text-lg btn-nowrap "
                                            style={{fontFamily:"'Montserrat', sans-serif", fontWeight:"bold", display:"flex"}}
                                        >
                                            VIEW PACKAGE DETAILS
                                            <ChevronRightIcon className="arrow-membership" />
                                        </button>
                                    ) : null}
                                </div>
                            ))}
                        {/* <p className="text-[#008DDC] font-bold">Training Packages</p>
                        <div className="flex flex-col space-y-3 mt-10 membership-box p-2 items-center">
                            <img src="/trainer-package.png" />
                            <p className="font-bold text-white">KAMEL RAAD</p>
                            <p className="rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button">
                                <span className="text-white text-base futura-book">Sessions:</span>
                                <span className="text-white font-bold">09/15</span>
                            </p>
                            <p className="font-bold cursor-pointer text-white">
                                VIEW PACKAGE DETAILS
                                <ChevronRightIcon className="arrow-membership" />
                            </p>
                        </div> */}
                    </div>
                </div>
            </section>
        </DarkTheme>
    );
}

export async function getServerSideProps(context) {
    const memberId = context.req.cookies["Member"];
    const token = context.req.cookies["token"];
    var registrationHeaders = new Headers();
    registrationHeaders.append("Authorization", "Bearer " + token);
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
        const books = await response.json();
        return {
            props: { books },
        };
    }
}
