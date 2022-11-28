import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TMDB_API } from '../../utils/api';
import styled from 'styled-components';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import badimage from '../../assets/no-img.jpg'
const { get_image } = TMDB_API
function SameTypeCard({ data }) {
    const { id, overview, vote_average, title, backdrop_0, logo_0,release_date } = data
    return (
        <Wrapper >
            <div >
                <LazyLoadImage className='image' src={backdrop_0?get_image(backdrop_0.file_path):badimage} onError={(curr) => {
                    console.log("bad")
                    curr.onerror = null;
                    curr.src = badimage


                }} ></LazyLoadImage>

            </div>
            <div className='content'>


                <div className='general'>
                    <div className='match'>
                        <h5 style={{color:"#46d369"}}>{(parseFloat(vote_average) * 10).toFixed()}% Match</h5>
                        <h5>{release_date.slice(0,4)}</h5>
                    </div>
                    <AiOutlinePlusCircle size={40} style={{}}></AiOutlinePlusCircle>

                </div>
                <p style={{ color: "#d2d2d2", margin: 0, padding: "0 1em 1em", maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)" }}>
                    {overview}

                </p>

            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
width:100%;
min-height: 23em;
overflow: hidden;
position: relative;
border-radius: 1em;

cursor: pointer;

.image{
    display: block;
    width: 100%;
    
}
.content{
    background-color: #2f2f2f;
    min-height: 100%;
    .general{
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 1em;
    
    }
}
`

export default SameTypeCard;