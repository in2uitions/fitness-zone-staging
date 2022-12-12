import React, { Component } from "react";
import { useState } from "react";

export default function App() {
    const [state, setState] = useState({
        phoneNumber: '',
        formErrors: {}
    })
    const [
        phoneNumberErr, setphoneNumberErr
    ] = useState(formErrors);
    const initialState = state;

    const formErrors = '';
    function handleFormValidation() {
        const { phoneNumber } = state;
        let formErrors = {};
        let formIsValid = true;


        if (!phoneNumber) {
            formIsValid = false;
            setphoneNumberErr ( "Phone number is required.");
        } else {
            var mobPattern = /^((\+?971)|0)?5[024568]\d{7}$/;
            let reg = /^(?:\+961|961)?(1|0?3[0-9]?|[4-6]|70|71|76|78|79|7|81?|9)\d{6}$/;
            if (!mobPattern.test(phoneNumber) && !reg.test(phoneNumber)) {
                formIsValid = false;
                setphoneNumberErr( "Invalid phone number.");
            }
            else {
                console.log("isValid")
            }
        }
        setState({ formErrors: formErrors });
        return formIsValid;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (handleFormValidation()) {
            alert("You have been successfully registered.");
            setState(initialState);
        }
    };

    return (
        <div className="formDiv flex flex-col justify-center items-center w-screen h-screen">
            <div className="my-10">
                <form onSubmit={handleSubmit}>


                    <div className="my-10">
                        <label htmlFor="phoneNumber my-10">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            onChange={handleChange}
                            value={state.phoneNumber}
                            placeholder="Your phone number.."
                            className={phoneNumberErr ? " showError" : ""}
                        />
                        {phoneNumberErr && (
                            <div style={{ color: "red", paddingBottom: 10 }}>
                                {phoneNumberErr}
                            </div>
                        )}
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );

}
