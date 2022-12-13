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
import CompMap from '../pages/components/compMap';
import CompCarouselStatic from '../pages/components/compCarouselStatic';
import CompCarouselRightStatic from '../pages/components/compCarouselRightStatic';
import CompCarouselStaticRightMobile from '../pages/components/compStaticRightMobile';
import CompStaticMobile from '../pages/components/compStaticMobile';
import CompCareers from '../pages/components/compCareers';
// import Classes from '../pages/components/classes';

export default function Sections({ data = {} }) {
    const datas = [
        {
            name: "BAABDA",
            country:"Lebanon",
            location: [33.85290929046017, 35.533113284230346],
            long:"33.85290929046017",
            lat:"35.533113284230346",
            images:[{
                image:"/exercise.png"},
                {image:"/disassembled-barbell-medicine-ball-kettlebell-dumbbell-lying-floor-gym-sports-equipment-workout-with-free-weight-functional-training.jpg"},
                {image:"/exercise.png"}
            ],
        },
        {
            name: "MANARA",
            country:"Lebanon",
            location: [33.9002473, 35.472562],
            long:"33.9002473",
            lat:"35.472562",
            images:[{
                image:"/exercise.png"},
                {image:"/disassembled-barbell-medicine-ball-kettlebell-dumbbell-lying-floor-gym-sports-equipment-workout-with-free-weight-functional-training.jpg"},
                {image:"/exercise.png"}
            ],
        },
        {
            name: "DBAYEH",
            country:"Lebanon",
            location: [33.937694552709, 35.59059464931414],
            long:"33.937694552709",
            lat:"35.59059464931414",
            images:[{
                image:"/exercise.png"},
                {image:"/disassembled-barbell-medicine-ball-kettlebell-dumbbell-lying-floor-gym-sports-equipment-workout-with-free-weight-functional-training.jpg"},
                {image:"/exercise.png"}
            ],
        },
        {
            name: "HAMRA",
            country:"Lebanon",
            location: [33.895780018596206, 35.47930674005219],
            long:"33.895780018596206",
            lat:"35.47930674005219",
            images:[{
                image:"/exercise.png"},
                {image:"/disassembled-barbell-medicine-ball-kettlebell-dumbbell-lying-floor-gym-sports-equipment-workout-with-free-weight-functional-training.jpg"},
                {image:"/exercise.png"}
            ],
        },
        {
            name: "ABC ACHRAFIEH",
            country:"Lebanon",
            location: [33.88908092357919, 35.51961005311003],
            long:"33.88908092357919",
            lat:"35.51961005311003",
            images:[{
                image:"/exercise.png"},
                {image:"/disassembled-barbell-medicine-ball-kettlebell-dumbbell-lying-floor-gym-sports-equipment-workout-with-free-weight-functional-training.jpg"},
                {image:"/exercise.png"}
            ],
        },
        {
            name: "Dubai",
            country:"UAE",
            location: [25.207770051628184, 55.263979545518836],
            long:"25.207770051628184",
            lat:"55.263979545518836",
            images:[{
                image:"/exercise.png"},
                {image:"/disassembled-barbell-medicine-ball-kettlebell-dumbbell-lying-floor-gym-sports-equipment-workout-with-free-weight-functional-training.jpg"},
                {image:"/exercise.png"}
            ],
        }
    ];
    
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
                {/* if (section.collection == "classes") {
                    return <Classes data={section.item}  isFlipped={section.item?.image_position == "left"}/>;
                } */}
                if (section.collection == "comp_contact") {
                    return <CompContact data={section.item} />;
                }
                {/* if (section.collection == "comp_timeline") {
                    return <><BrowserView><CompTimeline data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} /></BrowserView>
                    <MobileView><CompTimelineMobile data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} /></MobileView></>
                } */}
                if (section.collection == "comp_map") {
                    return <> <CompMap data={section.item} key="" center={{ lat: 33.937694552709, lng: 35.59059464931414 }} zoom={13} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} /></>
                }
                if (section.collection == "comp_careers"){
                    return <CompCareers data={section.item} style={section.item?.background_color}/>
                }
            })}
        </div>
    )
}
