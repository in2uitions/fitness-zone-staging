import parse from "html-react-parser";
import ShowMore from "react-show-more";
import { image_url } from "../../global_vars";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Popup from "reactjs-popup";
import { createFreeTrialDubaiUser, createFreeTrialUser } from "../../api/server";
import nextConfig from '../../next.config'
import Cookies from 'js-cookie'

export default function CompCarouselStaticRightMobile({ data = {}, style = 'white', isFlipped = false, }) {
    const [activeSlide, setactiveSlide] = useState(0);

    const next = () =>
        activeSlide < data.carousel.length - 1 && setactiveSlide(activeSlide + 1);

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
                console.log("userCreated AE")
            }
        };
        getTokenAPI();

    };
    return (
        <section id={`${data.title}`} className="mt-20">
            <div className={`lg:flex relative items-center container`}>
                <div className="embla " ref={emblaRef}>
                    <div className="embla__container w-screen">
                        {data.static_items?.map((item, i) => (
                            <div className={`embla__slide  lg:flex items-center`}>

                                <div className="lg:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 ">
                                    <div className="">
                                        <>
                                            <div className="">

                                                <div key={item.id}
                                                    className=""
                                                >
                                                    <div className="relative">
                                                        {item.static_items_id?.image ? <img src={`${image_url}${item.static_items_id?.image?.id}`} className="w-screen px-6" altv={item.static_items_id?.title} /> : null}
                                                        <div className="flex justify-between items-center absolute top-0 left-0 w-full h-full ">
                                                            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                                                            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                </div>

                                <div className="lg:w-1/2 mt-10">
                                    <div className="">
                                        <>
                                            <div className="">
                                                <div
                                                    className=""
                                                >
                                                    <div className="sliderContent px-10">
                                                    <div className="flex items-baseline space-x-5">
                                            <p className="font-bold futura-bold text-4xl leading-10">{data.title}</p>
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
                                                position="center"
                                                closeOnDocumentClick={false}
                                            >
                                                {close => (
                                                    <div className="container w-screen flex flex-col justify-center py-12">
                                                        <button className="flex w-full justify-end mb-3 text-white outline-none" onClick={close}>
                                                            <img src="/close-X.svg"/>
                                                        </button>
                                                        <form onSubmit={onSubmitForm}>
                                                        <div className="lg:flex w-full justify-between lg:space-x-5 space-y-5">
                                                            <input placeholder="Name" id="name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            <input placeholder="Phone Number" id="phone_number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            <input placeholder="Email" id="email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                        
                                                        <select name="branches" id="location" className="w-full border border-[#009FE3] bg-transparent text-white pl-2 appearance-none rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2">
                                                            <option value="dbayeh">Dbayeh</option>
                                                            <option value="manara">Manara</option>
                                                            <option value="abc">ABC Achrafieh</option>
                                                            <option value="baabda">Baabda</option>
                                                            <option value="hamra">Hamra</option>
                                                            <option value="citywalkdubai">City Walk Dubai</option>
                                                        </select>
                                                        </div>
                                                        <button className="bg-[#009FE3] text-white w-full p-2 mt-5 futura-bold rounded-md" type="submit">Send</button>
                                                        </form>
                                                    </div>
                                                )}
                                            </Popup>:null}
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

