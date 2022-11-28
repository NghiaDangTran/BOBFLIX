import React from 'react';
import styled from 'styled-components';
import { FiPlus,FiX } from 'react-icons/fi'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Answer({header,body}) {
    const [open,SetOpen]=useState(false)
    return (
        <Wrapper>

            <ListItem className='faq-list-item' onClick={()=>{SetOpen(!open)}}>
                <h3>{header}</h3>
                <span>
                
                {
!open?<FiPlus size={40} ></FiPlus>:

<FiX  size={40} />

                }
                
                </span>

            </ListItem>
            <Back className={`faq-answer ${open?"open":"close"}`}>{body}</Back>
        </Wrapper>
    );
}
const Wrapper=styled.li`
.faq-answer.close{
    max-height: 0;
    overflow: hidden;
    transition: max-height ;

}
.faq-answer.open{
    max-height: 1200px;;
    padding:5px 10px 10px 10px;
    margin-bottom:10px;
}
margin-bottom:5px;
padding:0px 30px;
`

const ListItem = styled.div`
display:flex;
text-align:center;
justify-content: space-between;
width:100%;

`
const Back = styled.div`
    background: #303030;
    display: block;
    text-align: left;
`
export default Answer;

