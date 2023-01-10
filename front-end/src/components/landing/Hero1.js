import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import top_bg from '../../assets/lading-page/top-bg.jpg'
function Hero1(props) {
  const navigate=useNavigate()
  return (
    <Wrapper className='section-center'>
      <article className='our-story-card-text'>

        <h1>
          Unlimited movies, TV shows, and more.</h1>



        <p> Watch anywhere. Cancel anytime.
          <br />
          Ready to watch? Enter your email to create or restart your membership.</p>
        <div className='d-flex justify-content-center align-items-center'>
          <button className='btn' onClick={()=>navigate('/login')} style={{ width: "100px", height: "50px", backgroundColor: "red" }}>Sign in </button>
        </div>
      </article>

    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 60vh;
  width:100%;

  .img-container {
    display: none;
  }
  h1{
    color: white;
    margin: 0 auto;
    max-width: 640px;
    font-size: 3.125rem;
    line-height: 1.1;
    margin-bottom: 0.5rem;
  }

  .our-story-card-text{
    margin: 0 auto;
    max-width: 950px;
    padding: 75px 0;
    position: relative;
    text-align: center;
    width: 100%;
    z-index: 1;
  }
  p {
    font-size: 1.125rem;
    margin: 1rem auto;
    color:white;
    color: white;
    font-size: 1rem;
  } 
  height:25%;

`
export default Hero1;