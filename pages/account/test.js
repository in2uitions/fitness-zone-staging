import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
const STATUS = {
    start: 1
}
export default function App() {
    const [inputVal, setInputVal] = React.useState("");

    function formatSSN(value) {
        if (!value) return value;
        const ssn = value.replace(/[^\d]/g, '');
        const ssnLength = ssn.length;

        if (ssnLength < 4) return ssn;

        if (ssnLength < 6) {
            return `${ssn.slice(0, 3)}-${ssn.slice(3)}`;
        }

        return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 8)}`;
    }

    function ssnFormatter() {
        const inputField = document.getElementById('ssn');
        const formattedInputValue = formatSSN(inputField.value);
        inputField.value = formattedInputValue;
    }
    return (
        <div className="w-screen h-screen mt-44">
            <div className="">
                <div className="">
                    <div className="">
                        <figure className="imghvr-push-up"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/example-image.jpg" alt="example-image" />
                            <figcaption>
                                <h3>Hello World</h3>
                                <p>Life is too important to be taken seriously!</p>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
}