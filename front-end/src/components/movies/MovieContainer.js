import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../common/Loading';
import { MovieSelector } from '../../features/movie/movieSlice'
import {
    setMoviePage_currPage,
    fetchMovieGenre
} from '../../features/movie/movieSlice'
import { useEffect } from 'react';
import CardCenter from './CardCenter'

let SkipFirstReder = true
function MovieContainer({ currGenre, currPage, data, loading, term }) {

    const dispatch = useDispatch()
    const [GetNewImage, SetGetNewImage] = useState(false)
    const [scrols, Setscrols] = useState(false)
    useEffect(() => {


        if (GetNewImage) {
            if (currGenre !== -2)
                dispatch(fetchMovieGenre(currGenre, currPage))
        }

        SetGetNewImage(false)

        let timerId = setTimeout(() => {
            // document.body.style.overflow = 'auto'

            Setscrols(true)
        }, 500);

        return () => clearTimeout(timerId)
    }, [currPage])


    useEffect(() => {
        if (currPage > 5)
            return


        if (SkipFirstReder) {
            SkipFirstReder = false
            return
        }
        if (loading && !GetNewImage)
            return

        if (GetNewImage) {
            if (currGenre === -2)
                dispatch(fetchMovieGenre(-2, currPage + 1, term))
            else
                dispatch(setMoviePage_currPage(currPage + 1))
        }

    }, [GetNewImage])
    useEffect(() => {
        let event = () => {

            // console.log(window.scrollY, GetNewImage)
            if (scrols && !SkipFirstReder && (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 200 && GetNewImage === false) {
                Setscrols(false)


                SetGetNewImage(true)


            }
        }
        window.addEventListener('scroll', event)

        return () => { window.removeEventListener('scroll', event) }
    }, [scrols])
    return (
        <Wraper>


            {/* send GenreData as  useSelector GenreData only get data[-1] */}
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