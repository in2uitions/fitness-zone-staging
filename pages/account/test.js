import React from "react";

const STATUS = {
    start: 1
}
export default function App() {
    const [count, setCount] = React.useState(0);
    const [disabledCount, setButtonDisabled] = React.useState(false)
    const [buttonName, setButtonName] = React.useState("hello");
    const inc = (event) => {
        setCount(count + 1);
    };

    const dec = () => {
        setCount(count + 1);
        if (count >= 4) {
            setButtonDisabled(true)
            setButtonName(<button className="">Waiting</button>)
        }
        else if(count === 0){
            setButtonDisabled(false)
        }
    }


    return (
        <div className="timer flex flex-col justify-center items-center mt-40">
            <button disabled={disabledCount} onClick={dec} value={count}>{buttonName}</button>
        </div>
    );
}