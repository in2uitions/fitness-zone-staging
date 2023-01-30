import parse from "html-react-parser";
import ShowMore from "react-show-more";
import { image_url } from "../../global_vars";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from "next/router";

export default function CompCarouselRightMobile({ data = {}, style = 'white', isFlipped = false, }) {
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
    const itemSet = (localStorage.length !== 0);
    const router = useRouter();
    const route = () => {
    if (itemSet) {
        router.push({ pathname: "/account/classListing"});
    }
    else{
        router.push({ pathname: "/account/login"});
    }
}
    return (
        <section id={`${data.title}`} className="mt-20">
            <div className="">
                {data.image_title ? <div className=" flex flex-col justify-center items-center pt-20 relative trainers-mobile">
                    <img src={`${image_url}${data.image_title?.id}`} className="w-56" altv={data.image_title?.title} />
                </div> : null}
            </div>
            <div className={`lg:flex relative items-center container`}>
                <div className="embla " ref={emblaRef}>
                    <div className="embla__container w-screen">
                        {data.carousel?.map((item, i) => (
                            <div className={`embla__slide  lg:flex  items-center`}>

                                <div className="lg:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 ">
                                    <div className="">
                                        <>
                                            <div className="">

                                                <div key={item.id}
                                                    className=""
                                                >
                                                    <div className="relative">
                                                        {item.comp_carousel_items_id?.image ? <img src={`${image_url}${item.comp_carousel_items_id?.image?.id}`} className="w-screen px-6" altv={item.comp_carousel_items_id?.title} /> : null}
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
                                                <div key={item.id}
                                                    className=""
                                                >
                                                    <div className="sliderContent px-10 w-screen">
                                                    <div className="flex items-baseline space-x-5">
                                                <p className="font-bold futura-bold text-4xl">{item.comp_carousel_items_id?.title}</p>
                                                {item.comp_carousel_items_id.icon ? <img src={`${image_url}${item.comp_carousel_items_id?.icon?.id}`} className="w-16 h-8" altv={item.comp_carousel_items_id?.title} /> : null}
                                            </div>
                                                        {item.comp_carousel_items_id?.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${item.comp_carousel_items_id?.description}`)} </p> : null}
                                                        {item.comp_carousel_items_id?.button_title ? <a href={item.comp_carousel_items_id?.button_url} className="cursor-pointer mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{item.comp_carousel_items_id?.button_title}<ChevronRightIcon /></a> : null}
                                                        {item.comp_carousel_items_id?.book_button ? <button  onClick={() => route()} className="cursor-pointer mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{item.comp_carousel_items_id?.book_button}<ChevronRightIcon /></button> : null}
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

