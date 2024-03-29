import CompSide from '../src/components/compSide';
import Works1Slider from '../src/components/Works1-slider';
import VideoWithTestimonials from '../src/components/Video-with-testimonials';
import Services4 from '../src/components/Services4';
import ShowcasesOneCenter from '../src/components/Showcases-one-center';
import WorksStyle1 from '../src/components/Works-style1';
import BranchClasses from '../src/components/Branch-classes';
import BranchPersonalTrainers from '../src/components/Personal-trainers';
import Facilities from '../src/components/Facilities';
import BranchFacilities from '../src/components/Branch Facilities';
import Testimonials from '../src/components/Testimonials';
import ShowcasesFullScreen from '../src/components/Showcases-full-screen';
import Timeline from '../src/components/Showcases-full-screen-circle-slide';
import Clubs from '../src/components/Clubs';
import Membership from '../src/components/Membership';
import GxClasses from '../src/components/Gx-classes-listing';
import PersonalTraining from '../src/components/Personal-training';
import ContactUs from '../src/components/Contact';

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
                if (section.collection == "testimonials") {
                    return<Testimonials data={section.item} index={0} isFlipped={section.item?.image_position == "left"} />
                }
                if (section.collection == "cards") {
                    return<Services4 withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "services") {
                    return<ShowcasesOneCenter withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "classes_section") {
                    return<WorksStyle1 withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "branch_classes") {
                    return<BranchClasses withPadding data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "branch_personal_trainer") {
                    return<BranchPersonalTrainers withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "training_sessions") {
                    return<Facilities withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "branch_facilities") {
                    return<BranchFacilities withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "gx_classes") {
                    return<ShowcasesFullScreen withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "timeline") {
                    return<Timeline withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "clubs_sections") {
                    return<Clubs withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "membership_sections") {
                    return<Membership withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "personal_training") {
                    return<PersonalTraining withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "classes_listing") {
                    return<GxClasses withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
                if (section.collection == "comp_contact") {
                    return<ContactUs withPadding withOutTitle data={section.item} index={0} isFlipped={section.item?.image_position == "left" } />
                }
            })}
        </div>
    )
}
