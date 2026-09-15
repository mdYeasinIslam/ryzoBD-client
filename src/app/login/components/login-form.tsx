"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { TextInput } from "@/components/inputs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth-api";
import { AUTH_STEPS } from "@/constants";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginForm({
  setStep,
  setRegisteredData,
  setForgotPasswordStepEmail,
}: {
  setStep: (step: keyof typeof AUTH_STEPS) => void;
  setRegisteredData: (data: { email: string; password: string }) => void;
  setForgotPasswordStepEmail: (email: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [forgotPassword] = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    let redirectPathname = "/";
    if (typeof window !== "undefined") {
      redirectPathname = localStorage.getItem("redirectUrl") || "/";
      localStorage.removeItem("redirectUrl");
    }
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    setIsLoading(false);
    if (res?.error) {
      const error = JSON.parse(res.error);
      // console.log(error, error.statusCode);
      if (error.statusCode === 403) {
        setStep("verify-otp");
        setRegisteredData({ email: data.email, password: data.password });
        form.reset();
      }
      return toast({
        title: error?.message || "Invalid Credentials!",
        variant: "destructive",
      });
    } else if (res?.status === 200) {
      return router.replace(redirectPathname);
    }
  }

  async function handleGoogleLogin() {
    let redirectPathname = "/";
    if (typeof window !== "undefined") {
      redirectPathname = localStorage.getItem("redirectUrl") || "/";
      localStorage.removeItem("redirectUrl");
    }
    signIn("google", { redirect: false, callbackUrl: redirectPathname });
  }

  async function handleForgotPassword() {
    const email = form.getValues("email");
    if (email && formSchema.shape.email.safeParse(email).success) {
      form.clearErrors("email");
      try {
        const res = await forgotPassword({ email }).unwrap();
        // console.log(res);
        toast({
          title: res.message,
        });
        setForgotPasswordStepEmail(email);
        setStep(AUTH_STEPS["forgot-password"]);
      } catch (error) {
        // console.error(error);
        toast({
          title:
            (error as any)?.data?.message ||
            "An error occurred while sending OTP. Please try again",
          variant: "destructive",
        });
      }
    } else {
      form.setError("email", { message: "Valid email is required" });
    }
  }

  return (
    <div className="py-12 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border border-primary shadow-2xl shadow-primary/15">
        <CardContent className="p-8">
          <CardHeader className="p-0 space-y-2 mb-8">
            <CardTitle className="text-4xl font-bold text-primary text-center">
              Welcome Back
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Sign in to your account
            </p>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TextInput
                control={form.control as any}
                name="email"
                label="Email Address"
                placeholder="Enter your email"
              />
              <TextInput
                control={form.control as any}
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-primary font-semibold hover:bg-primary/90 text-white transition-colors"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </form>
          </Form>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="w-full h-11 border-primary/20 font-semibold hover:bg-primary/10 transition-colors hover:border-lime-600"
              onClick={handleGoogleLogin}
            >
              <Icons.google className="mr-2 h-4 w-4 text-lime-700" />
              Continue with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-6">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:text-primary/80 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
