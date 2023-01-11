
import { image_url } from "../../../global_vars";
import { useRouter } from 'next/router';

export default function User({ user: {image, userId} }) {
	const router = useRouter();
	const route = (id) => router.push({ pathname: "/login-process/trainers-profile", query: { id } });
	return (
		<div>
		<img className="rounded-full h-20 w-20 border-2 border-[#009FE3] object-cover cursor-pointer" onClick={() => route(userId)} src={`${image_url}${image}`}/>	
		</div>
	);
}
