import { useState, useEffect } from "react";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function CheckIns() {
    const [data, setData] = useState([]);
    const memberId = localStorage.getItem('Member');
    var registrationHeaders = new Headers();
    registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: 'GET',
        headers: registrationHeaders
    };
    try {

        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/membership/member/CheckinListItem/${memberId}`,
                    registrationRequestOptions

                );
                const checkInList = await response.json()
                setData(checkInList)
            }
            // getData()
        }, [])
    } catch (err) {
        console.log(err);
    }
    function dateButif(d) {
        const newd = new Date(d).toLocaleDateString("en-UG", {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
        return newd;
    }
    const[books, setBooks]=useState(true)
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
    const [state, toggle] = useState(true);
     const [noOfElements, setnoOfElements] = useState(4);
    const slice = data.slice(0, noOfElements);
    const loadMoreLess = () => {
        if (noOfElements == 4) {
            setnoOfElements(data.length);
        } else {
            setnoOfElements(4);
        }
    };
    return (
        <>
            <div className={styles.container}>
                    <nav className={styles.nav}>
                        <a href="/">
                            <img src="/logo.png" className="logo" />
                        </a>
                        <Popup
                            trigger={
                                <div className="flex items-center space-x-2">
                                    <button className="img-btn">
                                        <img src="/blue-rectangle.png" className="menu-icon" />
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
                                <img src="/icons-person.png" />
                                <p className="futura-bold text-[#009FE3] mt-5">{books.fullName}</p>
                                <div className="flex flex-col mt-10">
                                    <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0 md:space-y-0">
                                        <a
                                            href="/login-process/myProfile"
                                            className="futura-book menu-member flex items-center justify-between"
                                        >
                                            {" "}
                                            My Profile
                                            <ChevronRightIcon className="fill-[#009FE3]" />
                                        </a>
                                        <a href='/login-process/membership' className="futura-book menu-member flex items-center justify-between">
                                            Membership Settings
                                            <ChevronRightIcon className="fill-[#009FE3]" />
                                        </a>
                                    </div>
                                    <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                        <a href="/login-process/classListing" className="futura-book menu-member flex items-center justify-between text-white">
                                            Classes / Book a class
                                            <ChevronRightIcon className="fill-[#009FE3]" />
                                        </a>
                                        <a href='/login-process/trainers' className="futura-book menu-member flex items-center justify-between">
                                            Trainers / Book a package
                                            <ChevronRightIcon className="fill-[#009FE3]" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </nav>
                </div>
            <section>
                <div className='flex flex-col justify-center mt-40'>
                    <div className='flex flex-col mx-auto justify-start items-start lg:w-1/4 md:w-1/4'>
                        <p className='text-[#009FE3] futura-bold mb-3'>My Recent Check-ins</p>
                        {slice.map((item) => (
                            <>
                                <div className='flex justify-start items-start classes-box mb-3 p-3' >
                                    <div className='space-x-2 flex'>
                                        <p className='text-white text-md pr-2 border-r border-[#009FE3] futura-book'>{dateButif(item.value)}</p>
                                        {/* <p className='border-r border-[#009FE3] text-white'>{item.time}</p> */}
                                        <p className='text-white text-md futura-book'>{item.text}</p>
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
                </div>
            </section>
        </>
    )
}