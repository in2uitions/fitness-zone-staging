
import { image_url } from "../../../../global_vars";
import { useRouter } from 'next/router';

export default function User({ user: {image, userId,trainerUser} }) {
	const router = useRouter();
	const route = (id) => router.push({ pathname: `/account/trainers/${id}` });
	// console.log(userId)
	return (
		<div>
		{image?<img className="rounded-full h-20 w-20 border-2 border-[#009FE3] object-cover cursor-pointer" onClick={() => route(userId)} src={`${image_url}${image}`}/>:null}	
		</div>
	);
}
