// src/Layout.jsx
import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  const location = useLocation();

  // Define routes where you want to hide the Navbar/Footer
  const hideChat = ["/chat"];

  const hideRegister = ["/register"];
  const hideLogin = ["/login"];
  const hideOtp = ["/otp"];
  const hideSubscription = ["/subscription"];
  const hideProfile = ["/profile"];
  const hideGoogleUrl = ["/handleOAuthCallback"];
  const hidePaymentRedirect = ["/paymentredirect"];
  const hideForgotpassword = ["/forgotpassword"];
  const hideResetpassword = ["/password_reset"];
  const hideCoupon = ["/coupon"];

  // Check if any of these routes match the current path
  const shouldHideChat = hideChat.includes(location.pathname);

  const shouldHideSubscription = hideSubscription.includes(location.pathname);
  const shouldHideProfile = hideProfile.includes(location.pathname);
  const shouldHideLogin = hideLogin.includes(location.pathname);
  const shouldHideRegister = hideRegister.includes(location.pathname);
  const shouldHideGoogleUrl = hideGoogleUrl.includes(location.pathname);
  const shouldhidePaymentRedirect= hidePaymentRedirect.includes(location.pathname);
  const shouldhideOtp= hideOtp.includes(location.pathname);
  const shouldhideForgotpassword= hideForgotpassword.includes(location.pathname);
  const shouldhideresetpassword= hideResetpassword.includes(location.pathname);
  const shouldHideCoupon= hideCoupon.includes(location.pathname);

  // Determine if Navbar and Footer should be shown
  const showHeaderFooter = !shouldHideChat && !shouldHideSubscription && !shouldHideProfile  && !shouldHideLogin && !shouldHideRegister && !shouldHideGoogleUrl  && !shouldhideOtp && !shouldhideForgotpassword && !shouldhideresetpassword && !shouldhidePaymentRedirect && !shouldHideCoupon;

  return (
    <>
      {showHeaderFooter && <Navbar />}
      <Outlet />
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
