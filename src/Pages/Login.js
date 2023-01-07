import React from "react"
import "../Styles/Login.css"
import { googleRegistration, loginMethod, signinMethod, resetPassword } from "../config"
import LoginImage from "../Assets/sports.png"
import {Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Button} from "reactstrap"
import { Navigate } from "react-router-dom"

class Login extends React.Component {
    constructor () {
        super ()
        this.state = {
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
            currentPage: "login",
            isModalOpen: false,
            isLoggedIn: false
        }
    }
    componentDidMount () {
        const number = localStorage.getItem("uid")
        if (number)
            this.setState ({isLoggedIn: true})
    }

    render () {
        const onChange = (event) => {
            const {value, name} = event.target
            this.setState ({[name]: value})
        }
        const changePage = () => {
            if (this.state.currentPage === "login")
                this.setState ({currentPage: "signup"})
            else 
                this.setState({currentPage: "login"})
            this.setState ({name: "", email:"", confirmPassword: "", password: ""})
        }
        if (this.state.isLoggedIn) return <Navigate to="/register" />
        return (
            <div className="login-container main-page">
                <div className="login-box">
                    <h1>ARENA</h1>
                    <h3>PLAY HARD. PLAY STRONG</h3>
                    <img src={LoginImage} alt="login" />
                </div>
                {this.state.currentPage === "login" &&
                <div className="login-box">
                    <h2>Login</h2>
                    <div style={{display:"flex", flexDirection:"column", justifyContent: "center"}}>
                        <input name="email" onChange={onChange} placeholder="Your Email Address" value={this.state.email} />
                        <input name="password" type="password" onChange={onChange} placeholder="Password" value={this.state.password} />
                        <div style={{marginTop:"10px", display:"flex", justifyContent:"center"}}>
                            <div onClick={() => this.setState ({isModalOpen: true})} style={{cursor:"pointer"}}>Forgot Password?</div>
                            <button style={{marginLeft: "100px"}} onClick={() => loginMethod(this.state.email, this.state.password)}>Login</button>
                        </div>
                        OR <br />
                        <button className="google-login-button" onClick={googleRegistration}>
                            <i className="fa fa-google"></i> GOOGLE
                        </button>
                        <div onClick={changePage}>
                            Don't have an Account? <span style={{cursor:"pointer"}}> Sign Up</span>
                        </div>
                    </div>
                </div>
                }
                {this.state.currentPage === "signup" &&
                <div className="login-box">
                    <h2>Sign Up</h2>
                    <input name="name" onChange={onChange} placeholder="Your Name" value={this.state.name} />
                    <input name="email" onChange={onChange} placeholder="Your Email Address" value={this.state.email} />
                    <input name="password" type="password" onChange={onChange} placeholder="Password" value={this.state.password} />
                    <input name="confirmPassword" type="password" onChange={onChange} placeholder="Confirm Password" value={this.state.confirmPassword} />
                    <div>
                        <button style={{marginTop:"10px", marginBottom:"10px"}} onClick={() => signinMethod(this.state.name, this.state.email, this.state.password)}>Sign Up</button>
                    </div>
                    OR <br />
                    <button className="google-login-button" onClick={googleRegistration}>
                     <i className="fa fa-google"></i> GOOGLE
                    </button>
                    <div>
                        Already have an Account? <span onClick={changePage} style={{cursor:"pointer"}}> Login </span>
                    </div>
                </div>
                }
                <Modal isOpen={this.state.isModalOpen} toggle={() => {this.setState({isModalOpen: !this.state.isModalOpen})}} >
                    <ModalHeader style={{color:"black"}} toggle={() => this.setState({isModalOpen: false})}>
                        FORGOT PASSWORD
                    </ModalHeader>
                    <ModalBody>
                        <Label style={{color:"black", marginLeft:"5px"}}>ENTER YOUR EMAIL ID</Label>
                        <Input onChange={onChange} name="email" value={this.state.email} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => resetPassword(this.state.email)} color="success" >
                            SUBMIT
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Login