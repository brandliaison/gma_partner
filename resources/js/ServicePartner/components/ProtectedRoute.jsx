import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    // console.log("ProtectedRoute: Checking authentication...");
    // console.log("Token:", token);
    // console.log("User:", user);

    if (!token || !user) {
        console.warn("Unauthorized - Redirecting to login...");
        return <Navigate to="/service-partner/login" replace />;
    }

    return <Outlet />; // Render child components
};

export default ProtectedRoute;
