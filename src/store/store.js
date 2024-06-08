import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import pizzaReducer from "../reducer/reducer";

const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
