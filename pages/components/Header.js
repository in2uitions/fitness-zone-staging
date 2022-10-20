import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import Menu from "./Menu";

export default function Header(data = {}, about = []) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <a href="/"><img src="/logo.png" /></a>
        <Popup
          trigger={
            <button className="img-btn">
              <img src="/Group 17.png" />
            </button>
          } modal
          position=""
        >
          <Menu data={data} about={about} />
        </Popup>

        {showModal ? (
          <div className="backdrop-blur-xl mt-10 flex justify-center items-center flex-col w-screen rounded-lg shadow-xl h-screen p-2">
            <Image src={Group36} width={100} height={100} objectFit="contain" />
            <button
              className="my-5 w-auto px-8 h-10 bg-[#009fe3] text-white rounded-md shadow hover:shadow-lg font-semibold"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        ) : null}
      </nav>

      {/* <div class="hidden sm:block">
        <img src="Path 133.png" id="path" className={styles.media} />

        <a href="https://www.facebook.com/FitnessZoneLB/" target="_blank" rel="noreferrer">
          <img src="Path 131.png" className={styles.mediaiconsfb} />
        </a>

        <a href="https://www.instagram.com/fitnesszonelb/" target="_blank" rel="noreferrer">
          <img src="Group 28.png" className={styles.mediaiconsinsta} />
        </a>

        <a
          href="https://www.linkedin.com/company/fitness-zone/"
          target="_blank" rel="noreferrer"
        >
          <img src="Group 29.png" className={styles.mediaiconslinkedin} />
        </a>

        <a
          href="https://www.youtube.com/channel/UCxaK9VYi8cBP_Y1rgRfwumw"
          target="_blank" rel="noreferrer"
        >
          <img src="Path 132.png" className={styles.mediaiconsyt} />
        </a>
      </div> */}
    </div>
  );
}
