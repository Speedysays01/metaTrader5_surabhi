// src/components/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const msg = "You have been logged out successfully.";

  useEffect(() => {
    localStorage.removeItem("userId"); // Clear session
    toast.success(msg, { position: "top-right" })
    navigate("/login"); // Redirect to login page
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;
