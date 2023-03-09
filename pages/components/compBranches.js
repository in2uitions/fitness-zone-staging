import { image_url } from '../../global_vars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import parse from "html-react-parser";
import 'animate.css';

export default function CompBranches({ data = {}, style = 'white' }) {

    return (
        <>

            <div className=" lg:mt-10 lg:mb-5 md:pb-10 pt-12 container mx-auto px-10 pt-20" >
                {data.title ?<p className='text-white futura-bold lg:text-5xl'>{data.title}</p>:null}
                <div className={`table-img lg:grid lg:grid-cols-12 gap-10 pt-10`}>

                    {data.branches?.map((item, i) => (

                        <>
                        
                            <div className="contact_block col-span-4">
                                <AnimationOnScroll animateIn="animate__zoomIn" duration={1} style={{height:"300px"}} className="animationSize">
                                    {item.branches_details_id?.image ?<img src={`${image_url}${item.branches_details_id?.image?.id}`} className="branch-img" altv={item.branches_details_id?.title} /> : null}
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