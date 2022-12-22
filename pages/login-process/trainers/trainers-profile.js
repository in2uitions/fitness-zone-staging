import { useMemo,useCallback, useState } from "react";
import User  from "./user";
import Userval  from "./userdesc";
import parse from "html-react-parser";
import { image_url } from "../../../global_vars";
import { useRouter } from 'next/router';

export default function Trainer({ post: { fullName, securityGroupName, locationName }, users }) {
	const router = useRouter();
	// const route = (id) => router.push({ pathname: "/login-process/trainers-profile", query: { id } });
	console.log(users + "USR")
	
	return (
		<div className="flex flex-col justify-center items-center">
            
			{/* <p>{userId}<span>Api</span></p>
			{users && <User user={users}/>}
			<p className="space-x-2 futura-bold mt-2 cursor-pointer"><span>{firstName}</span>
			<span>{lastName}</span></p>
			{users && <Userval user={users}/>} */}
            <div className="col-span-4">
                            <div className='flex flex-col space-y-3 membership-box p-10 items-center'>
                                <>
                                    <img className="w-20 h-20 rounded-full" src='/noImg.webp' />
                                    <p className='futura-bold flex space-x-2 cursor-pointer text-white'>{fullName}</p>
                                    <p className='futura-book cursor-pointer text-white'>{securityGroupName}</p>
                                    {/* {data.packageList?.map((item, id) =>(
                                        <p key={id}>{item.category?.categoryName}</p>
                                        ))} */}
                                    <div className="flex space-x-3 items-center rounded-md p-2 active-button">
                                        <img className="" src="/location-marker.png" />
                                        <p className="text-white">{locationName}</p>
                                    </div>
                                </>
                            </div>
                        </div>
		</div>
	);
}
