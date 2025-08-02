import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Login.module.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "top-right" });

  const handleError = (msg) =>
    toast.error(msg, { position: "top-right" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://meta-trader-backend.onrender.com/auth/login",
        inputValue,
        { withCredentials: true }
      );

      const { success, message, user } = data;

      if (success) {
        handleSuccess(message);

        if (user && user._id) {
          localStorage.setItem("userId", user._id);
          localStorage.setItem("user", JSON.stringify(user));

        
            navigate("/");
        
        }
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);
      handleError("Login failed");
    }

    setInputValue({ email: "", password: "" });
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleOnChange}
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleOnChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
