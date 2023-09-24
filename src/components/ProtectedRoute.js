import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const token = sessionStorage.getItem('token');

    if(!token) {
        return (
            <Navigate to={'/login'} replace />
        )
    }

    return <Outlet/>
}

export default ProtectedRoute;