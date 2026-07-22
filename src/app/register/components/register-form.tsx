"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Link from "next/link";
import { TextInput } from "@/components/inputs";
import { useSignupByEmailMutation } from "@/redux/features/auth/auth-api";
import { toast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm({
  setStep,
  setRegisteredData,
}: {
  setStep: (step: "register" | "verify-otp") => void;
  setRegisteredData: (data: { email: string; password: string }) => void;
}) {
  const [signup, signupState] = useSignupByEmailMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signup(values);
  }

  useEffect(() => {
    if (signupState.isSuccess) {
      // toast({
      //   title: "Account created successfully",
      // });
      setRegisteredData({
        email: form.getValues("email"),
        password: form.getValues("password"),
      });
      form.reset();
      setStep("verify-otp");
    } else if (signupState.isError) {
      toast({
        title:
          (signupState.error as any)?.data?.message ||
          "An error occurred while creating account",
        variant: "destructive",
      });
      if (Array.isArray((signupState.error as any)?.data?.errors)) {
        (signupState.error as any)?.data?.errors.map((err: any) => {
          form.setError(err.field, { message: err.message });
        });
      }
    }
  }, [signupState.isSuccess, signupState.isError]);

  return (
    <div className="py-12 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-none shadow-2xl shadow-primary/15">
        <CardContent className="p-8">
          <CardHeader className="p-0 space-y-2 mb-8">
            <CardTitle className="text-4xl font-bold text-center">
              Create Account
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Join us today and start your journey
            </p>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TextInput
                name="name"
                type="text"
                label="Name"
                placeholder="Enter your name"
                control={form.control as any}
              />
              <TextInput
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                control={form.control as any}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                control={form.control as any}
              />
              <TextInput
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                control={form.control as any}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel labelDestructive className="text-sm">
                        I accept the terms & conditions
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white transition-colors"
                disabled={signupState.isLoading}
                isLoading={signupState.isLoading}
                loadingText="Creating account..."
              >
                Create Account
              </Button>
            </form>
          </Form>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="w-1/2 h-11 border-primary/20 hover:bg-primary/10 transition-colors"
            >
              <Icons.google className="mr-2 h-4 w-4 text-primary" />
              Continue with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
