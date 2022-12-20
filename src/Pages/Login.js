import React from "react"
import "../Styles/Login.css"
import { googleRegistration, loginMethod, signinMethod } from "../config"

class Login extends React.Component {
    constructor () {
        super ()
        this.state = {
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
            currentPage: "login"
        }
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
        return (
            <div className="login-container">
                <div className="login-box">
                    LOGO <br />
                    TAGLINE <br />
                    IMAGE
                </div>
                {this.state.currentPage === "login" &&
                <div className="login-box">
                    <h2>Login</h2>
                    <input name="email" onChange={onChange} placeholder="Your Email Address" value={this.state.email} />
                    <input name="password" type="password" onChange={onChange} placeholder="Password" value={this.state.password} />
                    <div>
                        Forgot Password?
                        <button onClick={() => loginMethod(this.state.email, this.state.password)}>Login</button>
                    </div>
                    OR <br />
                    <button onClick={googleRegistration}>
                     <i className="fa fa-google"></i>
                    </button>
                    <div onClick={changePage}>
                        Don't have an Account? Sign Up
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
                        <button onClick={() => signinMethod(this.state.name, this.state.email, this.state.password)}>Sign Up</button>
                    </div>
                    OR <br />
                    <button onClick={googleRegistration}>
                     <i className="fa fa-google"></i>
                    </button>
                    <div onClick={changePage}>
                        Already have an Account? Login
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default Login