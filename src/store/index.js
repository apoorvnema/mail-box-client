import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import mailReducer from "./mail";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mail: mailReducer,
  },
});

export default store;