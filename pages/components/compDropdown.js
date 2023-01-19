import Image from "next/image";
import React, { Component } from "react";
import { image_url } from "../../global_vars";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ClickAwayListener from 'react-click-away-listener';
import { ItemsHandler } from "@directus/sdk";

export default function CompDropdown({ data = {} }) {
    const [dropdownState, setDropdownState] = useState(false);
    const[open, setOpen] = useState(false)
    const [dropdownValue, setDropdownValue] = useState("");
    const router = useRouter();
    const handleDropdownClick = () => {
        setDropdownState(!dropdownState);
    };
   
    const handleClose = () => {
        setDropdownState(false);
    };
    function handleSetDropdownValue (value, localValue){
        localStorage.setItem("Location", localValue);
        // console.log(localValue)
        setDropdownValue(value);
        setDropdownState(!dropdownState);
        router.push({ pathname: "/bookClass"});
    };
    const handleClickAway = () => {
        setDropdownState(false);
	};

    return (
        <section id={`${data.title}`}>
        
            <div className={`md:my-24 pt-10 relative container mx-auto px-8`}>
                <div className={`lg:flex mx-auto items-center `}>
                    <div className=" lg:w-1/2 pt-6 lg:pt-0 lg:block">
                        <div id="wrapper" className={`main-image-center`}>
                            <img
                                src={`${image_url}${data.image?.id}`}
                                alt={`${data.image?.title}`}
                            />
                        </div>
                    </div>
                    <div className=" lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 pl-2 lg:pl-20 lg:pr-36 md:pl-0 md:px-16 lg:px-16 lg:-mt-14">
                        {data.description ?<p className="mb-5 text-white">{parse(`${data.description}`)}</p>:null}
                        {/* <ClickAwayListener onClickAway={handleClickAway}>
                        <div className={`dropdown`}>
                            <button onClick={handleDropdownClick} className="dropdown-btn text-white">
                                {dropdownValue === "" ? "Hamra" : dropdownValue}
                            </button>
                            <div 
                                className={`dropdown-items text-white ${dropdownState ? "isVisible" : "isHidden"}`}
                            >
                                <div className="dropdown-item" id="0" onClick={() => handleSetDropdownValue("Head Office" ,0)}>
                                    <div  
                                        className="dropdown__link"
                                    >
                                        Head Office
                                    </div>
                                </div>
                                <div className="dropdown-item" id="1" onClick={() => handleSetDropdownValue("Hamra" ,1)}>
                                    <div
                                        className="dropdown__link"
                                    >
                                        Hamra
                                    </div>
                                </div>
                                <div className="dropdown-item" id="2" onClick={() => handleSetDropdownValue("Baabda" ,2)} >
                                    <div
                                        className="dropdown__link"
                                    >
                                        Baabda
                                    </div>
                                </div>
                                <div className="dropdown-item" id="3" onClick={() => handleSetDropdownValue("kaslik" ,3)}>
                                    <div
                                        className="dropdown__link"
                                    >
                                        kaslik
                                    </div>
                                </div>
                                <div className="dropdown-item" id="4" onClick={() => handleSetDropdownValue("Beirut Souks" ,4)}>
                                    <div
                                        className="dropdown__link"
                                    >
                                        Beirut Souks
                                    </div>
                                </div>
                                <div className="dropdown-item" id="5" onClick={() => handleSetDropdownValue("Verdun" ,5)}>
                                    <div
                                        className="dropdown__link"
                                    >
                                        Verdun
                                    </div>
                                </div>
                                <div className="dropdown-item" id="6" onClick={() => handleSetDropdownValue("ABC Achrafieh" ,6)}>
                                    <div
                                        className="dropdown__link"
                                    >
                                        ABC Achrafieh
                                    </div>
                                </div>
                                <div className="dropdown-item" id="7" onClick={() => handleSetDropdownValue("Dbayeh" ,7)}>
                                    <div
                                        className="dropdown__link"
                                    >
                                        Dbayeh
                                    </div>
                                </div>
                                <div className="dropdown-item" id="8" onClick={() => handleSetDropdownValue("Online" ,8)}>
                                    <div
                                        className="dropdown__link"
                                    >
                                        Online
                                    </div>
                                </div>
                                <div className="dropdown-item" id="9" onClick={() => handleSetDropdownValue("Dalfa" ,9)}>
                                    <div
                                        className="dropdown__link"
                                    >
                                        Dalfa
                                    </div>
                                </div>
                                <div className="dropdown-item" id="10" onClick={() => handleSetDropdownValue("Tennis" ,10)}>
                                    <div
                                        className="dropdown__link"
                                    >
                                        Tennis
                                    </div>
                                </div>
                            </div>
                        </div>
                        </ClickAwayListener> */}
                        <a href="/bookClass" className="mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold cursor-pointer w-auto"> {data.button_title}<ChevronRight/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
