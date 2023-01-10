import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './Card'
import {
    Navigation,

} from "swiper";
import 'swiper/css';
import "swiper/css/navigation";


import { useEffect } from 'react';


function Carousel({ title, images, items, tempLength }) {
    const totalItem = items.length;
    const [numberItems, SetNumberItems] = useState(tempLength)
    const [numList, setNumList] = useState(Array.from('0'.repeat(Math.ceil((totalItem / numberItems)))))
    const [curr, SetCurr] = useState(0)
    const [data, setData] = useState(
        []
    )
    useEffect(() => {

        setNumList(Array.from('0'.repeat(Math.ceil((totalItem / numberItems)))))

    }, [numberItems])

    useEffect(() => {


        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;
            if (newWidth >= 100 && newWidth < 640) {
                SetNumberItems(2)
            }
            else if (newWidth >= 640 && newWidth < 768) {
                SetNumberItems(3)
            }
            else if (newWidth >= 768 && newWidth < 1024) {
                SetNumberItems(4)
            }
            else if (newWidth >= 1024) {
                SetNumberItems(5)
            }




        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions)

    }, [])


    useEffect(() => {

        const slides = [];
        items.forEach((i, index) => {
            if (index % numberItems === 0) {
                slides.push(
                    <SwiperSlide key={i.id}  >
                        <Card direction="toLeft" detail={i} images={images[index]}></Card>
                    </SwiperSlide>
                );
            }
            else if (index % numberItems === (numberItems - 1)) {
                slides.push(
                    <SwiperSlide key={i.id}  >
                        <Card direction={`toRight`} detail={i} images={images[index]}></Card>
                    </SwiperSlide>
                );
            } else
                slides.push(
                    <SwiperSlide key={i.id}    >
                        <Card direction="normal" detail={i} images={images[index]}></Card>
                    </SwiperSlide>
                );


        })

        setData(slides)
    }, [numberItems])




    const params =

    {

        slidesPerView: '5',
        spaceBetween: 10,
        slidesPerGroup: `5`,
        loop: true,

        // centerInsufficientSlides:true,
        // initialSlide:5 ,
        speed: 500
        ,
        allowTouchMove: false,


        breakpoints: {
            50: {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerGroup: 2,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup: 3,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 10,
                slidesPerGroup: 4,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 10,
                slidesPerGroup: 5,
            },

        }
    };
    return (
        <OuterWrapper >

            <Wraper>
                <Wraper1>
                    {/* {sendtext} */}
                    <h4>{title}</h4>
                    <Wraper2 className='Listvie show1'>
                        {numList.map((i, index) => {
                            if (index === curr) {
                                return <li key={index} className='active'></li>
                            }
                            else
                                return <li key={index}></li>
                        })}

                    </Wraper2>
                </Wraper1>
                <Swiper
                    {...params}
                    modules={[Navigation]}
                    navigation={{

                        nextEl: '.swiper-button-next'
                        ,
                        prevEl: '.swiper-button-prev'
                    }}



                    loopFillGroupWithBlank={totalItem % numberItems !== 0 && true}>
                    <button className='handel handlePrev swiper-button-prev prev' onClick={() => {


                        let val = curr - 1
                        let temp = 0

                        if (val < 0) {
                            val = numList.length - 1

                        }

                        setTimeout(() => {
                            SetCurr(val)
                        }, 700);
                    }}></button>




                    {data}

                    <button className='handel handleNext swiper-button-next next' onClick={() => {
                        let val = curr + 1
                        if (val > numList.length - 1) {
                            val = 0

                        }

                        setTimeout(() => {
                            SetCurr(val)
                        }, 700);
                    }}></button>

                </Swiper>


            </Wraper>
        </OuterWrapper>
    );

}
const OuterWrapper = styled.div` 
margin: 4rem 0 4rem 0;
display: flex;
&:hover {
.swiper-button-next, .swiper-button-prev{
    visibility: visible;
    }
.show1{
    visibility: visible;
    }
}
`
const Wraper = styled.div`
    box-sizing: border-box;
    margin: auto;
    padding: 10px;
    outline: 1px;
    position: relative;
    transition: transform .54s cubic-bezier(.5,0,.1,1) 0s;
    /* overflow-x: clip; */
    width:85%;

    ${'' /* overflow-x: hidden;
    overflow-y: visible ; */}
.swiper-slide{
   
    aspect-ratio: 16/9;
	border-radius: 0.35rem 0.35rem 0.35rem 0.35rem;
	transition: transform .25s, visibility .25s, box-shadow .25s ease-in;
    background:black;
}
.swiper{
    overflow: visible;
    z-index:5;
}


.swiper-button-next, .swiper-button-prev{
    color:white;
    visibility: hidden;


    
}
.handel{
    bottom: 0;
    color: #fff;
    display: flex;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    width: 10.5%;
    z-index: 20;
    background: hsla(0,0%,8%,.5);
    border: none;
    border-radius: 10px;
}
.handleNext{
       
    left: 100%;
    }
.handlePrev{
      
    left:-10.5% !important;
    }
.prev{
    ${'' /* width:1vw; */}
    left:0px;
    background: hsla(0,0%,8%,.5);
    z-index:1;
    height:110%;
    top:20px; 
}

.next{
    ${'' /* width:1vw; */}
    right:0px;
    z-index:1;

    background: hsla(0,0%,8%,.5);
    height:110%;
    top:20px;
}
.show1{
    visibility: hidden;
}
@media  (max-width: 600px) {
       .Listvie{
        top: -10px!important;

       } 
    }
`
const Wraper1 = styled.div`
.show{
    display:none;

}

`
const Wraper2 = styled.ul`

    display: block;

    ${'' /* list-style-type: none; */}
    margin: 7px 0 12px;
    padding: 0;
    position: absolute;
    right: 4%;
    top: 0;

    li{
    background-color:#4d4d4d;
    display: inline-block;
    height: 5px;
    margin-left: 3px;
    width: 15px;

    }
    li.active{
        background-color: white;


    }
   
`




export default Carousel;