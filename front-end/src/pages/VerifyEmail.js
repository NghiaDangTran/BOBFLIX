import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { setLoading, UserSelector } from '../../src/features/user/userSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import login from '../../src/assets/login.jpg'
import logo from '../../src/assets/logo-no-background.svg'
const VerifyEmail = () => {
  const { userName, loading: loadingUser } = useSelector(UserSelector);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const { loading: userLoading } = useSelector(UserSelector)
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('token');
  const email = urlParams.get('email');
  const verifyToken = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/v1/auth/verify-email', {
        verificationToken: token,
        email: email,
      });

    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!userLoading) {
      verifyToken();
    }
  }, []);

  if (loading) {
    return (
      <Wrapper background={login}>
        <Link to={userName ? '/Home' : '/'}>
          <img className='logoNetflix' src={logo} alt="" />
        </Link>
        <div className='stay-middle'>

          <h2 style={{ color: "white" }}>Loading...</h2>
        </div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper background={login}>
        <Link to={userName ? '/Home' : '/'}>
          <img className='logoNetflix' src={logo} alt="" />
        </Link>
        <div>

          <h4 style={{ color: "white" }}>There was an error, please double check your verification link </h4>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper background={login}>
      <Link to={userName ? '/Home' : '/'}>
        <img className='logoNetflix' src={logo} alt="" />
      </Link>
      <div>

        <h2 style={{ color: "white" }}>Account Confirmed</h2>
        <Link style={{ backgroundColor: "red" }}  to='/login' className='btn'>
          Please login
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
display: block;
height: 100%;
min-height: 100vh;
overflow: hidden;
position: absolute;
width: 100%;
z-index: -1;
background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),url(${({ background }) => background});
@media only screen and (max-width: 700px) {
	.logoNetflix {
		position: absolute;

		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 0.5rem;
		width: 100px;
		z-index: 1;

	}
}
.logoNetflix {
	position: absolute;
	top: 15px;
	margin-left: 50px;
	margin-right: 30px;

	width: 120px;
	z-index: 1;
}
@media only screen and (max-width: 400px) {
	.logoNetflix {
		position: absolute;

		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 0.1rem;
		width: 80px;
		z-index: 1;

	}
}
div{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`;

export default VerifyEmail;
