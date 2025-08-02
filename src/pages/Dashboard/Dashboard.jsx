import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    // Fetch user data
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://meta-trader-backend.onrender.com/user/${userId}`);
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        alert("Failed to fetch user data");
      }
    };

    // Fetch profit/loss transactions
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`https://meta-trader-backend.onrender.com/transactions/${userId}`);
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        alert("Failed to fetch transaction logs");
      }
    };

    fetchUser();
    fetchTransactions();
  }, []);

  if (!userData) {
    return <div className={styles.dashboardContainer}>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.heading}>Welcome, {userData.name}</h2>

      <div className={styles.card}>
        <div className={styles.sub}>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        </div>
        <p><strong>Available Funds:</strong> ₹{userData.funds.toFixed(2)}</p>

      </div>

      <h3 className={styles.sectionTitle}>Transaction History (P/L)</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <table className={styles.transactionTable}>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Mode</th>
              <th>Qty</th>
              <th>Price</th>
              <th>P/L</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.name}</td>
                <td>{tx.mode}</td>
                <td>{tx.qty}</td>
                <td>₹{tx.price.toFixed(2)}</td>
                <td className={tx.pl > 0 ? styles.profit : tx.pl < 0 ? styles.loss : ""}>
                  {tx.mode === "SELL" ? `₹${tx.pl.toFixed(2)}` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
