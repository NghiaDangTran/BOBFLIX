import React from 'react';
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useId } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const render = [<div className='rec pulsate' style={{ animationDelay: "0s" }}></div>,
<div className='rec pulsate' style={{ animationDelay: "0.15s" }}></div>,
<div className='rec pulsate' style={{ animationDelay: "0.3s" }}></div>,
<div className='rec pulsate' style={{ animationDelay: "0.45s" }}></div>,
<div className='rec pulsate' style={{ animationDelay: "0.6s" }}></div>]
// let tempLength = 5;
function Loading(props) {
    let [tempLength, settempLength] = useState(5)
    const tryId = useId()
    useEffect(() => {
        const updateSize = () => {



            let newWidth = window.innerWidth;

            if (newWidth >= 100 && newWidth < 640) {
                settempLength(2)
            }
            else if (newWidth >= 640 && newWidth < 768) {
                settempLength(3)
            }
            else if (newWidth >= 768 && newWidth < 1024) {
                settempLength(4)
            }
            else if (newWidth >= 1024) {
                settempLength(5)
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])
    return (
        <div style={{ display: "flex" }}>

            <Wrapper>
                <div className='title pulsate' style={{ animationDelay: "0s" }}></div>
                <div className='FillContainer ' style={{
                    gridTemplateColumns: ` repeat(${tempLength}, 1fr)`
                }}>

                    {tempLength !== 0 && render.map((i, index) => {
                       
                        if (index < tempLength)
                            return <div key={tryId + `${index}`} className='rec pulsate' style={{ animationDelay: index * 0.15 + "s", width: 80 / tempLength + "vw" }}></div>
                    })}

                </div>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
color:white;
box-sizing: border-box;
margin: auto;
padding: 10px;
outline: 1px;
.title{
width:80px ;
height: 25px;
background-color: red;
margin-bottom: 1em;
border-radius: 5px;
}
.FillContainer{
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-auto-rows: 1fr;
grid-column-gap: 1em;
grid-row-gap: 0px;
margin-bottom: 1em;
}
.rec{
    width: 20vw;
    aspect-ratio: 16/ 9;
    border-radius: 5px;
   
}





@keyframes pulsateAnimation {
  from {
    background-color: #000000
  }
  20% {
    background-color: #404040
  }
  40% {
    background-color: #696969
  }
  65%{
    background-color: #8d8d8d
  }
  80%{
    background-color: #000000
  }
  to {
    background-color: #000000
  }
}

.pulsate {
 
  animation-duration: 3s;
  -webkit-animation-name: pulsateAnimation;
  -moz-animation-name: pulsateAnimation;
  -o-animation-name: pulsateAnimation;
  animation-name: pulsateAnimation;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  -o-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out
}

`



export default Loading;