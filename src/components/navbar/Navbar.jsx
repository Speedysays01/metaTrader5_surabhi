import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    if (!user) return "MT";
    const { name, fullName, email } = user;
    const base = fullName || name || email;
    return base ? base[0].toUpperCase() : "M";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>{getInitials()}</div>

        {/* Desktop links */}
        <div className={styles.desktopLinks}>
          <Link to="/">Dashboard</Link>
          <Link to="/holdings">Holdings</Link>
          <Link to="/funds">Funds</Link>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/login">Login</Link>
          <Link to="/logout">Logout</Link>
        </div>

        {/* Mobile hamburger icon */}
        <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" />
            </svg>
          )}
        </div>

        <div className={styles.brand}>mastertrader-clone - Surabhi</div>
      </nav>

      {/* Optional: backdrop for dimming the background */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
        />
      )}

      {/* Sidebar */}
      {isMobileMenuOpen && (
        <div className={styles.mobileSidebar}>
          <Link to="/" onClick={toggleMobileMenu}>Dashboard</Link>
          <Link to="/holdings" onClick={toggleMobileMenu}>Holdings</Link>
          <Link to="/funds" onClick={toggleMobileMenu}>Funds</Link>
          <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
          <Link to="/logout" onClick={toggleMobileMenu}>Logout</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
