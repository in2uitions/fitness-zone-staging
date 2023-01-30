import { useEffect, useMemo, useState } from "react";
import Post from "./trainers/post";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useRouter } from "next/router";
import PrivateMenu from "./private-menu";

export default function List() {
    const [data, setListData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [{ posts, users }, setData] = useState({ post: [], user: [{}] });
    const [selectedCategory, setSelectedCategory] = useState();
    const itemSet = (localStorage.length !== 0);
    useEffect(() => {
    if (itemSet) {
        router.push({ pathname: "/account/trainers"});
    }
    else{
        router.push({ pathname: "/account/login"});
    }
}, [])
    function handleCategoryChange(event) {
        const val = event.target.value
        localStorage.setItem("Category", val);
        setSelectedCategory(val);
        // console.log(val)
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
                    `https://api.fitnessclubapp.com/api/Billing/SubscriberUser/List?isTrainer=true&isActive=True&LocationCode=${selectedCategory}`, registrationRequestOptions

                );
                if (response.status == 200) {
                    const res = await fetch(
                        `https://fzcms.diastora.com/items/trainers`
                    )

                    const checkInList = await response.json();
                    var memberType = checkInList.map(el => el.categoryName)
                    // console.log(memberType)
                    const test = await res.json()
                    setData({ posts: checkInList, users: test.data });
                } else {
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
                filteredPosts.push({ post: posts[i], user: users.find(({ userId }) => posts[i].userId === userId) });
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
                if(response.status == 200){
                const checkInList = await response.json();
                setListData(checkInList);
                }
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    const memberId = localStorage.getItem("Member");
    const [books, setBooks] = useState(true)
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                if(response.status == 200){
                const fetchedData = await response.json();
                var memberType = fetchedData.membershipType.memberShipTypeName
                setBooks(memberType);
                // console.log(memberType)
                if (memberType != "PLATINUM LS CORPORATE.") {
                    setIsDisabled(true);
                    handleCategoryChange({ target: { value: fetchedData.membershipLocation?.locationCode } })
                }
            }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const [info, setInfo] = useState(true)
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
                    registrationRequestOptions
                );
                if(response.status == 200){
                const fetchedData = await response.json();
                setInfo(fetchedData);
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
            router.push({ pathname: "/account/login" });
        };
        getTokenAPI();

    };
    return (
        <>
           <PrivateMenu/>
            <section className="">
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
