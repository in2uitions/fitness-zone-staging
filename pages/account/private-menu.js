import Popup from "reactjs-popup"
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "../../styles/Header.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'

export default function PrivateMenu() {
    const memberId = Cookies.get('Member');
    const [data, setData] = useState(true)
    const router = useRouter();
    var registrationHeaders = new Headers();
    registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
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
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const fetchedData = await response.json();
                    setData(fetchedData);
                }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            Cookies.remove('token');
            Cookies.remove('Member');
            Cookies.remove('Phone');
            Cookies.remove('Country')
            router.push({ pathname: "/account/login" });
        };
        getTokenAPI();

    };
    return (
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
                    <div className="w-screen h-screen flex flex-col justify-center items-center popup-overlay">
                        <a href="/account/dashboard" className="flex space-x-1 border-4 border-[#009FE3] rounded-full w-40 h-40 items-center justify-center">
                            <p className="futura-bold text-6xl text-[#009FE3]">{data.firstName?.charAt(0)}</p>
                            <p className="futura-bold text-6xl text-[#009FE3]">{data.lastName?.charAt(0)}</p>
                        </a>
                        <p className="futura-bold text-[#009FE3] mt-5">{data.fullName}</p>
                        <div className="flex flex-col mt-10">
                            <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0 md:space-y-0">
                                <a
                                    href="/account/myProfile"
                                    className="futura-book menu-member flex items-center justify-between rounded-md"
                                >
                                    {" "}
                                    My Profile
                                    <ChevronRightIcon className="forward-blue" />
                                </a>
                                <a href='/account/membership' className="futura-book menu-member flex items-center justify-between rounded-md">
                                    Membership Settings
                                    <ChevronRightIcon className="forward-blue" />
                                </a>
                            </div>
                            <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                <a href="/account/classListing" className="futura-book menu-member flex items-center justify-between text-white rounded-md">
                                    Classes / Book a class
                                    <ChevronRightIcon className="forward-blue" />
                                </a>
                                <a href='/account/trainers' className="futura-book menu-member flex items-center justify-between rounded-md">
                                    Trainers / Buy a package
                                    <ChevronRightIcon className="forward-blue" />
                                </a>
                            </div>
                            <form onSubmit={onSubmitForm}>
                                <div className="flex justify-center items-center">
                                    <button type="submit" className="text-white border-2 border-[#009FE3] w-1/2 mt-5 p-2 futura-book rounded-md">Log Out</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Popup>
            </nav>
        </div>
    )
}