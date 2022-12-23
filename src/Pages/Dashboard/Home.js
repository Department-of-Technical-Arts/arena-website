import React from "react";

class Home extends React.Component {
    constructor () {
        super ()
        this.state = {
            uid: ""
        }
    }

    componentDidMount () {
        const { uid } = JSON.parse(localStorage.getItem("userDetails"))
        this.setState ({uid: uid})
    }
    render () {
        return (
            <div>
                {this.state.uid}
            </div>
        )
    }
}

export default Home