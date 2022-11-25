import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import { image_url } from '../../global_vars';
import Carousel from "react-elastic-carousel";
import Slider from "react-slick";
import { useState } from 'react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const CompMap = ({ center, zoom,  datas, data={} }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const pin = "/marker.png"

    const googleAPIKey = "";

    const markerStyle = {
        position: "absolute",
        top: "100%",
        left: "100%",
        transform: "translate(-50%, -100%)"
    };
    // const length = datas.length;
    // console.log(datas.length + "test")
    // const [activeSlide, setactiveSlide] = useState(0);
    // const next = () =>
    //     activeSlide < datas.length - 1 && setactiveSlide(activeSlide + 1);

    // const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);

    return (
        <>
            <div className='container lg:mt-32 md:mt-32 mt-36 mb-52 mx-auto xl:pb-0 lg:px-5 md:px-5 px-5 ' style={{ height: '700px', width: '100%' }}>
                {data.title ? <p className="font-bold futura-bold lg:text-5xl text-3xl text-white mb-10">{data.title}</p> : null}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleAPIKey }}
                    yesIWantToUseGoogleMapApiInternals={true}
                    defaultZoom={zoom}
                    defaultCenter={center}
                >
                    {data.map_items?.map(item => {
                        return (
                            <div className='flex flex-col justify-center items-center' lat={item.map_items_id?.longitude} lng={item.map_items_id?.latitude}>

                                <a href={"http://maps.google.com/maps?z=12&t=m&q=loc:" + item.map_items_id?.longitude + "," + item.map_items_id?.latitude } target="_blank">
                                    <img style={markerStyle} className="w-7" src={pin} alt="pin" /></a>
                                <img src='/slider-button.svg' className='w-7' />
                                <img src='/triangle.png' className='w-7' />
                                <div className='w-96 bg-[#009FE3]'>

                                    <a href={"http://maps.google.com/maps?z=12&t=m&q=loc:" + item.map_items_id?.longitude + "," + item.map_items_id?.latitude } target="_blank">
                                    <div className="flex flex-col items-center">
                                        <p className='text-white'> {item.map_items_id?.name}</p>
                                        <p className='text-white'>{item.map_items_id?.country}</p>
                                    </div>
                                    </a>
                                    <div className="map-container-images">
                                    
                                        <Carousel itemsToShow={1} initialActiveIndex={1}>
                                            <img className='imagesmap w-36' src={`${image_url}${item.map_items_id?.images[0]?.directus_files_id}`} />
                                            <img className='imagesmap w-36' src={`${image_url}${item.map_items_id?.images[1]?.directus_files_id}`}/>
                                            <img className=' imagesmap w-36' src={`${image_url}${item.map_items_id?.images[2]?.directus_files_id}`} />
                                        </Carousel>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </GoogleMapReact>
            </div>
        </>
    )
}
export default CompMap;