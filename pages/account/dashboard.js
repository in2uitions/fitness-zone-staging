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

export default function Dashboard({ style = "white" }) {
    const [books, setBooks] = useState([]);
    const [data, setcheckInData] = useState([]);
    const [trainer, setTrainer] = useState([])
    const [bookedClass, setBookedClass] = useState([])
    const memberId = localStorage.getItem("Member");
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
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/membership/member/CheckinListItem/${memberId}`,
                    registrationRequestOptions
                );
                const checkInList = await response.json();
                setcheckInData(checkInList);
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 7;

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();

    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Member/${memberId}?dateFrom=${firstday}&dateTo=${lastday}`,
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
        console.log(timetableId)
        try {
            var registrationHeaders = new Headers();
            registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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
            const handleRemoveItem = (index) => {
                const newList = [...bookedClass];
                newList.splice(index, 1);
                setBookedClass(newList);
            };
            // localStorage.setItem("Phone", event.target.mobile.value);
            //alert("You have changed your Phone Number. Congratulations!")
            handleRemoveItem();


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
    const carousel_components = [
        {
            image: "/dashboard-pics.png",
            on_icon: "/on-classes.png",
            text: "STRETCHING",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard",
        },
        {
            image: "/dashboard-pics.png",
            on_icon: "/on-classes.png",
            text: "STRETCHING",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard",
        },
        {
            image: "/dashboard-pics.png",
            on_icon: "/on-classes.png",
            text: "STRETCHING",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard",
        },
        {
            image: "/dashboard-pics.png",
            on_icon: "/on-classes.png",
            text: "STRETCHING",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard",
        },
        {
            image: "/dashboard-pics.png",
            on_icon: "/on-classes.png",
            text: "STRETCHING",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard",
        },
    ];
    const [classesList, setClassesList] = useState([
        {
            time: "08:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "09:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "10:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "11:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "12:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "01:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "02:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "03:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "04:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "05:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "06:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
        {
            time: "07:00",
            step: "B.Step",
            name: "Elie",
            city: "Dbayeh",
        },
    ]);
    useEffect(() => {
        if (classesList.length > 0) {
            classesList[classesList.length - 1].input === "";
        }
    });

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
        registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            localStorage.clear();
            router.push({ pathname: "/login-process/login"});
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
                            <a href="/login-process/dashboard" className="flex space-x-1 border-4 border-[#009FE3] rounded-full w-40 h-40 items-center justify-center">
                                <p className="futura-bold text-6xl text-[#009FE3]">{books.firstName?.charAt(0)}</p>
                                <p className="futura-bold text-6xl text-[#009FE3]">{books.lastName?.charAt(0)}</p>
                            </a>
                            <p className="futura-bold text-[#009FE3] mt-5">{books.fullName}</p>
                            <div className="flex flex-col mt-10">
                                <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a
                                        href="/login-process/myProfile"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        {" "}
                                        My Profile
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a
                                        href="/login-process/membership"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        Membership Settings
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                </div>
                                <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a href="/login-process/classListing" className="futura-book menu-member flex items-center justify-between text-white">
                                        Classes / Book a class
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a
                                        href="/login-process/trainers"
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
            <section>
                <div className="lg:container lg:mx-auto flex flex-col justify-center mt-40 lg:px-20 md:px-20 px-0">
                    <p className="text-[#009FE3] futura-bold flex space-x-2">
                        <span>HELLO</span>
                        <span>{books.fullName}</span>
                    </p>

                    <p className="futura-book text-white">Let’s burn some calories</p>
                    <Slider className="mt-10" {...settings}>
                        {carousel_components.map((item) => (
                            <>
                                <div className="relative">
                                    <img src={item.image} />
                                    <div className="absolute flex flex-col bottom-8 px-10">
                                        <div className="flex space-x-2 items-start">
                                            <img src={item.on_icon} className="h-6" />
                                            <p className="futura-bold text-3xl text-white">
                                                {item.text}
                                            </p>
                                        </div>
                                        <p className="desc-dashboard text-white">{item.desc}</p>
                                    </div>
                                </div>
                            </>
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
                                <span className="text-white futura-bold">{dateButif(books.expiryDate)}</span>
                            </p>
                            <a href="/login-process/membership" className="futura-bold cursor-pointer text-white text-lg btn-nowrap">
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
                                    className="flex classes-box mb-3 p-2 flex-wrap"
                                    onChange={(event) => handleInputChange(event, index)}
                                >
                                    <div className="space-x-2 flex">
                                        <p className="futura-book pr-1 border-r border-[#009FE3] text-white text-lg">
                                            {dateOnly(item.classTime)}
                                        </p>
                                        <p className="futura-book pr-1 border-r border-white text-white text-lg">
                                            {item.instructor?.type}
                                        </p>
                                        <p className="futura-book text-white text-lg">{item.instructor?.firstName}</p>
                                    </div>
                                    <div className="flex justify-end space-x-2 items-end ml-auto sizing">
                                        <p
                                            className="futura-book text-white"
                                            style={{ fontSize: 14 }}
                                        >
                                            {item.location?.locationName}
                                        </p>
                                        <button onClick={(e, index) => removeClass({ timetableId: item.timetableId, e, index })}>
                                            <p className="flex items-center text-[#8F8F8F] futura-bold text-sm">
                                                Cancel
                                                <Close className="x-close" />
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}

                        <div
                            className="flex lg:justify-center text-white items-center cursor-pointer futura-bold"
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
                                    <div className="space-x-2 flex">
                                        <p className="text-white text-md border-r border-[#009FE3] pr-3 futura-book">{dateButif(item.value)}</p>
                                        {/* <p className='border-r border-[#009FE3] text-white'>{item.time}</p> */}
                                        <p className="text-white text-lg futura-book">{item.text}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                        <a
                            href="/login-process/myCheckIns"
                            className="flex lg:justify-center items-center cursor-pointer futura-bold text-white"
                        >
                            VIEW ALL
                            <ChevronRightIcon className="arrow-membership" />
                        </a>
                    </div>
                    <div className="col-span-3">
                        <p className="text-[#009FE3] futura-bold">Training Packages</p>
                        {filteredPosts.slice(0, 1).map((post, index) => (
                            <div className="flex flex-col space-y-3 mt-10 membership-box p-10 items-center">
                                <Post post={post?.post} users={post?.user} key={index} />
                                <p className="rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button btnActive">
                                    <span className="text-white text-base futura-book">Sessions:</span>
                                    <span className="text-white futura-bold">09/15</span>
                                </p>
                                <a href="/login-process/trainers" className="futura-bold cursor-pointer text-white text-lg btn-nowrap">
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
