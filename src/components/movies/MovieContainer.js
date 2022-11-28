import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../common/Loading';
import { MovieSelector } from '../../features/movie/movieSlice'
import {
    setMoviePage_currGenre, setMoviePage_currPage,
    setMoviePage_loading, setMoviePage_loadNextPage, setMoviePage_data, fetchMovieGenre
} from '../../features/movie/movieSlice'
import { useEffect } from 'react';
import CardCenter from './CardCenter'
function MovieContainer(props) {
    const { MoviePage: { currGenre, currPage, data, loadNextPage, loading } } = useSelector(MovieSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if (currGenre === -1) {
            dispatch(fetchMovieGenre(28, 1))
        }
    }, [])
    return (
        <Wraper>



            {
                data.length > 0 &&
                <CardCenter GenreData={data}>



                </CardCenter>

            }
            {loading &&

                <Loading></Loading>
            }
        </Wraper>
    );
}
const Wraper = styled.div`
background-color: black;
padding-top: 10em;
padding-bottom: 10em;
width: 100%;
height: max-content;
`
export default MovieContainer;