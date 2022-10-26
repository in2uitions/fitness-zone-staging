

export default function PopupContent() {
    return (
        
        <div className="backdrop-blur-xl rounded-lg shadow-xl w-screen h-screen overflow-y-auto">
            <div className="lg:grid lg:grid-cols-2">
                <div className="grid lg:grid-rows-8 gap-6 lg:mt-52 md:mt-52 mt-28 lg:ml-40 md:ml-40 ml-10">
                    <a href="/" className="font-bold text-4xl futura-book menu-items">
                        HOME
                    </a>
                    <a
                        href="/aboutUs"
                        className="font-bold futura-book text-4xl menu-items"
                    >
                        ABOUT US
                    </a>
                    <a
                        href="/services"
                        className="font-bold futura-book text-4xl menu-items"
                    >
                        SERVICES
                    </a>
                    <a href="/PT" className="font-bold futura-book text-4xl menu-items">
                        PT
                    </a>
                    <a
                        href="/classes"
                        className="font-bold futura-book text-4xl menu-items"
                    >
                        CLASSES
                    </a>
                    <a
                        href="/contactUs"
                        className="font-bold futura-book text-4xl menu-items"
                    >
                        CONTACT US
                    </a>

                    <div className="flex flex-row mt-14">
                        <a
                            href="#"
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
                <div className="mt-52 flex flex-col justify-center">
                    <div className="flex flex-row ml-14">
                        <a
                            href="#"
                            className="bg-[#009FE3] h-9 flex justify-center items-center p-2 rounded mr-4"
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

                    <p className="pt-7 futura-bold ml-14 text-white">ENQUIRE NOW</p>
                    <input
                        className="ml-14 pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 py-2 mb-3"
                        placeholder="FULL NAME"
                    />
                    <input
                        className="ml-14 pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 py-2 mb-3"
                        placeholder="PHONE NUMBER"
                    />

                    {/* <div className="lg:ml-14 mt-5 bg-[#009FE3] learnMoreBtns p-2 lg:w-40 flex justify-center items-center rounded-md futura-bold">
                        <a href="#">REQUEST A CALL</a>
                    </div> */}

                    {/* <img src="Group 36.png" className="mt-16" /> */}
                </div>
            </div>
        </div>
    );
}
