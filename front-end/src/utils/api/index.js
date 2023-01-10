const start = "https://api.themoviedb.org/3"
const key = process.env.REACT_APP_MOVIE_DATABASE_API_KEY
export const TMDB_API = {
    genres: [
        {
            id: 28,
            name: "Action"
        },
        {
            id: 12,
            name: "Adventure"
        },
        {
            id: 16,
            name: "Animation"
        },
        {
            id: 35,
            name: "Comedy"
        },
        {
            id: 80,
            name: "Crime"
        },
        {
            id: 99,
            name: "Documentary"
        },
        {
            id: 18,
            name: "Drama"
        },
        {
            id: 10751,
            name: "Family"
        },
        {
            id: 14,
            name: "Fantasy"
        },
        {
            id: 36,
            name: "History"
        },
        {
            id: 27,
            name: "Horror"
        },
        {
            id: 10402,
            name: "Music"
        },
        {
            id: 9648,
            name: "Mystery"
        },
        {
            id: 10749,
            name: "Romance"
        },
        {
            id: 878,
            name: "Science Fiction"
        },
        {
            id: 10770,
            name: "TV Movie"
        },
        {
            id: 53,
            name: "Thriller"
        },
        {
            id: 10752,
            name: "War"
        },
        {
            id: 37,
            name: "Western"
        }
    ],
    movie_genre: (id,title,page=1) => {


        return    {
            title:title,
            url:`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`

        }
    }
    , searchMovie: (KeyWord, page = 1) => {

        return start + `/search/movie?api_key=${key}&query=${KeyWord}&page=${page}`

    }

    ,
    get_trending:

    {
        title: "Trending on BobFlix"
        ,
        url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`


    }

    ,
    get_latest:
    {
        title: "Lastest on BobFlix"
        , url:
            `https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`

    },
    get_now_playing:
    {
        title: "Now Playing"
        , url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,

    }
    ,
    get_popular:

    {
        title: "Popular"
        , url:
            `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,

    },
    get_top_rate:

    {
        title: "Top Rated"
        , url:
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,

    },
    get_up_coming:
    {
        title: "Up Coming"
        , url:
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,

    },


    get_details: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`,
    get_same_type: (id) => `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${key}`,
    get_credits: (id) => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`
    ,
    get_image: (id) => `https://image.tmdb.org/t/p/w500${id}`,
    get_image_original: (id) => `https://image.tmdb.org/t/p/original${id}`
    ,
    get_logo_image: (id) => `https://image.tmdb.org/t/p/w300${id}`
    ,
    get_logo:(id)=>`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&append_to_response=images&include_image_language=null,en
    `
    , get_video_id: (id) => {


        return start + `/movie/${id}/videos?api_key=${key}`


    },
    get_trailer: (id) => {
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&playsinline=1`



    },
    get_cast:(id)=>{

       
        return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}&language=en-US`
    }
    , get_collection:(id)=>{
        return `https://api.themoviedb.org/3/collection/${id}?api_key=${key}&language=en-US`
    }
    
}
