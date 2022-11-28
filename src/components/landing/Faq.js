import React from 'react';
import styled from 'styled-components';
import { faq } from '../../utils/landing/faqs'
import Answer from './Answer'
function Faq(props) {
    return (
        <Wrapper>
            <h1>Frequently Asked Questions
            </h1>
            <ul className='fqa-list'>
                {
                    faq.map(i => {


                        return <Answer key={i.id} {...i}>

                        </Answer>

                    })
                }



            </ul>
        </Wrapper>
    );
}
const Wrapper = styled.div`
background:black;
color:white;

    border-bottom: 8px solid #222;
    color: #fff;
    margin-bottom: 0;
    padding: 50px 5%;
    position: relative;
    text-align:center;
.faq-list,.faq-card{

    margin: 1.25em auto;
    max-width: 815px;
}
h1{
    padding:50px;
}
ul{
    width:100%;
}
.faq-list-item{
width:100%;
background: #303030;
list-style-type: none;
margin: 0 0 8px;

padding:0px 30px;
text-align:center;

}



`


export default Faq;