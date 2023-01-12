import { createContactUsUser } from "../../api/server";

export default function CompContact({ data = {}, style = 'white' }) {
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            localStorage.setItem('full_name', event.target.full_name.value);
            localStorage.setItem('email', event.target.email.value);
            localStorage.setItem('message', event.target.message.value)
            createContactUsUser();
            event.target.full_name.value='';
            event.target.email.value = '';
            event.target.message.value = '';
            localStorage.setItem('full_name', event.target.full_name.value = '');
            localStorage.setItem('email', event.target.email.value = '');
            localStorage.setItem('message', event.target.message.value = '')
        };
        getTokenAPI();

    };
    return (
        <div>
            <div className="lg:flex mt-20 mb-20 lg:px-14 md:px-14 px-6">
                <div className="lg:w-1/2">
                    <p className="text-color text-2xl futura-bold mb-5">{data.title}</p>
                    <form onSubmit={onSubmitForm}>
                    <div className="pb-5">
                        <input className="contact-inputs" id="full_name" placeholder="FULL NAME" />
                    </div>
                    <div className="pb-5">
                        <input className="contact-inputs" id="email" placeholder="EMAIL" />
                    </div>
                    <textarea className="textArea mb-5" id="message" rows="10" cols="80" maxlength="200" placeholder="MESSAGE" />
                    <div className="pb-5">
                        <button className="mt-5 bg-[#009FE3] text-white w-20 h-9 flex items-center flex-row justify-around rounded-md futura" type="submit">
                            {data.button_title}
                        </button>
                    </div>
                    </form>
                </div>
                <div className="lg:w-1/2">
                    <p className="text-color text-2xl futura-bold mb-5">{data.get_in_touch}</p>
                    <div className="grid lg:grid-rows-2 md:grid-rows-2 grid-rows-3 grid-flow-col gap-4">
                        {/* <div className="lg:w-1/3 text-white" ></div>  */}
                        {data.contact?.map((item, i) => (
                            <div className="flex flex-col text-white">
                                <p className="font-bold futura-bold">{item.comp_contact_items_id?.location}</p>
                                <p className="futura-book">{item.comp_contact_items_id?.number}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex space-x-3 mt-20">
                        <div className="">
                            <button className="p-2 bg-[#009FE3] text-white flex items-center flex-row justify-around rounded-md futura">
                                BECOME A MEMBER
                            </button>
                        </div>
                        <div className="">
                            <a href="/about/career" target="_blank" className="border-[#009FE3] text-white border-2 lg:p-2 md:p-2 p-7 h-10 rounded flex futura-bold justify-center items-center lg:mt-0 md:mt-0 ">WORK WITH US</a>
                        </div>
                        <div className="">
                            <a href="/about/franchise" target="_blank" className="border-[#009FE3] text-white border-2 lg:p-2 md:p-2 p-7 h-10 rounded flex futura-bold justify-center items-center lg:mt-0 md:mt-0 ">GROW WITH US</a>
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


