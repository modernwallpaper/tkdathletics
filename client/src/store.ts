import { configureStore } from "@reduxjs/toolkit" 
import authReducer from "./slices/auth.slice";
import { apiSlice } from "./slices/api.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
