import { login, logout } from "../auth/auth-slice";
import { getCart } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartProductType = "product" | "package";

type Product = {
  _id: string;
  productType: CartProductType;
  name: string;
  price: number;
  featuredImage: string;
  quantity?: number;
  packageQuote?: string;
  ownerId?: string;
  contents?: string[];
};

type CartProduct = Product & {
  quantity: number;
};

type State = {
  hydrated: boolean;
  products: CartProduct[];
};

const initialState: State = {
  products: [],
  hydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: builder => {
    builder.addCase(login, (state, action) => {
      if (!state.hydrated) { state.products = getCart(); state.hydrated = true; }
      state.products = state.products.filter(item => !item.ownerId || item.ownerId === action.payload.user._id);
      if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(state.products));
    });
    builder.addCase(logout, state => {
      state.products = state.products.filter(item => !item.ownerId);
      if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(state.products));
    });
  },
  reducers: {
    refreshCartPackage: (state, action: PayloadAction<Product>) => {
      const item = state.products.find(p => p._id === action.payload._id && p.productType === "package");
      if (item) Object.assign(item, { ...action.payload, quantity: item.quantity });
      if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(state.products));
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      if (!state.hydrated) { state.products = getCart(); state.hydrated = true; }
      const existingProductIndex = state.products.findIndex(
        (product) =>
          product._id === action.payload._id &&
          product.productType === action.payload.productType
      );
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity +=
          action.payload.quantity || 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ _id: string; productType: CartProductType }>
    ) => {
      state.products = state.products.filter(
        (product) =>
          product._id !== action.payload._id ||
          product.productType !== action.payload.productType
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{
        _id: string;
        productType: CartProductType;
        quantity: number;
      }>
    ) => {
      const existingProductIndex = state.products.findIndex(
        (product) =>
          product._id === action.payload._id &&
          product.productType === action.payload.productType
      );
      if (existingProductIndex !== -1) {
        const quantity = Math.max(
          0,
          state.products[existingProductIndex].quantity +
            action.payload.quantity
        );
        if (quantity === 0) {
          state.products = state.products.filter(
            (product) =>
              product._id !== action.payload._id ||
              product.productType !== action.payload.productType
          );
        } else {
          state.products[existingProductIndex].quantity = quantity;
        }
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    clearCart: (state) => {
      state.products = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});

export default cartSlice.reducer;
export const { refreshCartPackage, addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;
