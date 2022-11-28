import React, { useEffect, useState } from 'react';
import {  TopBanner,  CarouselContainers } from '../components/home'
import { Hero } from '../components/common'
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";

import { HeroSelector } from '../features/hero/heroSlice'

function Home(props) {
    const dispatch = useDispatch()
    const { openHero } = useSelector(HeroSelector)
    const [showHero, setShowHero] = useState(false)
    useEffect(() => {
        if (openHero) {
            setShowHero(true)

        }
        let timerId;
        if (showHero && !openHero) {
            timerId = setTimeout(() => {
                setShowHero(
                    false
                );
                document.body.style.overflowY = "scroll";
            }, 900);

        }
        return () => clearTimeout(timerId);
    }, [openHero])

    return (
        <Wrapper >

            <TopBanner></TopBanner>
            <div className='fill'></div>
            <CarouselContainers></CarouselContainers>

            <div className={`HeroTransition`}>

                {showHero && <Hero></Hero>}
            </div>
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
.HeroTransition{
 

    .showHero{    
        opacity: 1;
  transition: ease-in-out 0.3s;
}
    .hideHero{
        opacity: 0;
  transition: ease-in-out 0.8s;
    }
}


`

export default Home;

