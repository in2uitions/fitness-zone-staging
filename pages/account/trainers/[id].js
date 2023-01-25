import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-magic-slider-dots/dist/magic-dots.css";
import { useState, useEffect } from "react";
import { image_url } from "../../../global_vars";
import Router, { useRouter } from "next/router";
import parse from "html-react-parser";
import PrivateMenu from "../private-menu";

export default function TrainersProfile({ style = "white" }) {
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([])
    const router = useRouter()
    const { query } = useRouter()
    const memberId = localStorage.getItem("Member");
    const itemSet = (localStorage.getItem("token") !== null);
    useEffect(() => {
        if (itemSet) {
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
        "Bearer " + localStorage.getItem("token")
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
                        `https://fzcms.diastora.com/items/trainers?filter[userId][_eq]=${query.id}`
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
    const [books, setBooks] = useState(true)
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                if (response.status == 200) {
                    const fetchedData = await response.json();
                    setBooks(fetchedData);
                }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }

    // const route = (categoryName, numberOfSessions, totalValue) => router.push({ pathname: "/account/trainer-details", query: {name, categoryName, numberOfSessions, totalValue}});

    return (
        <>
            <PrivateMenu />
            <section>
                <div className="container mx-auto flex flex-col justify-start mt-40 lg:px-28 md:px-20 px-3">
                    <div className="flex justify-between">
                        <p className="text-[#009FE3] futura-bold">Trainers List</p>
                        {/* <select name="category">
                        {categoryData.map((item) =>(
                            <option value={item.categoryId}>{item.category?.categoryName}</option>
                        ))}
                    </select> */}
                    </div>
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 lg:gap-y-3 items-start mt-10 space-y-10 lg:space-y-0 md:space-y-0">
                        {/* {data.map((item) => ( */}
                        <div className="col-span-4">
                            <div className='flex flex-col space-y-3 membership-box p-10 items-center'>
                                <>
                                    <img className="w-20 h-20 rounded-full object-cover" src={`${image_url}${data?.image}`} />
                                    <p className='futura-bold flex space-x-2 cursor-pointer text-white'>{data.fullName}</p>
                                    <p className='futura-book cursor-pointer text-white'>{data.securityGroupName}</p>
                                    {/* {data.packageList?.map((item, id) =>(
                                        <p key={id}>{item.category.categoryName}</p>
                                        ))} */}
                                    <p className="text-white">{data.packageList?.slice(0, 1).map(el => el.category?.categoryName)}</p>
                                    <div className="flex space-x-3 items-center rounded-md p-2 active-button">
                                        <img className="" src="/location-marker.png" />
                                        <p className="text-white">{data.locationName}</p>
                                    </div>
                                </>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <p className="text-[#009fe3] futura-bold mb-4">Qualifications</p>
                            {data.qualifications ? <p className="text-white">{parse(`${data?.qualifications}`)}</p> : null}
                        </div>
                        <div className="col-span-4">
                            <div className="space-y-5">
                                {data.packageList?.map((item) => (
                                    <>
                                        {item.isActive && !item.packageName.includes('Staff') ? <div className="membership-box p-3 rounded-md">
                                            <div className="flex items-center w-full">
                                                <div className="flex flex-col w-3/4">
                                                    <p className="futura-bold text-white">{item.packageName.slice(0,item.packageName.length - 1)}</p>
                                                    {/* <p>{item.isActive ? "true" : "false"}</p>
                                                    <p>{item.packageName.includes('Staff') ? "treu" : "fsal"}</p> */}
                                                    {/* <p className="text-white">The classes are in 3 speciality Studios, Energy Studio</p> */}
                                                </div>

                                                <div className="flex justify-end items-end">
                                                    {/* <div className="flex flex-col cursor-pointer" onClick={() => route(item.category.categoryName, item.numberOfSessions, item.totalValue)}> */}
                                                    <div className="flex flex-col cursor-pointer">
                                                        <p><span className="text-2xl text-[#009FE3] futura-book">$</span><span className='text-4xl futura-book text-[#009FE3]'>
                                                            {item.totalValue}
                                                        </span>
                                                        </p>
                                                        <p className='text-[#009FE3] -mt-4 tracking text-xs'><span>{item.numberOfSessions}</span> {item.numberOfSessions  == 1 ? "session" : "sessions"}</p>
                                                        {/* <button className="flex justify-end items-center text-[#009fe3] futura-book">Buy
                                                    <ChevronRightIcon className="cursor-pointer" />
                                                    </button> */}
                                                        {/* <p style={{display:"none"}}>{item.numberOfSessions}</p>
                                                    <p style={{display:"none"}}>{item.totalValue}</p> */}
                                                    </div>

                                                </div>
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
                                            <p className="futura-bold text-white">{item.packageName}</p>
                                            <p>{item.isActive ? "true" : "false"}</p>
                                            <p>{item.packageName.includes('Staff') ? "treu" : "fsal"}</p>
                                        </div>
                                        <div className="flex w-1/2 justify-end">
                                            <div className="flex flex-col cursor-pointer">
                                                <p><span className="text-2xl text-[#009FE3] futura-book">$</span><span className='text-4xl futura-book text-[#009FE3]'>
                                                    {format(item.totalValue)}
                                                </span>
                                                </p>
                                                <p className='text-[#009FE3] -mt-4 tracking text-xs'> session</p>
                                            </div>
                                        </div>
                                    </div>

                                </div> : null}

                            </div>
                        ))}

                    </div> */}
                </div>
            </section>
        </>
    );
}