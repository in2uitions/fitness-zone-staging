import { useEffect, useMemo, useState } from "react";
import  Post  from "./trainers/post";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useRouter } from "next/router";

export default function List() {
    const [data, setListData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [{ posts, users }, setData] = useState({ post: [], user: [{}] });
    const [selectedCategory, setSelectedCategory] = useState('0');
    function handleCategoryChange(event) {
        const val = event.target.value
        localStorage.setItem("Category", val);
        setSelectedCategory(val);
        console.log(val)
    }
    
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
                    `https://api.fitnessclubapp.com/api/Billing/SubscriberUser/List?isTrainer=true&isActive=True&LocationCode=${selectedCategory}`,registrationRequestOptions

                );
                if(response.status == 200){
                const res = await fetch(
                    `https://fzcms.diastora.com/items/trainers`
                )
                
                const checkInList = await response.json();
                var memberType = checkInList.map(el => el.categoryName)
                console.log(memberType)
                const test = await res.json()
                setData({ posts: checkInList, users: test.data });
                }else{
                    setData({ post: [], user: [{}] })
                }
            }
            getData()
        }, [selectedCategory])
    } catch (err) {
        console.log(err);
    }
    
    const filteredPosts = useMemo(() => {
        const filteredPosts = [];
        if (posts && users)
            for (let i = 0; i < posts.length && i < users.length; i++) {
                filteredPosts.push({post: posts[i], user : users.find(({ userId }) => posts[i].userId === userId)});
            }
        return filteredPosts;
    }, [posts, users]);
    
    try {
        useEffect(() => {
            
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Administration/Location/List`,
                    registrationRequestOptions
                );
                const checkInList = await response.json();
                setListData(checkInList);
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    const memberId = localStorage.getItem("Member");
    const[books, setBooks]=useState(true)
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                const fetchedData = await response.json();
                var memberType = fetchedData.membershipType.memberShipTypeName
                setBooks(memberType);
                console.log(memberType)
                if(memberType != "Gold"){
                    setIsDisabled(true);
                    handleCategoryChange({target: {value: fetchedData.membershipLocation?.locationCode}})
                }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const router = useRouter();
    const onSubmitForm = async event => {
        event.preventDefault();
        const getTokenAPI = async () => {
            localStorage.clear();
            router.push({ pathname: "/login-process/login"});
        };
        getTokenAPI();

    };
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
                            {/* <img src="/icons-person.png" /> */}
                            <a href="/login-process/dashboard" className="flex space-x-1 border-4 border-[#009FE3] rounded-full w-40 h-40 items-center justify-center">
                            <p className="futura-bold text-6xl text-[#009FE3]">{books.firstName?.charAt(0)}</p>
                            <p className="futura-bold text-6xl text-[#009FE3]">{books.lastName?.charAt(0)}</p>
                            </a>
                            <p className="futura-bold text-[#009FE3] mt-5">{books.fullName}</p>
                            <div className="flex flex-col mt-10">
                                <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a
                                        href="/login-process/myProfile"
                                        className="futura-book menu-member flex items-center justify-between"
                                    >
                                        {" "}
                                        My Profile
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a href='/login-process/membership' className="futura-book menu-member flex items-center justify-between">
                                        Membership Settings
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                </div>
                                <div className="lg:flex lg:space-x-3 lg:mt-10 md:mt-10 mt-3 space-y-3 lg:space-y-0 md:space-y-0">
                                    <a href="/login-process/classListing" className="futura-book menu-member flex items-center justify-between text-white">
                                        Classes / Book a class
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                    <a href='/login-process/trainers' className="futura-book menu-member flex items-center justify-between">
                                        Trainers / Book a package
                                        <ChevronRightIcon className="forward-blue" />
                                    </a>
                                </div>
                                <form onSubmit={onSubmitForm}>
                                    <div className="flex justify-center items-center">
                                        <button type="submit" className="text-white border-2 border-[#009FE3] w-1/2 mt-5 p-2 futura-book">Log Out</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Popup>
                </nav>
            </div>
            <section className="lg:h-full">
        <div className="mt-40 lg:px-28 md:px-20 px-3 container mx-auto w-full h-full">
        <div className="flex flex-row justify-between">
        <div className="flex items-center space-x-5">
                        <img src="/filterBy.png" />
                        <p className="futura-book text-white">Filter by</p>
                    </div>
                <select disabled={isDisabled} name="location" id="location" value={selectedCategory} onChange={handleCategoryChange}>
                        {data.map((item, i) => (
                            <option key={i} value={item.locationCode} id="location" >{item.locationName}</option>
                        ))}
                    </select>
                    </div>
            <div id="main-box" className="lg:grid lg:grid-cols-12 gap-x-10 gap-y-10 p-10 items-center space-y-5 lg:space-y-0 md:space-y-0">
                {filteredPosts.map((post, index) => (
                    <div className="col-span-3 membership-box h-full p-5">
                        <Post post={post?.post} users={post?.user} key={index} />
                    </div>
                ))}
            </div> 
        </div>
        </section>
        </>
    );
}
