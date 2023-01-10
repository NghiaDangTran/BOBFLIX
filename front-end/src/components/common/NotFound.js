import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-no-background.svg'
import notFound from '../../assets/notfound.png'
import styled from 'styled-components'
function NotFound(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <Wrapper style={{ backgroundImage: `url(${notFound})` }}>

            <div className='header'>
                <Link to={isLoggedIn ? '/Home' : '/'}>
                    <img className='logoNetflix' src={logo} alt="" />
                </Link>
            </div>
            <div className='text'>
                <h1>Are You Lost?</h1>
                <a>Sorry we can't find that page. Maybe you want to visit our home page</a>
                <Link to={isLoggedIn ? '/Home' : '/'} className='back'>
                    <button className='back'> Take me to Home </button>

                </Link>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
background-attachment: fixed;
background-position: 50%;
background-repeat: no-repeat;
background-size: cover;
bottom: 0;
left: 0;
position: fixed;
right: 0;
top: 0;
z-index: 1;
.header{
width:100%;
position: fixed;

color:white;
z-index:9;
height:60px;
display: flex;
justify-content: space-between;
font-size:20px;
align-items: center;
background-color: black;
}
.logoNetflix {
	margin-left: 50px;
	margin-right: 30px;

	width: 100px;
}
.text{
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color:white;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   h1{
    font-size:6em;
    padding-bottom: 5%;
   }
   a{
    font-size: 1.3em;
    padding-bottom: 5%;

   }
}

.back{
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    opacity: 1;
    padding: 0.8rem;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    will-change: background-color,color;
    word-break: break-word;
    white-space: nowrap;
}
`


export default NotFound;