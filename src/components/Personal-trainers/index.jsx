import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { image_url } from "../../../global_vars.js";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import parse from "html-react-parser";

const BranchPersonalTrainers = ({ data = {} }) => {
    const [trainersData, setTrainersData] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);

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

    const handleImageClick = (trainer) => {
        console.log("Clicked trainer:", trainer);
        console.log("All trainers data:", trainersData);

        const selectedTrainerData = trainersData.find((data) =>
            data.data.some((innerData) => innerData.name === trainer.trainer_id.name)
        );

        console.log("Selected trainer data:", selectedTrainerData);

        setSelectedTrainer(selectedTrainerData);
    };

    const closePopup = () => {
        setSelectedTrainer(null);
    };

    return (
        <section className={`testimonials position-re`}>
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        marginBottom: "3rem",
                    }}
                >
                    {data.branch_name ? (
                        <h1 style={{ fontWeight: "bold" }}>{data.branch_name}</h1>
                    ) : null}
                    {data.title ? (
                        <h1 style={{ fontWeight: "200" }}>{data.title}</h1>
                    ) : null}
                </div>
                <div
                    className="row justify-content-center wow fadeInUp"
                    data-wow-delay=".5s"
                >
                    <div className="col-lg-10">
                        <Slider
                            className="slic-item"
                            {...{
                                dots: true,
                                infinite: true,
                                arrows: true,
                                autoplay: true,
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
                                    <img
                                        className="pt-images"
                                        src={`${image_url}${item.trainer_id.image?.id}`}
                                        alt={`${data.image?.title}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleImageClick(item)}
                                    />
                                    <div style={{ marginTop: "15px" }}>
                                        <div className="cont" style={{ fontWeight: "bold" }}>
                                            {item.trainer_id.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="arrows">
                    <div
                        onClick={() => this.slider.slickNext()}
                        className="next cursor-pointer"
                    >
                        <span className="pe-7s-angle-right"></span>
                    </div>
                    <div
                        onClick={() => this.slider.slickPrev()}
                        className="prev cursor-pointer"
                    >
                        <span className="pe-7s-angle-left"></span>
                    </div>
                </div>
            </div>

            {selectedTrainer && (
                <>
                    <div
                        className="popup"
                        style={{
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            margin: "0px 20rem",
                            background: "#151921",
                            inset: "0",
                            padding: "0px 8rem"
                        }}
                    >
                        <div
                            className="popup-content"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "25px",
                            }}
                        >
                            <img
                                className="pt-images"
                                src={`${image_url}${selectedTrainer.data[0].image}`}
                                style={{ width: "20rem", height: "25rem", objectFit: "cover" }}
                            />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <h2 style={{textTransform:"uppercase"}}>{selectedTrainer.data[0].name}</h2>
                                {selectedTrainer.data[0].qualifications ?<p>{parse(`${selectedTrainer.data[0].qualifications}`)}</p>:null}
                            </div>
                        </div>

                    </div>
                    <span className="close-btn" onClick={closePopup} style={{ position: "absolute", top: "1rem", right: "22rem" }}>
                        <img
                            src="/closeButton.svg"
                            style={{ width: "40px", height: "40px" }}
                        />
                    </span>
                </>
            )}
        </section>
    );
};

export default BranchPersonalTrainers;
