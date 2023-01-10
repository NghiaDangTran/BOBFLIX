import React from 'react';
import styled from 'styled-components';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";


function Footer(props) {
    return (
        <Wrapper>
            <div className='FootContainer'>



                <div className='social-links'>
                    <a ><FiFacebook size={30} color={"white"} style={{ marginRight: "30px" }}></FiFacebook></a>
                    <a ><FiInstagram size={30} color={"white"} style={{ marginRight: "30px" }}></FiInstagram></a>
                    <a ><FiTwitter size={30} color={"white"} style={{ marginRight: "30px" }}></FiTwitter></a>
                    <a ><FiYoutube size={30} color={"white"} style={{ marginRight: "30px" }}></FiYoutube></a>
                </div>
                <ul className='service-links'>
                    <li className="linkS"><a ><span >Lorem Ipsum</span></a></li>
                    <li className="linkS"><a ><span >Lorem Ipsum</span></a></li>
                    <li className="linkS"><a ><span >Lorem Ipsum</span></a></li>
                    <li className="linkS"><a ><span >Lorem Ipsum</span></a></li>
                    <li className="linkS"><a ><span >Lorem Ipsum</span></a></li>
                    <li className="linkS"><a ><span >Lorem Ipsum</span></a></li>
                    <li className="linkS"><a ><span >Lorem Ipsum</span></a></li>
                    <li className="linkS"><a ><span >Lorem Ipsum</span></a></li>
                    <li className="linkS"><a ><span >Lorem Ipsum</span></a></li>

                </ul>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
width:100%;
background:black;

.FootContainer{


    background:black;
    color: grey;
    width: 80%;
    margin: auto ;
    padding:  4%;
   
    .social-links{
    display: flex;
    margin-bottom: 1em;

    }
    .service-links{
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 16px;
    margin: 0 0 14px;
    padding: 0;
    .linkS{    box-sizing: border-box;
    flex: 0 0 50%;
    list-style-type: none;
    margin-bottom: 16px;
    flex-basis: 25%;
    }
    }
}

`

export default Footer;