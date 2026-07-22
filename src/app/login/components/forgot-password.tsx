"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
} from "@/redux/features/auth/auth-api";
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/ui/icons";
import { TextInput } from "@/components/inputs";
import { AUTH_STEPS } from "@/constants";

const DEFAULT_TIME_LEFT = 300; // 5 minutes

const FormSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  otp: z.string().min(6, {
    message: "OTP is required",
  }),
});

const ForgotPassword = ({
  email,
  setStep,
  setResetPasswordToken,
}: {
  email: string;
  setStep: (step: keyof typeof AUTH_STEPS) => void;
  setResetPasswordToken: (data: string | null) => void;
}) => {
  const [verifyForgotPasswordOTP, verifyForgotPasswordOTPState] =
    useVerifyForgotPasswordOtpMutation();
  const [forgotPassword, forgotPasswordState] = useForgotPasswordMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: email,
      otp: "",
    },
  });
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME_LEFT);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyForgotPasswordOTP({
      email: email,
      otp: data.otp,
    });
  }

  // console.log(form.formState.errors);

  const handleResend = () => {
    if (!canResend) return;

    forgotPassword({
      email: email,
    });
  };

  useEffect(() => {
    if (verifyForgotPasswordOTPState.isSuccess) {
      // toast({
      //   title: "OTP verified successfully",
      // });
      form.reset();
      setResetPasswordToken(
        verifyForgotPasswordOTPState.data?.data?.resetPasswordToken || null
      );
      setStep(AUTH_STEPS["reset-password"]);
    } else if (verifyForgotPasswordOTPState.isError) {
      toast({
        title:
          (verifyForgotPasswordOTPState.error as any)?.data?.message ||
          "An error occurred while verifying OTP",
        variant: "destructive",
      });
    }
  }, [
    verifyForgotPasswordOTPState.isSuccess,
    verifyForgotPasswordOTPState.isError,
  ]);

  useEffect(() => {
    if (forgotPasswordState.isSuccess) {
      setTimeLeft(DEFAULT_TIME_LEFT);
      setCanResend(false);
      form.setValue("otp", "");
    } else if (forgotPasswordState.isError) {
      toast({
        title:
          (forgotPasswordState.error as any)?.data?.message ||
          "An error occurred while resending OTP",
        variant: "destructive",
      });
    }
  }, [forgotPasswordState.isSuccess, forgotPasswordState.isError]);

  const handleChangeEmail = () => {
    setStep(AUTH_STEPS["login"]);
  };

  return (
    <>
      <div className="py-12 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-none shadow-2xl shadow-primary/15">
          <CardContent className="p-8">
            <CardHeader className="p-0 space-y-2 mb-8">
              <CardTitle className="text-4xl font-bold text-center">
                Forgot Password
              </CardTitle>
              <p className="text-sm text-muted-foreground text-center">
                Enter the OTP sent to your email to reset your password
              </p>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <TextInput
                  control={form.control as any}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  readOnly
                  disabled
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleChangeEmail}
                    className="text-sm text-muted-foreground font-medium"
                  >
                    Change Email
                  </button>
                </div>
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP
                          containerClassName="justify-between w-full"
                          maxLength={6}
                          inputMode="decimal"
                          {...field}
                        >
                          <InputOTPSlot
                            index={0}
                            inputMode="numeric"
                            className="border !rounded-md text-base w-16 h-16"
                          />
                          <InputOTPSlot
                            index={1}
                            className="border !rounded-md text-base w-16 h-16"
                          />
                          <InputOTPSlot
                            index={2}
                            className="border !rounded-md text-base w-16 h-16"
                          />
                          <InputOTPSlot
                            index={3}
                            className="border !rounded-md text-base w-16 h-16"
                          />
                          <InputOTPSlot
                            index={4}
                            className="border !rounded-md text-base w-16 h-16"
                          />
                          <InputOTPSlot
                            index={5}
                            className="border !rounded-md text-base w-16 h-16"
                          />
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    className={`text-sm ${
                      canResend
                        ? "text-primary hover:underline"
                        : "text-muted-foreground"
                    }`}
                    disabled={!canResend}
                  >
                    {forgotPasswordState.isLoading ? (
                      <div className="flex items-center gap-2">
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : canResend ? (
                      "Resend OTP"
                    ) : (
                      `Resend After ${formatTime(timeLeft)}`
                    )}
                  </button>
                </div>
                <Button
                  disabled={verifyForgotPasswordOTPState.isLoading}
                  isLoading={verifyForgotPasswordOTPState.isLoading}
                  loadingText="Verifying..."
                  className="px-20 py-7 w-full"
                  type="submit"
                >
                  Verify
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center p-6">
            <p className="text-sm text-muted-foreground">
              Go back to{" "}
              <button
                onClick={() => {
                  setStep(AUTH_STEPS["login"]);
                }}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Log In
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ForgotPassword;
