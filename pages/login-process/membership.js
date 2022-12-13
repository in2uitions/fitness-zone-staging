import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";

export default function Membership({ data = {}, style = 'white' }) {
    const membership =[
        {
            date:'18/10/2022',
            text:'Membership Renewal (1 Year)'
        },
        {
            date:'18/10/2022',
            text:'Personal Training Package'
        },
        {
            date:'18/10/2022',
            text:'Personal Training Package'
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
                            <img src='/icons-person.png' />
                            <p className='futura-bold text-[#009FE3] mt-5'>CHARLES KHOURY</p>
                            <div className='flex flex-col   mt-10'>
                                <div className='flex space-x-3'>
                                    <p className='futura-book menu-member flex items-center justify-between'> My Profile<ChevronRightIcon className='fill-[#009FE3]' /></p>
                                    <p className='futura-book menu-member flex items-center justify-between'>Membership Settings<ChevronRightIcon className='fill-[#009FE3]' /></p>
                                </div>
                                <div className='flex space-x-3 mt-10'>
                                    <p className='futura-book menu-member flex items-center justify-between'>Classes / Book a class<ChevronRightIcon className='fill-[#009FE3]' /></p>
                                    <p className='futura-book menu-member flex items-center justify-between'>Trainers / Book a package<ChevronRightIcon className='fill-[#009FE3]' /></p>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </nav>
            </div>
            <section>
                <div className='container mx-auto flex flex-col justify-center mt-40'>
                    <div className='flex flex-col justify-center items-center'>
                        <img src='/gold-member.png' />
                        <p className='futura-bold mt-5'>GOLD MEMBERSHIP</p>
                    </div>
                    <div className='grid grid-cols-12 gap-x-1 items-center mt-10'>
                        <div className='col-span-4'>
                        <div className='flex flex-col'>
                            <p className='text-sm text-white'>Status</p>
                            <p className='futura-bold text-white'>ACTIVE</p>
                        </div>
                        <div className='flex flex-col  mt-5'>
                            <p className='text-sm text-white'>Start Date</p>
                            <p className='futura-bold text-white'>25/10/2022</p>
                        </div>
                        </div>
                        <div className='col-span-4'>
                        <div className='flex flex-col'>
                            <p className='text-sm text-white'>Default Club</p>
                            <p className='futura-bold text-white'>CITY WALK</p>
                        </div>
                        <div className='flex flex-col  mt-5'>
                            <p className='text-sm text-white'>Expiry Date</p>
                            <p className='futura-bold text-white'>25/10/2023</p>
                        </div>
                        </div>
                        <div className='col-span-4'>
                        <div className='flex flex-col'>
                        <button className='bg-[#009FE3] futura-bold p-3 rounded-md text-white'>RENEW MEMBERSHIP</button>
                        <button className='bg-white text-[#009FE3] p-3 rounded-md  mt-5'>FREEZING REQUEST</button>
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-col mx-auto justify-start items-start mt-10 mb-20 '>
                        <p className='text-[#009FE3] futura-bold mb-3'>Payment History</p>
                        {membership.map((item) => (
                    <>
                    <div className='flex justify-start w-full items-center classes-box mb-3 p-3'>
                    <div className='space-x-2 flex'>
                        <p className='border-r pr-1 border-[#009FE3] text-white'>{item.date}</p>
                        <p className='text-white'>{item.text}</p>
                        </div>
                    </div>
                    </>
                    ))}
                    </div>
                </div>
            </section>
        </>
    );
}


