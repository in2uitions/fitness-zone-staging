import Router, { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import PrivateMenu from "./private-menu";
import Cookies from 'js-cookie'

export default function TrainerDetails(info) {
    const { query } = useRouter()
    const router = useRouter()
    // console.log(query.name)
    const memberId = Cookies.get("Member");
    const format = (num, decimals) => num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + Cookies.get("token")
    );
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: "GET",
        headers: registrationHeaders,
    };

    return (
        <>
             <PrivateMenu/>
            <div className="lg:grid lg:grid-cols-12 gap-x-10 gap-y-10 container mx-auto lg:px-20 md:px-20 px-3 mt-40 w-screen h-screen">
                <div className="col-span-4">
                    <div className="membership-box p-3 flex flex-col justify-center items-center mt-8">
                        <p className="text-white text-2xl font-bold">{query.categoryName}</p>
                        <p className="rounded-md flex space-x-2 mt-2 cursor-pointer text-white p-3 active-button futura-book">{query.name}</p>
                        <div className="flex flex-col mt-4">
                            <p><span className="text-2xl text-[#008DDC] futura-book">$</span><span className='text-4xl futura-book text-[#008DDC]'>
                                {format(query.totalValue)}
                            </span>
                            </p>
                            <p className='text-[#008DDC] -mt-4 tracking text-xs '>{query.numberOfSessions} session</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <p className="text-[#008DDC] font-bold">Package Details</p>
                    <p className="text-white">The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                    </br>The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                        </br>The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                        </br>The classes are in 3 speciality Studios, Energy Studio, Balance Studio, and RPM Studio.<br>
                        </br>
                    </p>
                </div>
                <div className="col-span-4">
                    <button className="bg-[#008DDC] p-2 text-white font-bold mt-8 rounded-md">BOOK PACKAGE</button>
                </div>

            </div>
        </>
    )
}
export async function getServerSideProps({ params }) {
    const memberId = context.req.cookies["Member"];
    const token = context.req.cookies["token"];
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + token
    );
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: "GET",
        headers: registrationHeaders,
    };
    const response = await fetch(
        `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
        registrationRequestOptions
    );
    // const data = await response.json()
    if(response.status == 401){
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        };
        }else{
            const info = await response.json()
            return {
                props:{info}
            }
};
}