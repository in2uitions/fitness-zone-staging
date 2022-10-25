import { image_url } from '../../global_vars';
import { useState } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function CompAccordion({ data = {}, style = 'white' }) {
    const [selected, setSelected] = useState(null);
    return (
        <>
            
            <div className="container-imgs lg:py-12 md:py-12 py-12">

                <div className="gallery-wrap">
                    {data.accordion_items?.map((item, i) => (
                        <div className="item item-1 relative" style={{ backgroundImage: `url(${image_url}${item.comp_accordion_items_id?.image?.id})`}}
                            onMouseEnter={() => setSelected(i)}
                            onMouseLeave={() => setSelected(null)} key={i}>
                            {item.comp_accordion_items_id?.title ?<div className='absolute left-16 top-8'>
                                <p className="font-bold text-4xl futura-bold text-white">{item.comp_accordion_items_id?.title}</p>
                                <div className='line-blue w-32 mt-1'></div>
                            </div>:null}

                            <div className='' >
                            {selected === i && (
                                    <div className="absolute bottom-2 left-16 right-16">
                                        <div className="flex items-center space-x-2">
                                            <div>
                                                {item.comp_accordion_items_id?.subtitle ? <p className="font-bold text-4xl futura-bold text-white classesTexts">{item.comp_accordion_items_id?.subtitle}</p> : null}
                                            </div>
                                            <div>
                                                {item.comp_accordion_items_id?.icon ? <img src={`${image_url}${item.comp_accordion_items_id?.icon?.id}`} className="h-8 OnMobile" altv={item.comp_accordion_items_id?.title} /> : null}
                                            </div>
                                        </div>
                                        {item.comp_accordion_items_id?.brief ? <p className="text-[#D8D8D8] futura-book text-2xl mt-2"> {item.comp_accordion_items_id?.brief}  </p> : null}
                                        {item.comp_accordion_items_id?.button_title ? <a href={item.comp_accordion_items_id?.button_url} className="futura-bold">{item.comp_accordion_items_id?.button_title}<ChevronRightIcon /></a> : null}
                                    </div>
                                )}
                            </div>

                        </div>
                        ))}
                </div>
            </div>
        </>


    )
}