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

        //Student name
        if (!studName) {
            formIsValid = false;
            formErrors["studNameErr"] = "Name is required.";
        }

        //Email
        if (!emailId) {
            formIsValid = false;
            formErrors["emailIdErr"] = "Email id is required.";
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)) {
            formIsValid = false;
            formErrors["emailIdErr"] = "Invalid email id.";
        }

        //DOB
        if (!dob) {
            formIsValid = false;
            formErrors["dobErr"] = "Date of birth is required.";
        } else {
            var pattern = /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/gm;
            let reg = /^((\+[2][3][3]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
let intReg = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

            if (!pattern.test(dob)) {
                formIsValid = false;
                formErrors["dobErr"] = "Invalid date of birth";
            }
        }

        //Gender
        if (gender === "" || gender === "select") {
            formIsValid = false;
            formErrors["genderErr"] = "Select gender.";
        }

        //Phone number
        if (!phoneNumber) {
            formIsValid = false;
            formErrors["phoneNumberErr"] = "Phone number is required.";
        } else {
            var mobPattern =/^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/gm;
            let reg = /^([+]|[00]{2})([0-9]|[ -])*/;
// let intReg = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
            if (!reg.test(phoneNumber)) {
                formIsValid = false;
                formErrors["phoneNumberErr"] = "Invalid phone number.";
            }
            else{
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
