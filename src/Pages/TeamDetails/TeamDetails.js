import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { firestore } from "../config";
import firebase from "../config";

const TeamDetails = () => {
    const {id} = useParams()
    const [sports, setSports] = useState ({})
    const [user, setUser] = useState ({})
    const [name, setName]= useState("")
    const [email, setEmail] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [eventsChosen, setEventsChosen] = useState(["","",""])
    const [playerName, setplayerName] = useState ("")
    const [playerNumber, setplayerNumber] = useState("")
    const [team, setTeam] = useState([])
    const [buttonDisabled, setButtonDisbaled] = useState(false)
    const [eventArray, setEventArray] = useState ([])

    useEffect(() => {
        firestore.collection("sports").doc(id).get().then(document => {
            setSports(document.data())
            let temp = []
            for (var i=0;i<document.data().numberOfEvents; i++) {
                temp[i] = i+1
            }
            setEventArray(temp)
        }).catch (err => console.log(err.message))
        const number = localStorage.getItem("uid")
        firestore.collection("users").doc(number).get().then(document => {
            setUser(document.data())
        }).catch(err => console.log(err.message))
    }, [id])

    const onChangeBox = (event) => {
        if (event.target.checked) {
            setName(user.name)
            setEmail(user.email)
            setContactNumber(user.contactNumber)
            setDisabled(true)
        }
        if (!event.target.checked) {
            setName("")
            setEmail("")
            setContactNumber("")
            setDisabled(false)
        }
    }

    const onChange = (event) => {
        if (team.length === parseInt(sports.players))
            setButtonDisbaled(true)
        const {name, value} = event.target
        if (name === "name")
            setName(value)
        if (name === "email")
            setEmail(value)
        if (name === "contactNumber")
            setContactNumber(value)
        if (name === "eventName1") {
            var temp = eventsChosen
            temp[0] = value
            setEventsChosen(temp)
        }
        if (name === "eventName2") {
            var temp1 = eventsChosen
            temp1[1] = value
            setEventsChosen(temp1)
        }
        if (name === "eventName3") {
            var temp2 = eventsChosen
            temp2[2] = value
            setEventsChosen(temp2)
        }
        if (name === "playerName")
            setplayerName(value)
        if (name === "playerNumber")
            setplayerNumber(value)
    }

    const addTeamMember = () => {
        let object = {
            name: playerName,
            contactNumber: playerNumber
        }
        let temp = team
        temp.push(object)
        setTeam(temp)
        setplayerName("")
        setplayerNumber("")
        if (team.length + 1 === parseInt(sports.players))
            setButtonDisbaled(true)
    }

    const onRegister = () => {
        let captain = {
            name: name,
            contactNumber:contactNumber,
            email: email
        }
        let temp = team
        temp.push(captain)
        setTeam(temp)
        firestore.collection("registration").doc(user.uid).set({
            team: team,
            events: eventsChosen,
            sportsName: sports.name,
            collegeName: user.collegeName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => alert("Successful registration")).catch(err => console.log(err.message))
    }

    return (
        <div style={{marginLeft:"1.5rem", marginTop:"1.5rem", marginRight:"1.5rem"}}>
            <h3>{id.toUpperCase()}</h3>
            <div style={{marginTop:"20px"}}>
                <h5>CAPTAIN DETAILS</h5>
                <Input onChange={onChangeBox} type="checkbox" /> I am the captain.
                <div style={{display:"flex"}}>
                    <Input disabled={disabled} name="name" onChange={onChange} value={name} placeholder="Name" />
                    <Input disabled={disabled} name="email" onChange={onChange} value={email} placeholder="Email" />
                    <Input disabled={disabled} name="contactNumber" onChange={onChange} value={contactNumber} placeholder="Contact Number" />
                </div>
            </div>
            <div style={{marginTop:"20px"}}>
                <h5>EVENT DETAILS</h5>
                <div style={{display:"flex"}}>
                    {eventArray.map(eachIndex => {
                        return (
                            <Input name={`eventName${eachIndex}`} onChange={onChange} style={{margin:"10px"}} key={eachIndex} type="select">
                                <option value="">
                                    Select Event {eachIndex}
                                </option>
                                {sports.events && sports.events.map(eachEvent => {
                                    return (
                                        <option key={eachEvent} value={eachEvent} >
                                            {eachEvent}
                                        </option>
                                    )
                                })}
                            </Input>
                        )
                    })}
                </div>
            </div>
            <div style={{marginTop:"20px"}}>
                <h5>TEAM MEMBER DETAILS</h5>
                <div><b>NOTE: </b>The captain is already added to the team.</div>
                <div style={{display:"flex"}}>
                    <Input name="playerName" onChange={onChange} value={playerName} placeholder="Name" />
                    <Input name="playerNumber" onChange={onChange} value={playerNumber} placeholder="Contact Number" />
                </div>
                <Button disabled={buttonDisabled} onClick={addTeamMember} style={{margin:"5px"}} color="success">
                    ADD TEAM MEMBER
                </Button>
            </div>
            <Button onClick={onRegister} color="success">
                SUBMIT
            </Button>
        </div>
    )
}

export default TeamDetails