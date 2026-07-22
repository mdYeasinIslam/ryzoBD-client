/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/customer/customer-api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { TextInput } from "@/components/inputs";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useUploadFilesMutation } from "@/redux/features/media-upload/mediaUploadApi";
import { File } from "@/types";
import { useSession } from "next-auth/react";
import { siteInfo } from "@/config/site-info";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactNumber: z.string().min(1, { message: "Phone number is required" }),
});

export default function ProfilePage() {
  const {
    data: { data: { profile = null } = {} } = {},
    // ...getProfileState
  } = useGetProfileQuery({});
  const [avatar, setAvatar] = useState<File>({
    url: siteInfo.defaultUserAvatar,
  });
  const { data: session, update } = useSession();
  const [updateProfile, updateProfileState] = useUpdateProfileMutation();

  const [uploadAvatar, uploadAvatarState] = useUploadFilesMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
    },
  });

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    const uploadedAvatar = await uploadAvatar(formData).unwrap();
    const avatar = uploadedAvatar?.data?.files?.[0];
    if (avatar) {
      setAvatar(avatar);
      updateProfile({
        avatar: avatar.url,
      });
      (async () => {
        await update({
          ...session,
          user: {
            ...session?.user,
            avatar: avatar.url,
          },
        });
      })();
    }
  };

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile?.name,
        email: profile?.email,
        contactNumber: profile?.customer?.contactNumber,
      });
      setAvatar({ url: profile?.avatar || siteInfo.defaultUserAvatar });
      // update({
      //   name: profile?.name,
      //   avatar: profile?.avatar,
      // });
    }
  }, [profile]);

  // useEffect(() => {
  //   if (updateProfileState.isSuccess) {
  //     toast({
  //       title: "Profile updated",
  //     });
  //     console.log(updateProfileState.data);
  //   }
  // }, [updateProfileState]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data);
    const updatedProfile = await updateProfile({
      name: data.name,
      contactNumber: data.contactNumber,
    }).unwrap();

    if (updatedProfile.status === "success") {
      (async () => {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: data.name,
          },
        });
      })();
    }
  }

  return (
    <main className="flex-1 px-4">
      <div className="mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="border-none">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">
                  Update Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Photo Upload */}
                <div className="relative mx-auto h-[150px] w-[150px] rounded-full border-2 border-primary">
                  <Image
                    className="h-full w-full rounded-full object-cover"
                    src={avatar?.url}
                    alt="avatar"
                    width={150}
                    height={150}
                  />
                  {uploadAvatarState.isLoading && (
                    <div className="absolute bg-primary/60 text-primary-foreground top-0 left-0 w-full h-full flex items-center justify-center rounded-full">
                      uploading...
                    </div>
                  )}
                  <div className="absolute bottom-1 right-[0px] h-[32px] w-[32px] cursor-pointer">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-primary text-white">
                      <Camera className="p-1 cursor-pointer" />
                      <input
                        className="absolute left-0 top-0 scale-150 cursor-pointer opacity-0"
                        type="file"
                        id={"avatar"}
                        onChange={handleAvatarChange}
                        disabled={
                          uploadAvatarState.isLoading ||
                          updateProfileState.isLoading
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="space-y-2">
                  <Label>Photo</Label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-primary/20 border-dashed p-12 transition-colors hover:border-primary/40">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-primary/60" />
                      <div className="mt-4 text-sm font-medium">
                        Drag your image here
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        (Only *.jpeg and *.png images will be accepted)
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* Form Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  <TextInput
                    name="name"
                    label="Full Name"
                    placeholder="Justin J. Ruiz"
                    control={form.control as any}
                  />

                  <TextInput
                    name="email"
                    label="Email Address"
                    placeholder="justin@gmail.com"
                    control={form.control as any}
                    readOnly
                    disabled
                  />

                  <TextInput
                    name="contactNumber"
                    label="Phone/Mobile"
                    placeholder="212-512-2888"
                    control={form.control as any}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    size="lg"
                    className="bg-primary min-w-[200px] text-white hover:bg-primary/90"
                    disabled={updateProfileState.isLoading}
                    isLoading={updateProfileState.isLoading}
                  >
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </main>
  );
}
