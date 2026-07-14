"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { login } from "@/redux/features/auth/auth-slice";
import { useAppDispatch } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { useLayoutEffect } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  // console.log("session", session);
  const dispatch = useAppDispatch();
  //   const { status: authStatus } = useAppSelector((state) => state.auth);
  useLayoutEffect(() => {
    if (status !== "loading") {
      dispatch(
        login({
          user: {
            roles: session?.user?.roles ?? [],
            name: session?.user?.name ?? null,
            avatar: session?.user?.avatar ?? null,
            _id: session?.user?._id ?? null,
            email: session?.user?.email ?? null,
          },
          accessToken: session?.accessToken ?? null,
          status,
        })
      );
    }
  }, [session, status]);
  //   if (authStatus === "loading" || status === "loading")
  //     return <h1>Loading wrapper...</h1>;
  return children;
};

export default Wrapper;
