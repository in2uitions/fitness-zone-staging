import React, { useState } from "react";

export default function App() {
    const [state, setState] = useState({
        name: "John Doe",
        email: "john.doe@test.com"
    });

    // We need to spread the previous state and change the one we're targeting, so other data cannot be lost.
    const handleChange = (e , prevState , index) => {
        const object = {
            ...prevState,
            [index]: e.target?.value
        }
        setState(object)
    };
//     const handleaChange = e => {
//         setState(prevState => {
//       ...prevState,
//             [e.target.name]: e.target.value,
//     });
// };
return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
        <input
            type="text"
            className="name"
            name="name"
            value={state.name}
            onChange={handleChange}
        />

        <input
            type="text"
            className="email"
            name="email"
            value={state.email}
            onChange={handleChange}
        />
    </div>
);
}