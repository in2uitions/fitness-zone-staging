import Image from 'next/image'
import React, { Component } from 'react';
import { image_url } from '../../global_vars';
import parse from "html-react-parser";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { AnimationOnScroll } from 'react-animation-on-scroll';

export default function CompSide({ data = {}, isFlipped = false, style = 'white' }) {


    return (
        <section id={`${data.title}`}>

            <div className={`md:my-20 pt-10 ${style == 'grey' ? 'bg-grey' : ''} relative `}>
            {data.global_title?<p className='flex justify-center items-center futura-bold text-4xl mb-20 text-white'>{data.global_title}</p>:null}
                {data.image_position == "right" ?<div className={`lg:flex mx-auto items-center container`}>
               
                    <div className=" lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 pl-2 lg:pl-20 lg:pr-36 md:pl-0 md:px-16 lg:px-16 ">
                        <div className='flex items-center space-x-2'>
                            {data.icon?.id ? <img src={`${image_url}${data.icon?.id}`} alt={`${data.icon?.title}`} /> : null}
                            <h2 className="lg:text-5xl md:text-4xl text-3xl futura-bold font-bold careers text-white">{data.title}</h2>
                        </div>
                        <AnimationOnScroll animateIn="animate__bounceIn" duration="0.2" >
                        {data.subtitle ?<h3 className="py-7 subTitle"> {data.subtitle} </h3>:null}
                        {data.headline ? <p className='text-[#009FE3] font-bold futura-bold citywalk-title'>{data.headline}</p> : null}
                        {data.subhead ? <p className='text-white font-bold futura-bold citywalk-dubai-title'>{data.subhead}</p> : null}
                        {data.sub_subhead ? <div className='flex space-x-4 items-baseline mb-4'>
                            <p className='futura-bold citywalk-dubai-ison-title'>{data.sub_subhead}</p>
                            <div>
                                {data.on_img ? <img src={`${image_url}${data.on_img?.id}`} className="h-8" /> : null}
                            </div>
                        </div> : null}
                        </AnimationOnScroll>
                        {data.brief ?<h4 className="brief wysiwyg mb-4">{parse(`${data.brief}`)}</h4>:null}
                        <div className='flex space-x-2'>
                        {data.button_url ? <a href={`${data.button_url}`} className=" bg-[#009FE3] learnMoreBtns p-3 rounded-md futura-bold">{data.button_title}
                            <ChevronRightIcon className="lg:ml-2 md:ml-2  ml-0" /></a> : null}
                            {data.button2_url ? <a href={`${data.button2_url}`} className=" bg-[#009FE3] learnMoreBtns p-3 rounded-md futura-bold">{data.button}
                            <ChevronRightIcon className="lg:ml-2 md:ml-2 ml-0" /></a> : null}
                        </div>
                    </div>
                    {/* <div className=" lg:w-1/2 pt-6 lg:pt-0 hidden lg:block">
                        <div id="wrapper" className={`main-image-center`} >
                            <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />
                        </div>
                    </div> */}
                    <div className=" lg:w-1/2 pt-6 lg:pt-0 ">
                        <div id="wrapper" className={`main-image-center`} >

                            <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />

                        </div>
                    </div>

                </div>:null}
                {data.image_position == "left" ?<div className={`lg:flex mx-auto items-center container`}>
                <div className="lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 px-2 lg:pl-20 lg:pr-36 md:pl-0 md:px-16 lg:px-16 ">
                        <div id="wrapper" className={`main-image-center`} >

                            <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />

                        </div>
                    </div>
                    <div className="  lg:w-1/2 pt-6 lg:pt-0 lg:pr-44 md:pr-44 pl-2 lg:pl-0 md:pl-0">
                        <div className='flex items-center space-x-2'>
                            {data.icon?.id ? <img src={`${image_url}${data.icon?.id}`} alt={`${data.icon?.title}`} /> : null}
                            <h2 className="lg:text-5xl md:text-4xl text-3xl futura-bold font-bold careers text-white">{data.title}</h2>
                        </div>
                        <AnimationOnScroll animateIn="animate__bounceIn" duration="0.2" >
                        {data.subtitle ?<h3 className="py-7 subTitle"> {data.subtitle} </h3>:null}
                        {data.headline ? <p className='text-[#009FE3] font-bold futura-bold citywalk-title'>{data.headline}</p> : null}
                        {data.subhead ? <p className='text-white font-bold futura-bold citywalk-dubai-title'>{data.subhead}</p> : null}
                        {data.sub_subhead ? <div className='flex space-x-4 items-baseline mb-4'>
                            <p className='futura-bold citywalk-dubai-ison-title'>{data.sub_subhead}</p>
                            <div>
                                {data.on_img ? <img src={`${image_url}${data.on_img?.id}`} className="h-8" /> : null}
                            </div>
                        </div> : null}
                        </AnimationOnScroll>
                        {data.brief ?<p className="brief wysiwyg mb-4 leading-9 text-white">{parse(`${data.brief}`)}</p>:null}
                        <div className='flex space-x-2'>
                        {data.button_url ? <a href={`${data.button_url}`} className=" bg-[#009FE3] learnMoreBtns p-3 rounded-md futura-bold">{data.button_title}
                            <ChevronRightIcon className="lg:ml-2 md:ml-2  ml-0" /></a> : null}
                            {data.button2_url ? <a href={`${data.button2_url}`} className=" bg-[#009FE3] learnMoreBtns p-3 rounded-md futura-bold">{data.button}
                            <ChevronRightIcon className="lg:ml-2 md:ml-2 ml-0" /></a> : null}
                        </div>
                    </div>
                    

                </div>:null}
            </div>

        </section>
    )

}
