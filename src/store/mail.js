import { createSlice } from "@reduxjs/toolkit";

const mail = createSlice({
  name: "mail",
  initialState: {
    mails: null,
  },
  reducers: {
    getMails: (state, action) => {
      state.mails = action.payload;
    },
  },
});

export const mailAction = mail.actions;
export default mail.reducer;