import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} MasterTrader Clone | Built by Surabhi</p>
      <p className={styles.note}>For educational purposes only</p>
    </footer>
  );
};

export default Footer;
