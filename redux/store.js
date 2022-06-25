import { configureStore } from "@reduxjs/toolkit";
import { mainSlice } from "./slices";

export default configureStore({
    reducer: {
        main: mainSlice,
    },
});
