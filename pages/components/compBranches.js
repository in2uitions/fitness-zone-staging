import { image_url } from '../../global_vars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import parse from "html-react-parser";
import 'animate.css';

export default function CompBranches({ data = {}, style = 'white' }) {

    return (
        <>

            <div className=" lg:my-10 md:pb-10 py-12 container mx-auto px-10 pt-20" >
                {data.title ?<p className='futura-bold lg:text-5xl'>{data.title}</p>:null}
                <div className={`table-img lg:grid lg:grid-cols-12 gap-10 pt-10`}>

                    {data.branches?.map((item, i) => (

                        <>
                        
                            <div className="contact_block col-span-4">
                                <AnimationOnScroll animateIn="animate__zoomIn" duration={0.3} style={{height:"300px"}}>
                                    {item.branches_details_id?.image ?<img src={`${image_url}${item.branches_details_id?.image?.id}`} altv={item.branches_details_id?.title} /> : null}
                                    <div className='flex flex-col branch-desc'>
                                        <h1 className="img_start absolute bottom-12">{item.branches_details_id?.location}</h1>
                                        <div className='img__description'>
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