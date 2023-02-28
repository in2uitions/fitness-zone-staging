import React from "react";

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
            <button className="input-button">Send Data</button>
            <input onKeyDown={ssnFormatter} id="ssn" />
        </div>
    );
}