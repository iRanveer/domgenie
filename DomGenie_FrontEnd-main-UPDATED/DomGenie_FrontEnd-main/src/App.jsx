// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import Home2 from "./components/Home2";
import Home3 from "./components/Home3";
import Price from "./components/Price";
import Login from "./components/Login";
import Otp from "./components/Otp";
import Register from "./components/Register";
import Policy from "./components/Policy";
import Terms from "./components/Terms";
import Contact from "./components/Contact";
import About from "./components/About";
import Topicsupport from "./components/Topicsupport";
import Guidelines from "./components/Guidelines";
import Chat from "./Chat";
import Forgotpassword from "./components/Forgotpassword";

import Subscription from "./Subscription";
import Profile from "./Profile";
import Paymentredirect from "./Paymentredirect";
import HandleOAuthCallback from "./handleOAuthCallback";
import Password_reset from "./components/Password_reset";
import Coupon from "./Coupon";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/home3" element={<Home3 />} />
          <Route path="/price" element={<Price />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/topicsupport" element={<Topicsupport />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/chat" element={<Chat />} />
        
          <Route path="/register" element={<Register />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/paymentredirect" element={<Paymentredirect />} />
          <Route path="/handleOAuthCallback" element={<HandleOAuthCallback />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/password_reset" element={<Password_reset />} />
          <Route path="/coupon" element={<Coupon />} />
        </Route>
      </Routes>
    </Router>
  );
}
