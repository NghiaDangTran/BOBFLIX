import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../../assets/logo-no-background.svg'

function Navbar(props) {
  const navigate =useNavigate()
    return (
        <NavContainer>
            <div className='nav-center'>
                <div className='nav-header'>

                    <img src={logo}></img>
                    <button className='btn' style={{ 'backgroundColor': "red" }} onClick={()=>navigate('/login')}>
                        Sign in
                    </button>
                </div>



            </div>
        </NavContainer>
    );
}


const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
   
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 120px;
    }
  }

 
  
`
export default Navbar;