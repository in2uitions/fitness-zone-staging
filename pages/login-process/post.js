import { useMemo, useState } from "react";
// import { User } from "./User";
import parse from "html-react-parser";
import { image_url } from "../../global_vars";

export function Post({ post: { name, description,image, userId }, users }) {
	// const user = useMemo(() => users.find(({ id }) => id === userId), [
	// 	users,
	// 	userId,
	// ]);
	return (
		<div className="flex flex-col justify-center items-center">
            <>
            <img className="rounded-full h-20 w-20" src={`${image_url}${image}`}/>
			<h3>{name}</h3>
			<p>{parse(`${description}`)}</p>
			{/* <User user={user} /> */}
            </>
		</div>
	);
}
