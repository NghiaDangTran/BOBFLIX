import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TMDB_API } from '../../utils/api'
let { get_trending, get_now_playing, get_popular, movie_genre, searchMovie, get_video_id, get_trailer, get_image_original, get_image, get_logo, get_logo_image, } = TMDB_API

const initialState = {



    TopBanner: {},
    TopBanner_url: ""
    , TopBanner_video_play: false

    , data: {

    }
    ,
    loading: false,
    TopBannerData: true,
    error: false,
    items: [],
    detail_movie: [
        {
            id: 7863,
            content: []
        },




    ],
    MoviePage: {
        currGenre: -1,
        currPage: 1,
        loading: true,
        loadNextPage: false,
        data: [],
        render: []
    }




};

const GetDetail = async (dispatch, type, at, imageType) => {

    let temp = await axios.get(type.url).then(res => {
        let items = res.data.results
        const add = { title: type.title, items }

        return add
    }).catch(err => {
        console.log(err)
    })
    const GetImages = await Promise.all(temp.items.map(async i => {
        let { id } = i
        const images1 = {}
        return await axios.get(get_logo(id)).then(async (res) => {
            let { backdrop_path, poster_path, images: { logos } } = res.data

            images1["backdrop_path"] = backdrop_path ? imageType(backdrop_path) : poster_path ? imageType(poster_path) : "https://www.colonnade-insurance.com/img/no-img.jpg"
            images1["backdrop_path_original"] = backdrop_path ? get_image_original(backdrop_path) : poster_path ? get_image_original(poster_path) : "https://www.colonnade-insurance.com/img/no-img.jpg"

            images1["poster_path"] = imageType(poster_path)
            if (logos.length >= 1) {
                logos.sort((a, b) => {

                    return b.vote_count - a.vote_count || b.vote_average - a.vote_average


                })

                images1["logos"] = get_logo_image(logos[0].file_path)
            }
            else {
                images1["logos"] = false
            }

            await axios.get(get_video_id(id)).then(i => {


                let dataAll = i.data.results.filter(i => {

                    return i.name.toLowerCase().includes("trailer")

                })

                if (dataAll.length >= 1)
                    images1["trailers"] = get_trailer(dataAll[0].key)
                else images1["trailers"] = false



            }
            )







            return images1


        }).catch(err => console.log(err))
    }))
    temp["images"] = GetImages
    dispatch(at(temp))


}
export function fetchItems() {

    return async (dispatch) => {


        dispatch(setLoading(true))
        await GetDetail(dispatch, get_trending, setItems, get_image)

        await GetDetail(dispatch, get_popular, setItems, get_image)

        await GetDetail(dispatch, get_now_playing, setItems, get_image)
        // await GetDetail(dispatch, get_top_rate, setItems, get_image)
        // await GetDetail(dispatch, get_up_coming, setItems, get_image)

        // genres.map(async(i) => {
        //     await  GetDetail(dispatch, movie_genre(i.id, i.name), setItems, get_image)
        // })
        // Promise.all
        //     (genres.map(async i => {
        //         GetDetail(dispatch, movie_genre(i.id, i.name), setItems, get_image)
        //     }))

        dispatch(setLoading(false))

    };
}

export function fetchTopBanner() {
    return async (dispatch) => {

        dispatch(setTopBannerData(true))
        await GetDetail(dispatch, get_trending, setTopBannerVideo, get_image_original)


        dispatch(setTopBannerData(false))

    };
}


export function fetchMovieGenre(genreid, page, key = "") {
    let urlGenre;
    if (genreid !== -2)
        urlGenre = movie_genre(genreid, "", page)

    else
        urlGenre = { title: "",url: searchMovie(key, page) }
    // console.log(urlGenre)

    return async (dispatch) => {
        dispatch(setMoviePage_loading(true))
        dispatch(setMoviePage_currPage(page))
        dispatch(setMoviePage_currGenre(genreid))
        await GetDetail(dispatch, urlGenre, setMoviePage_data, get_image)


        dispatch(setMoviePage_loading(false))
    }
}




const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        getTrending: (state) => {
            state["trending"] = axios

        },

        setLoading: (state, { payload }) => {
            state.loading = payload;
        }
        , setItems: (state, { payload }) => {




            state.data[payload.title] = payload

        }, setTopBannerVideo: (state, { payload }) => {
            if (payload.title)
                state.TopBanner = payload
        }
        , setTopBannerData:
            (state, { payload }) => {
                state.TopBannerData = payload;
            }

        , setTopBannerVideo_play: (state, { payload }) => {
            state.TopBanner_video_play = payload
        }
        , setTopBannerVideo_url: (state, { payload }) => {
            state.TopBanner_url = payload
        }
        ,


        setMoviePage_currGenre: (state, { payload }) => {
            state.MoviePage.currGenre = payload
        },
        setMoviePage_currPage: (state, { payload }) => {
            state.MoviePage.currPage = payload
        },
        setMoviePage_loading: (state, { payload }) => {
            state.MoviePage.loading = payload
        }
        , setMoviePage_loadNextPage: (state, { payload }) => {
            state.MoviePage.loadNextPage = payload

        }
        , setMoviePage_data: (state, { payload }) => {


            if (state.MoviePage.currPage === 1) {
                state.MoviePage.render = []
                state.MoviePage.data = [{ payload }]
            }
            else
                state.MoviePage.data =
                    [...state.MoviePage.data, { payload }]


        }
        , setMoviePage_data_push: (state, { payload }) => {

            state.MoviePage.render = [...state.MoviePage.render, ...payload]

        }
    }
})



export const { setLoading, setItems, setTopBannerVideo, setTopBannerData, setTopBannerVideo_play, add_func_child, setTopBannerVideo_url, setMoviePage_currGenre, setMoviePage_currPage,
    setMoviePage_loading, setMoviePage_loadNextPage, setMoviePage_data, setMoviePage_data_push } = movieSlice.actions

export const MovieSelector = (state) => state.movie;

export default movieSlice.reducer;