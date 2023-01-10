import React from 'react';
import styled from 'styled-components';
import { MovieContainer } from '../components/movies/index'

import { MovieSelector } from '../features/movie/movieSlice'
import {
    fetchMovieGenre
} from '../features/movie/movieSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
function Movies(props) {
    // if durrgere is -1 fetch first data 
    const { MoviePage: { currGenre, currPage, data, loading } } = useSelector(MovieSelector)

    const dispatch = useDispatch()
    useEffect(() => {
        if (currGenre === -1 || currGenre === -2) {

            dispatch(fetchMovieGenre(28, 1))

        }

    }, [])
    return (
        <MovieContainer {...{ currGenre, currPage, data, loading }}>



        </MovieContainer>
    );
}


export default Movies;