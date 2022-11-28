import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    currHeight: 0
}

const normSlice = createSlice({
    name: "norm",
    initialState,
    reducers: {
        setCurrHeight: (state, { payload }) => {
            state.currHeight = payload
        }

    }


})

export const { setCurrHeight } = normSlice.actions
export const NormSelector = (state) => {

    return state.norm
};

export default normSlice.reducer;