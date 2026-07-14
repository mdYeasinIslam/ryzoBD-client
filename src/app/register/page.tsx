"use client";

import { useState } from "react";
import RegisterForm from "./components/register-form";
import VerifyOTPForm from "./components/verify-otp-form";

type RegisterFormData = {
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [step, setStep] = useState<"register" | "verify-otp">("register");
  const [registeredData, setRegisteredData] = useState<RegisterFormData | null>(
    null
  );
  return (
    <div>
      {step === "register" && (
        <RegisterForm setStep={setStep} setRegisteredData={setRegisteredData} />
      )}
      {step === "verify-otp" && registeredData && (
        <VerifyOTPForm registeredData={registeredData} />
      )}
    </div>
  );
};

export default RegisterPage;
