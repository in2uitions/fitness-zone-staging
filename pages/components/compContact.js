
export default function CompContact({ data = {}, style = 'white' }) {

    return (
        <div>
            <div className="lg:flex mt-40 mb-20 px-14">
                <div className="lg:w-1/2">
                    <p className="text-color text-2xl futura-bold mb-5">{data.title}</p>
                    <div className="pb-5">
                        <input className="contact-inputs" placeholder="FULL NAME" />
                    </div>
                    <div className="pb-5">
                        <input className="contact-inputs" placeholder="EMAIL" />
                    </div>
                    <textarea className="textArea mb-5" rows="10" cols="80" maxlength="200" placeholder="MESSAGE" />
                    <div className="pb-5">
                        <button className="mt-5 bg-[#009FE3] text-white w-20 h-9 flex items-center flex-row justify-around rounded-md futura">
                            {data.button_title}
                        </button>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <p className="text-color text-2xl futura-bold">{data.get_in_touch}</p>
                    <div className="grid grid-rows-2 grid-flow-col gap-4">
                        {/* <div className="lg:w-1/3 text-white" ></div>  */}
                        {data.contact?.map((item, i) => (
                            <div className="flex flex-col text-white">
                                <p className="font-bold futura-bold">{item.comp_contact_items_id?.location}</p>
                                <p className="futura-book">{item.comp_contact_items_id?.number}</p>
                            </div>
                        ))}
                    </div>
                    <div className="lg:flex space-x-3 mt-20">
                        <div className="">
                            <button className="p-2 bg-[#009FE3] text-white flex items-center flex-row justify-around rounded-md futura">
                                BECOME A MEMBER
                            </button>
                        </div>
                        <div className="">
                            <button className="border-[#009FE3] text-white border-2 p-2 h-10 rounded flex futura-bold justify-center items-center lg:mt-0 md:mt-0 mt-2">Work With Us</button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className=" futura-bold text-white">ENQUIRE NOW</p>
                        <input
                            className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 py-2 mb-3"
                            placeholder="FULL NAME"
                        />
                        <input
                            className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] lg:w-80 py-2 mb-3"
                            placeholder="PHONE NUMBER"
                        />

                        <div className="mt-5 bg-[#009FE3] learnMoreBtns p-2 w-40 flex justify-start items-center rounded-md futura-bold">
                            <a href="#">REQUEST A CALL</a>
                        </div>
                    </div>
                </div>
            </div></div>
    );
}

