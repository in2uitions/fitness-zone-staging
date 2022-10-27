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
    const mapLocations = [
        {
            name: "Fitness Zone BAABDA",
            country:"Lebanon",
            location: [33.85290929046017, 35.533113284230346]
        },
        {
            name: "Fitness Zone MANARA",
            country:"Lebanon",
            location: [33.9002473, 35.472562]
        },
        {
            name: "Fitness Zone DBAYEH",
            country:"Lebanon",
            location: [33.937694552709, 35.59059464931414]
        },
        {
            name: "Fitness Zone HAMRA",
            country:"Lebanon",
            location: [33.895780018596206, 35.47930674005219]
        },
        {
            name: "Fitness Zone ABC ACHRAFIEH",
            country:"Lebanon",
            location: [33.88908092357919, 35.51961005311003]
        },
        {
            name: "Fitness Zone Dubai",
            country:"UAE",
            location: [25.207770051628184, 55.263979545518836]
        }
    ];
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
                if (section.collection == "comp_contact") {
                    return <CompContact data={section.item} />;
                }
                if (section.collection == "comp_timeline") {
                    return <CompTimeline data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} />;
                }
                if (section.collection == "comp_map") {
                    return <> <div style={{  height: "700px" }}><CompMap mapLocations={mapLocations} key="" center={{ lat: 33.75290929046017, lng: 35.433113284230346 }} zoom={10} data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} /></div></>
                }
            })}
        </div>
    )
}
