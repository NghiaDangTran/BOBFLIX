import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, MovieSelector } from '../../features/movie/movieSlice'
import Carousel from './Carousel';
// import CarouselLoading from './CarouselLoading';
let tempLength = 0;

function CarouselContainers(props) {
    // usedispath all the data
    const dispatch = useDispatch()
    const { loading, data, error } = useSelector(MovieSelector)
    console.log(data)
    useEffect(() => {


        const newWidth = window.innerWidth;

        if (newWidth >= 100 && newWidth < 640) {
            tempLength = 2
        }
        else if (newWidth >= 640 && newWidth < 768) {
            tempLength = 3
        }
        else if (newWidth >= 768 && newWidth < 1024) {
            tempLength = 4
        }
        else if (newWidth >= 1024) {
            tempLength = 5
        }

    }, [])
    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);
    if (loading) {
        return <div>Loading man</div>
    }

    return (
        <div >
            {Object.keys(data).map((name, index) => {

                {/* console.log(tempLength) */ }
                return <Carousel {...data[name]} tempLength={tempLength} key={index} ></Carousel>

            })}
            {/* <CarouselLoading></CarouselLoading> */}


        </div>
    );
}

export default CarouselContainers;