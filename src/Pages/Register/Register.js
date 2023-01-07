import React from "react";
import "./Register.css"
import { firestore } from "../../config";
import { Button, Alert, Spinner } from "reactstrap";
import bg1 from "../Home/bg-3.jpg"
class Register extends React.Component {
    constructor () {
        super ()
        this.state = {
            userDetails: {},
            sports: [],
            isLoading: true
        }
    }
    componentDidMount () {
        const number = localStorage.getItem("uid")
        firestore.collection("users").doc(number).get().then(document => {
            this.setState({userDetails: document.data()})
        }).catch (err => console.log(err.message))
        firestore.collection("sports").get().then(Snapshot =>{
            let temp = []
            Snapshot.forEach(document => {
                
                if(document.data().uploadedPicture){
                    temp.push(document.data())
                }
            })
            this.setState({sports: temp, isLoading: false})
            
        }).catch(err => console.log(err.message))
    }
    render () {
        return (
            <div className="main-page"> {this.state.isLoading ? <Spinner /> : 
            <div >
                {this.state.userDetails.isProfileComplete ? null : 
                <Alert color="warning" >
                    Please complete your profile to register for the events
                </Alert>}
                <div className="register-container">
                {this.state.sports.map(eachSport => {
                    return (
                        <div className="sport-card" style={{backgroundImage:`url(${eachSport.uploadedPicture})`}}key={eachSport.name}>
                            <div>
                                <div className="sport-title">
                                    <h2>{eachSport.name.toUpperCase()}</h2>
                                    <div><h3>PRIZE</h3></div>
                                </div>
                                <div className="sport-title">
                                    <div><h5>{eachSport.players} players</h5></div>
                                    <div><h4>₹{eachSport.prizeMoney}</h4></div>
                                </div>
                            </div>
                            <Button disabled={!this.state.userDetails.isProfileComplete} className="sport-register" color="success">
                                <a style={{textDecoration:"none", color:"white"}} href={`/register/${eachSport.name.toLowerCase()}`}>
                                    REGISTER
                                </a>
                            </Button>
                        </div>
                    )
                })}
                </div>
            </div>
            }
            </div>
        )
    }
}

export default Register