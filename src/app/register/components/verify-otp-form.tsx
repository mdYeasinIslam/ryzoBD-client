"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { useRouter } from "next/navigation";
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
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/features/auth/auth-api";
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/ui/icons";
import { signIn } from "next-auth/react";

const DEFAULT_TIME_LEFT = 300; // 5 minutes

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP is required",
  }),
});

const VerifyOTPForm = ({
  registeredData,
}: {
  registeredData: {
    email: string;
    password: string;
  };
}) => {
  const router = useRouter();
  const [verifyOTP, verifyOTPState] = useVerifyOTPMutation();
  const [resendOTP, resendOTPState] = useResendOTPMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
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
    verifyOTP({
      email: registeredData.email,
      otp: data.otp,
    });
  }

  // console.log(form.formState.errors);

  const handleResend = () => {
    if (!canResend) return;

    resendOTP({
      email: registeredData.email,
    });
  };

  useEffect(() => {
    if (verifyOTPState.isSuccess) {
      // toast({
      //   title: "Account verified successfully",
      // });
      form.reset();
      (async () => {
        const res = await signIn("credentials", {
          email: registeredData.email,
          password: registeredData.password,
          redirect: false,
          callbackUrl: "/",
        });
        if (res?.error) {
          const error = JSON.parse(res.error);
          // console.log(error, error.statusCode);
          return toast({
            title: error?.message || "Invalid Credentials!",
            variant: "destructive",
          });
        } else if (res?.status === 200) {
          return router.replace("/");
        }
      })();
    } else if (verifyOTPState.isError) {
      toast({
        title:
          (verifyOTPState.error as any)?.data?.message ||
          "An error occurred while creating account",
        variant: "destructive",
      });
      // if (Array.isArray((verifyOTPState.error as any)?.data?.errors)) {
      //   (verifyOTPState.error as any)?.data?.errors.map((err: any) => {
      //     form.setError(err.field, { message: err.message });
      //   });
      // }
    }
  }, [verifyOTPState.isSuccess, verifyOTPState.isError]);

  useEffect(() => {
    if (resendOTPState.isSuccess) {
      setTimeLeft(DEFAULT_TIME_LEFT);
      setCanResend(false);
      form.setValue("otp", "");
    } else if (resendOTPState.isError) {
      const message = (resendOTPState.error as any)?.data?.message;
      toast({
        title: message || "An error occurred while resending OTP",
        variant: "destructive",
      });
      if (message === "Email already verified") {
        router.replace("/login");
      }
    }
  }, [resendOTPState.isSuccess, resendOTPState.isError]);

  return (
    <>
      <div className="py-12 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-none shadow-2xl shadow-primary/15">
          <CardContent className="p-8">
            <CardHeader className="p-0 space-y-2 mb-8">
              <CardTitle className="text-4xl font-bold text-center">
                Verify OTP
              </CardTitle>
              <p className="text-sm text-muted-foreground text-center">
                Join us today and start your journey
              </p>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                    {resendOTPState.isLoading ? (
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
                  disabled={verifyOTPState.isLoading}
                  isLoading={verifyOTPState.isLoading}
                  loadingText="Verifying..."
                  className="px-20 py-7 w-full"
                  type="submit"
                >
                  Verify
                </Button>
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter className="flex justify-center p-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardFooter> */}
        </Card>
      </div>
    </>
  );
};

export default VerifyOTPForm;
