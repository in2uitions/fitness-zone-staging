import parse from "html-react-parser";
import { image_url } from "../../global_vars";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';

export default function CompCarouselMobile({ data = {}, style = 'white', isFlipped = false, }) {
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
         <div className="">
                <div className=" flex flex-col justify-center items-center  md:mt-32 relative trainers-mobile">
                    {data.title ? <p className="lg:text-5xl md:text-4xl text-3xl font-bold futura-bold mb-5 text-white">{data.title}</p> : null}
                    {data.subtitle ? <p className="futura-book text-center w-3/4 text-[#D8D8D8] mb-5">
                    {parse(`${data.subtitle}`)} </p> : null}
                </div>
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
                                                <div key={item.id}
                                                    className=""
                                                >
                                                    <div className="sliderContent">
                                                        {item.comp_carousel_items_id?.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2 px-10 w-screen">{parse(`${item.comp_carousel_items_id?.description}`)} </p> : null}
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

