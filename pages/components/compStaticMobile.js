import parse from "html-react-parser";
import { image_url } from "../../global_vars";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Popup from "reactjs-popup";

export default function CompStaticMobile({ data = {}, style = 'white', isFlipped = false, }) {
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

    return (
        <section id={`${data.title}`} className="mt-20">
            <div className={`lg:flex relative items-center container`}>
                <div className="embla " ref={emblaRef}>
                    <div className="embla__container w-screen">
                        {data.static_items?.map((item, i) => (
                            <div className={`embla__slide  lg:flex  items-center`}>

                                <div className="lg:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 ">
                                    <div className="">
                                        <>
                                            <div className="">

                                                <div key={item.id}
                                                    className=""
                                                >
                                                    <div className="relative">
                                                        {item.static_items_id?.image ? <img src={`${image_url}${item.static_items_id?.image?.id}`} className="w-screen px-6" altv={item.static_items_id?.title} /> : null}
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

                                <div className="lg:w-1/2 mt-10">
                                    <div className="">
                                        <>
                                            <div className="">
                                                <div
                                                    className=""
                                                >
                                                    <div className="sliderContent px-10">
                                                        <div className="flex items-baseline space-x-5">
                                                            <p className="font-bold futura-bold text-4xl">{data?.title}</p>
                                                            {data.icon ? <img src={`${image_url}${data?.icon?.id}`} className="w-16 h-8" altv={data?.title} /> : null}
                                                        </div>
                                                        {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${data?.description}`)} </p> : null}
                                                        {data.show_more_description ? <Popup
                                                            trigger={
                                                                <button>
                                                                    <p className="bg-transparent text-md text-[#009FE3] futura-book mt-2 outline-none">Read more ...</p>
                                                                </button>
                                                            } modal
                                                            position="center"
                                                            closeOnDocumentClick={false}
                                                        >
                                                            {close => (
                                                                <div className="container w-screen flex flex-col justify-center relative py-12 lg:px-20">
                                                                    <button className="flex w-full justify-end lg:right-12 right-16 text-white outline-none" onClick={close}>
                                                                        <img src="/close-X.svg" />
                                                                    </button>
                                                                    {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2 px-14">{parse(`${data?.description}`)} </p> : null}
                                                                    {data.show_more_description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2 px-14">{parse(`${data?.show_more_description}`)} </p> : null}

                                                                </div>
                                                            )}
                                                        </Popup> : null}
                                                        {data.button_title ? <a href={data.button_url} target="_blank" className="cursor-pointer mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{data.button_title}<ChevronRightIcon /></a> : null}
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

