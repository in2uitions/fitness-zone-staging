import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Close from "@material-ui/icons/Close";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getTrainers } from "../../api/server";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";

export default function Trainers({ style = "white" }) {
    const [data, setData] = useState([]);
    const router = useRouter();
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
                    `https://api.fitnessclubapp.com/api/Billing/SubscriberUser/List?isTrainer=true&isActive=True`,
                    registrationRequestOptions

                );
                const trainersList = await response.json()
                setData(trainersList)
            }

        }, [])

    } catch (err) {
        console.log(err);
    }
    const userId = data.map(el => el.userId)
    const route = (id) => router.push({ pathname: "/login-process/trainers-profile", query: { id } });

    useEffect(() => {
        getdata();
    }, []);
    const [trainers, setTrainers] = useState([]);
    const [trainersloaded, setTrainersLoaded] = useState(false);
    const getdata = async () => {
        const trainer = await getTrainers();
        setTrainers(trainer);
        setTrainersLoaded(true)
    }

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
                            <p className="futura-bold text-[#009FE3] mt-5">CHARLES KHOURY</p>
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
                <div className="container mx-auto flex flex-col justify-start mt-40 w-screen px-3 lg:px-0 md:px-0">
                    <p className="text-[#009FE3] futura-bold">Trainers List</p>
                    <div className="grid lg:grid-cols-12 gap-x-3 gap-y-3 items-start mt-10">
                    {data.map((itemAPI)=>(
                            <>
                            {/* {trainers.map((item, i) => ( */}
                                    <div className="lg:col-span-3 h-full">
                                        <div className='flex flex-col space-y-3 membership-box p-10 items-center h-full'>

                                            <>

                                                <div className="flex flex-col justify-center items-center space-y-3">
                                            
                                                    {/* <>
                                                    {item.image ? <img src={`${image_url}${item.image}`} className="rounded-full w-20 h-20" altv={item.title} /> : null}
                                                </> */}
                                                <p>{itemAPI.userId}</p>
                                                    <p className='futura-bold flex space-x-2 cursor-pointer text-white'>{itemAPI.fullName}</p>
                                                    <p className='futura-book cursor-pointer text-white' onClick={() => route(itemAPI.userId)}>{itemAPI.securityGroupName}</p>
                                                    {/* {trainers.map((item, i) => (
                                                        <>
                                                    {item.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${item.description}`)} </p> : null}
                                                </>
                                                    ))} */}
                                                </div>

                                            </>

                                        </div>

                                    </div>
                            {/* ))} */}
                            </>
                        
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
}

