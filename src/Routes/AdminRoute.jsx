import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = UseAdmin();
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/' state={{from: location}} ></Navigate>
};

export default AdminRoute;