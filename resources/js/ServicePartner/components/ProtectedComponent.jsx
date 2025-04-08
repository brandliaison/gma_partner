import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedComponent = ({ element, allowedUserTypes }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("ProtectedComponent: Checking user role...");
    console.log("User:", user);

    if (!user) {
        console.warn("User not found - Redirecting to login...");
        return <Navigate to="/service-partner/login" replace />;
    }

    if (allowedUserTypes && !allowedUserTypes.includes(user.userType)) {
        console.warn("Unauthorized user type - Redirecting...");
        return <Navigate to="/service-partner/login" replace />;
    }

    return element;
};

export default ProtectedComponent;
