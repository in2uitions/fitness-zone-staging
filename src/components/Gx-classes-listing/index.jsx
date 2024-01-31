import { image_url } from '../../../global_vars';
import parse from "html-react-parser";
import { useEffect, useState, useMemo } from 'react';
import { getClasses } from '../../../api/server';
import Split from '../Split';
import Popup from 'reactjs-popup';
import PhoneInput from 'react-phone-input-2';
import { useRouter } from 'next/router';
import 'react-phone-input-2/lib/style.css';

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


    const submitLebSignUp = async event => {
        event.preventDefault();


        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    'https://api.fitnessclubapp.com/api/Account/Login?Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234',
                    {
                        method: 'POST'
                    }
                );

                const tokenData = await res.json();

                const submitContactForm = async () => {
                    try {
                        var registraitonRawData = JSON.stringify({
                            "GuestRegisterId": 0,
                            "FirstName": event.target.pp_first_name.value,
                            "LastName": event.target.pp_last_name.value,
                            "Mobile": event.target.pp_phone.value,
                            "Email": event.target.pp_email.value,
                            "LocationCode": parseInt(event.target.location.value),
                            "Source": {
                                "VisitSourceId": 9
                            },
                        });

                        var registrationHeaders = new Headers();
                        registrationHeaders.append("Authorization", "Bearer " + tokenData.token);
                        registrationHeaders.append("Content-Type", "application/json");
                        var registrationRequestOptions = {
                            method: 'POST',
                            headers: registrationHeaders,
                            body: registraitonRawData
                        };


                        const res = await fetch(
                            'https://api.fitnessclubapp.com/api/Crm/GuestRegister', registrationRequestOptions);
                        const data = await res.json();

                        if (data.isValid == true) {
                            setIsSent(true)
                            event.target.pp_first_name.value = '';
                            event.target.pp_last_name.value = '';
                            event.target.pp_phone.value = '';
                            event.target.pp_email.value = '';
                            setValue(" ")
                        } else {
                            setIsNotSent(true)
                        }


                    } catch (err) {
                        console.log(err);
                    }
                };

                submitContactForm();

            } catch (err) {
                console.log(err);
            }
        };

        getTokenAPI();


    };
    const [value, setValue] = useState();
    const [branch, setBranch] = useState();
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        console.log(event.target.value)
        // setRefresh(refresh + 1)
        let timeout = setTimeout(() => {
            document.getElementById('classes').scrollIntoView({ behavior: "smooth", block: 'start' });
        }, 100);

    }
    function handleCategoryyChange(event) {
        setSelectedCategory(event.target.value);
        console.log(event.target.value)

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
                                                className="words chars splitting wow textSizeClass"
                                                style={{ fontSize: "60px" }}
                                            >
                                                {item.listing_classes_id.title}
                                            </h3>
                                            <Split>
                                                <p className="words chars splitting wow txt-class" data-splitting style={{ color: "white" }}>
                                                    {parse(`${item.listing_classes_id.brief}`)}
                                                </p>
                                            </Split>
                                            {item.listing_classes_id?.button_title ? <button style={{ cursor: 'pointer' }} className='cursor-pointer montserrat-bold text-white btn-classes' onClick={handleCategoryChange} value={item.listing_classes_id.value} >{item.listing_classes_id?.button_title}</button> : null}
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
                                    <img className='imgFullSize' src={`${image_url}${item.listing_classes_id.image?.id}`} alt={`${data.image?.title}`} />
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
                                                className="words chars splitting wow textSizeClass"
                                                style={{ fontSize: "60px" }}
                                            >
                                                {item.listing_classes_id.title}
                                            </h3>
                                            <Split>
                                                <p className="words chars splitting wow txt-class" data-splitting style={{ color: "white" }}>
                                                    {parse(`${item.listing_classes_id.brief}`)}
                                                </p>
                                            </Split>
                                            {item.listing_classes_id?.button_title ? <button style={{ cursor: 'pointer' }} className='cursor-pointer montserrat-bold text-white btn-classes' onClick={handleCategoryChange} value={item.listing_classes_id.value} >{item.listing_classes_id?.button_title}</button> : null}
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
                                                className="words chars splitting wow textSizeClass"
                                                style={{ fontSize: "60px" }}
                                            >
                                                {item.listing_classes_id.title}
                                            </h3>
                                            <Split>
                                                <p className="words chars splitting wow txt-class" data-splitting style={{ color: "white" }}>
                                                    {parse(`${item.listing_classes_id.brief}`)}
                                                </p>
                                            </Split>
                                            {item.listing_classes_id?.button_title ? <button style={{ cursor: 'pointer' }} className='cursor-pointer montserrat-bold text-white btn-classes' onClick={handleCategoryChange} value={item.listing_classes_id.value} >{item.listing_classes_id?.button_title}</button> : null}
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
                                <>
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
                                <section className='portfolio' style={{marginBottom:"2rem"}}>
                                <div
                                className="filtering col-12 "
                            >
                                <div className="filter">
                                    <button style={{ cursor: 'pointer' }} className='cursor-pointer montserrat-bold text-white ' onClick={handleCategoryChange} value="energy" >Energy</button>
                                    <button style={{ cursor: 'pointer' }} className='cursor-pointer montserrat-bold text-white ' onClick={handleCategoryChange} value="balance" >Balance</button>
                                    <button style={{ cursor: 'pointer' }} className='cursor-pointer montserrat-bold text-white ' onClick={handleCategoryChange} value="power" >Power</button>

                                </div>
                            </div>
                            </section>
                            </>
                            )}
                          
                        </>
                    ))}
                    <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                        {ListofClasses.filter((item) => item.value === selectedCategory).map((element, index) => (
                            <div className="col-lg-4" style={{ paddingLeft: "50px", paddingRight: "50px", marginBottom: '2rem' }}>
                                <div className='lg:flex my-10 mx-auto items-center px-12'>
                                    <div className=" lg:w-1/2 pt-6 lg:pt-0  lg:block">
                                        <div id="wrapper" className={`main-image-center`} style={{ position: "relative" }}>
                                            <img style={{ height: "400px", objectFit: "cover" }} src={`${image_url}${element.image}`} alt={`${element.image?.title}`} />

                                            <Popup trigger={
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    textAlign: "center",
                                                    position: "absolute",
                                                    background: "#131316",
                                                    width: "100%",
                                                    left: '0',
                                                    bottom: '0',
                                                    zIndex: '22',
                                                    padding: "15px 10px",
                                                    letterSpacing: "2px",
                                                    fontFamily: "Montserrat Regular"
                                                }}>
                                                    TRYOUT CLASS
                                                </div>
                                            } modal nested
                                                closeOnDocumentClick
                                                className="popupModule"
                                                position="">
                                                {(close) => (
                                                    <>
                                                        <div className="" onClick={close}>
                                                            <img src="/closeButton.svg"
                                                              className='closePop'  style={{ width: "30px", height: "30px", position: "absolute", right: "0rem" }} />
                                                        </div>
                                                        <div className="row container" style={{ justifyContent: "space-between" }}>
                                                            <div className="col-lg-5">
                                                                <div className="img-mons">
                                                                    <div className="row">
                                                                        <img src="/layer-MC0.png" alt="" />
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                            <form onSubmit={submitLebSignUp} className="col-lg-6" style={{ display: "flex", flexDirection: "column", justifyContent: "start", paddingTop: "1rem", gap: "10px" }}>
                                                                <h6 style={{ fontWeight: "lighter", fontFamily: "Montserrat Regular" }}>REQUEST</h6>
                                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><h1 className='mobiletitlePop' style={{ fontWeight: "bold", fontSize: "36px" }}>FREE TRYOUT</h1><h2 className="freetryoutsubtitle" style={{ fontSize: "21px", fontFamily: "Montserrat Regular", color: "rgb(25, 144, 223)" }}>/ {element.title}</h2></div>
                                                                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                                                    <input style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} id="pp_first_name" name="pp_first_name" placeholder='FIRST NAME' />
                                                                    <input style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} id="pp_last_name" name="pp_last_name" placeholder='LAST NAME' />
                                                                </div>
                                                                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                                                    {/* <PhoneInput style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} /> */}
                                                                    <PhoneInput
                                                                        country={"lb"}
                                                                        countryCodeEditable={false}
                                                                        autoFormat={false}
                                                                        enableAreaCodes={true}
                                                                        placeholder='PHONE NUMBER'
                                                                        onChange={(value) => {
                                                                            setValue(value);
                                                                        }}
                                                                        required={true}
                                                                        inputClass='PhoneNumberInputPopup'
                                                                        inputProps={{
                                                                            name: "pp_phone",
                                                                            id: "pp_phone",
                                                                            required: true,
                                                                            // autoFocus: true,
                                                                            maxLength: 12,
                                                                        }}
                                                                        excludeCountries={['us']}
                                                                        style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }}
                                                                        className="w-full pl-2 appearance-none block bg-transparent leading-tight py-2 "
                                                                        value={value}

                                                                    />
                                                                    <input className='inputInfo' style={{ width: "50%", height: "3rem", border: "1px solid #1990DF", background: "transparent", borderRadius: "5px", paddingLeft: "5px" }} id="pp_email" name="pp_email" placeholder='EMAIL' />
                                                                </div>
                                                                <select
                                                                    defaultValue={branch} onChange={(value) => {
                                                                        setBranch(value);
                                                                    }}
                                                                    name="branches" id="location"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "3rem",
                                                                        border: "1px solid #1990DF",
                                                                        background: "transparent",
                                                                        borderRadius: "5px",
                                                                        paddingLeft: "5px",
                                                                        color: "white"
                                                                    }}
                                                                >
                                                                    <option value='1'>Hamra</option>
                                                                    <option value='2'>Baabda</option>
                                                                    <option value='6'>Achrafieh</option>
                                                                    <option value='7'>Dbayeh</option>
                                                                    <option value='9'>Manara</option>
                                                                </select>
                                                                <button className='submitPopup' type='submit' style={{ width: "25%", background: "#1990DF", height: "3rem", color: "white", borderRadius: "5px", border: "0px solid transparent" }}>SUBMIT REQUEST</button>
                                                            </form>
                                                        </div>
                                                    </>
                                                )}
                                            </Popup>
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
                                        {element.button_title ? <a href="/" className=" bg-[#009FE3] learnMoreBtns p-2 w-36 flex justify-start items-center rounded-md montserrat-bold mt-4">{element.button_title}
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

