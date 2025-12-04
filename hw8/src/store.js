import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/items/itemSlice.js"

export const store = configureStore({
  reducer: {
    users: itemsReducer,
  },
});