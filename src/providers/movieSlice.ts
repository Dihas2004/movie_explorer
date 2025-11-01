import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
    activeQuery: string;
    page: number;
}

const initialState: MovieState = {
    activeQuery: "",
    page: 1,
};

function setActiveQuery(state: MovieState, action: PayloadAction<string>){
    state.activeQuery = action.payload;
    state.page = 1;
}

function setPage(state: MovieState, action: PayloadAction<number>){
    state.page = action.payload;
}

function resetMovieState() {
    return initialState;
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setActiveQuery,
        setPage,
        resetMovieState,
    },
});

const MovieDetailPageActions = movieSlice.actions;
export {MovieDetailPageActions}

const movieDetailsPageReducer = movieSlice.reducer
export default movieDetailsPageReducer;
