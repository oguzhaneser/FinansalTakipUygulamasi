import { configureStore } from "@reduxjs/toolkit";

import currenciesReducer from "../api/currencies-slice";
import categoriesReducer from "../api/categories-slice";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    categories: categoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
