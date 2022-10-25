import Link from 'next/link'
import { BrowserView, MobileView } from 'react-device-detect';
import CompSide from '../pages/components/compSide'
import CompAccordion from '../pages/components/compAccordion';
import CompCarousel from '../pages/components/compCarousel';
import CompFullWidth from '../pages/components/compFullWidth';
import CompContact from '../pages/components/compContact';
import CompCarouselMobile from '../pages/components/compCarouselMobile';
import CompCarouselRight from '../pages/components/compCarouselRight';
import CompCarouselRightMobile from '../pages/components/compCarouselRightMobile';
import CompTimeline from '../pages/components/compTimelineContent';
import CompMap from '../pages/components/compMap';
export default function Sections({ data = {} }) {
    return (
        <div>
            {data.sections?.map((section) => {

                if (section.collection == "comp_side_contents") {
                    return <CompSide data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} />;
                }
                if (section.collection == "comp_accordion") {
                    return <CompAccordion data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} />;
                }
                if (section.collection == "comp_carousel") {
                    return <><BrowserView><CompCarousel data={section.item} index={0} isFlipped={section.item?.image_position == "left"} /></BrowserView>
                    {/* <MobileView><CompCarouselMobile data={section.item} index={0} isFlipped={section.item?.image_position == "left"} /></MobileView> */}
                    </>
                }
                if (section.collection == "comp_carousel_rightside") {
                    return <><BrowserView><CompCarouselRight data={section.item} /></BrowserView>
                    {/* <MobileView><CompCarouselRightMobile data={section.item} /></MobileView> */}
                    </>
                }
                if (section.collection == "comp_fullwidthimage") {
                    return <CompFullWidth data={section.item} />;
                }
                if (section.collection == "comp_contact") {
                    return <CompContact data={section.item} />;
                }
                if (section.collection == "comp_timeline") {
                    return <CompTimeline data={section.item}  style={section.item?.background_color} isFlipped={section.item?.image_position == "left"}/>;
                }
                if (section.collection == "comp_map") {
                    return <CompMap key="" h="550px" data={section.item}  style={section.item?.background_color} isFlipped={section.item?.image_position == "left"}/>;
                }
            })}
        </div>
    )
}


































