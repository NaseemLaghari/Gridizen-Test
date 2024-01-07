import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formReducer";
import postsDataReducer from "./postsDataReducer";

export default configureStore({
    reducer: {
        postsData: postsDataReducer,
        formData: formReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

