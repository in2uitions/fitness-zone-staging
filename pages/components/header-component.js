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
                    <a href="/"><img src="/logo.png" className="logo" /></a>
                    <Popup ref={ref}
                        trigger={
                            <button className="img-btn">
                                <img src="/blue-rectangle.png" className="menu-icon" />
                            </button>
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
