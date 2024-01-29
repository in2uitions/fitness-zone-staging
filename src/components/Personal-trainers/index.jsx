import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { image_url } from "../../../global_vars.js";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import parse from "html-react-parser";
import Popup from "reactjs-popup";
import { BrowserView, MobileView } from "react-device-detect";

const BranchPersonalTrainers = ({ data = {} }) => {
    const sliderRef = useRef(null);
    const [trainersData, setTrainersData] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [location, setLocation] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trainerDataPromises = data.trainer.map(async (trainer) => {
                    const response = await axios.get(
                        `https://fzcms.diastora.com/items/trainers`,
                        {
                            params: {
                                filter: { name: trainer.trainer_id.name },
                            },
                        }
                    );
                    return response.data;
                });

                const trainersData = await Promise.all(trainerDataPromises);
                console.log("All trainers data:", trainersData);
                setTrainersData(trainersData);
            } catch (error) {
                console.error("Error fetching data from Directus:", error);
            }
        };

        fetchData();
    }, [data.trainer]);



    const closePopup = () => {
        setSelectedTrainer(null);
    };
    const handleImageClick = (trainer) => {
        try {
            const selectedTrainerData = trainersData.find((data) =>
                data.data.some((innerData) => innerData.name === trainer.trainer_id.name)
            );
            setSelectedTrainer(selectedTrainerData);
            if (!selectedTrainerData) {
                console.error("Trainer data not found for:", trainer);
                return;
            }


            const userId = selectedTrainerData.data[0].userId;
            if (!userId) {
                console.error("User ID not found in trainer data:", selectedTrainerData);
                return;
            }

            console.log("Clicked trainer. UserId:", userId);

            // Now you can use the userId to fetch additional data
            fetchDataForUserId(userId);
        } catch (error) {
            console.error("Error handling image click:", error);
        }
    };


    const fetchDataForUserId = async (userId) => {
        try {
            const res = await fetch(`https://api.fitnessclubapp.com/api/Account/Login?Username=fzapp@fitnesszone.com.lb&Password=Fz$_@pP.%234`, {
                method: 'POST'
            });
            const token = await res.json();
            var registrationLoginHeaders = new Headers();
            registrationLoginHeaders.append(
                'Authorization',
                'Bearer ' + token.token
            );
            registrationLoginHeaders.append(
                'Content-Type',
                'application/json'
            );
            var registrationRequestOptions = {
                method: 'GET',
                headers: registrationLoginHeaders
            };

            const response = await fetch(`https://api.fitnessclubapp.com/api/Billing/SubscriberUser/${userId}`, registrationRequestOptions);

            if (response.status === 200) {
                const res = await fetch(`https://fzcms.diastora.com/items/trainers?filter[userId][_eq]=${userId}`);
                const fetchedData = await response.json();
                const dataress = fetchedData.packageList?.map(item => item.packageName);

                const trainer = await res.json();
                let dataRes = fetchedData;

                if (trainer.data.length === 1) {
                    const image = trainer.data[0].image;
                    const qualifications = trainer.data[0].qualifications;
                    dataRes = { ...dataRes, image, qualifications };
                }

                // Use the retrieved data as needed
                console.log(dataress);
                setLocation(dataRes);
                setLoading(false)
            }
        } catch (error) {
            console.error("Error fetching additional data:", error);
        }
    };
    return (
        <section className={`testimonials position-re`}>
            <div className="container">
                <div
                className="mobileFlex"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                        marginBottom: "3rem",
                    }}
                >
                    {data.branch_name ? (
                        <h1 className="globalTitle" style={{ fontWeight: "bold" }}>{data.branch_name}</h1>
                    ) : null}
                    {data.title ? (
                        <h1 className="globalSubtitle" style={{ fontWeight: "200", fontFamily: "Montserrat Regular" }}>{data.title}</h1>
                    ) : null}
                </div>
                <div
                    className="row justify-content-center wow fadeInUp"
                    data-wow-delay=".5s"
                >
                    <div className="col-lg-10">
                        <BrowserView>
                        <Slider
                            className="slic-item"
                            ref={sliderRef}
                            {...{
                                dots: true,
                                infinite: true,
                                arrows: true,
                                autoplay: false,
                                rows: 1,
                                slidesToScroll: 1,
                                slidesToShow: 4,
                            }}
                        >
                            {data.trainer.map((item, index) => (
                                <div
                                    key={index}
                                    className="item"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleImageClick(item)}
                                >
                                 <Popup trigger={
                                            <div className="flex items-center space-x-2">
                                                <img
                                            className="pt-images"
                                            src={`${image_url}${item.trainer_id.image?.id}`}
                                            alt={`${data.image?.title}`}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleImageClick(item)}
                                        /> 
                                                {/* <p className="font-bold text-white montserrat-book cursor-pointer">Menu</p> */}
                                            </div>
                                        } modal nested
                                        closeOnDocumentClick
                                        className="popupModule"
                                        position="">
                                             {(close) => (
                          <>
                            <div className="" onClick={close}>
                            <img src="/closeButton.svg"
                            style={{ width: "40px", height: "40px", position:"absolute", right:"1rem", top:"1rem" }}/>
                            </div>
                                 {selectedTrainer && (
                <>
                    <div
                        className="popup"
                        style={{
                            // position: "absolute",
                            // display: "flex",
                            // flexDirection: "column",
                            // justifyContent: "center",
                            // margin: "0px 8rem",
                            background: "#151921",
                            // inset: "0",
                            padding: "40px"
                        }}
                    >
                        {/* <div
                            className="popup-content"
                            style={{
                                display: "flex",
                                flexDirection:"column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        > */}
                        <div className="mobileFlex textAlign" style={{
                            display: "flex",
                            flexDirection:"column",
                            alignItems: "center",
                            gap: "25px",
                            // position:"absolute"
                        }}>
                            <div style={{display:"flex",
                            alignItems:"center",
                        gap:"25px"}}>
                            <img
                                className="pt-images"
                                src={`${image_url}${selectedTrainer.data[0].image}`}
                                style={{ width: "20rem", height: "20rem", objectFit: "cover" }}
                            />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
                                    <h2 className="selectedTrainerName" style={{ textTransform: "uppercase" }}>{selectedTrainer.data[0].name}</h2>
                                    {location.packageList?.slice(0, 1).map((el, index) => (
    <p key={index} style={{ color: "#E3B800", fontFamily: "Montserrat Italic" }}>
        {el.category?.categoryName && `/ ${el.category.categoryName}`}
    </p>
))}

                                </div>
                                {selectedTrainer.data[0].qualifications ? <p>{parse(`${selectedTrainer.data[0].qualifications}`)}</p> : null}
                            </div>
</div>

                              <div className="flexWrap" style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", marginBottom: "2rem", width: "100%" }}>
                            {location.packageList?.map((item) => (
                                <>
                                    {item.isActive && !item.packageName.includes('Staff') ? <div style={{ background: "#000000" }} className="membership-box p-3 rounded-md">
                                        <div className="flex items-center w-full">
                                            <div className="flex justify-end items-end ">
                                                <div className="flex flex-col cursor-pointer">
                                                    <p style={{ color: "#1990DF", fontStyle: "italic", fontFamily: "Montserrat ExtraBold" }} className="text-base text-[#1990DF] montserrat-book">
                                                        ${item.sessionPrice} </p>
                                                </div>

                                            </div>
                                            <div className="flex flex-col w-3/4">
                                                <p style={{ fontFamily: "'Montserrat Regular'" }}>{item.packageName.slice(0, item.packageName.length - 1)}</p>

                                            </div>


                                        </div>

                                    </div> : null}
                                </>
                            ))}
                        </div>
                        </div>
                      
                    </div>


                   

                </>
            )
            
                            }
                            </>
                            )}
                                 </Popup>
                                       

                                    <div style={{ marginTop: "15px" }}>
                                        <div className="cont" style={{ fontWeight: "bold", fontFamily: 'Montserrat ExtraBold' }}>
                                            {item.trainer_id.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        </BrowserView>
                        <MobileView>
                        <Slider
                            className="slic-item"
                            ref={sliderRef}
                            {...{
                                dots: true,
                                infinite: true,
                                arrows: true,
                                autoplay: false,
                                rows: 1,
                                slidesToScroll: 1,
                                slidesToShow: 1,
                            }}
                        >
                            {data.trainer.map((item, index) => (
                                <div
                                    key={index}
                                    className="item"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleImageClick(item)}
                                >
                                 
                                 <Popup trigger={
                                            <div className="flex items-center space-x-2">
                                                <img
                                            className="pt-images"
                                            src={`${image_url}${item.trainer_id.image?.id}`}
                                            alt={`${data.image?.title}`}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleImageClick(item)}
                                        /> 
                                                {/* <p className="font-bold text-white montserrat-book cursor-pointer">Menu</p> */}
                                            </div>
                                        } modal nested
                                        closeOnDocumentClick
                                        className="popupModule"
                                        position="">
                                              {(close) => (
                          <>
                            <div className="" onClick={close}>
                            <img src="/closeButton.svg"
                            style={{ width: "40px", height: "40px", position:"absolute", right:"1rem", top:"1rem" }}/>
                            </div>
                                 {selectedTrainer && (
                <>
                    <div
                        className="popup"
                        style={{
                            // position: "absolute",
                            // display: "flex",
                            // flexDirection: "column",
                            // justifyContent: "center",
                            // margin: "0px 8rem",
                            background: "#151921",
                            // inset: "0",
                            padding: "40px"
                        }}
                    >
                        {/* <div
                            className="popup-content"
                            style={{
                                display: "flex",
                                flexDirection:"column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        > */}
                        <div className="mobileFlex textAlign" style={{
                            display: "flex",
                            flexDirection:"column",
                            alignItems: "center",
                            gap: "25px",
                            // position:"absolute"
                        }}>
                            <div className="mobileFlex textAlign" style={{display:"flex",
                            alignItems:"center",
                        gap:"25px"}}>
                            <img
                                className="pt-images"
                                src={`${image_url}${selectedTrainer.data[0].image}`}
                                style={{ width: "20rem", height: "20rem", objectFit: "cover" }}
                            />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
                                    <h2 className="selectedTrainerName" style={{ textTransform: "uppercase" }}>{selectedTrainer.data[0].name}</h2>
                                    {location.packageList?.slice(0, 1).map((el, index) => (
    <p key={index} style={{ color: "#E3B800", fontFamily: "Montserrat Italic" }}>
        {el.category?.categoryName && `/ ${el.category.categoryName}`}
    </p>
))}

                                </div>
                                {selectedTrainer.data[0].qualifications ? <p>{parse(`${selectedTrainer.data[0].qualifications}`)}</p> : null}
                            </div>
</div>

                              <div className="flexWrap" style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", marginBottom: "2rem", width: "100%" }}>
                            {location.packageList?.map((item) => (
                                <>
                                    {item.isActive && !item.packageName.includes('Staff') ? <div style={{ background: "#000000" }} className="membership-box p-3 rounded-md">
                                        <div className="flex items-center w-full">
                                            <div className="flex justify-end items-end ">
                                                <div className="flex flex-col cursor-pointer">
                                                    <p style={{ color: "#1990DF", fontStyle: "italic", fontFamily: "Montserrat ExtraBold" }} className="text-base text-[#1990DF] montserrat-book">
                                                        ${item.sessionPrice} </p>
                                                </div>

                                            </div>
                                            <div className="flex flex-col w-3/4">
                                                <p style={{ fontFamily: "'Montserrat Regular'" }}>{item.packageName.slice(0, item.packageName.length - 1)}</p>

                                            </div>


                                        </div>

                                    </div> : null}
                                </>
                            ))}
                        </div>
                        </div>
                      
                    </div>


                    {/* </div> */}
                   

                </>
            )
            
                            }
                            </>
                                              )}
                                 </Popup>

                                    <div style={{ marginTop: "15px" }}>
                                        <div className="cont" style={{ fontWeight: "bold", fontFamily: 'Montserrat ExtraBold' }}>
                                            {item.trainer_id.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        </MobileView>
                    </div>
                </div>
                 <div className="arrows">
                <div style={{cursor:"pointer"}} onClick={() => sliderRef.current.slickNext()} className="next cursor-pointer">
                    <span className="pe-7s-angle-right"></span>
                </div>
                <div style={{cursor:"pointer"}} onClick={() => sliderRef.current.slickPrev()} className="prev cursor-pointer">
                    <span className="pe-7s-angle-left"></span>
                </div>
            </div>
            </div>
            {/* {loading ? 
            (
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
               <p>Loading...</p>
               </div>
            ) : 
            ( */}

        
        </section>
    );
};

export default BranchPersonalTrainers;