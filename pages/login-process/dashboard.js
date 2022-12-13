import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Close from '@material-ui/icons/Close';
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useState, useEffect } from 'react';
import ToggleText from '../login-process/test'

export default function Dashboard({ data = {}, style = 'white' }) {
    
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        appendDots: dots => {
            return <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />;
        }
    };
    const [limit, setLimit] = useState(4);
    const carousel_components = [
        {
            image: '/dashboard-pics.png',
            on_icon: '/on-classes.png',
            text: 'STRETCHING',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard'
        },
        {
            image: '/dashboard-pics.png',
            on_icon: '/on-classes.png',
            text: 'STRETCHING',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard'
        },
        {
            image: '/dashboard-pics.png',
            on_icon: '/on-classes.png',
            text: 'STRETCHING',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard'
        },
        {
            image: '/dashboard-pics.png',
            on_icon: '/on-classes.png',
            text: 'STRETCHING',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard'
        },
        {
            image: '/dashboard-pics.png',
            on_icon: '/on-classes.png',
            text: 'STRETCHING',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard'
        }
    ]
    const [classesList, setClassesList] = useState([
        {
            time: '08:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '09:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '10:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '11:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '12:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '01:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '02:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '03:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '04:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '05:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '06:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        },
        {
            time: '07:00',
            step: 'B.Step',
            name: 'Elie',
            city: 'Dbayeh'
        }
    ])
    useEffect(() => {
        if (classesList.length > 0) {
            classesList[classesList.length - 1].input === ""
        }
    })

    const handleInputChange = (event, index) => {
        const { value } = event.target
        const newclassesList = [...classesList]
        newclassesList[index].input = value
        newclassesList[index].input_rank = index + 1
        setClassesList(newclassesList)
    }

    const handleRemoveItem = (index) => {
        const newList = [...classesList]
        newList.splice(index, 1)
        setClassesList(newList)
    }

    console.log(classesList)

    const [checkInList, setCheckInList] = useState([
        {
            date: '18/10/2022',
            time: '14:23:04',
            city: 'Dbayeh'
        },
        {
            date: '18/10/2022',
            time: '14:23:04',
            city: 'Dbayeh'
        },
        {
            date: '18/10/2022',
            time: '14:23:04',
            city: 'Dbayeh'
        },
        {
            date: '18/10/2022',
            time: '14:23:04',
            city: 'Dbayeh'
        },
        {
            date: '18/10/2022',
            time: '14:23:04',
            city: 'Dbayeh'
        },
        {
            date: '18/10/2022',
            time: '14:23:04',
            city: 'Dbayeh'
        }
    ])
    const [noOfCheckInElements, setnoOfCheckInElements] = useState(3);
    const sliceCheckIn = checkInList.slice(0, noOfCheckInElements);
    const loadMoreLessCheckIn = () => {
        if (noOfCheckInElements == 3) {
            setnoOfCheckInElements(checkInList.length)
        }
        else {
            setnoOfCheckInElements(3)
        }
    }
    const [stateCheckIn, toggleCheckIn] = useState(true);
    const [noOfElements, setnoOfElements] = useState(4);
    const slice = classesList.slice(0, noOfElements);
    const loadMoreLess = () => {
        if (noOfElements == 4) {
            setnoOfElements(classesList.length)
        }
        else {
            setnoOfElements(4)
        }
    }
    const [state, toggle] = useState(true);
    return (
        <>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <a href="/"><img src="/logo.png" className="logo" /></a>
                    <Popup
                        trigger={
                            <div className="flex items-center space-x-2">
                                <button className="img-btn">
                                    <img src="/blue-rectangle.png" className="menu-icon" />
                                </button>
                                <p className="font-bold text-white futura-book cursor-pointer">Menu</p>
                            </div>
                        } modal
                        closeOnDocumentClick
                        position=""
                    >
                        <div className='w-screen h-screen container mx-auto flex flex-col justify-center items-center'>
                            <img src='/icons-person.png' />
                            <p className='futura-bold text-[#009FE3] mt-5'>CHARLES KHOURY</p>
                            <div className='flex flex-col   mt-10'>
                                <div className='flex space-x-3'>
                                    <a href='#' className='futura-book menu-member flex items-center justify-between'> My Profile<ChevronRightIcon className='arrow-membership' /></a>
                                    <a href='/login-process/membership' className='futura-book menu-member flex items-center justify-between'>Membership Settings<ChevronRightIcon className='arrow-membership' /></a>
                                </div>
                                <div className='flex space-x-3 mt-10'>
                                    <a href='#' className='futura-book menu-member flex items-center justify-between'>Classes / Book a class<ChevronRightIcon className='arrow-membership'/></a>
                                    <a href='#' className='futura-book menu-member flex items-center justify-between'>Trainers / Book a package<ChevronRightIcon className='arrow-membership' /></a>
                                </div>
                            </div>
                        </div>
                    </Popup>




                </nav>
            </div>
            <section>
                <div className='container mx-auto flex flex-col justify-center mt-40'>
                    <p className='text-[#009FE3] futura-bold'>HELLO</p>
                    <p className='futura-book text-white'>Let’s burn some calories</p>
                    <Slider className='mt-10' {...settings}>
                        {carousel_components.map((item) => (
                            <>
                                <div className='relative'>
                                    <img src={item.image} />
                                    <div className='absolute flex flex-col bottom-8 px-10'>
                                        <div className='flex space-x-2 items-start'>
                                            <img src={item.on_icon} className="h-6" />
                                            <p className='futura-bold text-3xl text-white'>{item.text}</p>
                                        </div>
                                        <p className='desc-dashboard text-white'>{item.desc}</p>
                                    </div>
                                </div>

                            </>
                        ))}
                    </Slider>
                </div>
            </section>
            <section>
                <div className='container mx-auto mt-10 mb-20 grid grid-cols-12 gap-x-10'>
                    <div className='col-span-3'>
                        <p className='text-[#009FE3] futura-bold'>Membership Details</p>
                        <div className='flex flex-col space-y-3 mt-10 membership-box p-2 items-center'>
                            <img src='/gold-member.png' />
                            <p className="futura-bold text-white">Gold Membership</p>
                            <p className='rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button'><span className='text-white'>Active till:</span><span className='text-white futura-bold'>25/10/2023</span></p>
                            <p className='futura-bold cursor-pointer text-white'>VIEW MEMBERSHIP DETAILS<ChevronRightIcon className='arrow-membership' /></p>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <p className='text-[#009FE3] futura-bold mb-10'>My Upcoming Classes</p>
                        {slice.map((item, index) => (
                            <>
                                <div className='flex justify-start items-start classes-box mb-3 p-3' onChange={(event) => handleInputChange(event, index)}>
                                    <div className='space-x-2 flex'>
                                        <p className='futura-book pr-1 border-r border-[#009FE3] text-white'>{item.time}</p>
                                        <p className='futura-book pr-2 border-r border-white text-white'>{item.step}</p>
                                        <p className='futura-book text-white'>{item.name}</p>
                                    </div>
                                    <div className='flex justify-end space-x-2 items-end ml-auto'>
                                        <p className='futura-book text-white' style={{ fontSize: 14 }}>{item.city}</p>
                                        <button onClick={() => handleRemoveItem(index)}>
                                            <p className='flex items-center text-[#8F8F8F] futura-bold text-sm'>Cancel<Close className='x-close' /></p>
                                        </button>
                                    </div>

                                </div>
                            </>
                        ))}

                        <div className='flex justify-center text-white items-center cursor-pointer futura-bold' onClick={() => { toggle(!state); loadMoreLess() }}>
                            {state ? "VIEW ALL" : "VIEW LESS"}<ChevronRightIcon className='arrow-membership' />
                        </div>

                    </div>
                    <div className='col-span-3'>
                        <p className='text-[#009FE3] mb-10 futura-bold'>My Recent Checkins</p>
                        {sliceCheckIn.map((item) => (
                            <>
                                <div className='flex justify-start items-start classes-box mb-3 p-3' >
                                    <div className='space-x-2 flex'>
                                        <p className='text-white'>{item.date}</p>
                                        <p className='border-r border-[#009FE3] text-white'>{item.time}</p>
                                        <p className='text-white'>{item.city}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                        <div className='flex justify-center items-center cursor-pointer futura-bold' onClick={() => { toggleCheckIn(!stateCheckIn); loadMoreLessCheckIn() }}>
                            {stateCheckIn ? "VIEW ALL" : "VIEW LESS"}<ChevronRightIcon className='arrow-membership' />
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <p className='text-[#009FE3] futura-bold'>Training Packages</p>
                        <div className='flex flex-col space-y-3 mt-10 membership-box p-2 items-center'>
                            <img src='/trainer-package.png' />
                            <p className="futura-bold text-white">KAMEL RAAD</p>
                            <p className='rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button'><span className='text-white'>Sessions:</span><span className='text-white futura-bold'>09/15</span></p>
                            <p className='futura-bold cursor-pointer text-white'>VIEW PACKAGE DETAILS<ChevronRightIcon className='arrow-membership' /></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


