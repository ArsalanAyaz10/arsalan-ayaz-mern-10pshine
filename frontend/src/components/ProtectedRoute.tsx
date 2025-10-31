import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  
  const user = localStorage.getItem("user"); 
  const token = localStorage.getItem("accessToken"); 

  console.log(user);
  console.log(token);

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
