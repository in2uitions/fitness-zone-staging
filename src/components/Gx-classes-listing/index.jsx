import { image_url } from '../../../global_vars';
import parse from "html-react-parser";
import { useEffect, useState, useMemo } from 'react';
import { getClasses } from '../../../api/server';
import Split from '../Split';

export default function GxClasses({ data = {}, style = 'white' }) {
    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(null);
    const [classes, setClasses] = useState([]);
    const [classesloaded, setClassesLoaded] = useState(false);
    const [flipped, isFlipped] = useState("false")
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
        console.log(event.target.value)
        // setRefresh(refresh + 1)
        let timeout = setTimeout(() => {
            document.getElementById('classes').scrollIntoView({ behavior: "smooth", block: 'start' });
        }, 100);

    }
    if (ListofClasses.length == 0) {
        return <div>loading...</div>;
    }
    return (
        <>

            <div className=" lg:my-10 md:py-10 py-12" style={{ marginTop: "10rem" }}>
                <div className='container' style={{ display: "flex", flexDirection: "column", marginBottom: "3rem" }}>
                    <p style={{ fontSize: "36px", fontFamily: "Montserrat Bold", color: "white", display: "flex", gap: "10px" }}>{data.title[0].first}<span style={{ fontFamily: "Montserrat Regular", color: "white" }}>{data.title[0].second}</span></p>
                    <p style={{ fontSize: "18px" }}>{data.subtitle}</p>
                </div>
                {data.classes_listing_components.map((item) => (
                    <>
                        {item.listing_classes_id.image_position == "right" ? <div className="about class-padding "
                        >
                            <div className="container" >
                                <div className="row">
                                    <div className="col-lg-6" style={{ display: "flex", alignItems: "center" }}>
                                        <div className="content">
                                            <h3
                                                className="words chars splitting wow"
                                                style={{ fontSize: "60px" }}
                                            >
                                                {item.listing_classes_id.title}
                                            </h3>
                                            <Split>
                                                <p className="words chars splitting wow txt-class" data-splitting style={{ color: "white" }}>
                                                    {parse(`${item.listing_classes_id.brief}`)}
                                                </p>
                                            </Split>
                                            {item.listing_classes_id?.button_title ? <button style={{ cursor: 'pointer' }} className='cursor-pointer futura-bold text-white btn-classes' onClick={handleCategoryChange} value={item.listing_classes_id.value} >{item.listing_classes_id?.button_title}</button> : null}
                                        </div>

                                    </div>
                                    <div className="col-lg-5">
                                        <div className="img-mons">
                                            <div className="row">
                                                <img className='img-class' src={`${image_url}${item.listing_classes_id.image?.id}`} alt={`${data.image?.title}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                        {item.listing_classes_id.image_position == "full" ? <div className="about class-padding"
                        >
                            <div className="" >
                                <div style={{ position: "relative" }}>
                                    <img src={`${image_url}${item.listing_classes_id.image?.id}`} alt={`${data.image?.title}`} />
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        position: "absolute",
                                        width: "100%",
                                        left: '0',
                                        bottom: '0',
                                        zIndex: '22'
                                    }}>
                                        <div className="content">
                                            <h3
                                                className="words chars splitting wow"
                                                style={{ fontSize: "60px" }}
                                            >
                                                {item.listing_classes_id.title}
                                            </h3>
                                            <Split>
                                                <p className="words chars splitting wow txt-class" data-splitting style={{ color: "white" }}>
                                                    {parse(`${item.listing_classes_id.brief}`)}
                                                </p>
                                            </Split>
                                            {item.listing_classes_id?.button_title ? <button style={{ cursor: 'pointer' }} className='cursor-pointer futura-bold text-white btn-classes' onClick={handleCategoryChange} value={item.listing_classes_id.value} >{item.listing_classes_id?.button_title}</button> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                        {item.listing_classes_id.image_position == "left" ? <div className="about class-padding "
                        >
                            <div className="container" >
                                <div className="row">  <div className="col-lg-6" style={{ display: "flex", alignItems: "center" }}>
                                    <div className="img-mons">
                                        <div className="row">
                                            <img className='img-class' src={`${image_url}${item.listing_classes_id.image?.id}`} alt={`${item.listing_classes_id.image?.title}`} />
                                        </div>
                                    </div>
                                </div><div className="col-lg-5 " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div className="content">
                                            <h3
                                                className="words chars splitting wow"
                                                style={{ fontSize: "60px" }}
                                            >
                                                {item.listing_classes_id.title}
                                            </h3>
                                            <Split>
                                                <p className="words chars splitting wow txt-class" data-splitting style={{ color: "white" }}>
                                                    {parse(`${item.listing_classes_id.brief}`)}
                                                </p>
                                            </Split>
                                            {item.listing_classes_id?.button_title ? <button style={{ cursor: 'pointer' }} className='cursor-pointer futura-bold text-white btn-classes' onClick={handleCategoryChange} value={item.listing_classes_id.value} >{item.listing_classes_id?.button_title}</button> : null}
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div> : null}
                    </>
                ))}
            </div>
            {data.show_classes ? <div className='' id="classes">
                <div className={` container  mx-auto pt-10 relative `} >
                    {ListofClasses.filter((item) => item.value === selectedCategory).map((element, index) => (
                        <>
                            {index === 0 && (
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "4rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "15px",
                                    fontSize: "32px"
                                }}>
                                    <h3 style={{
                                        fontFamily: "Montserrat Regular"
                                    }} className="">
                                        {element.value}
                                    </h3>
                                </div>
                            )}
                        </>
                    ))}
                    <div className="row" style={{display:"flex", justifyContent:"center"}}>
                        {ListofClasses.filter((item) => item.value === selectedCategory).map((element, index) => (
                            <div className="col-lg-4" style={{ paddingLeft: "50px", paddingRight: "50px", marginBottom: '2rem' }}>
                                <div className='lg:flex my-10 mx-auto items-center px-12'>
                                    <div className=" lg:w-1/2 pt-6 lg:pt-0  lg:block">
                                        <div id="wrapper" className={`main-image-center`} style={{ position: "relative" }}>
                                            <img style={{ height: "400px", objectFit: "cover" }} src={`${image_url}${element.image}`} alt={`${element.image?.title}`} />
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                position: "absolute",
                                                background:"#131316",
                                                width: "100%",
                                                left: '0',
                                                bottom: '0',
                                                zIndex: '22',
                                                padding:"15px 10px",
                                                letterSpacing:"2px",
                                                fontFamily:"Montserrat Regular"
                                            }}>
                                                TRYOUT CLASS
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" lg:w-1/2 md:w-1/2 pt-6 lg:pt-0 lg:block sm:px-2 lg:pl-20 md:pl-0 md:px-16 lg:px-16 ">

                                        <div className='' style={{ marginTop: "2rem" }}>
                                            {element.icon?.id ? <img src={`${image_url}${element.icon?.id}`} alt={`${element.icon?.title}`} /> : null}
                                            <h2 className="" style={{ fontSize: "21px", fontFamily: "Montserrat Regular" }}>{element.title}</h2>
                                        </div>
                                        <h3 className="py-7 subTitle"> {element.subtitle}  </h3>
                                        {/* <p className='h-0 w-0 hidden'>{element.value}</p> */}

                                        <h4 className="brief wysiwyg" style={{ fontSize: "12px", marginTop: "1.5rem" }}>{parse(`${element.brief}`)}</h4>
                                        {element.button_title ? <a href="/" className=" bg-[#009FE3] learnMoreBtns p-2 w-36 flex justify-start items-center rounded-md futura-bold mt-4">{element.button_title}
                                        </a> : null}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div> : null}
        </>


    )
}

