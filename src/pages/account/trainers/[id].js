
import { useState, useEffect } from "react";
import { image_url } from "../../../../global_vars";
import Router, { useRouter } from "next/router";
import parse from "html-react-parser";
import PrivateMenu from "../private-menu";
import Cookies from 'js-cookie'
import nextConfig from "../../../../next.config";
import DarkTheme from "../../../layouts/Dark";

export default function TrainersProfile({ style = "white" }) {
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [currency, setCurrency] = useState();
    const router = useRouter()
    const { query } = useRouter()
    const memberId = Cookies.get("Member");
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet = (Cookies.get("OTP") != null)
    useEffect(() => {
        if (itemSet && tokenSet) {
            // router.push({ pathname: `/account/trainers/${query.id}` });
        }
        else {
            router.push({ pathname: "/account/login" });
        }
    }, [])
    // console.log(query)

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
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Billing/SubscriberUser/${query.id}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const res = await fetch(
                        `https://cms.fitnesszone.me/items/trainers?filter[userId][_eq]=${query.id}`
                    )
                    const fetchedData = await response.json();
                    const data = fetchedData.packageList?.map(item => item.packageName)
                    // if(activeData == true){
                    console.log(data)
                    // }
                    const trainer = await res.json();
                    let dataRes = fetchedData;
                    if (trainer.data.length == 1) {
                        const image = trainer.data[0].image;
                        const qualifications = trainer.data[0].qualifications;
                        dataRes = { ...dataRes, image, qualifications };
                    }
                    setData(dataRes);
                }
            }
            getData();
        }, [query]);
    } catch (err) {
        console.log(err);
    }
    const format = (num, decimals) => num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // const route = (categoryName, numberOfSessions, totalValue) => router.push({ pathname: "/account/trainer-details", query: {name, categoryName, numberOfSessions, totalValue}});
    useEffect(() => {
        if (nextConfig.country_code == 'AE') {
            setCurrency('AED')
        }
        else if (nextConfig.country_code == 'LB') {
            setCurrency('$')
        }
    }, [nextConfig.country_code])
    return (
        <>
            <PrivateMenu />
            <DarkTheme>
            <section style={{marginBottom:"2rem"}}>
                <div className="container mx-auto flex flex-col justify-start mt-40 lg:px-28 md:px-20 px-3">
                    <div className="flex justify-between">
                        {/* <select name="category">
                        {categoryData.map((item) =>(
                            <option value={item.categoryId}>{item.category?.categoryName}</option>
                        ))}
                    </select> */}
                    </div>
                    <div className="lg:grid lg:grid-cols-12 gap-x-10 gap-y-3 items-start mt-10  lg:space-y-0 md:space-y-0">
                        {/* {data.map((item) => ( */}
                        <div className="col-span-4">
                            <div className='flex flex-col space-y-3 membership-box p-10 items-center' style={{padding:"2.5rem"}}>
                                <>
                                    <img className="w-20 h-20 rounded-full object-cover" style={{width:"5rem", height:"5rem", objectFit:"cover"}} src={`${image_url}${data?.image}`} />
                                    <p className='font-bold flex space-x-2 cursor-pointer text-white'>{data.fullName}</p>
                                    <p className='font-book cursor-pointer text-white'>{data.securityGroupName}</p>
                                    {/* {data.packageList?.map((item, id) =>(
                                        <p key={id}>{item.category.categoryName}</p>
                                        ))} */}
                                    <p className="text-white">{data.packageList?.slice(0, 1).map(el => el.category?.categoryName)}</p>
                                    <div className="flex space-x-3 items-center rounded-md p-2 active-button">
                                        <img className="" src="/homepage/location-marker.png" />
                                        <p className="text-white">{data.locationName}</p>
                                    </div>
                                </>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <p className="text-[#008DDC] font-bold mb-4 qual" style={{color:"#008DDC", fontSize:"18px"}}>Qualifications</p>
                            {data.qualifications ? <p className="text-white">{parse(`${data?.qualifications}`)}</p> : null}
                        </div>
                        <div className="col-span-4 qual">
                            <div className="space-y-5">
                                {data.packageList?.map((item) => (
                                    <>
                                        {item.isActive && !item.packageName.includes('Staff') ? <div className="membership-box p-3 rounded-md">
                                            <div className="flex items-center w-full">
                                                <div className="flex flex-col w-3/4">
                                                    <p className="font-bold text-white">{item.packageName.slice(0, item.packageName.length - 1)}</p>
                                                    {/* <p>{item.isActive ? "true" : "false"}</p>
                                                    <p>{item.packageName.includes('Staff') ? "treu" : "fsal"}</p> */}
                                                    {/* <p className="text-white">The classes are in 3 speciality Studios, Energy Studio</p> */}
                                                </div>

                                                <div className="flex justify-end items-end">
                                                    <div className="flex flex-col justify-center items-center cursor-pointer">
                                                        <p>
                                                            <span className="text-2xl text-[#008DDC] futura-book">
                                                                {currency}</span>
                                                            <span className='text-4xl futura-book text-[#008DDC]'>
                                                                {item.totalValue.toLocaleString()}
                                                            </span>
                                                        </p>
                                                        <p className='text-[#008DDC] -mt-4 tracking text-xs'><span>{item.numberOfSessions}</span> {item.numberOfSessions == 1 ? "session" : "sessions"}</p>
                                                    </div>


                                                </div>
                                                {/* <div className="flex justify-end items-end ">
                                                    <div className="flex flex-col cursor-pointer">
                                                            <p className="text-base text-[#008DDC] futura-book">
                                                                Contact for </p>
                                                            <p className='text-base futura-book text-[#008DDC]'>
                                                                package price
                                                            </p>
                                                        <p className='text-[#008DDC] -mt-4 tracking text-xs'><span>{item.numberOfSessions}</span> {item.numberOfSessions == 1 ? "session" : "sessions"}</p>
                                                    </div>

                                                </div> */}
                                            </div>

                                        </div> : null}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 gap-y-5 mt-5 space-y-5 lg:space-y-0 md:space-y-0">
                        {data.packageList?.slice(4, data.packageList?.length).map((item) => (
                            <div className="col-span-4">
                                {item.isActive && !item.packageName.includes('Staff') ? <div className="membership-box p-3 rounded-md">
                                    <div className="flex items-center w-full">
                                        <div className="flex flex-col w-1/2">
                                            <p className="font-bold text-white">{item.packageName}</p>
                                            <p>{item.isActive ? "true" : "false"}</p>
                                            <p>{item.packageName.includes('Staff') ? "treu" : "fsal"}</p>
                                        </div>
                                        <div className="flex w-1/2 justify-end">
                                            <div className="flex flex-col cursor-pointer">
                                                <p><span className="text-2xl text-[#008DDC] futura-book">$</span><span className='text-4xl futura-book text-[#008DDC]'>
                                                    {format(item.totalValue)}
                                                </span>
                                                </p>
                                                <p className='text-[#008DDC] -mt-4 tracking text-xs'> session</p>
                                            </div>
                                        </div>
                                    </div>

                                </div> : null}

                            </div>
                        ))}

                    </div> */}
                </div>
            </section>
            </DarkTheme>
        </>
    );
}
export async function getServerSideProps(context) {
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
    if (response.status == 401) {
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        };
    } else {
        const books = await response.json()
        return {
            props: { books }
        }
    };
}