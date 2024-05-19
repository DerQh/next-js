import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUser from "../features/authentification/useUser";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log("User not authenticated, redirecting...");
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isAuthenticated) {
    return children;
  }
  return null;
}


export default ProtectedRoutes;
