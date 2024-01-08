/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { image_url } from '../../../global_vars.js';
import "slick-carousel/slick/slick-theme.css";
import removeOverlay from "../../common/removeOverlay";
import parallaxie from "../../common/parallaxie";

const BranchPersonalTrainers = ({ data = {} }) => {

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    // class BranchPersonalTrainers extends React.Component {
    //     constructor(props) {
    //         super(props);

    //     }
    //     renderArrows = () => {
    //         return (
    //             <div className="arrows">
    //                 <div
    //                     onClick={() => this.slider.slickNext()}
    //                     className="next cursor-pointer"
    //                 >
    //                     <span className="pe-7s-angle-right"></span>
    //                 </div>
    //                 <div
    //                     onClick={() => this.slider.slickPrev()}
    //                     className="prev cursor-pointer"
    //                 >
    //                     <span className="pe-7s-angle-left"></span>
    //                 </div>
    //             </div>
    //         );
    //     };
    //     componentDidMount() {
    //         removeOverlay();
    //         parallaxie('.testimonials.bg-img.parallaxie');
    //     }
    //     render() {
    return (
        <section
            className={`testimonials`}
        >
            <div className="container position-re">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", marginBottom: "3rem" }}>
                    {data.branch_name ? <h1 style={{ fontWeight: "bold" }}>{data.branch_name}</h1> : null}
                    {data.title ? <h1 style={{ fontWeight: "200" }}>{data.title}</h1> : null}
                </div>
                <div
                    className="row justify-content-center wow fadeInUp"
                    data-wow-delay=".5s"
                >
                    <div className="col-lg-10">
                    
                        <Slider
                            className="slic-item"
                            {...{
                                // ref: (c) => (this.slider = c),
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
                            <div className="item">
                            <img className="pt-images" src={`${image_url}${item.trainer_id.image?.id}`} alt={`${data.image?.title}`} />
                                <div style={{marginTop:"15px"}}>
                                    <div className="cont" style={{fontWeight:"bold"}}>
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
        </section>
    );
}
// }

export default BranchPersonalTrainers;
