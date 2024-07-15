import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Pages/Provider/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user ,loading} = useContext(AuthContext)
    const loacation = useLocation()
    
    if(loading){
        return
    }
      
    if(user){
        return children;
    }
    return <Navigate state={loacation.pathname} to="/signIn"></Navigate>
};

export default PrivateRoute;