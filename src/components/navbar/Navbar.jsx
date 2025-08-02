import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Invalid user data");
      }
    }
  }, []);

  const getInitials = () => {
    if (!user) return "";
    const { name, fullName, email } = user;
    const base = fullName || name || email;
    return base ? base[0].toUpperCase() : "";
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>{user ? getInitials() : "MT"}</div>

      <div className={styles.links}>
        <Link to="/">Dashboard</Link>
        <Link to="/holdings">Holdings</Link>
        <Link to="/funds">Funds</Link>

        
          <>
            <Link to="/login">Login</Link>
            <Link to="/logout">Logout</Link>
          </>
        
      </div>

      <div className={styles.brand}>mastertrader-clone - Surabhi</div>
    </nav>
  );
};

export default Navbar;
