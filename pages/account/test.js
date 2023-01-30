import React from "react";

const STATUS = {
    start: 1
}
export default function App() {
    const [minutes, setMinutes] = React.useState(3);
    const [seconds, setSeconds] = React.useState(0);
    const [displayMessage, setDisplayMessage] = React.useState(false);
    const [status, setStatus] = React.useState(STATUS.default);
    const intervalRef = React.useRef();

    function countDown() {
        if (seconds === 0) {
            if (minutes !== 0) {
                setSeconds(59);
                setMinutes(min => min - 1); 
            } else {
                let mins = displayMessage ? 3 : 0;
                let sec = 59;
                setSeconds(sec);
                setMinutes(mins);
                setDisplayMessage(value => !value);
            }
        } else {
            setSeconds(sec => sec - 1);// try using callback form to prevent stale data
        }
    }

    React.useEffect(() => {
        if (status === STATUS.start) {
            intervalRef.current = setInterval(() => {
                countDown()
            }, 1000);
        } else if (status === STATUS.pause && intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        return () => {
            clearInterval(intervalRef.current)
        };
    }, [minutes, seconds, status]);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const start = () => setStatus(STATUS.start);

    return (
        <div className="timer flex flex-col justify-center items-center mt-40">
            <h2>
                {timerMinutes}:{timerSeconds}
            </h2>
            <button className="buttons_new" onClick={start}>Start</button>
        </div>
    );
}