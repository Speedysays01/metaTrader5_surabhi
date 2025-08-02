import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Holdings from "./pages/holdings/Holdings";
import Funds from "./pages/funds/Funds";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import WatchList from "./components/watchlist/WatchList";
import Logout from "./components/logout/Logout";
import "./App.css"; // Assuming you have some global styles
const App = () => {
  return (
    <>
      <Navbar />
      <WatchList />
      <Routes>
      
        <Route path="/" element={<Dashboard />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/watchlist" element={<WatchList/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </>
  );
};

export default App;
