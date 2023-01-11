import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState, useEffect } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import styles from "../../styles/Header.module.css";
import Popup from "reactjs-popup";

export default function ClassListing() {
    const [data, setData] = useState([]);
    const [classs, setClasss] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('0');
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        // console.log(event.target.value)
        getFilteredList(event.target.value);
        console.log(event.target.value)
        // console.log(selectedCategory + "categoryy")
    }
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
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/Administration/Location/List`,
                    registrationRequestOptions
                );
                const checkInList = await response.json();
                setData(checkInList);
                // console.log(checkInList + "wyy");
            }
        }, []);
    } catch (err) {
        console.log(err);
    }
    // const submitLogIn = async event => {
    // setSelectedCategory(event.target.value);
    // console.log(event.target.value + "---___---")

    function getFilteredList() {

        const getValidOtp = async () => {
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
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList?dateFrom=18-Dec-2022&dateTo=24-Dec-2022&LocationCode=${selectedCategory}`,
                    registrationRequestOptions
                );
                const dataClass = await res.json();
                setClasss(dataClass);
            } catch (err) {
                console.log(err);
            }
        };
        getValidOtp();
    };
    try {
        useEffect(() => {
            getData();
            async function getData() {
                const response = await fetch(
                    `https://api.fitnessclubapp.com/api/GroupExercise/TimetableList?dateFrom=18-Dec-2022&dateTo=24-Dec-2022&LocationCode=${selectedCategory}`,
                    registrationRequestOptions
                );
                const fetchedData = await response.json();
                setClasss(fetchedData);
            }
            getData();
        }, []);
    } catch (err) {
        console.log(err);
    }
    const [state, toggle] = useState(true);
    return (
        <div className="w-screen h-screen flex">
    <div>
      <h1>Hello, world!</h1>
      <div style={{ marginTop: "150vh" }} />
      <ScrollToTop smooth />
    </div>
  

        </div>
    );
}
