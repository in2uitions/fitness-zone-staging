import React from "react";
import ReactSlider from "react-slider";
const Slider = ({ onChange, currentIndex }) => {
    return (
    <div className=""  data-tip data-for="submit">
        <ReactSlider
            className=""
            markClassName="example-mark"
            onChange={onChange}
            trackClassName="example-track"
            defaultValue={2}
            value={currentIndex}
            min={0}
            max={4}
            marks
            renderMark={(props) => {
                if (props.key < currentIndex) {
                    props.className = "example-mark example-mark-completed";
                } else if (props.key === currentIndex) {
                    props.className = "example-mark example-mark-active";
                }
                return <span {...props} />;
            }}
            id="test"
            data-tip data-for="submit"
            orientation="horizontal"
        />
        </div>
    );
};

export default Slider;
