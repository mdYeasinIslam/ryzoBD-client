"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextInput } from "@/components/inputs";
import { useChangePasswordMutation } from "@/redux/features/auth/auth-api";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { AUTH_PROVIDERS } from "@/constants";
import { notFound } from "next/navigation";

const formSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(1, "New password is required"),
  confirmNewPassword: z.string().min(1, "Confirm new password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ChangePasswordPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [changePassword, changePasswordState] = useChangePasswordMutation();

  const onSubmit = (values: FormValues) => {
    changePassword(values);
  };

  useEffect(() => {
    if (changePasswordState.isSuccess) {
      toast({
        title: "Password changed successfully",
      });
      form.reset();
      // console.log(changePasswordState.data);
    } else if (changePasswordState.isError) {
      toast({
        title:
          (changePasswordState.error as any)?.data?.message ||
          "An error occurred while changing password",
        variant: "destructive",
      });
      // console.log(changePasswordState.error);
    }
  }, [changePasswordState]);

  const { data: session } = useSession();

  if (session?.user?.authProvider !== AUTH_PROVIDERS["email-password"]) {
    return notFound();
  }

  return (
    <main className="flex-1 px-4">
      <div className="mx-auto">
        <Card className="border-none">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold">
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <TextInput
                  type="password"
                  label="Current Password"
                  placeholder="Enter your current password"
                  control={form.control}
                  name="currentPassword"
                />
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

                <div className="flex justify-end">
                  <Button type="submit">Change Password</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
