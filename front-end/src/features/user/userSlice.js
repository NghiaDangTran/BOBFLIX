import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    loading: false,
    userName: "",
    userid: ""

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.userName = payload
            state.userid = payload

        }
        , setLoading: (state, { payload }) => {
            state.loading = payload
        }


    }


})

export const { setUser,setLoading } = userSlice.actions
export const UserSelector = (state) => {

    return state.user
};

export default userSlice.reducer;