import { getCart } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  _id: string;
  name: string;
  price: number;
  featuredImage: string;
  quantity?: number;
};

type CartProduct = Product & {
  quantity: number;
};

type State = {
  products: CartProduct[];
};

const initialState: State = {
  products: getCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
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
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (existingProductIndex !== -1) {
        const quantity = Math.max(
          0,
          state.products[existingProductIndex].quantity +
            action.payload.quantity
        );
        if (quantity === 0) {
          state.products = state.products.filter(
            (product) => product._id !== action.payload._id
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
export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;
