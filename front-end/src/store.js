import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './features/movie/movieSlice'
import heroReducer from './features/hero/heroSlice'
import normReducer from './features/common/normSlice'
import userReducer from './features/user/userSlice'
export const store = configureStore({
    reducer: {
        movie: movieReducer
        , hero: heroReducer
        , norm: normReducer
        , user: userReducer
    },
})
