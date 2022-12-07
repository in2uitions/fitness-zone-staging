import dynamic from 'next/dynamic'
import HeaderContent from './header-component';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
const MetisMenu = dynamic(() => import('react-metismenu'), { ssr: false })

export default function Menu(data = {}) {
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };



    const [search, updateSearch] = useState('');
    const [index, updateIndex] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [content, updateContent] = useState([]);
    const router = useRouter()
    const [show, setShow] = useState(false)
    var ct = [
        {
            "id": 1,
            "label": "HOME",
            "to": '/'
        },
        {
            "id": 2,
            "label": "ABOUT US",
            "to": '/about/about-us'
        },
        {
            "id": 3,
            "label": "SERVICES",
            "to": '/about/services'
        },
        {
            "id": 4,
            "label": "PERSONAL TRAINING",
            "to": '/about/personal-trainer'
        },
        {
            "id": 5,
            "label": "CLASSES",
            "to": '/about/classes'
        },
        {
            "id": 6,
            "label": "CONTACT US",
            "to": '/about/contact-us'
        }
    ];

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {

            router.push('/results-page?search=' + search)
        }
    }




    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        console.log(ct);
        updateContent(ct);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };



    }, [data]);

    useEffect(() => {
        const handleRouteChange = (url) => {

            setIsSidebarOpen(false)


            if (url.includes("software") || url.includes("deployment")) {
                updateIndex(0);
            }

            if (url.includes("business") || url.includes("industries") || url.includes("hardware")) {
                updateIndex(1);
            }
            if (url.includes("about")) {
                updateIndex(2);
            }

            if (url.includes("about") || url.includes("support")) {
                updateIndex(3);
            }

            if (url.includes("resources")) {
                updateIndex(4);
            }
        }



        handleRouteChange(router.pathname)

        router.events.on('routeChangeStart', handleRouteChange)


        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, []);

    return (
        <>
       <div className="rounded-lg shadow-xl w-screen h-screen overflow-y-auto menu-fade">
            <div className="lg:grid lg:grid-cols-2">
                <div className="lg:mt-52 md:mt-52 mt-28 lg:ml-40 md:ml-40 ml-10">
                    <MetisMenu
                        className="font-bold futura-book text-4xl menu-items "
                        content={content} activeLinkFromLocation 
                    />
                    <div className="flex flex-row mt-14">
                        <a
                            href="/login-process/login"
                            className="border-[#009FE3] border-2 w-36 p-2 rounded flex justify-center items-center mr-5 futura-bold"
                        >
                            LOG IN
                        </a>
                        <a
                            href="#"
                            className="bg-[#009FE3] flex justify-center p-2 items-center w-40 rounded mr-4 futura-bold"
                        >
                            SIGN UP
                        </a>
                    </div>
                </div>
                <div className="lg:mt-52 md:mt-52 mt-5 flex flex-col justify-center">
                    <div className="flex flex-row lg:ml-14 md:ml-14 ml-10">
                        <a
                            href="#"
                            className="bg-[#009FE3] h-9 flex justify-center text-sm items-center p-2 rounded mr-4"
                        >
                            BECOME A MEMBER
                        </a>
                        <a
                            href="#"
                            className="border-[#009FE3] border-2 w-36 h-9 rounded flex justify-center items-center"
                        >
                            WORK WITH US
                        </a>
                    </div>

                    <p className="pt-7 futura-bold lg:ml-14 md:ml-14 ml-10 text-white">ENQUIRE NOW</p>
                    <input
                        className="lg:ml-14 md:ml-14 ml-10 pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 md:w-80 w-72 py-2 mb-3"
                        placeholder="FULL NAME"
                    />
                    <input
                        className="lg:ml-14 md:ml-14 ml-10 pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 md:w-80 w-72 py-2 mb-3"
                        placeholder="PHONE NUMBER"
                    />

                    <div className="lg:ml-14 md:ml-14 ml-10 mt-5 bg-[#009FE3] learnMoreBtns p-2 lg:w-40 md:w-40 w-40 mb-20 flex justify-center items-center rounded-md futura-bold">
                        <a href="#">REQUEST A CALL</a>
                    </div>
                </div>
            </div>
        </div>   
        </>
    );
}

