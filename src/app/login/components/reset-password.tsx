"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextInput } from "@/components/inputs";
import { toast } from "@/hooks/use-toast";
import { useResetPasswordMutation } from "@/redux/features/auth/auth-api";
import { AUTH_STEPS } from "@/constants";

const formSchema = z.object({
  resetPasswordToken: z.string().min(1, "Reset password token is required"),
  newPassword: z.string().min(1, "New password is required"),
  confirmNewPassword: z.string().min(1, "Confirm new password is required"),
});

export default function ResetPassword({
  setStep,
  resetPasswordToken,
  setResetPasswordToken,
}: {
  setStep: (step: keyof typeof AUTH_STEPS) => void;
  resetPasswordToken: string;
  setResetPasswordToken: (data: string | null) => void;
}) {
  const [resetPassword, resetPasswordState] = useResetPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resetPasswordToken,
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    resetPassword(data);
  }

  useEffect(() => {
    if (resetPasswordState.isSuccess) {
      toast({
        title: "Password reset successfully",
      });
      form.reset();
      setResetPasswordToken(null);
      // console.log(resetPasswordState.data);
      setStep(AUTH_STEPS.login);
    } else if (resetPasswordState.isError) {
      toast({
        title:
          (resetPasswordState.error as any)?.data?.message ||
          "An error occurred while resetting password",
        variant: "destructive",
      });
      // console.log(resetPasswordState.error);
    }
  }, [resetPasswordState.isSuccess, resetPasswordState.isError]);

  return (
    <div className="py-12 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border border-primary shadow-2xl shadow-primary/15">
        <CardContent className="p-8">
          <CardHeader className="p-0 space-y-2 mb-8">
            <CardTitle className="text-4xl font-bold text-primary text-center">
              Reset Password
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Reset your password
            </p>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TextInput
                type="password"
                label="New Password"
                placeholder="Enter new password"
                control={form.control}
                name="newPassword"
              />
              <TextInput
                type="password"
                label="Confirm New Password"
                placeholder="Enter new password again"
                control={form.control}
                name="confirmNewPassword"
              />
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white transition-colors"
                disabled={resetPasswordState.isLoading}
                isLoading={resetPasswordState.isLoading}
              >
                Reset Password
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
        </CardContent>
        <CardFooter className="flex justify-center p-6">
          <p className="text-sm text-muted-foreground">
            Go back to
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
  );
}
