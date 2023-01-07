import React from "react";
import { firestore } from "../config";
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";

class EditTeam extends React.Component {
    constructor () {
        super ()
        this.state = {
            registration: {},
            team: [],
            name: "",
            contactNumber: "",
            email: "",
            index: 0,
            isLoading: true,
            isModalOpen: false,
            isEditTeam: true
        }
    }
    componentDidMount () {
        const number = localStorage.getItem("uid")
        firestore.collection("registration").doc(number).get().then(document => {
            if (document.exists)
            this.setState ({registration: document.data()}, () => this.setState({team: this.state.registration.team, isLoading: false}))
            else 
            this.setState ({isEditTeam: false, isLoading: false})
        }).catch(err => console.log(err.message))
    }
    render () {
        const modalOpen = (member, index) => {
            this.setState({name: member.name, contactNumber: member.contactNumber, index: index, isModalOpen: true})
            if(member.email) {
                this.setState ({email: member.email})
            }
        }
        const onChange = (event) => {
            const {name, value} = event.target
            this.setState({[name]: value})
        }
        const saveEdit = () => {
            let temp = this.state.team
            let object = {}
            if(this.state.email) {
                object = {
                name: this.state.name,
                contactNumber: this.state.contactNumber,
                email: this.state.email
            }
            }
            else {
                object = {
                    name: this.state.name,
                    contactNumber: this.state.contactNumber
                }
            }
            temp[this.state.index] = object
            const number = localStorage.getItem("uid")
            firestore.collection("registration").doc(number).update ({
                team: temp
            }).then(() => {window.location.reload()}).catch(err => console.log(err.message))
        }
        return (
            <div className="main-page">
            {this.state.isLoading ? <Spinner /> : 
            <div style={{marginLeft:"1.5rem", marginTop:"1.5rem", marginRight:"1.5rem"}}>
                <h3>EDIT TEAM MEMBERS</h3>
                {this.state.isEditTeam ? <div>
                <h4>SPORTS: {this.state.registration.sportsName.toUpperCase()}</h4>
                <div>
                    {this.state.registration.team.map((eachMember, index) => {
                        return (
                            <div key={index}>
                                <h3>MEMBER {index+1}</h3>
                                <div style={{display:"flex"}}>
                                    <Input style={{width:"250px"}} value={eachMember.name} />
                                    <Input style={{width:"250px"}} value={eachMember.contactNumber} />
                                    <Button onClick={() => modalOpen(eachMember, index)} style={{width:"max-content"}} color="success" >
                                        EDIT MEMBER
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div></div> : <div>Please register in a sport to edit team</div>}
                <Modal isOpen={this.state.isModalOpen} toggle={() => {this.setState({isModalOpen: !this.state.isModalOpen})}} >
                    <ModalHeader style={{color:"black"}} toggle={() => this.setState({isModalOpen: false})}>
                        EDIT DETAILS
                    </ModalHeader>
                    <ModalBody>
                        <Label style={{color:"black", marginLeft:"5px"}}>NAME</Label>
                        <Input onChange={onChange} name="name" value={this.state.name} />
                        <Label style={{color:"black", marginLeft:"5px"}}>CONTACT NUMBER</Label>
                        <Input onChange={onChange} name="contactNumber" value={this.state.contactNumber} />
                        {this.state.email !== "" && 
                        <div>
                           <Label style={{color:"black", marginLeft:"5px"}}>EMAIL</Label>
                            <Input onChange={onChange} name="email" value={this.state.email} /> 
                        </div>}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={saveEdit} color="success" >
                            SAVE
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            }
            </div>
        )
    }
}

export default EditTeam