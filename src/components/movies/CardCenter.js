import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import Card from '../home/Card'
function CardCenter({ GenreData }) {
    const ref = useRef(null)
    const [height, setHeight] = useState(0)

    const { payload: { items, images } } = GenreData[GenreData.length - 1]
    useEffect(() => {

        const tempasd = () => {
            setHeight(ref.current.clientHeight)

        }

        window.addEventListener("resize", tempasd);
        tempasd()
        return () => window.removeEventListener("resize", tempasd)

    })
    return (

        <Wraper style={{ height: height + "px" }} >


            <GridContianer ref={ref}>

                {
                    items.map((i, index) => {


                        return <div className='card-container' key={GenreData.length - 1 + "page" + i.id}>

                            <Card direction="" detail={i} images={images[index]}></Card>
                        </div>


                    })
                }

            </GridContianer>


        </Wraper>
    );
}
const Wraper = styled.div`
width: 100%;




`

const GridContianer = styled.div` width: 90vw;
margin: 0 auto;
display: grid;
max-width: 1920px;

grid-column-gap: 1rem;
grid-row-gap: 1rem;
align-items: center;
justify-items: center;
grid-template-rows: auto;

.card-container {

	width: 15%;

	aspect-ratio: 16/9;


}

@media only screen and (max-width: 575px) {
	.card-container {
		width: 50vw;
	}

	grid-template-columns: 1fr;

}

@media only screen and (min-width: 576px) and (max-width:768px) {
	.card-container {
		width: 30vw;
	}

	grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));


}

@media only screen and (min-width: 769px) and (max-width:992px) {
	.card-container {
		width: 23vw;
	}

	grid-template-columns: repeat(auto-fill, minmax(23vw, 1fr));


}

@media only screen and (min-width: 993px) and (max-width:1200px) {
	.card-container {
		width: 18vw;
	}

	grid-template-columns: repeat(auto-fill, minmax(18vw, 1fr));


}

@media only screen and (min-width: 1201px) and (max-width:1400px) {
	.card-container {
		width: 15vw;
	}

	grid-template-columns: repeat(auto-fill, minmax(15vw, 1fr));


}

@media only screen and (min-width:1401px) {
	.card-container {
		width: 10vw;
	}

	grid-template-columns: repeat(auto-fill, minmax(10vw, 1fr));
	/* margin: 0; */

}


`
export default CardCenter;