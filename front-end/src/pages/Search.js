import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NormSelector, setOpenSearch, setSearchValue, } from '../features/common/normSlice';

import { MovieSelector } from '../features/movie/movieSlice'
import {
    fetchMovieGenre
} from '../features/movie/movieSlice'
import { MovieContainer } from '../components/movies';


/// to do tmoorow impelemt seartch
function Search(props) {
    const { term } = useParams()
    // const { isError, isSuccess, isLoading, data: FilmCrews, error } = useQuery('SeachData' + term+page, () => searchMovie(data.id), { staleTime: 60000 })
    const { currHeight, searchBar: { openSearch, searchValue } } = useSelector(NormSelector)
    useEffect(() => {
        dispatch(setOpenSearch(true))
        dispatch(setSearchValue(term))
    }, [])

    const { MoviePage: { currGenre, currPage, data, loading } } = useSelector(MovieSelector)
    
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(fetchMovieGenre(-2, 1, term))



    }, [term])

    return (
        <MovieContainer {...{ currGenre, currPage, data, loading, term }}>



        </MovieContainer>
    );
}


const Wraper = styled.div`
background: black;
color: white;
padding-top: 130px;
padding-bottom: 130px;
`
export default Search;