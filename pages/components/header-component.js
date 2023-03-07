import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import Menu from "./menu-items";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function HeaderContent(data = {}, about = []) {
    const [showModal, setShowModal] = useState(true);
    const ref = useRef();
    const toggleTooltip = () => ref.current.toggle();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [button, setButton] = useState();
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet = (Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
            setButton(<a href='/account/dashboard' className="h-6">DASHBOARD</a>)
        }
        else {
            setButton(<a href='/account/login' className="">LOG IN</a>)
        }
    }, [])
    const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setColorchange(true);
        }
        else {
            setColorchange(false);
        }
    };
    window.addEventListener('scroll', changeNavbarColor);
    return (
        <>
            <div className={styles.container}>
                <nav className={colorChange ? styles.navWithBg : styles.nav}>
                    <a href="/"><img src="/logo.svg" className="logo object-cover" /></a>
                    <div className="flex justify-end">
                        {location.pathname !== "/account/login" && location.pathname !== "/account/otp" ?
                            <>
                                {open && (
                                    <p></p>
                                )}
                                {!open && (
                                    <a href="/account/login" className="border-[#009FE3] border-2 w-36 p-2 rounded flex justify-center items-center mr-5 futura-bold"> {button}</a>
                                )}
                            </>
                            : null}
                        <Popup ref={ref}
                            trigger={
                                <div className="flex items-center space-x-2">
                                    <button className="img-btn">
                                        <img src="/blue-rectangle.svg" onClick={() => setOpen(o => !o)} className="menu-icon object-cover" style={{ width: "60px" }} />
                                    </button>
                                    {/* <p className="font-bold text-white futura-book cursor-pointer">Menu</p> */}
                                </div>
                            } modal nested
                            closeOnDocumentClick
                            open={open}
                            position=""
                        >
                            <Menu data={data} about={about} />
                        </Popup>
                    </div>

                </nav>
            </div>
        </>

    );
}
