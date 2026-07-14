export const ORDER_STATUS = {
  pending: "pending",
  processing: "processing",
  "at-local-facility": "at-local-facility",
  "out-for-delivery": "out-for-delivery",
  completed: "completed",
  canceled: "canceled",
} as const;

export const PAYMENT_STATUS = {
  pending: "pending",
  succeeded: "succeeded",
  failed: "failed",
  canceled: "canceled",
  refunded: "refunded",
} as const;

export const AUTH_PROVIDERS = {
  "email-password": "email-password",
  google: "google",
} as const;

export const AUTH_STEPS = {
  login: "login",
  "verify-otp": "verify-otp",
  "forgot-password": "forgot-password",
  "reset-password": "reset-password",
} as const;

export const SHIPPING_AREAS = {
  insideDhakaCity: {
    value: "IDC",
    name: "Inside Dhaka City",
    shippingCharge: 50,
  },
  outsideDhakaCity: {
    value: "ODC",
    name: "Outside Dhaka City",
    shippingCharge: 100,
  },
};
