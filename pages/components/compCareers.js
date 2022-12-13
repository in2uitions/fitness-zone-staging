import React, { useState } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Popup from "reactjs-popup";

export default function CompCareers({ data = {}, style = 'white', isFlipped = false, }) {
    const [activeSlide, setactiveSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(false)
    const [clickTiggered, setClickTriggered] = useState(false)

    let timeout = setTimeout(() => {
        if (nextSlide == true && clickTiggered == true) {
            activeSlide < data.careers.length - 1 && setactiveSlide(activeSlide + 1);
            setClickTriggered(false)
        }
    }, 1000);
    const next = () =>
        activeSlide < data.careers.length - 1 && setactiveSlide(activeSlide + 1);

    const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);

    const getStyles = (index) => {
        if (activeSlide === index)
            return {
                opacity: 1,
                transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
                zIndex: 22,
                width: 500,
                height: 230
            };
        else if (activeSlide - 1 === index)
            return {
                opacity: 0,
                transform: "translateX(-240px) translateZ(-400px) rotateY(0deg)",
                zIndex: 9,

            };
        else if (activeSlide + 1 === index)
            return {
                opacity: 1,
                transform: "translateX(520px) translateZ(-400px) rotateY(0deg)",
                zIndex: 9,
                width: 400,
                height: 230
            };
        else if (activeSlide - 2 === index)
            return {
                opacity: 0,
                transform: "translateX(-480px) translateZ(-500px) rotateY(0deg)",
                zIndex: 8
            };
        else if (activeSlide + 2 === index)
            return {
                opacity: 1,
                transform: "translateX(940px) translateZ(-500px) rotateY(0deg)",
                zIndex: 8,
                width: 345,
                height: 230
            };
        else if (index < activeSlide - 2)
            return {
                opacity: 0,
                transform: "translateX(-480px) translateZ(-500px) rotateY(0deg)",
                zIndex: 7
            };
        else if (index > activeSlide + 2)
            return {
                opacity: 0,
                transform: "translateX(480px) translateZ(-500px) rotateY(0deg)",
                zIndex: 7
            };
    };

    return (
        <>

            <div className={`lg:flex relative px-14 container pb-48`}>

                <div className="lg:w-1/2">
                    <div className="slideCC">
                        <>
                            <div className="">
                                <div
                                    className=""
                                >
                                    <div className="sliderContent">
                                        <div className="flex items-baseline space-x-5">
                                            <p className="font-bold futura-bold text-4xl">{data.title}</p>
                                            {/* {data.icon ? <img src={`${image_url}${data?.icon?.id}`} className="w-16 h-8" altv={data?.title} /> : null} */}
                                        </div>
                                        {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${data?.description}`)}</p> : null}
                                        {/* {data.button_title ? <a href={data.button_url} className="mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{data.button_title}<ChevronRightIcon /></a> : null} */}
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="slideC">
                        {data.careers.map((item, i) => (
                            <>
                                <div className="">

                                    <div key={item.id}
                                        className="absolute h-full transition duration-500 ease-out"
                                        style={{
                                            ...getStyles(i),
                                        }}
                                    >
                                        <div className="bg-[#3b3c40] w-full h-full flex flex-col justify-center items-center">
                                            <p className="futura-bold text-3xl mt-3">{item.careers_items_id?.title}</p>
                                            <p className="futura-book mt-3">{item.careers_items_id?.subtitle}</p>
                                            <Popup
                                                trigger={
                                                    <button>
                                                        <button className="bg-[#009FE3] p-2 rounded-md mt-5">{item.careers_items_id?.button}</button>
                                                    </button>
                                                } modal
                                                position="center"
                                                closeOnDocumentClick={false}
                                            >
                                                {close => (
                                                    <div className="container w-screen h-screen flex flex-col justify-center items-center">
                                                        <button className="flex w-full justify-end mb-3" onClick={close}>
                                                            &times;
                                                        </button>

                                                        <div className="flex w-full justify-between space-x-5">
                                                            <input placeholder="First Name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            <input placeholder="Last Name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            <input placeholder="Email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        </div>
                                                        <div className="flex w-full justify-between space-x-5 mt-10">
                                                            <input placeholder="Phone Number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            <input placeholder="Mobile Number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            <input placeholder="Education" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        </div>
                                                        <div className="flex w-full justify-between space-x-2 mt-10">
                                                        <div>
                                                            <input placeholder="Experience" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            </div>
                                                            <div className="w-3/4">
                                                            <label htmlFor="filePicker" className="w-full border-[#009FE3] pl-2 appearance-none block bg-transparent text-[#aeaeae] border rounded-md leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2">
                                                                Upload your CV
                                                            </label>
                                                            <input id="filePicker" style={{ visibility: "hidden" }} type={"file"} />
                                                            </div>
                                                        </div>
                                                        <button className="bg-[#009FE3] w-full p-2 mt-5 futura-bold rounded-md">Send</button>
                                                        {/* <FooterPopup /> */}
                                                    </div>
                                                )}
                                            </Popup>

                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}


                        <div className="btns" >
                            <img src="/ArrowLeft.png"
                                className={
                                    "btn arrow " +
                                    (activeSlide > 0 ? " btn arrow" : "btn-disabled")
                                }
                                onClick={prev}
                                color="#fff"
                                size="2x"
                            />
                            <img src="/ArrowRight.png"
                                className={
                                    "btn arrow " +
                                    (activeSlide < data.careers.length - 1 ? " btn arrow" : "btn-disabled")
                                }
                                onClick={next}
                                color="#fff"
                                size="2x"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

