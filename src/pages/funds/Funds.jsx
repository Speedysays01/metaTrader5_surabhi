import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Funds.module.css";

const Funds = () => {
  const [funds, setFunds] = useState(0);
  const [amount, setAmount] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const fetchFunds = async () => {
      try {
        const res = await axios.get(`https://meta-trader-backend.onrender.com/user/${userId}`);
        setFunds(res.data.funds);
      } catch (err) {
        console.error("Error fetching funds:", err);
        alert("Failed to fetch funds");
      }
    };

    fetchFunds();
  }, [userId]);

  const handleTransaction = async (type) => {
    const value = Number(amount);
    if (isNaN(value) || value <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const res = await axios.post(`https://meta-trader-backend.onrender.com/funds`, {
        userId,
        amount: value,
        type, // 'add' or 'withdraw'
      });

      setFunds(res.data.funds);
      setAmount("");
    } catch (err) {
      console.error("Transaction failed:", err);
      alert(err.response?.data?.error || "Transaction failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Funds</h2>
      <p className={styles.balance}>Available Funds: ₹{funds.toFixed(2)}</p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className={styles.input}
      />

      <div className={styles.buttons}>
        <button onClick={() => handleTransaction("add")}>Add Funds</button>
        <button onClick={() => handleTransaction("withdraw")}>Withdraw Funds</button>
      </div>
    </div>
  );
};

export default Funds;
