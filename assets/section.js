import CompSide from '../src/components/compSide';

export default function Sections({ data = {} }) {
    return (
        <div>
            {data.sections?.map((section) => {

                if (section.collection == "comp_side_contents") {
                    return <CompSide data={section.item} style={section.item?.background_color} isFlipped={section.item?.image_position == "left"} />;
                }
            })}
        </div>
    )
}
