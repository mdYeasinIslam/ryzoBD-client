import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Roles = ("admin" | "customer")[];
export type User = {
  roles: Roles;
  name: string | null;
  avatar: string | null;
  _id: string | null;
  email: string | null;
};

type State = {
  user: User;
  accessToken: string | null;
  status: "authenticated" | "loading" | "unauthenticated";
};

const initialUser = {
  roles: [] as Roles,
  name: null,
  avatar: null,
  _id: null,
  email: null,
};
const initialState: State = {
  user: initialUser,
  accessToken: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<State>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.status = action.payload.status;
    },
    logout: (state) => {
      state.user = initialUser;
      state.accessToken = null;
      state.status = "loading";
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
