import React from 'react';
import styled from 'styled-components'
import logo from '../../assets/logo-no-background.svg'

function Navbar(props) {
    return (
        <NavContainer>
            <div className='nav-center'>
                <div className='nav-header'>

                    <img src={logo}></img>
                    <button className='btn' style={{ 'backgroundColor': "red" }}>
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