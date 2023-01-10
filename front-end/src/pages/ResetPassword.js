import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import FormRow from '../components/common/FormRow';
import useLocalState from '../components/cutom hook/localState';
import { useSelector } from 'react-redux';
import { UserSelector } from '../features/user/userSlice';
import login from '../../src/assets/login.jpg'
import logo from '../../src/assets/logo-no-background.svg'


const ResetPassword = () => {
    const { userName, loading: loadingUser } = useSelector(UserSelector);

    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const { alert, showAlert, loading, setLoading, success, setSuccess } =
        useLocalState();

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    const handleChange = async (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!password) {
            showAlert({ text: 'please enter password' });
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.post('/api/v1/auth/reset-password', {
                password,
                token: token,
                email: email,
            });
            setLoading(false);
            setSuccess(true);
            showAlert({
                text: `Success, redirecting to login page shortly`,
                type: 'success',
            });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            showAlert({ text: error.response.data.msg });
            setLoading(false);
        }
    };
    return (
        <Wrapper background={login}>
            <div className='block'></div>
            <Link to={userName ? '/Home' : '/'}>
                <img className='logoNetflix' src={logo} alt="" />
            </Link>
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>{alert.text}</div>
            )}
            {!success && (
                <form
                    className={loading ? 'form form-loading' : 'form'}
                    onSubmit={handleSubmit}
                >
                    <h4 style={{ color: "white" }}>reset password</h4>
                    {/* single form row */}
                    <FormRow
                        type='password'
                        name='password'
                        value={password}
                        handleChange={handleChange}
                    />
                    {/* end of single form row */}
                    <button style={{ backgroundColor: "red" }} type='submit' className='btn btn-block' disabled={loading}>
                        {loading ? 'Please Wait...' : 'New Password'}
                    </button>
                </form>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.section`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
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
.block{
    width: 100%;
    height:20%;
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
`;

export default ResetPassword;
