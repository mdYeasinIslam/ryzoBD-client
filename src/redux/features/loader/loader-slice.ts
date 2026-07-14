import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// TODO: will be implemented loader for product loading based on query change later
type State = {
  isProductDataLoading: boolean;
};

const initialState: State = {
  isProductDataLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setProductLoader: (state, action: PayloadAction<boolean>) => {
      state.isProductDataLoading = action.payload;
    },
  },
});

export default loaderSlice.reducer;
export const { setProductLoader } = loaderSlice.actions;
