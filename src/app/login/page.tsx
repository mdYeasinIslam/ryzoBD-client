"use client";

import { useState } from "react";
import LoginForm from "./components/login-form";
import VerifyOTPForm from "../register/components/verify-otp-form";
import ForgotPassword from "./components/forgot-password";
import ResetPassword from "./components/reset-password";
import { AUTH_STEPS } from "@/constants";

type RegisterFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [step, setStep] = useState<keyof typeof AUTH_STEPS>(AUTH_STEPS.login);
  const [registeredData, setRegisteredData] = useState<RegisterFormData | null>(
    null
  );
  const [forgotPasswordStepEmail, setForgotPasswordStepEmail] = useState<
    string | null
  >(null);
  const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(
    null
  );
  return (
    <div>
      {step === AUTH_STEPS["login"] && (
        <LoginForm
          setStep={setStep}
          setRegisteredData={setRegisteredData}
          setForgotPasswordStepEmail={setForgotPasswordStepEmail}
        />
      )}
      {step === AUTH_STEPS["verify-otp"] && registeredData && (
        <VerifyOTPForm registeredData={registeredData} />
      )}
      {step === AUTH_STEPS["forgot-password"] && forgotPasswordStepEmail && (
        <ForgotPassword
          setStep={setStep}
          email={forgotPasswordStepEmail}
          setResetPasswordToken={setResetPasswordToken}
        />
      )}
      {step === AUTH_STEPS["reset-password"] && resetPasswordToken && (
        <ResetPassword
          setStep={setStep}
          resetPasswordToken={resetPasswordToken}
          setResetPasswordToken={setResetPasswordToken}
        />
      )}
    </div>
  );
};

export default LoginPage;
