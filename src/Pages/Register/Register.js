import React from "react";
import "./Register.css"
import { firestore } from "../../config";
import { Button, Alert, Spinner } from "reactstrap";

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
                temp.push(document.data())
            })
            this.setState({sports: temp, isLoading: false})
        }).catch(err => console.log(err.message))
    }
    render () {
        return (
            <div> {this.state.isLoading ? <Spinner /> : 
            <div>
                {this.state.userDetails.isProfileComplete ? null : 
                <Alert color="warning" >
                    Please complete your profile to register for the events
                </Alert>}
                <div className="register-container">
                {this.state.sports.map(eachSport => {
                    return (
                        <div style={{backgroundImage: `url(${eachSport.uploadedPicture})`}} className="sport-card" key={eachSport.name}>
                            <div className="sport-title">
                                <h5>{eachSport.name.toUpperCase()}</h5>
                                <div>PRIZE</div>
                            </div>
                            <div className="sport-title">
                                <div>{eachSport.players} players</div>
                                <div>Rs. {eachSport.prizeMoney}</div>
                            </div>
                            <div className="sport-title">
                                <div>ENTRY FEE: Rs. {eachSport.entryFee}</div>
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