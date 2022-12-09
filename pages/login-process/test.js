import React, { Component } from "react";

class AdmissionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studName: "",
            emailId: "",
            dob: "",
            gender: "select",
            phoneNumber: "",
            city: "select",
            formErrors: {}
        };

        this.initialState = this.state;
    }

    handleFormValidation() {
        const { studName, emailId, dob, gender, phoneNumber, city } = this.state;
        let formErrors = {};
        let formIsValid = true;


        //Phone number
        if (!phoneNumber) {
            formIsValid = false;
            formErrors["phoneNumberErr"] = "Phone number is required.";
        } else {
            var mobPattern =  /^((\+?971)|0)?5[024568]\d{7}$/;
            let reg = /^(?:\+961|961)?(1|0?3[0-9]?|[4-6]|70|71|76|78|79|7|81?|9)\d{6}$/;
            // let intReg = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
            if (!mobPattern.test(phoneNumber) && !reg.test(phoneNumber)) {
                formIsValid = false;
                formErrors["phoneNumberErr"] = "Invalid phone number.";
            }
            else {
                console.log("isValid")
            }
        }

        //City
        if (city === "" || city === "select") {
            formIsValid = false;
            formErrors["cityErr"] = "Select city.";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.handleFormValidation()) {
            alert("You have been successfully registered.");
            this.setState(this.initialState);
        }
    };

    render() {
        const {
            studNameErr,
            emailIdErr,
            dobErr,
            genderErr,
            phoneNumberErr,
            cityErr
        } = this.state.formErrors;

        return (
            <div className="formDiv flex flex-col justify-center items-center w-screen h-screen">
                <h3 style={{ textAlign: "center" }}>Student Admission Form </h3>
                <div className="my-10">
                    <form onSubmit={this.handleSubmit}>


                        <div className="my-10">
                            <label htmlFor="phoneNumber my-10">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                onChange={this.handleChange}
                                value={this.state.phoneNumber}
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
}

export default AdmissionForm;