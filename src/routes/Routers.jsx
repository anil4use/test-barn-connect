import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "../pages/scrollToTop";
import { Toaster } from "react-hot-toast";
import Home from "../pages/home/index";
import Product from "../pages/product/Index";
import JobListing from "../pages/Jobs-listing/Index";
import JobDetails from "../pages/job-details/Index";
import ApplyJob from "../pages/job-details/JobApply";
import Services from "../pages/services/Index";
import Wishlist from "../pages/wishlist/Index";
import CheckOut from "../pages/check-out/Index";
import RentalCheckOut from "../pages/rentel-check-out/Index";
import AddToCard from "../pages/Cart/Index";
import ContactUs from "../pages/contact-us/Index";
import Profile from "../pages/profile/Index";
import Coupons from "../pages/coupon/Index";
import OrderTracking from "../pages/order-tracking/Index";
import OrderHistory from "../pages/order-history/Index";
import ManageAddress from "../pages/manage-address/Index";
import OrderCompleted from "../pages/order-complet/Index";
import OrderFailed from "../pages/order-failed/Index";
import ProductDetails from "../pages/product-details/Index";
import ServiceDetails from "../pages/service-details/Index";
import Navbar from "../components/navbar/index";
import Footer from "../components/footer/index";
import Calendar from "../pages/calendar/Index";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyCode from "../pages/auth/VerifyCode";
import SetNewPassword from "../pages/auth/SetNewPassword";
import ForgotOtpVerify from "../pages/auth/ForgotOtpVerify";
import PageNotFound from "../components/shared/404/Index";
import PrivacyPolicy from "../pages/policies/PrivacyPolicy";
import ShippingPolicy from "../pages/policies/ShippingPolicy";
import TermAndCondition from "../pages/policies/Term&Condition";
import Return from "../pages/policies/ReturnPolicy";
import TermsUse from "../pages/policies/TermsUse";
import Cancellation from "../pages/policies/Cancellation";
import BecomeMember from "../pages/become-member/Index";
import Barn from "../pages/barn/Index";
import BarnDetails from "../pages/barn-details/Index";
import HorseManage from "../pages/horse-manages/index";
import HorseListing from "../pages/horse-manages/listing";
import HorseDetails from "../pages/horse-details/Index";
import SuccessPage from "../pages/paymentPage/success/index";
import FailedPage from "../pages/paymentPage/faild/index";

const Routers = () => {
  return (
    <React.Suspense>
      <Navbar />
      <Toaster
        toastOptions={{
          duration: 7000,
        }}
      />
      <ScrollToTop />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/setnew-password" element={<SetNewPassword />} />
        <Route path="/Enter-Otp" element={<ForgotOtpVerify />} />

        <Route path="/" element={<Home />} />

        {/* <Route path="/auth/verify-email" element={<VerifyEmail />} /> */}
        <Route path="/horses" element={<HorseListing />} />

        <Route path="/horse/details/:id" element={<HorseDetails />} />
        <Route path="/horse/update/:id" element={<HorseManage />} />
        <Route path="/horse/register" element={<HorseManage />} />
        <Route path="/products" element={<Product />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/successUrl"
          element={
            <ProtectedRoute>
              <SuccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancelUrl"
          element={
            <ProtectedRoute>
              <FailedPage />
            </ProtectedRoute>
          }
        />
        <Route path="/services" element={<Services />} />
        <Route path="/order-completed" element={<OrderCompleted />} />
        <Route path="/order-failed" element={<OrderFailed />} />

        <Route
          path="/order-history"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-address"
          element={
            <ProtectedRoute>
              <ManageAddress />
            </ProtectedRoute>
          }
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/check-out"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rental-check-out"
          element={
            <ProtectedRoute>
              <RentalCheckOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <AddToCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-tracking"
          element={
            <ProtectedRoute>
              <OrderTracking />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/barns" element={<Barn />} />

        <Route path="/barn/:id" element={<BarnDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms-and-conditions" element={<TermAndCondition />} />
        <Route path="/terms-of-use" element={<TermsUse />} />
        <Route path="/return-policy" element={<Return />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cancellation-policy" element={<Cancellation />} />
        <Route path="/become-member" element={<BecomeMember />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/jobs" element={<JobListing />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/apply/:id" element={<ApplyJob />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </React.Suspense>
  );
};

export default Routers;
