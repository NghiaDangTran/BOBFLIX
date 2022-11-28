import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TMDB_API } from '../../utils/api'
let {get_details}=TMDB_API
const initialState = {
    openHero: false,
    HeroData: {}
    // {
    //     "CurrMovie": {
    //         "image": {
    //             "backdrop_path": "https://image.tmdb.org/t/p/original/aCaqCvYn48b3lfGKGnUdVAE1yeB.jpg",
    //             "poster_path": "https://image.tmdb.org/t/p/original/oHhD5jD4S5ElPNNFCDKXJAzMZ5h.jpg",
    //             "logos": "https://image.tmdb.org/t/p/w300/d6BBea4Y3vJlxb2MRc0fLb4D4cf.png",
    //             "trailers": "https://www.youtube-nocookie.com/embed/gqECvnf52XI?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&playsinline=1"
    //         },
    //         "data": {
    //             "adult": false,
    //             "backdrop_path": "/aCaqCvYn48b3lfGKGnUdVAE1yeB.jpg",
    //             "id": 814800,
    //             "title": "Goodnight Mommy",
    //             "original_language": "en",
    //             "original_title": "Goodnight Mommy",
    //             "overview": "When twin brothers arrive home to find their mother’s demeanor altered and face covered in surgical bandages, they begin to suspect the woman beneath the gauze might not be their mother.",
    //             "poster_path": "/oHhD5jD4S5ElPNNFCDKXJAzMZ5h.jpg",
    //             "media_type": "movie",
    //             "genre_ids": [
    //                 27,
    //                 18,
    //                 53
    //             ],
    //             "popularity": 128.486,
    //             "release_date": "2022-09-16",
    //             "video": false,
    //             "vote_average": 5.82,
    //             "vote_count": 50
    //         }
    //     }
    // }
    , HeroUrl: ""
    , HeroVideoPlaying: false, 
    
    HeroDetail: {}
}

const getDetail = async (dispatch, at, id) => {
    let temp = await axios.get(get_details(id)).then(res => {
        // let items = res.data.results
        // const add = { title: type.title, items }

        return res.data
    }).catch(err => {
        console.log(err)
    })
    dispatch(at(temp))
}
export function fetchHeroDetail(id) {
    return async (dispatch) => {
        await getDetail(dispatch, setHeroDetail, id)

    }


}
const heroSlice = createSlice({
    name: "hero",
    initialState,
    reducers: {
        setOpenHero: (state, { payload }) => {
            state.openHero = payload
        }
        ,
        setHeroData: (state, { payload }) => {
            state.HeroUrl = payload.image.trailers
            state.HeroData = payload
        }
        // Hero_url, CurrMovie
        , setHeroUrl: (state, { payload }) => {
            state.HeroUrl = payload
        }
        , setHeroVideoPlaying: (state, { payload }) => {
            state.HeroVideoPlaying = payload
        }
        , setHeroDetail: (state, { payload }) => {
            state.HeroDetail = payload
        }
    }


})

export const { setOpenHero, setHeroData, setHeroUrl, setHeroVideoPlaying, setHeroDetail } = heroSlice.actions
export const HeroSelector = (state) => {

    return state.hero
};

export default heroSlice.reducer;