import parse from "html-react-parser";
export default function Userval({ user: { description } }) {
	return (
		<div>
		{/* <img className="rounded-full h-20 w-20 border-2 border-[#009FE3]" src={`${image_url}${image}`}/> */}
			{/* <h4>{firstName}</h4> */}
			<p className="mt-3">{parse(`${description}`)}</p>
			{/* <p>{userId}<span>trainer table</span></p> */}
		</div>
	);
}