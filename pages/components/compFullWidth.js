import parse from "html-react-parser";
import { image_url } from "../../global_vars";
import Popup from "reactjs-popup";
import { BrowserView, MobileView } from "react-device-detect";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { createOfferUser } from "../../api/server";
export default function CompFullWidth({ data = {}, style = 'white' }) {
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            localStorage.setItem('first_name', event.target.first_name.value);
            localStorage.setItem('last_name', event.target.last_name.value);
            localStorage.setItem('email', event.target.email.value)
            localStorage.setItem('phone_number', event.target.phone_number.value)
            createOfferUser();
            localStorage.setItem('first_name', event.target.first_name.value = ''),
                localStorage.setItem('last_name', event.target.last_name.value = ''),
                localStorage.setItem('email', event.target.email.value = ''),
                localStorage.setItem('phone_number', event.target.phone_number.value = '')

        };
        getTokenAPI();

    };
    return (
        <div className="mt-10 mb-20">
            {data.title ? <div className="lg:mt-40 md:mt-40 lg:mb-40 md:mb-40 mt-20 mb-20 flex flex-col justify-center items-center text-center">
                <p className="futura-bold text-3xl w-3/4 text-white md:text-6xl lg:text-6xl mx-auto">{data.title}</p>
            </div> : null}
            <div className="relative">
                <div className=" w-screen about-image relative" style={{ "backgroundImage": `url("${image_url}${data.image?.id}")` }}>
                    {/* <img src={`${image_url}${data.image?.id}`} className="relative w-screen about-image" alt={`${data.image?.title}`} /> */}
                </div>
                {data.image_description ? <div className="absolute bottom-16 left-20 text-left manifesto">
                    <p className="text-[#fff5ee] futura-book">
                        {parse(`${data.image_description}`)}
                    </p>

                    {data.button_title ? <Popup
                        trigger={
                            <button>
                                <button className="bg-[#009FE3] p-2 rounded-md mt-5 futura-bold text-white">{data.button_title}<ChevronRightIcon /></button>
                            </button>
                        } modal
                        position="center"
                        closeOnDocumentClick={true}
                    >
                        {close => (
                            <>
                                <button className="close text-white" onClick={close}>
                                    {/* &times; */}
                                    <img src="/close-X.svg" />
                                </button>
                                <form onSubmit={onSubmitForm} className="flex">
                                    <BrowserView>
                                        <div className="popup-overlay">
                                            <div className="lg:flex backdrop-blur-xl rounded-lg shadow-xl justify-center items-center popup-bg popup-measures">

                                                <input type="hidden" name="enquire_request" value="popup-request" />
                                                <div className="lg:flex lg:w-full">
                                                    <div className="w-1/3">
                                                        <img src="/popup-image.png" className="image-popup none-event object-cover" />
                                                    </div>
                                                    <div className="lg:flex lg:flex-col justify-center lg:w-2/3 px-8 pt-6 lg:pt-0 md:pt-0">
                                                        <p href="/" className="font-bold text-2xl  futura-bold text-[#009FE3] ">SIGN UP FOR OUR PRE-OPENING OFFER IN CITY WALK DUBAI!</p>

                                                        <input placeholder="FIRST NAME"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_first_name"
                                                            id="first_name"
                                                            required
                                                        />
                                                        <input placeholder="LAST NAME"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_last_name"
                                                            id="last_name"
                                                            required
                                                        />
                                                        {/* <input placeholder="PHONE NUMBER" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-5 h-12" /> */}
                                                        <input placeholder="EMAIL"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_email"
                                                            id="email"
                                                        />
                                                        <input placeholder="0501234567"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_phone"
                                                            id="phone_number"
                                                            required
                                                        />

                                                        <button type="submit" className="bg-[#009FE3] text-white flex justify-center p-2 items-center w-24 rounded mr-4 futura-bold mb-2">SIGN UP</button>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </BrowserView>
                                    <MobileView>
                                        <div className="popup-overlay">
                                            <div className="lg:flex backdrop-blur-xl rounded-lg shadow-xl justify-center items-center popup-bg popup-measures">

                                                <input type="hidden" name="enquire_request" value="popup-request" />
                                                <div className="lg:flex lg:w-full">
                                                    <div className="lg:flex lg:flex-col justify-center lg:w-2/3 px-8 pt-6 lg:pt-0 md:pt-0">
                                                        <p href="/" className="font-bold text-2xl  futura-bold text-[#009FE3] ">SIGN UP FOR OUR PRE-OPENING OFFER IN CITY WALK DUBAI!</p>

                                                        <input placeholder="FIRST NAME"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_first_name"
                                                            id="first_name"
                                                            required
                                                        />
                                                        <input placeholder="LAST NAME"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_last_name"
                                                            id="last_name"
                                                            required
                                                        />
                                                        {/* <input placeholder="PHONE NUMBER" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-5 h-12" /> */}
                                                        <input placeholder="EMAIL"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_email"
                                                            id="email"
                                                        />
                                                        <input placeholder="0501234567"
                                                            className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                                            // name="pp_phone"
                                                            id="phone_number"
                                                            required
                                                        />

                                                        <button type="submit" className="bg-[#009FE3] text-white flex justify-center p-2 items-center w-24 rounded mr-4 futura-bold mb-2">SIGN UP</button>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </MobileView>
                                </form>
                            </>
                        )}
                    </Popup> : null}
                </div> : null}

                {data.brief ? <div className="absolute bottom-16 right-28 text-left manifesto-txt">
                    <p className="text-[#fff5ee] futura-book">
                        {parse(`${data.brief}`)}
                    </p>

                </div> : null}
            </div>

        </div>
    );
}
