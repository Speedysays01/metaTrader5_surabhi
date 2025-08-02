// src/components/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userId"); // Clear session
    navigate("/login"); // Redirect to login page
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;
