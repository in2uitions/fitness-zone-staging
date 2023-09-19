import CompSide from '../src/components/compSide';
import Works1Slider from '../src/components/Works1-slider';
import VideoWithTestimonials from '../src/components/Video-with-testimonials';
import Services4 from '../src/components/Services4';
import ShowcasesOneCenter from '../src/components/Showcases-one-center';

export default function Sections({ data = {} }) {
    return (
        <div>
            {data.sections?.map((section) => {

                if (section.collection == "comp_side_contents") {
                    return <CompSide data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} />;
                }
                if (section.collection == "comp_carousel") {
                    return<Works1Slider data={section.item} index={0} isFlipped={section.item?.image_position == "left"} />
                }
                if (section.collection == "comp_fullwidthimage") {
                    return<VideoWithTestimonials data={section.item} index={0} isFlipped={section.item?.image_position == "left"} />
                }
                if (section.collection == "cards") {
                    return<Services4 withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "services") {
                    return<ShowcasesOneCenter withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
            })}
        </div>
    )
}
