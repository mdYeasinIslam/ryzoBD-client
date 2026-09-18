import { setupListeners } from "@reduxjs/toolkit/query";
import { login, logout } from "./features/auth/auth-slice";
import { configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth-slice";
import cartReducer from "./features/cart/cart-slice";
import { apiSlice } from "./api-slice";

const sessionListener = createListenerMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(sessionListener.middleware).concat(apiSlice.middleware),
  devTools: true,
});

sessionListener.startListening({
  matcher: isAnyOf(login, logout),
  effect: (_action, api) => {
    const before = api.getOriginalState() as RootState;
    const after = api.getState() as RootState;
    if (before.auth.user._id !== after.auth.user._id) api.dispatch(apiSlice.util.resetApiState());
  },
});
setupListeners(store.dispatch);
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
