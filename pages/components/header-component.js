import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import Menu from "./menu-items";

export default function HeaderContent(data = {}, about = []) {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <a href="/"><img src="/logo.png" className="logo" /></a>
                <Popup
                    trigger={ 
                        <button className="img-btn">
                            <img src="/blue-rectangle.png" className="menu-icon" />
                        </button>
                    } modal
                    position=""
                >
                    <Menu data={data} about={about} />
                </Popup>

                {showModal ? (
                    <div className="backdrop-blur-xl mt-10 flex justify-center items-center flex-col w-screen rounded-lg shadow-xl h-screen p-2">
                        {/* <Image src={Group36} width={100} height={100} objectFit="contain" /> */}
                        <button
                            className="my-5 w-auto px-8 h-10 bg-[#009fe3] text-white rounded-md shadow hover:shadow-lg font-semibold"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                ) : null}
            </nav>
        </div>
    );
}
