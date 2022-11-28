import React, { useLayoutEffect, useState, useRef } from 'react';
import SameTypeCard from './SameTypeCard';
import styled from 'styled-components';
import { HiOutlineCollection } from "react-icons/hi";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

function SameType({ name, Contain_data }) {
    const forcusDiv = useRef(null)
    const [color, setColor] = useState("white")
    const [direction, setDridection] = useState(null)
    const [HeightVal, setHeight] = useState("500px")
    useLayoutEffect(() => {
        if (forcusDiv.current.clientHeight > 500) {
            setDridection("down")
        }
    }, []);

    return (
        <Wrapper>
            <div className='same-with-this'>
                <div style={{
                    marginBottom: "20px",
                    marginTop: "48px"
                }}>

                    {Contain_data.length > 0 && <h3><span ><HiOutlineCollection ></HiOutlineCollection></span> {name}</h3>}
                </div>
                <div style={{ maxHeight: HeightVal, overflow: "hidden" }}>



                    <div className='group-container' ref={forcusDiv}>

                        {Contain_data.map(i => {

                            return <SameTypeCard data={i} key={"coleection" + i.id}></SameTypeCard>
                        })}

                    </div>

                </div>
                {direction !== null &&

                    <div className='open-more'>
                        <span style={{ bottom: "0", position: "absolute", transform: "translateY(50%)" }}
                            onClick={() => {
                                if (direction !== null) {
                                    if (direction == "down") {
                                        setDridection("up")
                                        setHeight("max-content")
                                    }
                                    else {
                                        setDridection("down")
                                        setHeight("500px")
                                    }
                                    setColor("white")

                                }

                            }}
                        >
                            {direction == "down" ?

                                <BsArrowDownCircle size={"2rem"} color={color} onMouseEnter={() => setColor("grey")}

                                    onMouseLeave={() => setColor("white")}

                                ></BsArrowDownCircle> : <BsArrowUpCircle size={"2rem"} color={color} onMouseEnter={() => setColor("grey")}

                                    onMouseLeave={() => setColor("white")}

                                ></BsArrowUpCircle>

                            }
                        </span>
                    </div>
                }




            </div>
        </Wrapper>
    );
}
const Wrapper = styled.div`

.group-container{
    
    grid-template-columns: repeat(3,1fr);

    grid-gap: 1em;
    align-items: stretch;
    display: grid;
    justify-items: stretch;
   
}
.open-more{
    border-bottom: 2px solid #404040;
    box-shadow: none;
    display: flex;
    height: 6em;
    justify-content: center;
    margin: auto;
    position: relative;
    width: 100%;
    background-image: linear-gradient(0deg,#181818 0,hsla(0,0%,9%,.7) 20%,hsla(0,0%,9%,.4) 30%,transparent 50%);
    margin-top: -5em;
}
    @media only screen and (max-width:1007px){
        .group-container{
    
    grid-template-columns: repeat(2,1fr)!important;
        }
    }
    @media only screen and (max-width:650px)
    {
        .group-container{
    
    grid-template-columns: repeat(1,1fr)!important;
        } 
    }

`


export default SameType;