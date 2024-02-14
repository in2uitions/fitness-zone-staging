/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

const Footer = ({ noSubBG }) => {
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }
  const sendEmail = (ms) => new Promise((r) => setTimeout(r, ms));
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()
  const [facebookLink, setFaceBookLink] = useState();
  const [instaLink, setInstaLink] = useState();

  useEffect(() => {
    const getVisitorLocationAPI = async () => {
        try {
            const res = await fetch(
                `https://ipapi.co/json/`
            );
            const data = await res.json();
            if (data.country_code == 'AE') { 
                setFaceBookLink('https://www.facebook.com/FitnessZoneUAE?mibextid=opq0tG')
                setInstaLink('https://www.instagram.com/fitnesszoneuae?igsh=MWU1NWRvazd6b2phbw==')
                setEmail('info@fitnesszone.me')
                setPhoneNumber('+971 54 727 4777')
            }
            else {
                setFaceBookLink('https://www.facebook.com/FitnessZoneLB?mibextid=opq0tG')
                setInstaLink('https://www.instagram.com/fitnesszonelb?igsh=bDM4bnFhcWNlbXZt')
                setEmail('info@fitnesszone.com.lb')
                setPhoneNumber('+961 3 505 250')
            }
        } catch (err) {
            console.log(err);
        }
    };

    getVisitorLocationAPI();
}, []);
  return (
    <footer className={`footer-half ${noSubBG ? '':'sub-bg'} section-padding pb-0`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="cont">
              <div className="logo">
                <a href="#0">
                  <img src="/logo.svg" alt="" />
                </a>
              </div>
              <div className="con-info custom-font">
                <ul>
                  <li>
                    <span>Email : </span> {email}
                  </li>
                  {/* <li>
                    <span>Address : </span> A32 , Ave 15th Street, Door 211, San
                    Franciso, USA 32490.
                  </li> */}
                  <li>
                    <span>Phone : </span> {phoneNumber}
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
          <div className="col-lg-5 offset-lg-2">
            <div className="comp">
            <div className="social-icon">
                <h6 className="custom-font stit simple-btn">Follow Us</h6>
                <div className="social">
                  <a href={facebookLink} className="icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href={instaLink} className="icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  {/* <a href="#0" className="icon">
                    <i className="fab fa-pinterest"></i>
                  </a> */}
                  <a href="https://www.linkedin.com/company/fitness-zone/" className="icon">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyrights text-center">
          <p>
            © 2024, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
