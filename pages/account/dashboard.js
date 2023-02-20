import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Close from "@material-ui/icons/Close";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useState, useEffect, useMemo } from "react";
import Post from "./trainers/homePageTrainer";
import { useRouter } from "next/router";
import PrivateMenu from "./private-menu";
import { getPrivateCarousel } from "../../api/server";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import Cookies from 'js-cookie'
import moment from "moment";

export default function Dashboard({ style = "white",books }) {
    // const [books, setBooks] = useState([]);
    const [data, setcheckInData] = useState([]);
    const [trainer, setTrainer] = useState([])
    const [bookedClass, setBookedClass] = useState([])
    const memberId = Cookies.get("Member");
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet =(Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
            router.push({ pathname: "/account/dashboard" });
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
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 7;

    // var firstday = new Date(curr.setDate(first)).toUTCString();
    // var lastday = new Date(curr.setDate(last)).toUTCString();
    var begin = moment().startOf('week').format("YYYY MM DD");
    var end = moment().endOf('week').format("YYYY MM DD");
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
    const removeClass = async ({ timetableId, e }) => {
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
                `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Class/Remove?timetableId=${timetableId}&memberId=${memberId}`,
                registrationRequestOptions
            );
            const data = await res.json();
            if (data.isValid == true) {
                const handleRemoveItem = (index) => {
                    const newList = [...bookedClass];
                    newList.splice(index, 1);
                    setBookedClass(newList);
                };
                handleRemoveItem();
            }
            else {
                alert("Class is not valid");
            }


        } catch (err) {
            console.log(err);
        }

    };
    var settings = {
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        appendDots: (dots) => {
            return <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />;
        },
    };


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
        const newd = new Date(d).toLocaleDateString("en-UG", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).replaceAll('/', '-');
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
                    `https://api.fitnessclubapp.com/api/Billing/SubscriberUser/List?isTrainer=true&isActive=True`, registrationRequestOptions

                );
                if (response.status == 200) {
                    const res = await fetch(
                        `https://fzcms.diastora.com/items/trainers`
                    )

                    const checkInList = await response.json()
                    const test = await res.json()
                    setData({ posts: checkInList, users: test.data });
                } else {
                    setData({ post: [], user: [{}] })
                }
            }
            getData()
        }, [])
    } catch (err) {
        console.log(err);
    }

    const filteredPosts = useMemo(() => {
        const filteredPosts = [];
        if (posts && users)
            for (let i = 0; i < posts.length && i < users.length; i++) {
                filteredPosts.push({ post: posts[i], user: users.find(({ userId }) => posts[i].userId === userId) });
            }
        return filteredPosts;
    }, [posts, users]);
    const router = useRouter();
    const [privateCarousel, setPrivateCarousel] = useState([]);
    var getdata = async () => {
        const carousel = await getPrivateCarousel();
        setPrivateCarousel(carousel);

    }

    useEffect(() => {
        getdata();
    }, []);

    return (
        <>
            <PrivateMenu />
            <section>
                <div className="lg:container lg:mx-auto flex flex-col justify-center mt-40 lg:px-20 md:px-20 px-0">
                    <p className="text-[#009FE3] futura-bold flex space-x-2 lg:px-0 md:px-0 px-2">
                        <span>HELLO</span>
                        <span>{books.fullName}</span>
                    </p>

                    <p className="futura-book text-white lg:px-0 md:px-0 px-2">Let’s burn some calories</p>


                    <Slider className="mt-10" {...settings}>
                        {privateCarousel.map((item) => (
                            <div className="relative">
                                {item.image ? <img src={`${image_url}${item.image}`} className="tintImg" /> : null}
                                <div className="absolute flex flex-col bottom-8 px-10">
                                    <div className="flex space-x-2 items-start">
                                        {item.on_icon ? <img src={`${image_url}${item.on_icon}`} className="h-6" /> : null}
                                        {item.title ? <p className="futura-bold text-3xl text-white">
                                            {item.title}
                                        </p> : null}
                                    </div>
                                    {item.description ? <p className="desc-dashboard text-white">{parse(`${item.description}`)} </p> : null}
                                </div>
                            </div>
                        ))}
                    </Slider>


                </div>
            </section>
            <section>
                <div className="lg:container lg:mx-auto lg:px-20 md:px-20 px-3 mt-10 mb-20 lg:grid lg:grid-cols-12 gap-x-10 lg:space-y-0 md:space-y-0 space-y-10 w-screen">
                    <div className="col-span-3">
                        <p className="text-[#009FE3] futura-bold">Membership Details</p>
                        <div className="flex flex-col space-y-3 mt-10 membership-box p-10 items-center">
                            <img src="/gold-member.png" className="w-20 h-20" />
                            <p className="futura-bold text-white">{books.membershipType?.memberShipTypeName}</p>
                            <p className="rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button btnActive">
                                <span className="text-white text-base futura-book">Active till:</span>
                                <span className="text-white futura-bold exipryDate">{dateButif(books.expiryDate)}</span>
                            </p>
                            <a href="/account/membership" className="futura-bold cursor-pointer text-white text-lg btn-nowrap">
                                VIEW MEMBERSHIP DETAILS
                                <ChevronRightIcon className="arrow-membership" />
                            </a>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <p className="text-[#009FE3] futura-bold mb-10">
                            My Upcoming Classes
                        </p>
                        {slice.map((item, index) => (
                            <>
                                <div
                                    className="flex classes-box mb-3 items-center p-2 w-full flex-wrap"
                                    onChange={(event) => handleInputChange(event, index)}
                                >
                                    <div className="space-x-2 flex items-center w-3/4">

                                        <p className="w-full futura-book border-r pr-3 border-[#009FE3] text-white text-lg">
                                            {dateOnly(item.classTime)}
                                        </p>

                                        <p className="w-full futura-book border-r pr-3 border-white text-white text-lg">
                                            {item.instructor?.type}
                                        </p>
                                        <p className="w-full futura-book border-r pr-3 border-[#009FE3] text-white text-lg">{item.instructor?.firstName}</p>
                                    </div>
                                    <div className="flex space-x-2 sizing pl-3">
                                        <p
                                            className="futura-book text-white text-lg"
                                        >
                                            {item.location?.locationName}
                                        </p>
                                        {/* <button onClick={(e, index) => removeClass({ timetableId: item.timetableId, e, index })}>
                                            <p className="flex items-center text-[#8F8F8F] futura-bold text-sm">
                                                Cancel
                                                <Close className="x-close" />
                                            </p>
                                        </button> */}
                                    </div>
                                </div>
                            </>
                        ))}

                        <div
                            // className="flex lg:justify-center text-white items-center cursor-pointer futura-bold"
                            className={
                                "" +
                                (bookedClass.length > 4 ? "flex lg:justify-center text-white items-center cursor-pointer futura-bold" : "hidden")
                            }
                            onClick={() => {
                                toggle(!state);
                                loadMoreLess();
                            }}
                        >
                            {state ? "VIEW ALL" : "VIEW LESS"}
                            <ChevronRightIcon className="arrow-membership" />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <p className="text-[#009FE3] mb-10 futura-bold">
                            My Recent Checkins
                        </p>
                        {data.slice(0, 4).map((item) => (
                            <>
                                <div className="flex justify-start items-start classes-box mb-3 p-3">
                                    <div className="space-x-2 flex items-center w-full">
                                        <p className="text-white text-lg border-r border-[#009FE3] futura-book w-3/5">{dateButif(item.value)}</p>
                                        {/* <p className='border-r border-[#009FE3] text-white'>{item.time}</p> */}
                                        <p className="text-white text-lg futura-book w-2/5 text-right flex justify-end pr-3">{item.text}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                        <a
                            href="/account/myCheckIns"
                            className="flex lg:justify-center items-center cursor-pointer futura-bold text-white"
                        >
                            VIEW ALL
                            <ChevronRightIcon className="arrow-membership" />
                        </a>
                    </div>
                    <div className="col-span-3">
                        <p className="text-[#009FE3] futura-bold">My Training Packages</p>
                        {filteredPosts.slice(0, 1).map((post, index) => (
                            <div className="flex flex-col space-y-3 mt-10 membership-box p-10 items-center">
                                <Post post={post?.post} users={post?.user} key={index} />
                                {/* <p className="rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button btnActive">
                                    <span className="text-white text-base futura-book">Sessions:</span>
                                    <span className="text-white futura-bold exipryDate">09/15</span>
                                </p> */}
                                <a href="/account/trainers/015443cb-6a34-410e-951a-57d9545f612b" className="futura-bold cursor-pointer text-white text-lg btn-nowrap ">
                                    VIEW PACKAGE DETAILS
                                    <ChevronRightIcon className="arrow-membership" />
                                </a>
                            </div>
                        ))}
                        {/* <p className="text-[#009FE3] futura-bold">Training Packages</p>
                        <div className="flex flex-col space-y-3 mt-10 membership-box p-2 items-center">
                            <img src="/trainer-package.png" />
                            <p className="futura-bold text-white">KAMEL RAAD</p>
                            <p className="rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button">
                                <span className="text-white text-base futura-book">Sessions:</span>
                                <span className="text-white futura-bold">09/15</span>
                            </p>
                            <p className="futura-bold cursor-pointer text-white">
                                VIEW PACKAGE DETAILS
                                <ChevronRightIcon className="arrow-membership" />
                            </p>
                        </div> */}
                    </div>
                </div>
            </section>
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