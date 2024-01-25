import { useEffect, useMemo, useState } from "react";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";
import { useRouter } from "next/router";
import PrivateMenu from "./private-menu";
import Cookies from 'js-cookie'
import DarkTheme from "../../layouts/Dark";
import Post from "./trainers/post";

export default function List(info) {
    const [data, setListData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [{ posts, users }, setData] = useState({ post: [], user: [{}] });
    const [selectedCategory, setSelectedCategory] = useState(1);
    const itemSet = (Cookies.get("token") != null || Cookies.get("token") != undefined);
    const tokenSet =(Cookies.get("OTP") != null)
    useEffect(() => {
    if (itemSet && tokenSet) {
        router.push({ pathname: "/account/trainers"});
        if(Cookies.get("Category") != undefined){
            const category = Cookies.get("Category");
            setSelectedCategory(category)
        }
    }
    else{
        router.push({ pathname: "/account/login"});
    }

}, [])
    function handleCategoryChange(event) {
        const val = event.target.value
        Cookies.set("Category", val);
        setSelectedCategory(val);
        
        // console.log(val)
    }
    // Cookies.get("Category")
    try {
        var registrationHeaders = new Headers();
        registrationHeaders.append("Authorization", "Bearer " + Cookies.get("token"));
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
                        `https://cms.fitnesszone.me/items/trainers`
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
    const memberId = Cookies.get("Member");
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
                setBooks(fetchedData);
                    handleCategoryChange({ target: { value: fetchedData.membershipLocation?.locationCode } })
            }
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
   
    const router = useRouter();
    return (
        <>
           <PrivateMenu/>
           <DarkTheme>
            <section className="">
                <div className="mt-40 lg:px-28 md:px-20 px-3 container mx-auto w-full h-full">
                <div className="flex flex-col justify-center items-center">
                        <p className="text-[#008DDC] font-bold lg:text-4xl md:text-4xl text-3xl mb-10">Trainers List</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="flex items-center space-x-5">
                            <img src="/homepage/filterBy.png" style={{width:"10px", height:"12px"}}/>
                            <p className="futura-book text-white">Filter by</p>
                        </div>
                        <select name="location" id="location" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value={books.membershipLocation?.locationCode}>{books.membershipLocation?.locationName}</option>
                                    {books?.membershipType?.membershipTypeLocationList?.map((locationName, i) => (
                                        <>
                                            {locationName.isCheckin ?
                                                <>
                                                    {locationName.location.locationName != books.membershipLocation?.locationName ?
                                                        <option key={i} value={locationName.location.locationCode} id="location" >{locationName.location.locationName}</option>
                                                        : null}

                                                </>
                                                : null}
                                        </>
                                    ))}
                        </select>
                    </div>
                    <div id="main-box" className="lg:grid lg:grid-cols-12 gap-x-10 gap-y-10 p-10 items-center lg:space-y-0 md:space-y-0" style={{padding:"2.5rem"}}>
                        {filteredPosts.map((post, index) => (
                            <div className="col-span-3 membership-box h-full p-5" style={{padding:"1.25rem"}}>
                                <Post post={post?.post} users={post?.user} key={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </DarkTheme>
        </>
    );
}
export async function getServerSideProps(context) {
    const memberId = context.req.cookies["Member"];
    const token = context.req.cookies["token"];
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + token
    );
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: "GET",
        headers: registrationHeaders,
    };
    const response = await fetch(
        `https://api.fitnessclubapp.com/api/Membership/Member/${memberId}`,
        registrationRequestOptions
    );
    // const data = await response.json()
    if(response.status == 401){
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        };
        }else{
            const info = await response.json()
            return {
                props:{info}
            }
};
}