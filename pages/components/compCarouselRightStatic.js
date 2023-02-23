import React, { useState,useRef } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Popup from "reactjs-popup";
import { createFreeTrialDubaiUser, createFreeTrialUser } from "../../api/server";
import nextConfig from '../../next.config'
import Cookies from 'js-cookie'

export default function CompCarouselRight({ data = {}, style = 'white', isFlipped = false }) {
    const [activeSlide, setactiveSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(false)
    const [clickTiggered, setClickTriggered] = useState(false)

    let timeout = setTimeout(() => {
        if (nextSlide == true && clickTiggered == true) {
            activeSlide < data.static_items.length - 1 && setactiveSlide(activeSlide + 1);
            setClickTriggered(false)
        }
    }, 1000);
    const next = () =>
        activeSlide < data.static_items.length - 1 && setactiveSlide(activeSlide + 1);

    const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);
    const getStyles = (index) => {
        if (activeSlide === index)
            return {
                opacity: 1,
                transform: "translateX(230px) translateZ(0px) rotateY(0deg)",
                zIndex: 22,
                width: 470
            };
        else if (activeSlide - 1 === index)
            return {
                opacity: 0,
                transform: "translateX(240px) translateZ(-400px) rotateY(35deg)",
                zIndex: 9,

            };
        else if (activeSlide + 1 === index)
            return {
                opacity: 1,
                transform: "translateX(-290px) translateZ(0px) rotateY(0deg)",
                zIndex: 9,
                width: 470
            };
        else if (activeSlide - 2 === index)
            return {
                opacity: 0,
                transform: "translateX(480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 8
            };
        else if (activeSlide + 2 === index)
            return {
                opacity: 1,
                transform: "translateX(-780px) translateZ(-500px) rotateY(-45deg)",
                zIndex: 8,
                // width:345
            };
        else if (index < activeSlide - 2)
            return { 
                opacity: 0,
                transform: "translateX(480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 7
            };
        else if (index > activeSlide + 2)
            return {
                opacity: 0,
                transform: "translateX(-480px) translateZ(-500px) rotateY(-35deg)",
                zIndex: 7
            };
    };

    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            if (nextConfig.country_code == 'LB') {
            Cookies.set('name', event.target.name.value);
            Cookies.set('phone_number', event.target.phone_number.value);
            Cookies.set('email', event.target.email.value);
            Cookies.set('location', event.target.location.value)
            createFreeTrialUser();
            event.target.name.value='',
            event.target.phone_number.value ='',
            event.target.email.value='',
            event.target.location.value=''
            Cookies.set('name', event.target.name.value = '');
            Cookies.set('phone_number', event.target.phone_number.value = '');
            Cookies.set('email', event.target.email.value = '');
            Cookies.set('location', event.target.location.value = '')
            ref.current.close();
            console.log("userCreated LB")
        }
        else if(nextConfig.country_code == 'AE'){
            Cookies.set('name', event.target.name.value);
            Cookies.set('phone_number', event.target.phone_number.value);
            Cookies.set('email', event.target.email.value);
            Cookies.set('location', event.target.location.value)
            createFreeTrialDubaiUser();
            event.target.name.value='',
            event.target.phone_number.value ='',
            event.target.email.value='',
            event.target.location.value=''
            Cookies.set('name', event.target.name.value = '');
            Cookies.set('phone_number', event.target.phone_number.value = '');
            Cookies.set('email', event.target.email.value = '');
            Cookies.set('location', event.target.location.value = '')
            ref.current.close();
            console.log("userCreated AE")
        }
        };
        getTokenAPI();

    };
    const ref = useRef();
    
    return (
        <>
            <div className={`lg:flex relative items-center px-14 pt-28 mb-44 pb-20 container  ${isFlipped ? 'flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block md:block ">
                    <div className="slideC">
                        {data.static_items.map((item, i) => (
                            <>
                                <div className="">

                                    <div key={item.id}
                                        className="slide"
                                        style={{
                                            ...getStyles(i),
                                        }}
                                    >
                                        <div className="relative">
                                            {item.static_items_id?.image ? <img src={`${image_url}${item.static_items_id?.image?.id}`} className="tintImg none-event object-cover" style={{height:320, width:500}} altv={item.static_items_id?.title} /> : null}
                                            <div className="flex space-x-2 absolute items-center left-8 bottom-8">
                                            {item.static_items_id?.image_text ?<p className="text-white font-bold text-4xl">{item.static_items_id?.image_text}</p>:null}
                                            {item.static_items_id.image_icon?<img src={`${image_url}${item.static_items_id?.image_icon?.id}`} className="w-16 h-8" altv={item.static_items_id?.title} /> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="reflection"
                                    style={{
                                        background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                                        ...getStyles(i),
                                    }}
                                />
                            </>
                        ))}
                    </div>

                    <div className="newsbtns">
                        <img src="/ArrowLeft.png"
                            className={
                                    // "newsbtn prevbtn arrow" +
                                    (activeSlide < data.static_items.length - 1  ? "newsbtn prevbtn arrow" : "btn-disabled")
                                }
                            onClick={next}
                            color="#fff"
                            size="2x"
                        />
                        <img src="/ArrowRight.png"
                            className={
                                    // "newsbtn arrow" +
                                    (activeSlide > 0  ? "newsbtn arrow" : "btn-disabled")
                                }
                            onClick={prev}
                            color="#fff"
                            size="2x"
                        />
                    </div>
                </div>
                <div className="lg:w-1/2 md:w-1/2 pr-52">
                    <div className="slideCC">
                        {/* {data.carousel.map((item, i) => ( */}
                            <>
                                <div className="">
                                    <div
                                        className="slide"
                                    >
                                        <div className="sliderContent staticSlide">
                                        <div className="flex items-baseline space-x-5">
                                            <p className="font-bold futura-bold text-4xl">{data.title}</p>
                                            {data.icon?<img src={`${image_url}${data.icon?.id}`} className="w-16 h-8" altv={data.title} /> : null}
                                        </div>
                                            {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2 md:pr-10">{parse(`${data.description}`)} </p> : null}
                                            {data.button_title ? <a href={data.button_url} className="mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{data.button_title}<ChevronRightIcon /></a> : null}
                                            {data.popup_button?<Popup
                                                trigger={
                                                    <button>
                                                        <button className="mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{data.popup_button}<ChevronRightIcon /></button>
                                                    </button>
                                                } modal
                                                ref={ref}
                                                position="center"
                                                closeOnDocumentClick={true}
                                            >
                                                {close => (
                                                    <div className="container w-screen flex flex-col justify-center py-12">
                                                        <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                            <img src="/close-X.svg"/>
                                                        </button>
                                                        <form onSubmit={onSubmitForm}>
                                                        <div className="flex w-full justify-between space-x-5">
                                                            <input placeholder="Name" id="name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            <input placeholder="Phone Number" id="phone_number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            <input placeholder="Email" id="email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        </div>
                                                        <div className="flex w-full justify-between space-x-5 mt-10">
                                                        <select name="branches" id="location" className="w-full border border-[#009FE3] bg-transparent text-white pl-2 appearance-none rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2">
                                                            <option value="dbayeh">Dbayeh</option>
                                                            <option value="manara">Manara</option>
                                                            <option value="abc">ABC Achrafieh</option>
                                                            <option value="baabda">Baabda</option>
                                                            <option value="hamra">Hamra</option>
                                                            <option value="citywalkdubai">City Walk Dubai</option>
                                                        </select>
                                                        </div>
                                                        <button className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md" type="submit" >Send</button>
                                                        </form>
                                                    </div>
                                                )}
                                            </Popup>:null}
                                        </div>
                                    </div>
                                </div>
                                
                            </>
                        {/* ))} */}
                    </div>
                </div>

            </div>
        </>
    );
};

