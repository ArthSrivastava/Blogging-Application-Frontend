import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../services/auth/auth_service";

export default function PrivateRoutes() {
    return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />
}