import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type PublicRouteProps={
    children:React.ReactNode;
}

const PublicRoute=({children}:PublicRouteProps)=>{
    const {isAuthenticated,isLoading}=useAuthStore();
    if(isLoading){
        return <p>Loadin...</p>
    }
    if(isAuthenticated){
        return <Navigate to="/dashboard" replace/>
    }
    return <>{children}</>
}

export default PublicRoute;