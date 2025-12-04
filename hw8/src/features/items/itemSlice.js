import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, fetchUserById } from "../../services/fetchService.js";

const initialState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: "",
};

export const loadItems = createAsyncThunk(
  "items/loadItems",
  async (_, thunkAPI) => {
    const data = await fetchUsers(); 
    return data;
  }
);

export const loadItemById = createAsyncThunk(
  "items/loadItemById",
  async (id, thunkAPI) => {
    const data = await fetchUserById(id); 
    return data;
  }
);

const itemsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
      state.errorItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList =
          action.error?.message || "Failed to load users";
      });

    
    builder
      .addCase(loadItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(loadItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload; 
      })
      .addCase(loadItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem =
          action.error?.message || "Failed to load user details";
      });
  },
});

export const { setQuery, clearSelectedItem } = itemsSlice.actions;
export default itemsSlice.reducer;
