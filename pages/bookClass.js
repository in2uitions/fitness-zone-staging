import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState, useEffect } from "react";
import moment from 'moment';

export default function ClassListing() {
    var curr = new Date;
    const [classs, setClasss] = useState([]);
    const [firstDate, setDate] = useState({
        "firstday": new Date(curr.setDate(curr.getDate() - curr.getDay())).toUTCString(),
        "lastday": new Date(curr.setDate((curr.getDate() - curr.getDay()) + 6)).toUTCString()
    })
    const location = localStorage.getItem("Location");
    var registrationHeaders = new Headers();
    registrationHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
    );
    registrationHeaders.append("Content-Type", "application/json");
    var registrationRequestOptions = {
        method: "GET",
        headers: registrationHeaders,
    };
    useEffect(() => {
        getFilteredList();
    }, [firstDate])
    function getFilteredList() {

        const getClassList = async () => {
            var registrationHeaders = new Headers();
            registrationHeaders.append(
                "Authorization",
                "Bearer " + localStorage.getItem("token")
            );
            registrationHeaders.append("Content-Type", "application/json");
            var registrationRequestOptions = {
                method: "GET",
                headers: registrationHeaders,
            };
            try {
                const res = await fetch(
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList?dateFrom=${firstDate.firstday}&dateTo=${firstDate.lastday}&LocationCode=${location}`,
                    registrationRequestOptions
                );
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Member/${memberId}?dateFrom=${firstDate.firstday}&dateTo=${firstDate.lastday}`,
                    registrationRequestOptions
                );
                if(res.status == 200){
                    const dataClass = await res.json();
                    let classes = dataClass;
                    if(response.status == 200){
                        const fetchedData = await response.json();
                        classes = dataClass.map((result) =>{
                            if(fetchedData.filter((res) => res.timetableId == result.timetableId).length == 1){
                                return {...result, toggle: true}
                            }
                            return {...result, toggle: false}
                        })
                    }
                    setClasss(classes);
                }else{
                    setClasss([]);
                }
                
            } catch (err) {
                console.log(err);
            }

        };
        getClassList();
    };
    function getDayByDay({ id }) {
        var date = moment().isoWeekday(id).format("DD-MMM-YYYY")
        setDate({
            "firstday": date,
            "lastday": date
        })
    }
    const memberId = localStorage.getItem("Member");
    
    const reserveClass = async ({ timetableId, e }) => {
        e.preventDefault();
        console.log(timetableId)
        try {
            var registrationHeaders = new Headers();
            registrationHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            registrationHeaders.append("Content-Type", "application/json");
            var registrationRequestOptions = {
                method: 'GET',
                headers: registrationHeaders
            };
            const res = await fetch(
                `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList/Class/Reserve?timetableId=${timetableId}&memberId=${memberId}`,
                registrationRequestOptions
            );
            const data = await res.json();
            if (data.isValid == true) {

                let newClasssValue = classs.map((res) => {
                    if(res.timetableId == timetableId){
                        return {
                            ...res,
                            toggle: true,
                        }
                    }
                    return res;
                })
                setClasss(newClasssValue);
            }
            else {
                alert("Class is not valid");
            }

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="container mx-auto mt-40 px-20">
                <p className="text-[#009FE3] futura-bold text-4xl">BOOK A CLASS</p>
                <div className="flex justify-between mt-5">
                    <div className="flex items-center space-x-5">
                        <img src="/filterBy.png" />
                        <p className="futura-book">Filter by</p>
                    </div>
                </div>
                <Tabs className="mt-10">
                    <TabList className="flex justify-between w-full mx-auto container tabs-container">
                        <Tab className="tabColor" onClick={() => getDayByDay({ id: 1 })}>
                            <div className="flex justify-start tab">Monday</div>
                        </Tab>
                        <Tab className="tabColor" onClick={() => getDayByDay({ id: 2 })}>
                            <div className="flex justify-center tab">Tuesday</div>
                        </Tab>
                        <Tab className="tabColor" onClick={() => getDayByDay({ id: 3 })}>
                            <div className="flex justify-center tab">Wednesday</div>
                        </Tab>
                        <Tab className="tabColor" onClick={() => getDayByDay({ id: 4 })}>
                            <div className="flex justify-center tab">Thursday</div>
                        </Tab>
                        <Tab className="tabColor" onClick={() => getDayByDay({ id: 5 })}>
                            <div className="flex justify-center tab">Friday</div>
                        </Tab>
                        <Tab className="tabColor" onClick={() => getDayByDay({ id: 6 })}>
                            <div className="flex justify-center tab">Saturday</div>
                        </Tab>
                        <Tab className="tabColor" onClick={() => getDayByDay({ id: 7 })}>
                            <div className="flex justify-end tab">Sunday</div>
                        </Tab>
                    </TabList>
                </Tabs>
                {classs.map((item, index) => (
                    <>
                        <div className="flex justify-between w-full classes-box mb-3 mt-10 p-3" key={index}>
                            <div className="flex justify-start">
                                <p className="text-white text-md border-r border-[#009FE3] pr-3 futura-book">
                                    {item.class?.className}
                                </p>
                                <p className="border-r border-white text-white pl-10 pr-3 futura-book">
                                    {item.studio?.studioName}
                                </p>
                                <p className="text-white text-lg futura-book pl-5">
                                    {item.classTime}
                                </p>
                                <p className="text-white text-lg futura-book pl-5">
                                    {item.location?.locationName}
                                </p>
                            </div>
                            <div>
                                <button
                                    className="flex justify-end"
                                    onClick={(e) =>  reserveClass({ timetableId: item.timetableId, e })}
                                >
                                    {!item?.toggle ? (
                                        <div className="flex space-x-2 items-center">
                                            <img src="/notBooked.png" />
                                            <p className="text-[#009FE3] futura-book">Book class</p>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-2 items-center">
                                            <img src="/booked.png" />
                                            <p className="futura-book">Booked</p>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}
