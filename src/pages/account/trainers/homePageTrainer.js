import { useMemo,useCallback, useState } from "react";
import User  from "./user";
import Userval  from "./userdesc";
import { useRouter } from 'next/router';

export default function Post({ post: { firstName,lastName,  trainerUser,totalSessions, remainedSessions,userId}, users }) {
	const router = useRouter();
	const route = (id) => router.push({ pathname: "/account/trainers-profile", query: { id } });
	// console.log(trainerUser.userId)
	return (
		<div className="flex flex-col justify-center items-center">
            <>
			{/* <p>{userId}<span>Api</span></p> */}
			{users && <User user={users}/>}
			<p className="space-x-2 futura-bold mt-2 cursor-pointer text-white" onClick={() => route(userId)}><span>{firstName}</span>
			<span className="text-white">{lastName}</span></p>
			<p className="rounded-md flex space-x-2 cursor-pointer text-white p-3 active-button btnActive">
                                    <span className="text-white text-base futura-book">Sessions:</span>
                                    <span className="text-white futura-bold exipryDate">{remainedSessions}/{totalSessions}</span>
                                </p>
			{/* <p>{locationName}</p> */}
			
            </>
		</div>
	);
}
