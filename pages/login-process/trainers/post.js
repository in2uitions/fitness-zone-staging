import { useMemo,useCallback, useState } from "react";
import User  from "./user";
import Userval  from "./userdesc";
import { useRouter } from 'next/router';

export default function Post({ post: { firstName, lastName, userId, locationName }, users }) {
	const router = useRouter();
	const route = (id) => router.push({ pathname: "/login-process/trainers-profile", query: { id } });
	
	return (
		<div className="flex flex-col justify-center items-center">
            <>
			{users && <User user={users}/>}
			<p className="space-x-2 futura-bold mt-2 cursor-pointer text-white" onClick={() => route(userId)}><span>{firstName}</span>
			<span className="text-white">{lastName}</span></p>
			<p className="text-white" onClick={() => route(userId)}>{locationName}</p>
			{users && <Userval user={users}/>}
			
            </>
		</div>
	);
}
