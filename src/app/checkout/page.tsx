import ProtectedRoute from "@/components/auth/protect";
import React from "react";
import Checkout from "./components";

const CheckoutPage = () => {
  return (
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  );
};

export default CheckoutPage;
