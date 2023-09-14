import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./reducer/reducer";

const store = configureStore({
  reducer: {
    task: taskSlice,
  },
});

export default store;
