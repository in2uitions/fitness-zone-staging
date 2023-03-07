import { image_url } from '../../global_vars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState, useMemo } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getClasses } from '../../api/server';
import parse from "html-react-parser";

export default function CompBranches({ data = {}, style = 'white' }) {

    return (
        <>

            <div className=" lg:my-10 md:py-10 py-12 container mx-auto" >

                <div className={`table-img lg:grid lg:grid-cols-12 gap-10 pt-10 px-10`}>
                    {data.branches?.map((item, i) => (

                        <>
                        <div className="contact_block col-span-4">
                                {item.branches_details_id?.image ? <h2 className="img__img"><img src={`${image_url}${item.branches_details_id?.image?.id}`} altv={item.branches_details_id?.title} /></h2> : null}
                                <div className='flex flex-col'>
                                
                                <div className=' img__description'>
                                <h1 className="img_start">{item.branches_details_id?.location}</h1> 
                                <p>{parse(`${item.branches_details_id?.location_description}`)}</p>
                                </div>
                                </div>
</div>
                        {/* <div className="item item-1 relative" id={item.branches_details_id?.subtitle} style={{ backgroundImage: `url(${image_url}${item.branches_details_id?.image?.id})` }}
                            onMouseEnter={() => setSelected(i)}
                            onMouseLeave={() => setSelected(null)} key={i}>
                            {item.branches_details_id?.title ? <div className='absolute left-16 top-8 classes'>
                                <p className="font-bold text-4xl futura-bold text-white">{item.branches_details_id?.title}</p>
                                <div className='line-blue w-32 mt-1'></div>
                            </div> : null}

                            <div className='' >
                                {selected === i && (
                                    <div  className="absolute bottom-2 left-16 right-16" >
                                        <div className="flex items-center space-x-2">
                                            <div>
                                                {item.branches_details_id?.subtitle ? <p className="font-bold text-4xl futura-bold text-white classesTexts">{item.branches_details_id?.subtitle}</p> : null}
                                            </div>
                                            <div>
                                                {item.branches_details_id?.icon ? <img src={`${image_url}${item.branches_details_id?.icon?.id}`} className="h-8 OnMobile" altv={item.branches_details_id?.title} /> : null}
                                            </div>
                                        </div>
                                        {item.branches_details_id?.brief ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2" > {item.branches_details_id?.brief}  </p> : null}
                                        {item.branches_details_id?.button_url?<a href={`${item.branches_details_id?.button_url}`} key={i} onClick={() => { setShow(true) }} className="futura-bold">{item.branches_details_id?.button_title}<ChevronRightIcon /></a>:null}
                                        
                                        {item.branches_details_id?.section_button ?<button className='cursor-pointer futura-bold text-white' onClick={handleCategoryChange} value={item.branches_details_id.value} >{item.branches_details_id?.section_button}<ChevronRightIcon /></button>:null}
                                    </div>
                                )}
                            </div>


                        </div> */}
</>
                    ))}
                </div>
            </div>
        </>


    )
}

