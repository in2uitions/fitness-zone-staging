import HeadTag from '../assets/headTag'
// import Sections from '@assets/sections'
import Sections from '../assets/section'
import Header from './components/page-headers'
import { getPopup, handleApi } from '../api/server'
import Popup from 'reactjs-popup'
import FooterPopup from './components/footerPopup'
import { useState, useEffect } from 'react'
import nextConfig from '../next.config'

function Home({ data = {} }) {
  const [showPopup, setShowPopup] = useState(false)
  const [lebPopup, setLebPopup] = useState([]);
  const [showlebpopup, setShowLebPopup] = useState(false)
  const [isSent, setIsSent] = useState(false);
  const [isNotSent, setIsNotSent] = useState(false)
  const thankYouMessage = <h3>Thank you for your submission!</h3>;
  const notSentMessage = <h3>Your submission was not successful. Please make sure you haven’t submitted your details earlier.</h3>
  const submitmsg = <h3></h3>;
  useEffect(() => {
    if (nextConfig.country_code == 'AE') {
      setShowPopup(true)
      setShowLebPopup(false)
    }
    else {
      setShowPopup(false)
      setShowLebPopup(true)
    }
  //   let pop_status = localStorage.getItem('pop_status');
  //   let popdbx_status = localStorage.getItem('popdbx_status')
  //   if (nextConfig.country_code == 'LB') {
  //   if (!pop_status) {
  //     setShowLebPopup(true)
  //     localStorage.setItem('pop_status', 1);
  //   }
  //   else {
  //     setShowLebPopup(false)
  //   }
  // }
  //   if (nextConfig.country_code == 'AE') {
  //     if (!popdbx_status) {
  //       setShowPopup(true);
  //       localStorage.setItem('popdbx_status', 1);
  //     }
  //     else {
  //       setShowPopup(false)
  //     }
  //   }
  }, [nextConfig.country_code])
  // setTimeout(function () { localStorage.removeItem('pop_status'); }, 5000);
  // setTimeout(function () { localStorage.removeItem('popdbx_status'); }, 5000);
  var getdata = async () => {
    const popup = await getPopup();
    setLebPopup(popup);

  }

  useEffect(() => {
    getdata();
  }, []);
  const submitSignUp = async event => {
    event.preventDefault();
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
            if (data.isValid == true) {
              setIsSent(true)
              event.target.pp_first_name.value = '';
              event.target.pp_last_name.value = '';
              event.target.pp_phone.value = '';
              event.target.pp_email.value = '';
            }
            else {
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
    <>
      <HeadTag data={data} />

      <main >
        {data.header ? <Header data={data.header} /> : null}
        <Sections data={data} />
        <Popup
          trigger={
            <button>
              <button style={{ display: "none" }} className="request">REQUEST A CALL</button>
            </button>
          } modal

          position="center"
          open={showPopup}
          closeOnDocumentClick={false}
        // onClose={() => setVisible(false)}
        >
          {close => (
            <>
              <button className="close" onClick={close}>
                &times;
              </button>
              <FooterPopup />
            </>
          )}
        </Popup>
        {lebPopup.map((item, index) => (
          <>
            {item.show_popup ? <Popup
              trigger={
                <button>
                  <button style={{ display: "none" }} className="request">REQUEST A CALL</button>
                </button>
              } modal

              position="center"
              open={showlebpopup}
              closeOnDocumentClick={false}
            // onClose={() => setVisible(false)}
            >
              {close => (
                <>
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="lg:flex backdrop-blur-xl rounded-lg shadow-xl justify-center items-center popup-bg">
                    <form onSubmit={submitSignUp} className="flex">
                      <input type="hidden" name="enquire_request" value="popup-request" />
                      <div className="lg:flex lg:w-full">
                        <div className="lg:flex lg:flex-col justify-center lg:w-3/4 px-8 pt-6 lg:pt-0 md:pt-0">
                          <p href="/" className="font-bold text-2xl  futura-bold text-[#009FE3] mb-5">{item.title}</p>
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
                          <button type="submit" className="bg-[#009FE3] text-white flex justify-center p-2 items-center w-24 rounded mr-4 futura-bold mb-2 mt-5">{item.button_title}</button>
                          {isSent ? thankYouMessage : submitmsg}
                          {/* {isNotSent ? notSentMessage : submitmsg } */}
                        </div>
                        <div className="width-phone">
                          <img src="/pop-upImgg.jpeg" className="image-popup none-event" />
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </Popup> : null}
          </>
        ))}
      </main>
    </>
  )
}

export async function getStaticProps() {
  let res = await handleApi({ url: 'homepage' })
  const data = res[0];
  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}

export default Home