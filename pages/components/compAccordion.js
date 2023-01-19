import { image_url } from '../../global_vars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import parse from "html-react-parser";
import { useEffect, useState, useMemo } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getClasses } from '../../api/server';

export default function CompAccordion({ data = {}, style = 'white' }) {
    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(null);
    const [classes, setClasses] = useState([]);
    const [classesloaded, setClassesLoaded] = useState(false);
    const [flipped, isFlipped]= useState("false")
    const [ListofClasses, setList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('energy');
    const [refresh, setRefresh] = useState(0)

    var getdata = async () => {
        const project = await getClasses();
        setList(project);
        setClassesLoaded(true)
        
    }
    
    useEffect(() => {
        getdata();
    }, [refresh, ListofClasses.length]);


    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        setRefresh(refresh + 1)
        let timeout = setTimeout(() => {
            document.getElementById('classes').scrollIntoView({ behavior: "smooth", block: 'start' });
        }, 100);
        
    }
if (ListofClasses.length == 0){
    return <div>loading...</div>;
}
    return (
        <>

            <div className="container-imgs lg:my-10 md:py-10 py-12" >

                <div className={`gallery-wrap`}>
                    {data.accordion_items?.map((item, i) => (
                        <div className="item item-1 relative" id={item.comp_accordion_items_id?.subtitle} style={{ backgroundImage: `url(${image_url}${item.comp_accordion_items_id?.image?.id})` }}
                            onMouseEnter={() => setSelected(i)}
                            onMouseLeave={() => setSelected(null)} key={i}>
                            {item.comp_accordion_items_id?.title ? <div className='absolute left-16 top-8 classes'>
                                <p className="font-bold text-4xl futura-bold text-white">{item.comp_accordion_items_id?.title}</p>
                                <div className='line-blue w-32 mt-1'></div>
                            </div> : null}

                            <div className='' >
                                {selected === i && (
                                    <div  className="absolute bottom-2 left-16 right-16" >
                                        <div className="flex items-center space-x-2">
                                            <div>
                                                {item.comp_accordion_items_id?.subtitle ? <p className="font-bold text-4xl futura-bold text-white classesTexts">{item.comp_accordion_items_id?.subtitle}</p> : null}
                                            </div>
                                            <div>
                                                {item.comp_accordion_items_id?.icon ? <img src={`${image_url}${item.comp_accordion_items_id?.icon?.id}`} className="h-8 OnMobile" altv={item.comp_accordion_items_id?.title} /> : null}
                                            </div>
                                        </div>
                                        {item.comp_accordion_items_id?.brief ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2" > {item.comp_accordion_items_id?.brief}  </p> : null}
                                        {item.comp_accordion_items_id?.button_url?<a href={`${item.comp_accordion_items_id?.button_url}`} key={i} onClick={() => { setShow(true) }} className="futura-bold">{item.comp_accordion_items_id?.button_title}<ChevronRightIcon /></a>:null}
                                        
                                        {item.comp_accordion_items_id?.section_button ?<button className='cursor-pointer futura-bold text-white' onClick={handleCategoryChange} value={item.comp_accordion_items_id.value} >{item.comp_accordion_items_id?.section_button}<ChevronRightIcon /></button>:null}
                                    </div>
                                )}
                            </div>


                        </div>

                    ))}
                </div>
            </div>
            {data.show_classes ?<div className=''>
                <div className={` container  mx-auto pt-10 relative `}>
                    {ListofClasses.filter((item) => item.value === selectedCategory).map((element, index) => (
                        <div className="" id="classes">
                        {element.image_position == "left" ?<div className='lg:flex my-10 mx-auto items-center px-12'>
                            <div className=" lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 pl-5 lg:pl-20 md:pl-0 md:px-16 lg:px-16 ">
                                <div className='flex items-center space-x-2'>
                                    {element.icon?.id ? <img src={`${image_url}${element.icon?.id}`} alt={`${element.icon?.title}`} /> : null}
                                    <h2 className="lg:text-5xl md:text-4xl text-3xl futura-bold font-bold  careers text-white">{element.title}</h2>
                                </div>
                                <h3 className="py-7 subTitle"> {element.subtitle}  </h3>
                                <p className='h-0 w-0 hidden'>{element.value}</p>
                                <h4 className="brief wysiwyg">{parse(`${element.brief}`)}</h4>
                                {element.button_title ? <a href="/" className=" bg-[#009FE3] learnMoreBtns p-2 w-36 flex justify-start items-center rounded-md futura-bold mt-4">{element.button_title}
                                    <ChevronRightIcon className="-ml-2" /></a> : null}

                            </div>
                            <div className=" lg:w-1/2 pt-6 lg:pt-0  lg:block">
                                <div id="wrapper" className={`main-image-center`} >
                                    <img src={`${image_url}${element.image}`} alt={`${element.image?.title}`} />
                                </div>
                            </div>
                            </div>:null}
                            {element.image_position == "right" ?<div className='lg:flex my-20 mx-auto items-center px-12'>
                            <div className=" lg:w-1/2 pt-6 lg:pt-0  lg:block">
                                <div id="wrapper" className={`main-image-center`} >
                                    <img src={`${image_url}${element.image}`} alt={`${element.image?.title}`} />
                                </div>
                            </div>
                            <div className=" lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 pl-5 lg:pl-20 md:pl-0 md:px-16 lg:px-16 ">
                                <div className='flex items-center space-x-2'>
                                    {element.icon?.id ? <img src={`${image_url}${element.icon?.id}`} alt={`${element.icon?.title}`} /> : null}
                                    <h2 className="lg:text-5xl md:text-4xl text-3xl futura-bold font-bold  careers text-white">{element.title}</h2>
                                </div>
                                <h3 className="py-7 subTitle"> {element.subtitle}  </h3>
                                <p className='h-0 w-0 hidden'>{element.value}</p>
                                <h4 className="brief wysiwyg">{parse(`${element.brief}`)}</h4>
                                {element.button_title ? <a href="/" className=" bg-[#009FE3] learnMoreBtns p-2 w-36 flex justify-start items-center rounded-md futura-bold mt-4">{element.button_title}
                                    <ChevronRightIcon className="-ml-2" /></a> : null}

                            </div>
                            
                            </div>:null}

                        </div>
                    ))}
                </div>

            </div>:null}
        </>


    )
}

