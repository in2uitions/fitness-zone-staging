import Image from 'next/image'
import React, { Component,  useState} from 'react';
import { image_url } from '../../global_vars';
import parse from "html-react-parser";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function Classes({ data = {}, isFlipped = false, style = 'white' }) {
    const [selected, setSelected] = useState(null);

    return (
        <section id={`${data.value}`}>

            <div className={`my-20 container  mx-auto pt-10 ${style == 'grey' ? 'bg-grey' : ''} relative `}>
                <div className={`lg:flex mx-auto items-center ${isFlipped ? 'flex-row-reverse' : ''}`}>
                    <div className=" lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 pl-5 lg:pl-20 md:pl-0 md:px-16 lg:px-16 ">
                        <div className='flex items-center space-x-2'>
                            {data.icon?.id?<img src={`${image_url}${data.icon?.id}`} alt={`${data.icon?.title}`} />:null}
                        <h2 className="lg:text-5xl md:text-4xl text-3xl futura-bold font-bold  careers text-white">{data.title}</h2>
                        </div>
                        <h3 className="py-7 subTitle"> {data.subtitle} </h3>
                        <h4 className="brief wysiwyg">{parse(`${data.brief}`)}</h4>
                        {data.button_title ? <a href="/" target="_blank" className=" bg-[#009FE3] learnMoreBtns p-2 w-36 flex justify-start items-center rounded-md futura-bold mt-4">{data.button_title}
                            <ChevronRightIcon className="-ml-2" /></a> : null}

                    </div>
                    <div className=" lg:w-1/2 pt-6 lg:pt-0 hidden lg:block">
                        <div id="wrapper" className={`main-image-center`} >
                                <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />
                        </div>
                    </div>
                    <div className=" lg:w-1/2 pt-6 lg:pt-0 lg:hidden">
                        <div id="wrapper" className={`main-image-center`} >

                            <img src={`${image_url}${data.image?.id}`} alt={`${data.image?.title}`} />

                        </div>
                    </div>

                </div>
            </div>

        </section>
    )

}
