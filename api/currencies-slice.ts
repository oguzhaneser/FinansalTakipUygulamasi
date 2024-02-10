import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrenciesJson from "@/data/Currencies.json";

export interface Currency {
  id: string;
  name: string;
  code: string;
  symbol: string;
  toUSD: number;
}

interface CurrenciesState {
  currencies: Currency[];
}

const initialState: CurrenciesState = {
  currencies: [],
};

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async () => {
    const currencies = JSON.parse(JSON.stringify(CurrenciesJson));
    return currencies || [];
  }
);

const categoriesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.currencies = action.payload;
    });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
