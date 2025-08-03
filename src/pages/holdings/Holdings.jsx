import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Holdings.module.css";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [userName, setUserName] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    // Fetch holdings
    const fetchHoldings = async () => {
      try {


        const res = await axios.get(`https://meta-trader-backend.onrender.com/holdings/${userId}`);
        setHoldings(res.data);
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
        alert("Error fetching holdings");
      }
    };

    // Fetch user name
    const fetchUserName = async () => {
      try {
        const res = await axios.get(`https://meta-trader-backend.onrender.com/user/${userId}`);
        setUserName(res.data.name);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchHoldings();
    fetchUserName();
  }, [userId]);

  return (
    <div className={styles.holdingsContainer}>
      <h2 className={styles.heading}>{userName ? `${userName}'s Holdings` : "Holdings"}</h2>

      {holdings.length === 0 ? (
        <p>No holdings found.</p>
      ) : (
        <table className={styles.holdingsTable}>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Avg. Buy Price</th>
              <th>Current Price</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr key={h._id}>
                <td>{h.name}</td>
                <td>{h.qty}</td>
                <td>₹{h.avg.toFixed(2)}</td>
                <td>₹{h.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Holdings;
