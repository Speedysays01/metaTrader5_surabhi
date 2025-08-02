import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const { name, username, email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleError = (msg) => {
    toast.error(msg, {
      position: "top-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
      handleError("Please fill all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://meta-trader-backend.onrender.com/auth/signup",
        inputValue,
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      handleError("Signup failed");
    }

    setInputValue({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.container}>
      
      
        <h1 className={styles.heading}>Signup Now</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleOnChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleOnChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleOnChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleOnChange}
            />
          </div>

         

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>

           <div className={styles.linkText}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Already have an account?
            </Link>
          </div>
        </form>

        <ToastContainer />
      </div>
    
  );
};

export default Signup;
