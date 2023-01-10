import React from 'react';
import { Navbar, Hero1, Content, Faq } from '../components/landing'
import styled from 'styled-components'
import top_bg from '../assets/lading-page/top-bg.jpg'
import { data } from '../utils/landing/data'
function Lading(props) {
    return (
        <main>
            <Wrapper style={{
                backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),url( ${top_bg} )`


            }}>

                <Navbar></Navbar>
                <Hero1></Hero1>

            </Wrapper>
            {data.map(i => {


                return <Content key={i.id} {...i}></Content>
            })}

            <Faq style={{
                backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),url( ${top_bg} )`


            }}>




            </Faq>



        </main>
    );
}

const Wrapper = styled.div`
background-position: center;
background-size: cover;
background: rgba(0, 0, 0, 0.5);
background-position: center top;    
height:50%;
border-bottom: 8px solid #222;
`

export default Lading;