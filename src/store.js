import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './features/movie/movieSlice'
import heroReducer from './features/hero/heroSlice'
import normReducer from './features/common/normSlice'
export const store = configureStore({
    reducer: {
        movie: movieReducer
        , hero: heroReducer
        , norm: normReducer
    },
})
