
import { image_url } from "../../../global_vars";

export default function User({ user: {image} }) {
	return (
		<div>
		<img className="rounded-full h-20 w-20 border-2 border-[#009FE3]" src={`${image_url}${image}`}/>	
		</div>
	);
}
