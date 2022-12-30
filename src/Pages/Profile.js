import React from "react";
import { Alert, Button, Spinner } from "reactstrap";
import { firestore } from "../config";
import "../Styles/Profile.css"
import { Input } from "reactstrap";

class Profile extends React.Component {
    constructor () {
        super ()
        this.state = {
            userDetails: {},
            yearOfStudy: "",
            collegeName: "",
            contactNumber: "",
            address: "",
            position: "",
            gender: "Male",
            city: "",
            state: "",
            pinCode: "",
            isLoading: true
        }
    }
    componentDidMount () {
        firestore.collection("users").doc(localStorage.getItem("uid")).get().then(document => {
            this.setState ({userDetails: document.data(), isLoading: false})
            if (document.data().contactNumber) {
                const {contactNumber, pinCode, address, gender, city, state, collegeName, yearOfStudy, position} = document.data()
                this.setState ({
                    contactNumber: contactNumber,
                    pinCode: pinCode,
                    address: address,
                    gender: gender,
                    city: city,
                    state: state,
                    collegeName: collegeName,
                    yearOfStudy: yearOfStudy,
                    position: position,
                    isLoading: false
                })
            }
        }).catch(err => console.log(err.message))
    }
    render () {
        const onChange = (event) => {
            const {name, value} = event.target
            this.setState({[name]: value})
        }
        const onSubmit = (event) => {
            event.preventDefault()
            firestore.collection("users").doc(this.state.userDetails.uid).update ({
                isProfileComplete: true,
                address: this.state.address,
                city: this.state.city,
                collegeName: this.state.collegeName,
                pinCode: this.state.pinCode,
                gender: this.state.gender,
                state: this.state.state,
                position: this.state.position,
                yearOfStudy: this.state.yearOfStudy,
                contactNumber: this.state.contactNumber,
            }).then (() => {
                window.location.reload()
            }).catch(err => console.log(err.message))
        }
        return (
            <div> {this.state.isLoading ? <Spinner /> : 
            <div>
                <div className="profile-container">
                    <h3>{this.state.userDetails.name}</h3>
                    {this.state.userDetails.isProfileComplete ? null : 
                    <Alert color="warning">
                        Please complete your profile to register for the events
                    </Alert>}
                    <form onSubmit={onSubmit} className="profile-content">
                        <div className="profile-content">
                        <input disabled={true} style={{color:"black"}} value={this.state.userDetails.email} className="profile-input" />
                        <input required onChange={onChange} name="collegeName" placeholder="College Name" value={this.state.collegeName} className="profile-input" />
                        <input required onChange={onChange} name="yearOfStudy" placeholder="Year of Study" value={this.state.yearOfStudy} className="profile-input" />
                        <input required onChange={onChange} name="contactNumber" placeholder="Contact Number" value={this.state.contactNumber} className="profile-input" />
                        <input required onChange={onChange} name="position" placeholder="Your Position" value={this.state.position} className="profile-input" />
                        <Input type="select" required onChange={onChange} name="gender" placeholder="Gender" value={this.state.gender} className="profile-input" >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </Input>
                        <input required onChange={onChange} name="address" placeholder="College Address" value={this.state.address} className="profile-input" />
                        <input required onChange={onChange} name="city" placeholder="City" value={this.state.city} className="profile-input" />
                        <input required onChange={onChange} name="state" placeholder="State" value={this.state.state} className="profile-input" />
                        <input required onChange={onChange} name="pinCode" placeholder="Pin Code" value={this.state.pinCode} className="profile-input" /><br />
                        </div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Button type="submit" value="submit" color="success" style={{width:"150px"}}>
                                SAVE
                            </Button>
                        </div>
                    </form>
                </div>
            </div>}
            </div>
        )
    }
}

export default Profile