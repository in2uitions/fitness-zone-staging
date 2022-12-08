import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";

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
    const classes =[
        {
            time:'09:00',
            step:'B.Step',
            name:'Elie',
            city:'Dbayeh'
        },
        {
            time:'09:00',
            step:'B.Step',
            name:'Elie',
            city:'Dbayeh'
        },
        {
            time:'09:00',
            step:'B.Step',
            name:'Elie',
            city:'Dbayeh'
        },
        {
            time:'09:00',
            step:'B.Step',
            name:'Elie',
            city:'Dbayeh'
        },
        {
            time:'09:00',
            step:'B.Step',
            name:'Elie',
            city:'Dbayeh'
        }
    ]
    const checkin =[
        {
            date:'18/10/2022',
            time:'14:23:04',
            city:'Dbayeh'
        },
        {
            date:'18/10/2022',
            time:'14:23:04',
            city:'Dbayeh'
        },
        {
            date:'18/10/2022',
            time:'14:23:04',
            city:'Dbayeh'
        }
    ]
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
                        <img src='/icons-person.png'/>
                        <p className='futura-bold text-[#009FE3] mt-5'>CHARLES KHOURY</p>
                        <div className='flex flex-col   mt-10'>
                        <div className='flex space-x-3'>
                            <a href='#' className='futura-book menu-member flex items-center justify-between'> My Profile<ChevronRightIcon className='fill-[#009FE3]'/></a>
                            <a href='/login-process/membership' className='futura-book menu-member flex items-center justify-between'>Membership Settings<ChevronRightIcon className='fill-[#009FE3]'/></a>
                        </div>
                        <div className='flex space-x-3 mt-10'>
                            <a href='#' className='futura-book menu-member flex items-center justify-between'>Classes / Book a class<ChevronRightIcon className='fill-[#009FE3]'/></a>
                            <a href='#' className='futura-book menu-member flex items-center justify-between'>Trainers / Book a package<ChevronRightIcon className='fill-[#009FE3]'/></a>
                        </div>
                        </div>
                    </div>
                    </Popup>




                </nav>
            </div>
            <section>
                <div className='container mx-auto flex flex-col justify-center mt-40'>
                    <p className='text-[#009FE3] futura-bold'>HELLO</p>
                    <p className='futura-book'>Let’s burn some calories</p>
                    <Slider className='mt-10' {...settings}>
                        {carousel_components.map((item) => (
                            <>
                                <div className='relative'>
                                    <img src={item.image} />
                                    <div className='absolute flex flex-col bottom-8 px-10'>
                                        <div className='flex space-x-2 items-start'>
                                            <img src={item.on_icon} className="h-6" />
                                            <p className='futura-bold text-3xl'>{item.text}</p>
                                        </div>
                                        <p className='desc-dashboard'>{item.desc}</p>
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
                <img src='/gold-member.png'/>
                <p className="futura-bold">Gold Membership</p>
                <p className='rounded-md flex space-x-2 text-white p-3 active-button'><span>Active till:</span><span className='text-white futura-bold'>25/10/2023</span></p>
                <p className='futura-bold'>VIEW MEMBERSHIP DETAILS<ChevronRightIcon className='fill-[#009FE3]'/></p>
                </div>
                </div>
                <div className='col-span-3'>
                <p className='text-[#009FE3] futura-bold mb-10'>My Upcoming Classes</p>
                {classes.map((item) => (
                    <>
                    <div className='flex justify-start items-start classes-box mb-3 p-3'>
                    <div className='space-x-2 flex'>
                        <p>{item.time}</p>
                        <p>{item.step}</p>
                        <p>{item.name}</p>
                        </div>
                        <div className='justify-end items-end ml-auto'>
                    <p>{item.city}</p>
                    </div>
                    </div>
                    </>
                    ))}
                </div>
                <div className='col-span-3'>
                <p className='text-[#009FE3] mb-10 futura-bold'>My Recent Checkins</p>
                {checkin.map((item) => (
                    <>
                    <div className='flex justify-start items-start classes-box mb-3 p-3'>
                    <div className='space-x-2 flex'>
                        <p>{item.date}</p>
                        <p>{item.time}</p>
                        <p>{item.city}</p>
                        </div>
                    </div>
                    </>
                    ))}
                </div>
                <div className='col-span-3'>
                <p className='text-[#009FE3] futura-bold'>Training Packages</p>
                <div className='flex flex-col space-y-3 mt-10 membership-box p-2 items-center'>
                <img src='/trainer-package.png'/>
                <p className="futura-bold">KAMEL RAAD</p>
                <p className='rounded-md flex space-x-2 text-white p-3 active-button'><span>Sessions:</span><span className='text-white futura-bold'>09/15</span></p>
                <p className='futura-bold'>VIEW PACKAGE DETAILS<ChevronRightIcon className='fill-[#009FE3]'/></p>
                </div>
                </div>
                </div>
            </section>
        </>
    );
}


