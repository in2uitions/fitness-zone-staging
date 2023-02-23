import React, { useState } from "react";
import { image_url } from "../../global_vars";
import parse from "html-react-parser";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Popup from "reactjs-popup";
import { createDubaiuser, createuser } from "../../api/server";
import axios from "axios";
import nextConfig from "../../next.config";
import Cookies from 'js-cookie'

export default function CompCareers({ data = {}, style = 'white', isFlipped = false, }) {
    const [activeSlide, setactiveSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(false)
    const [clickTiggered, setClickTriggered] = useState(false)

    let timeout = setTimeout(() => {
        if (nextSlide == true && clickTiggered == true) {
            activeSlide < data.careers.length - 1 && setactiveSlide(activeSlide + 1);
            setClickTriggered(false)
        }
    }, 1000);
    const next = () =>
        activeSlide < data.careers.length - 1 && setactiveSlide(activeSlide + 1);

    const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);

    const getStyles = (index) => {
        if (activeSlide === index)
            return {
                opacity: 1,
                transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
                zIndex: 22,
                width: 500,
                height: 230
            };
        else if (activeSlide - 1 === index)
            return {
                opacity: 0,
                transform: "translateX(-240px) translateZ(-400px) rotateY(0deg)",
                zIndex: 9,

            };
        else if (activeSlide + 1 === index)
            return {
                opacity: 1,
                transform: "translateX(520px) translateZ(-400px) rotateY(0deg)",
                zIndex: 9,
                width: 400,
                height: 230
            };
        else if (activeSlide - 2 === index)
            return {
                opacity: 0,
                transform: "translateX(-480px) translateZ(-500px) rotateY(0deg)",
                zIndex: 8
            };
        else if (activeSlide + 2 === index)
            return {
                opacity: 1,
                transform: "translateX(940px) translateZ(-500px) rotateY(0deg)",
                zIndex: 8,
                width: 345,
                height: 230
            };
        else if (index < activeSlide - 2)
            return {
                opacity: 0,
                transform: "translateX(-480px) translateZ(-500px) rotateY(0deg)",
                zIndex: 7
            };
        else if (index > activeSlide + 2)
            return {
                opacity: 0,
                transform: "translateX(480px) translateZ(-500px) rotateY(0deg)",
                zIndex: 7
            };
    };
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            if (nextConfig.country_code == 'LB') {
            var file = event.target.file.files[0];
            try{
                const form = new FormData();
                // form.append("filename", file.file_name);
                form.append("file", file);
                const response = await axios.post(`https://fzcms.diastora.com/files`, form);
                if(response.status == 200){
                    Cookies.set("file_id", response.data.data.id);
                }
            } catch(err){
                console.log(err)
            }
            Cookies.set('first_name', event.target.first_name.value);
            Cookies.set('last_name', event.target.last_name.value);
            Cookies.set('email', event.target.email.value),
            Cookies.set('phone_number', event.target.phone_number.value),
            Cookies.set('mobile_number', event.target.mobile_number.value);
            Cookies.set('education', event.target.education.value);
            Cookies.set('experience', event.target.experience.value);
            // Cookies.set('cv', event.target.cv.value)
            createuser();
            event.target.first_name.value='',
            event.target.last_name.value='',
            event.target.email.value= '',
            event.target.phone_number.value='',
            event.target.mobile_number.value='',
            event.target.education.value='',
            event.target.experience.value='',
            Cookies.set('first_name', event.target.first_name.value = '');
            Cookies.set('last_name', event.target.last_name.value = '');
            Cookies.set('email', event.target.email.value = ''),
            Cookies.set('phone_number', event.target.phone_number.value = ''),
            Cookies.set('mobile_number', event.target.mobile_number.value = '');
            Cookies.set('education', event.target.education.value = '');
            Cookies.set('experience', event.target.experience.value = '');
            console.log('leb user')
        }
        else if (nextConfig.country_code == 'AE') {
            var file = event.target.file.files[0];
            try{
                const form = new FormData();
                // form.append("filename", file.file_name);
                form.append("file", file);
                const response = await axios.post(`https://fzcms.diastora.com/files`, form);
                if(response.status == 200){
                    Cookies.set("file_id", response.data.data.id);
                }
            } catch(err){
                console.log(err)
            }
            Cookies.set('first_name', event.target.first_name.value);
            Cookies.set('last_name', event.target.last_name.value);
            Cookies.set('email', event.target.email.value),
            Cookies.set('phone_number', event.target.email.value),
            Cookies.set('mobile_number', event.target.mobile_number.value);
            Cookies.set('education', event.target.education.value);
            Cookies.set('experience', event.target.experience.value);
            // Cookies.set('cv', event.target.cv.value)
            createDubaiuser();
            event.target.first_name.value='',
            event.target.last_name.value='',
            event.target.email.value= '',
            event.target.phone_number.value='',
            event.target.mobile_number.value='',
            event.target.education.value='',
            event.target.experience.value='',
            Cookies.set('first_name', event.target.first_name.value = '');
            Cookies.set('last_name', event.target.last_name.value = '');
            Cookies.set('email', event.target.email.value = ''),
            Cookies.set('phone_number', event.target.email.value = ''),
            Cookies.set('mobile_number', event.target.mobile_number.value = '');
            Cookies.set('education', event.target.education.value = '');
            Cookies.set('experience', event.target.experience.value = '');
            console.log('ae user')
        }
        };
        getTokenAPI();

    };
    const uploadFile = async (element) => {
        element.preventDefault();
        var file = element.target.files[0];
        try{
            const form = new FormData();
            // form.append("filename", file.file_name);
            form.append("file", file);
            const response = await axios.post(`https://fzcms.diastora.com/files`, form);
            if(response.status == 200){
                Cookies.set("file_id", response.data.data.id);
            }
        } catch(err){
            console.log(err)
        }
        // console.log(response.data.data.filename_disk)
        // var reader = new FileReader()
        // reader.onload = function () {
        //     Cookies.set("file", JSON.stringify(file));
        // }
        // reader.readAsDataURL(file);
    };
    return (
        <>

            <div className={`lg:flex relative px-14 container pb-16`}>

                <div className="lg:w-1/2">
                    <div className="slideCC">
                        <>
                            <div className="">
                                <div
                                    className=""
                                >
                                    <div className="sliderContent mt-12">
                                        <div className="flex items-baseline space-x-5">
                                            <p className="font-bold futura-bold text-4xl">{data.title}</p>
                                        </div>
                                        {data.description ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2">{parse(`${data?.description}`)}</p> : null}
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="slideC">
                        {data.careers.map((item, i) => (
                            <>
                                <div className="">

                                    <div key={item.id}
                                        className="absolute h-full transition duration-500 ease-out"
                                        style={{
                                            ...getStyles(i),
                                        }}
                                    >
                                        <div className="bg-[#3b3c40] w-full h-full flex flex-col justify-center items-center">
                                            <p className="futura-bold text-3xl mt-3 text-white">{item.careers_items_id?.title}</p>
                                            <p className="futura-book mt-3 text-white">{item.careers_items_id?.subtitle}</p>
                                            <Popup
                                                trigger={
                                                    <button>
                                                        <button className="bg-[#009FE3] p-2 rounded-md mt-5 text-white">{item.careers_items_id?.button}</button>
                                                    </button>
                                                } modal
                                                position="center"
                                                closeOnDocumentClick={false}
                                            >
                                                {close => (
                                                    <div className="container w-screen flex flex-col justify-center relative py-12">
                                                        <button className="flex w-full justify-end text-white mb-4 outline-none" onClick={close}>
                                                        
                                                        <img src="/close-X.svg"/>
                                                            {/* &times; */}
                                                        </button>
                                                        <form onSubmit={onSubmitForm}>
                                                            <div className="flex w-full justify-between space-x-5">
                                                                <input placeholder="First Name" id="first_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                <input placeholder="Last Name" id="last_name" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                <input placeholder="Email" id="email" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            </div>
                                                            <div className="flex w-full justify-between space-x-5 mt-10">
                                                                <input placeholder="Phone Number" id="phone_number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                <input placeholder="Mobile Number" id="mobile_number" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                <input placeholder="Education" id="education" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                            </div>
                                                            <div className="flex w-full justify-between space-x-2 mt-10">
                                                                <div>
                                                                    <input placeholder="Experience" id="experience" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2 " />
                                                                </div>
                                                                <div className="w-3/4">
                                                                    {/* <label htmlFor="cv" className="w-full border-[#009FE3] pl-2 appearance-none block bg-transparent text-[#aeaeae] border rounded-md leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-2">
                                                                Upload your CV
                                                            </label> */}
                                                                    <input
                                                                        className="w-full border-[#009FE3] pl-2 appearance-none block bg-transparent text-[#aeaeae] border rounded-md leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] py-1"
                                                                        id="file"
                                                                        multiple={false}
                                                                        type="file"
                                                                        // onChange={uploadFile}
                                                                        required
                                                                    />
                                                                    {/* <input id="cv" style={{ visibility: "hidden" }} type={"file"} /> */}
                                                                </div>
                                                            </div>
                                                            <button className="bg-[#009FE3] w-full p-2 mt-5 futura-book rounded-md text-white" type="submit">Send</button>
                                                        </form>
                                                        {/* <FooterPopup /> */}
                                                    </div>
                                                )}
                                            </Popup>

                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}


                        <div className="btns-vacancies" >
                            <img src="/ArrowLeft.png"
                                className={
                                    "btn arrow " +
                                    (activeSlide > 0 ? " btn-vacancies arrow" : "btn-disabled")
                                }
                                onClick={prev}
                                color="#fff"
                                size="2x"
                            />
                            <img src="/ArrowRight.png"
                                className={
                                    "btn-vacancies arrow " +
                                    (activeSlide < data.careers.length - 1 ? " btn-vacancies arrow" : "btn-disabled")
                                }
                                onClick={next}
                                color="#fff"
                                size="2x"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

