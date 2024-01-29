import parse from "html-react-parser";
export default function Userval({ user: { description } }) {
	return (
		<div>
			{description ?<p className="mt-3 text-white">{parse(`${description}`)}</p>:null}
		</div>
	);
}