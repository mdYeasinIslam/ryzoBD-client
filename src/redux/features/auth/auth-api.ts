import { apiSlice } from "../../api-slice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // SIGNUP
    signupByEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/signup-email",
        method: "POST",
        body: body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: body,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-forgot-password-otp",
        method: "POST",
        body: body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: body,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: body,
      }),
    }),
    resendOTP: builder.mutation({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export default authApi;

export const {
  useSignupByEmailMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
} = authApi;
