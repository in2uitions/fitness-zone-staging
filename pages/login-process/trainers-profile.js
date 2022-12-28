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
import { image_url } from "../../global_vars";
import Router, { useRouter } from "next/router";
import parse from "html-react-parser";

export default function TrainersProfile({ style = "white" }) {
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData]=useState([])
    const { query } = useRouter()
    const router = useRouter()
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
                    `https://api.fitnessclubapp.com/api/Billing/SubscriberUser/${query.id}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const res = await fetch(
                        `https://fzcms.diastora.com/items/trainers?filter[userId][_eq]=${query.id}`
                    )
                    const fetchedData = await response.json();
                    const trainer = await res.json();
                    let dataRes = fetchedData;
                    if (trainer.data.length == 1) {
                        const image = trainer.data[0].image;
                        const description = trainer.data[0].description;
                        dataRes = { ...dataRes, image, description };
                    }
                    setData(dataRes);
                }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const format = (num, decimals) => num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
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
                <div className="container mx-auto flex flex-col justify-start mt-40 px-3 lg:px-0 md:px-0">
                <div className="flex justify-between">
                    <p className="text-[#009FE3] futura-bold">Trainers List</p>
                    {/* <select name="category">
                        {categoryData.map((item) =>(
                            <option value={item.categoryId}>{item.category?.categoryName}</option>
                        ))}
                    </select> */}
                    </div>
                    <div className="lg:grid lg:grid-cols-12 gap-x-10 gap-y-3 items-start mt-10 space-y-10 lg:space-y-0 md:space-y-0">
                        {/* {data.map((item) => ( */}
                        <div className="col-span-4">
                            <div className='flex flex-col space-y-3 membership-box p-10 items-center'>
                                <>
                                    <img className="w-20 h-20 rounded-full" src={`${image_url}${data?.image}`} />
                                    <p className='futura-bold flex space-x-2 cursor-pointer text-white'>{data.fullName}</p>
                                    <p className='futura-book cursor-pointer text-white'>{data.securityGroupName}</p>
                                    {/* {data.packageList?.map((item, id) =>(
                                        <p key={id}>{item.category.categoryName}</p>
                                        ))} */}
                                    <p>{data.packageList?.slice(0, 1).map(el => el.category?.categoryName)}</p>
                                    <div className="flex space-x-3 items-center rounded-md p-2 active-button">
                                        <img className="" src="/location-marker.png" />
                                        <p className="text-white">{data.locationName}</p>
                                    </div>
                                </>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <p>{parse(`${data?.description}`)}</p>
                        </div>
                        <div className="col-span-4">
                            <div className="space-y-5">
                                {data.packageList?.slice(0, 3).map((item) => (
                                    <div className="membership-box p-3 rounded-md">
                                        <div className="flex items-center w-full">
                                            <div className="flex flex-col w-3/4">
                                                <p className="futura-bold text-white">{item.category.categoryName}</p>
                                                <p className="text-white">The classes are in 3 speciality Studios, Energy Studio</p>
                                            </div>
                                            <div className="flex items-center w-1/4">
                                                <div className="flex flex-col">
                                                    <p><span className="text-2xl text-[#009FE3] futura-book">$</span><span className='text-4xl futura-book text-[#009FE3]'>
                                                        {format(item.sessionPrice)}
                                                    </span>
                                                    </p>
                                                    <p className='text-[#009FE3] -mt-4 tracking text-xs'>per session</p>
                                                </div>
                                                <ChevronRightIcon className="chevron-session" />
                                            </div>
                                        </div>

                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-10 gap-y-5 mt-5">
                        {data.packageList?.slice(3, data.packageList?.length).map((item) => (
                            <div className="col-span-4">
                                <div className="membership-box p-3 rounded-md">
                                    <div className="flex items-center w-full">
                                        <div className="flex flex-col w-3/4">
                                            <p className="futura-bold text-white">{item.category.categoryName}</p>
                                            <p className="text-white">The classes are in 3 speciality Studios, Energy Studio</p>
                                        </div>
                                        <div className="flex items-center w-1/4">
                                            <div className="flex flex-col">
                                                <p><span className="text-2xl text-[#009FE3] futura-book">$</span><span className='text-4xl futura-book text-[#009FE3]'>
                                                    {format(item.sessionPrice)}
                                                </span>
                                                </p>
                                                <p className='text-[#009FE3] -mt-4 tracking text-xs'>per session</p>
                                            </div>
                                            <ChevronRightIcon className="chevron-session" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    );
}