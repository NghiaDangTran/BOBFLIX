import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    currHeight: 0

    , searchBar: {
        openSearch: false,
        searchValue: "", 
    }

}

const normSlice = createSlice({
    name: "norm",
    initialState,
    reducers: {
        setCurrHeight: (state, { payload }) => {
            state.currHeight = payload
        }
        , setOpenSearch: (state, { payload }) => {

            state.searchBar = { ...state.searchBar, openSearch: payload }

        }, setSearchValue: (state, { payload }) => {

            state.searchBar = { ...state.searchBar, searchValue: payload }

        }

    }


})

export const { setCurrHeight, setOpenSearch, setSearchValue } = normSlice.actions
export const NormSelector = (state) => {

    return state.norm
};

export default normSlice.reducer;