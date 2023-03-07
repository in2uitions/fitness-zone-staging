import { image_url } from '../../global_vars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState, useMemo } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getClasses } from '../../api/server';
import parse from "html-react-parser";
import { AnimationOnScroll } from 'react-animation-on-scroll';

export default function CompBranches({ data = {}, style = 'white' }) {

    return (
        <>

            <div className=" lg:my-10 md:py-10 py-12 container mx-auto" >

                <div className={`table-img lg:grid lg:grid-cols-12 gap-10 pt-10 px-10`}>
                    {data.branches?.map((item, i) => (

                        <>
                        <div className="contact_block col-span-4">
                        <AnimationOnScroll animateIn="animate__bounceIn" duration="0.2" >
                                {item.branches_details_id?.image ? <h2 className="img__img"><img src={`${image_url}${item.branches_details_id?.image?.id}`} altv={item.branches_details_id?.title} /></h2> : null}
                                <div className='flex flex-col'>
                                
                                <div className=' img__description'>
                                <h1 className="img_start">{item.branches_details_id?.location}</h1> 
                                <p>{parse(`${item.branches_details_id?.location_description}`)}</p>
                                </div>
                                </div>
                                </AnimationOnScroll>
                                </div>

</>
                    ))}
                </div>
            </div>
        </>


    )
}

