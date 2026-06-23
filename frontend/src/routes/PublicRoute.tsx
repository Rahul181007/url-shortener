import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FaSpinner } from "react-icons/fa";

type PublicRouteProps={
    children:React.ReactNode;
}

const PublicRoute=({children}:PublicRouteProps)=>{
    const {isAuthenticated,isLoading}=useAuthStore();
if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <FaSpinner className="text-5xl text-blue-500 animate-spin" />
    </div>
  );
}
    if(isAuthenticated){
        return <Navigate to="/dashboard" replace/>
    }
    return <>{children}</>
}

export default PublicRoute;