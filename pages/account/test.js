
import React from "react";
export default function App() {
    const [data, setData] = React.useState([]);
    const [name, setName] = React.useState("");
    const getData = async () => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await res.json();
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };
    // const filtered = data.filter((dt) =>
    //     dt.name.toLowerCase().includes(name.toLowerCase())
    // );
    React.useEffect(() => {
        getData();
    }, []);
    return (
        <div className="container mx-auto flex flex-col justify-center items-center w-screen h-screen">
            <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 bg-transparent border border-gray-500 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <ul>
                {data.filter((dt) => dt.name.toLowerCase().includes(name.toLowerCase())).map((dt) => {
                    return <li key={dt.id}>{dt.name}</li>;
                })}
            </ul>
        </div>
    );
}
