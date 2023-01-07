import React from "react";
import { Alert, Button, Spinner } from "reactstrap";
import { firestore } from "../../config";
import "./Profile.css"
import { Input } from "reactstrap";

class Profile extends React.Component {
    constructor () {
        super ()
        this.state = {
            userDetails: {},
            yearOfStudy: "",
            collegeName: "",
            contactNumber: "",
            position: "",
            gender: "Male",
            isLoading: true,
            yearErr: false,
            phoneErr: false,
            stringErr: false,
        }
    }
    componentDidMount () {
        firestore.collection("users").doc(localStorage.getItem("uid")).get().then(document => {
            this.setState ({userDetails: document.data(), isLoading: false})
            if (document.data().contactNumber) {
                const {contactNumber, gender, collegeName, yearOfStudy, position} = document.data()
                this.setState ({
                    contactNumber: contactNumber,
                    gender: gender,
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
        const checkValidity = () => {
            //Year of Study Validity
            const yearRegex = /^(19[5-9]\d|20[0-4]\d|2050)$/
            const year = this.state.yearOfStudy
            if (!year.match(yearRegex))
            {
                this.setState({yearErr:true, stringErr:true})
                return false
            }else{
                this.setState({yearErr:false})
            }
            //Phone Validity
            if(this.state.contactNumber.trim().length==10){
                this.setState({phoneErr:false})
            }else{
                this.setState({phoneErr:true, stringErr:true})
                return false
            }

            //Position Validity
            if(this.state.position.trim()==""){
                this.setState({stringErr:true})
                return false
            }

            //College Validity
            if(this.state.collegeName.trim()==""){
                this.setState({stringErr:true})
                return false
            }

            this.setState({stringErr:false});
            return true;
        }
        const onSubmit = (event) => {
            event.preventDefault()
            checkValidity()
            firestore.collection("users").doc(this.state.userDetails.uid).update ({
                isProfileComplete: true,
                collegeName: this.state.collegeName,
                gender: this.state.gender,
                position: this.state.position,
                yearOfStudy: this.state.yearOfStudy,
                contactNumber: this.state.contactNumber,
            }).then (() => {
                window.location.reload()
            }).catch(err => console.log(err.message))
        }
        return (
            <div> {this.state.isLoading ? <Spinner /> : 
            <div className="main-page">
                <div className="profile-container">
                    <h3>{this.state.userDetails.name}</h3>
                    {this.state.userDetails.isProfileComplete ? null : 
                    <Alert color="warning">
                        Please complete your profile to register for the events
                    </Alert>}
                    {this.state.stringErr &&
                        <Alert color="danger">
                            Please enter the details correctly
                        </Alert>
                    }
                    <form onSubmit={onSubmit} className="profile-content">
                        <div className="profile-content">
                        <input disabled={true} style={{color:"black"}} value={this.state.userDetails.email} className="profile-input" />
                        <input required onChange={onChange} name="collegeName" placeholder="College Name" value={this.state.collegeName} className="profile-input" />
                        
                        <input required onChange={onChange} name="yearOfStudy" placeholder="Year of Study" value={this.state.yearOfStudy} className="profile-input" />
                        
                        <input required onChange={onChange} name="contactNumber" type="number" placeholder="Contact Number" value={this.state.contactNumber} className="profile-input" />
                        <input required onChange={onChange} name="position" placeholder="Your Position" value={this.state.position} className="profile-input" />
                        <Input type="select" required onChange={onChange} name="gender" placeholder="Gender" value={this.state.gender} className="profile-input" >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </Input>
                        </div>
                        {this.state.yearErr &&
                            <Alert color="danger">
                                Please enter the Year of Study correctly
                            </Alert>
                        }
                        {this.state.phoneErr &&
                            <Alert color="danger">
                                Please enter the phone correctly
                            </Alert>
                        }
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