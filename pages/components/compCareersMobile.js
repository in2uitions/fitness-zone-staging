import parse from "html-react-parser";
import { image_url } from "../../global_vars";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Popup from "reactjs-popup";
import { createuser,createDubaiuser } from "../../api/server";
import nextConfig from "../../next.config";
import Cookies from 'js-cookie'

export default function CompCareersMobile({ data = {}, style = 'white', isFlipped = false, }) {
    const [activeSlide, setactiveSlide] = useState(0);

    const next = () =>
        activeSlide < data.careers.length - 1 && setactiveSlide(activeSlide + 1);

    const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);
    const [emblaRef, embla] = useEmblaCarousel()
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
        embla
    ]);

    const DotButton = ({ selected, onClick }) => (
        <button
            className={`embla__dot ${selected ? "is-selected" : ""}`}
            type="button"
            onClick={onClick}
        />
    );

    const PrevButton = ({ enabled, onClick }) => (
        <button
            className="embla__button embla__button--prev"
            onClick={onClick}
            disabled={!enabled}
        >
            <img src="/ArrowLeft.png" class="newsbtn Mobilearrow" color="#fff" />
        </button>
    );

    const NextButton = ({ enabled, onClick }) => (
        <button
            className="embla__button embla__button--next"
            onClick={onClick}
            disabled={!enabled}
        >
            <img src="/ArrowRight.png" class="newsbtn Mobilearrow" color="#fff" />
        </button>
    );

    const onSelect = useCallback(() => {
        if (!embla) return;
        setSelectedIndex(embla.selectedScrollSnap());
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla, setSelectedIndex]);


    useEffect(() => {
        if (!embla) return;
        onSelect();
        setScrollSnaps(embla.scrollSnapList());
        embla.on("select", onSelect);
    }, [embla, setScrollSnaps, onSelect]);
    // const onSubmitForm = async (event) => {
    //     console.log("event.target.firstName.value")
    //     try {
    //             Cookies.set('FirstName', event.target.firstName.value);
    //             console.log(event.target.firstName.value)
    //             createuser();
    //     } catch (e) {
    //         // console.log(e)
    //     }
    //     // router.push({ pathname: '/chooseOne' }); 

    // }
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            if (nextConfig.country_code == 'LB') {
            var file = event.target.file.files[0];
            try{
                const form = new FormData();
                // form.append("filename", file.file_name);
                form.append("file", file);
                const response = await axios.post(`https://fzcms.diastora.com/files`, form);
                if(response.status == 200){
                    Cookies.set("file_id", response.data.data.id);
                }
            } catch(err){
                console.log(err)
            }
            Cookies.set('first_name', event.target.first_name.value);
            Cookies.set('last_name', event.target.last_name.value);
            Cookies.set('email', event.target.email.value),
            Cookies.set('phone_number', event.target.email.value),
            Cookies.set('mobile_number', event.target.mobile_number.value);
            Cookies.set('education', event.target.education.value);
            Cookies.set('experience', event.target.experience.value);
            // Cookies.set('cv', event.target.cv.value)
            createuser();
            event.target.first_name.value='',
            event.target.last_name.value='',
            event.target.email.value= '',
            event.target.phone_number.value='',
            event.target.mobile_number.value='',
            event.target.education.value='',
            event.target.experience.value='',
            Cookies.set('first_name', event.target.first_name.value = '');
            Cookies.set('last_name', event.target.last_name.value = '');
            Cookies.set('email', event.target.email.value = ''),
            Cookies.set('phone_number', event.target.email.value = ''),
            Cookies.set('mobile_number', event.target.mobile_number.value = '');
            Cookies.set('education', event.target.education.value = '');
            Cookies.set('experience', event.target.experience.value = '');
            console.log('leb user')
        }
        else if (nextConfig.country_code == 'AE') {
            var file = event.target.file.files[0];
            try{
                const form = new FormData();
                // form.append("filename", file.file_name);
                form.append("file", file);
                const response = await axios.post(`https://fzcms.diastora.com/files`, form);
                if(response.status == 200){
                    Cookies.set("file_id", response.data.data.id);
                }
            } catch(err){
                console.log(err)
            }
            Cookies.set('first_name', event.target.first_name.value);
            Cookies.set('last_name', event.target.last_name.value);
            Cookies.set('email', event.target.email.value),
            Cookies.set('phone_number', event.target.email.value),
            Cookies.set('mobile_number', event.target.mobile_number.value);
            Cookies.set('education', event.target.education.value);
            Cookies.set('experience', event.target.experience.value);
            // Cookies.set('cv', event.target.cv.value)
            createDubaiuser();
            event.target.first_name.value='',
            event.target.last_name.value='',
            event.target.email.value= '',
            event.target.phone_number.value='',
            event.target.mobile_number.value='',
            event.target.education.value='',
            event.target.experience.value='',
            Cookies.set('first_name', event.target.first_name.value = '');
            Cookies.set('last_name', event.target.last_name.value = '');
            Cookies.set('email', event.target.email.value = ''),
            Cookies.set('phone_number', event.target.email.value = ''),
            Cookies.set('mobile_number', event.target.mobile_number.value = '');
            Cookies.set('education', event.target.education.value = '');
            Cookies.set('experience', event.target.experience.value = '');
            console.log('ae user')
        }
        };
        getTokenAPI();

    };
    return (
        <section id={`${data.title}`} className="mt-20">
            <div className={`lg:flex relative items-center container`}>
                <div className="embla " ref={emblaRef}>
                    <div className="embla__container w-screen">
                        {data.careers?.map((item, i) => (
                            <div className={`embla__slide  lg:flex  items-center`}>

                                <div className="lg:w-1/2 mt-10 px-5">
                                    <div className="">
                                        <>
                                            <div className="">
                                                <div
                                                    className=""
                                                >
                                                    <div className="sliderContent mt-12">
                                                        <div className="flex items-baseline space-x-5">
                                                            <p className="font-bold futura-bold text-4xl">{data.title}</p>
                                                        </div>
                                                        {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${data?.description}`)}</p> : null}
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 ">
                                    <div className="">
                                        <>
                                            <div className="">

                                                <div key={item.id}
                                                    className=""
                                                >
                                                    <div className="relative">
                                                        <div className="bg-[#3b3c40] w-full h-full flex flex-col justify-center items-center p-10">
                                                        <p className="futura-bold text-3xl mt-3 text-white">{item.careers_items_id?.title}</p>
                                            <p className="futura-book mt-3 text-white">{item.careers_items_id?.subtitle}</p>
                                            <Popup
                                                trigger={
                                                    <button>
                                                        <button className="bg-[#009FE3] p-2 rounded-md mt-5 text-white">{item.careers_items_id?.button}</button>
                                                    </button>
                                                } modal
                                                position="center"
                                                closeOnDocumentClick={false}
                                            >
                                                {close => (
                                                    <div className="container w-screen flex flex-col justify-center relative py-12">
                                                        <button className="flex w-full justify-end text-white mb-4 outline-none" onClick={close}>
                                                        
                                                        <img src="/close-X.svg"/>
                                                            {/* &times; */}
                                                        </button>
                                                        <form onSubmit={onSubmitForm}>
                                                            <div className="flex w-full justify-between space-x-5">
                                                                <input placeholder="First Name" id="first_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                <input placeholder="Last Name" id="last_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                <input placeholder="Email" id="email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            </div>
                                                            <div className="flex w-full justify-between space-x-5 mt-10">
                                                                <input placeholder="Phone Number" id="phone_number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                <input placeholder="Mobile Number" id="mobile_number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                <input placeholder="Education" id="education" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            </div>
                                                            <div className="flex w-full justify-between space-x-2 mt-10">
                                                                <div>
                                                                    <input placeholder="Experience" id="experience" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                </div>
                                                                <div className="w-3/4">
                                                                    {/* <label htmlFor="cv" className="w-full border-[#009FE3] pl-2 appearance-none block bg-transparent text-[#aeaeae] border rounded-md leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2">
                                                                Upload your CV
                                                            </label> */}
                                                                    <input
                                                                        className="w-full border-[#009FE3] pl-2 appearance-none block bg-transparent text-[#aeaeae] border rounded-md leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-1"
                                                                        id="file"
                                                                        multiple={false}
                                                                        type="file"
                                                                        // onChange={uploadFile}
                                                                        required
                                                                    />
                                                                    {/* <input id="cv" style={{ visibility: "hidden" }} type={"file"} /> */}
                                                                </div>
                                                            </div>
                                                            <button className="bg-[#009FE3] w-full p-2 mt-5 futura-book rounded-md text-white" type="submit">Send</button>
                                                        </form>
                                                        {/* <FooterPopup /> */}
                                                    </div>
                                                )}
                                            </Popup>

                                                        </div>
                                                        <div className="flex justify-between items-center absolute inset-0 w-full h-full ">
                                                            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                                                            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </>

                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

