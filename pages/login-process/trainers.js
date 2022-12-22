import { useEffect, useMemo, useState } from "react";
import { Post } from "./trainers/post";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export default function List() {
    const [{ posts, users }, setData] = useState({ post: [], user: [{}] });
    try {
        var registrationHeaders = new Headers();
        registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        registrationHeaders.append("Content-Type", "application/json");
        var registrationRequestOptions = {
            method: 'GET',
            headers: registrationHeaders 
        };
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Billing/SubscriberUser/List?isTrainer=true&isActive=True`,registrationRequestOptions

                );
                const res = await fetch(
                    `https://fzcms.diastora.com/items/trainers`
                )
                const checkInList = await response.json()
                const test = await res.json()
                setData({ posts: checkInList, users: test.data });
                // console.log(checkInList + "testing")
                // console.log(test.data + "test")
            }
            getData()
        }, [])
    } catch (err) {
        console.log(err);
    }
    
    const filteredPosts = useMemo(() => {
        const filteredPosts = [];
        if (posts && users)
            for (let i = 0; i < posts.length && i < users.length; i++) {
                filteredPosts.push({post: posts[i], user : users.find(({ userId }) => posts[i].userId === userId)});
            }
            // console.log(JSON.stringify(filteredPosts) + "testttttt")
        return filteredPosts;
    }, [posts, users]);
    return (
        <>
        <div className={styles.container}>
                <nav className={styles.nav}>
                    <a href="/">
                        <img src="/logo.png" className="logo" />
                    </a>
                    <Popup
                        trigger={
                            <div className="flex items-center space-x-2">
                                <button className="img-btn">
                                    <img src="/blue-rectangle.png" className="menu-icon" />
                                </button>
                                <p className="font-bold text-white futura-book cursor-pointer">
                                    Menu
                                </p>
                            </div>
                        }
                        modal
                        closeOnDocumentClick
                        position=""
                    >
                        <div className="w-screen h-screen container mx-auto flex flex-col justify-center items-center">
                            <img src="/icons-person.png" />
                            <p className="futura-bold text-[#009FE3] mt-5">CHARLES KHOURY</p>
                            <div className="flex flex-col mt-10">
                                <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a
                                        href="/login-process/myProfile"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        {" "}
                                        My Profile
                                        <ChevronRightIcon className="fill-[#009FE3]" />
                                    </a>
                                    <a href='/login-process/membership' className="futura-book menu-member flex items-center justify-between">
                                        Membership Settings
                                        <ChevronRightIcon className="fill-[#009FE3]" />
                                    </a>
                                </div>
                                <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a href="/login-process/classListing" className="futura-book menu-member flex items-center justify-between text-white">
                                        Classes / Book a class
                                        <ChevronRightIcon className="fill-[#009FE3]" />
                                    </a>
                                    <a href='/login-process/trainers' className="futura-book menu-member flex items-center justify-between">
                                        Trainers / Book a package
                                        <ChevronRightIcon className="fill-[#009FE3]" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </nav>
            </div>
        <div className="mt-40 container mx-auto">
            <div id="main-box" className="grid grid-cols-12 gap-x-10 gap-y-10 p-10 items-center">
                {filteredPosts.map((post, index) => (
                    <div className="col-span-3 membership-box h-full p-5">
                        <Post post={post?.post} users={post?.user} key={index} />
                    </div>
                ))}
            </div> 
        </div>
        </>
    );
}
