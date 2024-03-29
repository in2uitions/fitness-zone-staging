/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import tooltipEffect from "../../common/tooltipEffect";
import { image_url } from "../../../global_vars";
import { useRouter } from "next/router";

const BranchClasses = ({ data = {} }) => {
    const router = useRouter();
    useEffect(() => {
        tooltipEffect();
    }, []);
    const getLocationCode = () => {
        const { pathname } = router;
        
        if (pathname.includes("/baabda/") || pathname.includes("/baabda-homepage/")) {
            return 2;
        } else if (pathname.includes("/manara/") || pathname.includes("/manara-homepage/")) {
            return 9;
        }else if (pathname.includes("/hamra/") || pathname.includes("/hamra-homepage/")) {
            return 1;
        }else if (pathname.includes("/dbayeh/") || pathname.includes("/dbayeh-homepage/")) {
            return 7;
        }else if (pathname.includes("/achrafieh/") || pathname.includes("/achrafieh-homepage/")) {
            return 6;
        }

        return 1;
    };

    const addButtonQueryParameter = (url, locationCode) => {
        return `${url}?locationCode=${locationCode}`;
    };
    return (
        <section className="works pb-70">
            <h2 style={{ display: 'none' }}> &nbsp; </h2>
            <div className="">
                <div className="mobileFlex" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "3rem" }}>
                    {data.branch_name ? <h1 className="globalTitle" style={{ fontWeight: "bold" }}>{data.branch_name}</h1> : null}
                    {data.title ? <h1 className="globalSubtitle" style={{ fontWeight: "200", fontFamily: "Montserrat Regular" }}>{data.title}</h1> : null}
                </div>
                <div className="row mobileRow">

                    {data.class_features.map((item, index) => (
                        <div key={item.id} style={{ paddingLeft: "5px", paddingRight: "5px" }} className={`col-lg-4 col-md-6 ${index % 2 !== 0 ? 'valign' : ''}`}>
                            <div className="item">
                                <Link href="#">
                                    <img src={`${image_url}${item.classes_content_id.image?.id}`} alt="" />
                                </Link>
                                <div className="image-text">
                                    {index % 3 === 0 && <div className="text text-overImage">{item.classes_content_id?.title[0]?.first}<br></br>{item.classes_content_id?.title[0]?.second}</div>}
                                    {index % 3 === 1 && <div className="text text-overImage">{item.classes_content_id?.title[0]?.first}<br></br>{item.classes_content_id?.title[0]?.second}</div>}
                                    {index % 3 === 2 && <div className="text text-overImage">{item.classes_content_id?.title[0]?.first}<br></br>{item.classes_content_id?.title[0]?.second}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {data.button_title ?   <a
                    href={addButtonQueryParameter(data.button_url, getLocationCode())}
                    style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", marginTop: "2rem" }}
                >
                    <button style={{ background: "#1990DF", cursor: "pointer", border: "0px solid transparent", borderRadius: "5px", color: "white", height: "3rem", padding: "5px 30px 5px 30px" }}>
                        {data.button_title}
                    </button>
                </a> : null}
            </div>
        </section>
    );
};

export default BranchClasses;
