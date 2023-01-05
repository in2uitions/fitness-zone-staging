import Link from 'next/link'
import { BrowserView, MobileView } from 'react-device-detect';
import CompSide from '../pages/components/compSide'
import CompAccordion from '../pages/components/compAccordion';
import CompAccordionMobile from '../pages/components/compAccordionMobile';
import CompCarousel from '../pages/components/compCarousel';
import CompFullWidth from '../pages/components/compFullWidth';
import CompContact from '../pages/components/compContact';
import CompCarouselMobile from '../pages/components/compCarouselMobile';
import CompCarouselRight from '../pages/components/compCarouselRight';
import CompCarouselRightMobile from '../pages/components/compCarouselRightMobile';
// import CompTimeline from '../pages/components/compTimelineContent';
import CompTimelineMobile from '../pages/components/comTimelineMobile';
// import CompMap from '../pages/components/compMap';
import CompCarouselStatic from '../pages/components/compCarouselStatic';
import CompCarouselRightStatic from '../pages/components/compCarouselRightStatic';
import CompCarouselStaticRightMobile from '../pages/components/compStaticRightMobile';
import CompStaticMobile from '../pages/components/compStaticMobile';
import CompCareers from '../pages/components/compCareers';
// import Classes from '../pages/components/classes';
import CompDropdown from '../pages/components/compDropdown';
import CompCareersMobile from '../pages/components/compCareersMobile';

export default function Sections({ data = {} }) {
    return (
        <div>
            {data.sections?.map((section) => {

                if (section.collection == "comp_side_contents") {
                    return <CompSide data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} />;
                }
                if (section.collection == "comp_accordion") {
                    return <><BrowserView><CompAccordion data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} /></BrowserView>
                    <MobileView><CompAccordionMobile data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} /></MobileView></>
                }
                if (section.collection == "comp_static_right") {
                    return <><BrowserView><CompCarouselRightStatic data={section.item} index={0} isFlipped={section.item?.image_position == "left"} /></BrowserView>
                        <MobileView><CompCarouselStaticRightMobile data={section.item} index={0} isFlipped={section.item?.image_position == "left"} /></MobileView>
                    </>
                }
                if (section.collection == "comp_static") {
                    return <><BrowserView><CompCarouselStatic data={section.item} index={0} isFlipped={section.item?.image_position == "left"} /></BrowserView>
                        <MobileView><CompStaticMobile data={section.item} index={0} isFlipped={section.item?.image_position == "left"} /></MobileView>
                    </>
                }
                if (section.collection == "comp_carousel") {
                    return <><BrowserView><CompCarousel data={section.item} index={0} isFlipped={section.item?.image_position == "left"} /></BrowserView>
                        <MobileView><CompCarouselMobile data={section.item} index={0} isFlipped={section.item?.image_position == "left"} /></MobileView>
                    </>
                }
                if (section.collection == "comp_carousel_rightside") {
                    return <><BrowserView><CompCarouselRight data={section.item} /></BrowserView>
                        <MobileView><CompCarouselRightMobile data={section.item} /></MobileView>
                    </>
                }
                if (section.collection == "comp_fullwidthimage") {
                    return <CompFullWidth data={section.item} />;
                }
                if (section.collection == "comp_dropdown") {
                    return <CompDropdown data={section.item} />;
                }
                if (section.collection == "comp_contact") {
                    return <CompContact data={section.item} />;
                }
                {/* if (section.collection == "comp_map") {
                    return <> <CompMap data={section.item} key="" center={{ lat: 33.937694552709, lng: 35.59059464931414 }} zoom={13} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} /></>
                } */}
                if (section.collection == "comp_careers"){
                    return <>
                    <BrowserView><CompCareers data={section.item} style={section.item?.background_color}/></BrowserView>
                    <MobileView><CompCareersMobile data={section.item} style={section.item?.background_color}/></MobileView>
                    </>
                }
            })}
        </div>
    )
}
