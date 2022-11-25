import parse from "html-react-parser";
import { image_url } from "../../global_vars";

export default function CompFullWidth({ data = {}, style = 'white' }) {

    return (
        <div className="mt-10">
            {data.title ? <div className="lg:mt-40 md:mt-40 lg:mb-40 md:mb-40 mt-20 mb-20 flex flex-col justify-center items-center text-center">
                <p className="futura-bold text-3xl w-3/4 text-white md:text-6xl lg:text-6xl mx-auto">{data.title}</p>
            </div> : null}
            <div className="relative">
                <div className=" w-screen about-image relative"  style={{ "backgroundImage": `url("${image_url}${data.image?.id}")` }}>
                    {/* <img src={`${image_url}${data.image?.id}`} className="relative w-screen about-image" alt={`${data.image?.title}`} /> */}
                </div>
                {data.image_description ? <div className="absolute bottom-16 left-20 text-center manifesto">
                    <p className="text-[#fff5ee] futura-book">
                        {parse(`${data.image_description}`)}
                    </p>

                </div> : null}
                {data.brief ? <div className="absolute bottom-16 right-28 text-center manifesto-txt">
                    <p className="text-[#fff5ee] futura-book">
                        {parse(`${data.brief}`)}
                    </p>

                </div> : null}
            </div>

        </div>
    );
}
