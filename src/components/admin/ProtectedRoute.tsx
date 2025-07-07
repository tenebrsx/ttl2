import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
  const loginTime = localStorage.getItem("adminLoginTime");

  // Check if the session is still valid (24 hours)
  if (isAuthenticated && loginTime) {
    const currentTime = Date.now();
    const timeDiff = currentTime - parseInt(loginTime);
    const hoursElapsed = timeDiff / (1000 * 60 * 60);

    if (hoursElapsed > 24) {
      // Session expired, clear auth data
      localStorage.removeItem("adminAuthenticated");
      localStorage.removeItem("adminLoginTime");
      return <Navigate to="/admin/login" replace />;
    }

    // Session is valid, render protected content
    return <>{children}</>;
  }

  // Not authenticated, redirect to login
  return <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
