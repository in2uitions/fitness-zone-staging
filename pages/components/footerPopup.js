
import { useState } from "react";

export default function FooterPopup() {
    const [isSent, setIsSent] = useState(false);
    const [isNotSent, setIsNotSent] = useState(false)
    const thankYouMessage = <h3>Thank you for your submission!</h3>;
    const notSentMessage = <h3>Your submission was not successful. Please make sure you haven’t submitted your details earlier.</h3>
    const submitmsg = <h3></h3>;
    const submitSignUp = async event => {
        event.preventDefault();
        // if (event.target.enquire_request.value == "popup-request"){
        // console.log(event.target.enquire_request.value)
        // console.log(event.target.pp_first_name.value);
        // console.log(event.target.pp_last_name.value);
        // console.log(phoneValue);
        // console.log(event.target.pp_email.value);
        // console.log(phoneValue.substring(3));
        // }
        // else{
        // console.log(event.target.firstname.value);
        // console.log(event.target.lastname.value);
        // console.log(phone);
        // console.log(event.target.email.value);
        // console.log(phone.substring(3));
        // }

        //const response = await axios.post('https://api.fitnessclubapp.com/api/account/login?Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1';
        // axios.post('https://reqres.in/invalid-url')
        //       .then(
        //         response => {
        //           console.log(response)
        //         })
        //       .catch(error => {
        //           this.setState({ errorMessage: error.message });
        //           console.error('There was an error!', error);
        //       });


        const getTokenAPI = async () => {
            try {
                const res = await fetch(
                    'https://api.fitnessclubapp.com/api/account/login?Username=fzapp@fitnesszone.ME&Password=Fc@_Dubai@22.1',
                    {
                        method: 'POST'
                    }
                );

                const tokenData = await res.json();

                const submitContactForm = async () => {
                    try {
                        if (event.target.enquire_request.value == "popup-request") {
                            var registraitonRawData = JSON.stringify({
                                "GuestRegisterId": 0,
                                "FirstName": event.target.pp_first_name.value,
                                "LastName": event.target.pp_last_name.value,
                                "Mobile": event.target.pp_phone.value,
                                "Email": event.target.pp_email.value,
                                "Source": {
                                    "VisitSourceId": 9
                                },
                                "LocationCode": 1
                            });

                            // console.log(registraitonRawData);
                        }
                        else {
                            var registraitonRawData = JSON.stringify({
                                "GuestRegisterId": 0,
                                "FirstName": event.target.firstname.value,
                                "LastName": event.target.lastname.value,
                                "Mobile": event.target.pp_phone.value,
                                "Email": event.target.email.value,
                                "Source": {
                                    "VisitSourceId": 9
                                },
                                "LocationCode": 1
                            });

                            // console.log(registraitonRawData);
                        }

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
                        // console.log(data);

                        if (data.isValid == true) {
                            setIsSent(true)
                            event.target.pp_first_name.value = '';
                            event.target.pp_last_name.value = '';
                            event.target.pp_phone.value= '';
                            event.target.pp_email.value = '';
                        }
                        else{
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
    return (
        <div className="">

            <div className="popup-overlay">
                <div className="lg:flex backdrop-blur-xl rounded-lg shadow-xl justify-center items-center popup-bg popup-measures">
                    <form onSubmit={submitSignUp} className="flex">
                        <input type="hidden" name="enquire_request" value="popup-request" />
                        <div className="lg:flex lg:w-full">
                            <div className="lg:flex lg:flex-col justify-center lg:w-3/4 px-8 pt-6 lg:pt-0 md:pt-0">
                                <p href="/" className="font-bold text-2xl  futura-bold text-[#009FE3] ">SIGN UP FOR OUR PRE-OPENING OFFER IN CITY WALK DUBAI!</p>
                                <input placeholder="FIRST NAME"
                                    className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                    name="pp_first_name"
                                    id="pp_first_name"
                                    required
                                />
                                <input placeholder="LAST NAME"
                                    className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                    name="pp_last_name"
                                    id="pp_last_name"
                                    required
                                />
                                {/* <input placeholder="PHONE NUMBER" className="pl-2 appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-5 h-12" /> */}
                                <input placeholder="PHONE NUMBER"
                                    className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                    name="pp_phone"
                                    id="pp_phone"
                                    required
                                />
                                <input placeholder="EMAIL"
                                    className="pl-2 w-full appearance-none block bg-transparent text-white border border-[#009FE3] rounded leading-tight focus:outline-none focus:bg-[#0e0e0e] focus:border-[#009FE3] popup-input py-2 mb-3 h-12"
                                    name="pp_email"
                                    id="pp_email"
                                />
                                <button type="submit" className="bg-[#009FE3] text-white flex justify-center p-2 items-center w-24 rounded mr-4 futura-bold mb-2">SIGN UP</button>
                                {isSent ? thankYouMessage : submitmsg}
                                {/* {isNotSent ? notSentMessage : submitmsg } */}
                            </div>
                            <div className="width-phone">
                                <img src="/pop-upImgg.jpeg" className="image-popup none-event" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
