import React, { useEffect, useState } from 'react';
import { TopBanner, CarouselContainers } from '../components/home'
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { UserSelector } from '../features/user/userSlice'

function Home(props) {
    const dispatch = useDispatch()
    const { userName, loading: loadingUser } = useSelector(UserSelector);

    return (
        <Wrapper >

            <TopBanner></TopBanner>
            <div className='fill'></div>
            <CarouselContainers></CarouselContainers>


        </Wrapper>
    );
}


const Wrapper = styled.div`
color:white;
background:black;
width:100%;
height:100%;
overflow:hidden;
padding-bottom: 50px;
.fill{
    height:35vw;
    width:100%;
}



`

export default Home;

