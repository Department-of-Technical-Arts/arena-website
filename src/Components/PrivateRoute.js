import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) => {
    const number = localStorage.getItem("uid")
    return number ? children : <Navigate to="/login" />
}

export default PrivateRoute