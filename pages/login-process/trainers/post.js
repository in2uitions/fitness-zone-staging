import { useMemo,useCallback, useState } from "react";
import { User } from "./user";
import { Userval } from "./user";
import parse from "html-react-parser";
import { image_url } from "../../../global_vars";
import { useRouter } from 'next/router';

export function Post({ post: { firstName, lastName, userId }, users }) {
	const router = useRouter();
	const route = (id) => router.push({ pathname: "/login-process/trainers-profile", query: { id } });
	console.log(users + "USR")
	return (
		<div className="flex flex-col justify-center items-center">
            <>
			{/* <p>{userId}<span>Api</span></p> */}
			{users && <User user={users}/>}
			<p className="space-x-2 futura-bold mt-2 cursor-pointer" onClick={() => route(userId)}><span>{firstName}</span>
			<span>{lastName}</span></p>
			{users && <Userval user={users}/>}
			
            </>
		</div>
	);
}
