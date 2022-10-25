import React, { useState } from "react";
import parse from "html-react-parser";
import ShowMore from "react-show-more";
import { image_url } from "../../global_vars";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

export default function CompCarouselMobile({ data = {}, style = 'white', isFlipped = false, }) {
    const [activeSlide, setactiveSlide] = useState(0);

    const next = () =>
        activeSlide < data.carousel.length - 1 && setactiveSlide(activeSlide + 1);

    const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);
    return (
        <section id={`${data.title}`}>
            <div className="relative h-screen items-center mx-auto container">

                <Swiper 
 pagination={true} modules={[Pagination]} className="mySwiper">
                    <div className="container">
                        {data.carousel.map((item, i) => (
                            <> <SwiperSlide>
                                <div className="pt-6 lg:pt-0 lg:block sm:px-2 pl-5 lg:pl-20 md:pl-0 md:px-16 lg:px-16 ">

                                    <div className="sliderContentImage w-80" >
                                        {item.comp_carousel_items_id?.image ? <img src={`${image_url}${item.comp_carousel_items_id?.image?.id}`} className="trainerimg none-event" altv={item.comp_carousel_items_id?.title} /> : null}
                                    </div>

                                </div>
                                <div className="lg:pt-0 lg:block">
                                    <div className="" key={i}>
                                        <div className="sliderContent">
                                            <div className="flex items-center space-x-5">
                                                {item.comp_carousel_items_id.icon ? <img src={`${image_url}${item.comp_carousel_items_id?.icon?.id}`} className="w-16 h-8" altv={item.comp_carousel_items_id?.title} /> : null}
                                                <p className="font-bold futura-bold text-4xl">{item.comp_carousel_items_id?.title}</p>
                                            </div>
                                            {item.comp_carousel_items_id?.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${item.comp_carousel_items_id?.description}`)} </p> : null}
                                            {item.comp_carousel_items_id?.button_title ? <a href={item.comp_carousel_items_id?.button_url} className="mt-5 bg-[#009FE3] learnMoreBtns p-2 flex justify-center items-center rounded-md futura-bold">{item.comp_carousel_items_id?.button_title}<ChevronRightIcon /></a> : null}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide></>
                        ))}
                    </div>
                </Swiper>

            </div>
        </section>
    );
};

