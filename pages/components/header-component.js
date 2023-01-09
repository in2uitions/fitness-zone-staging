import React, { useState, useRef } from "react";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import Menu from "./menu-items";

export default function HeaderContent(data = {}, about = []) {
    const [showModal, setShowModal] = useState(true);
    const ref = useRef();
    const toggleTooltip = () => ref.current.toggle();
    return (
        <>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <a href="/"><img src="/logo.png" className="logo object-cover" /></a>
                    <Popup ref={ref}
                        trigger={
                            <div className="flex items-center space-x-2">
                            <button className="img-btn">
                                <img src="/blue-rectangle.png" className="menu-icon object-cover" />
                            </button>
                            <p className="font-bold text-white futura-book cursor-pointer">Menu</p>
                            </div>
                        } modal
                        closeOnDocumentClick
                        position=""
                    >
                        <Menu data={data} about={about} />
                    </Popup>




                </nav>
            </div>
        </>
    );
}
