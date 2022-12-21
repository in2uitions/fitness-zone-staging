import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Post } from "./Post";

export default function List() {
    const [{ posts, users }, setData] = useState({ post: [], user: [] });
    try {

        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://fzcms.diastora.com/items/trainers`

                );
                const res = await fetch(
                    ``
                )
                const checkInList = await response.json()
                // const test = await res.json()
                setData({ posts: checkInList.data, users: "" });
                console.log(checkInList.data + "testing")
                // console.log(test + "test")
            }
        }, [])
    } catch (err) {
        console.log(err);
    }
    
    const filteredPosts = useMemo(() => {
        const filteredPosts = [];
        if (posts)
            for (let i = 0; i < posts.length && i < 10; i++) {
                filteredPosts.push(posts[i]);
            }
        return filteredPosts;
    }, [posts]);
    return (
        <div className="mt-40 container mx-auto">
            <div id="main-box" className="grid grid-cols-12 gap-x-10 gap-y-10 p-10 items-center">
                {filteredPosts.map((post, index) => (
                    <div className="col-span-3 membership-box">
                        <Post post={post} users={users} key={post.id} />
                    </div>
                ))}
                {/* <button id="load-btn" onClick={handleClick}>Load more</button> */}
            </div>
        </div>
    );
}
