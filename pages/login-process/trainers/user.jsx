import parse from "html-react-parser";
import { image_url } from "../../../global_vars";

export function User({ user: {image} }) {
	return (
		<div>
		<img className="rounded-full h-20 w-20 border-2 border-[#009FE3]" src={`${image_url}${image}`}/>
			{/* <h4>{firstName}</h4> */}
			{/* <p>{parse(`${description}`)}</p> */}
			{/* <p>{userId}<span>trainer table</span></p> */}
		</div>
	);
}
export function Userval({ user: { description } }) {
	return (
		<div>
		{/* <img className="rounded-full h-20 w-20 border-2 border-[#009FE3]" src={`${image_url}${image}`}/> */}
			{/* <h4>{firstName}</h4> */}
			<p className="mt-3">{parse(`${description}`)}</p>
			{/* <p>{userId}<span>trainer table</span></p> */}
		</div>
	);
}