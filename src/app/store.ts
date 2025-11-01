import { configureStore } from "@reduxjs/toolkit";
import movieDetailsPageReducer from "../providers/movieSlice"; 


export const store = configureStore({
    reducer: {
        movie: movieDetailsPageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
