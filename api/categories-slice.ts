import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoriesJson from "@/data/Categories.json";

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const categories = JSON.parse(JSON.stringify(CategoriesJson));
    return categories || [];
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
