import { selectIsAuthenticated } from "../Store/Slices/userSlice";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

// Create a ProtectedRoute component that wraps protected pages
const ProtectedRoute = ({ children }:any) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate  = useNavigate();
    const location=useLocation();
  
    useEffect(() => {
    
      if (!isAuthenticated) {
        navigate('/authenticateUser'); // Redirect to the home page if not authenticated
      }
    }, [isAuthenticated, location.pathname]);
  
    return children;
  };
  
  export default ProtectedRoute;
  
