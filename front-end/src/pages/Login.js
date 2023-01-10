import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import login from '../../src/assets/login.jpg'
import logo from '../../src/assets/logo-no-background.svg'
import FormRow from '../components/common/FormRow';
import useLocalState from '../components/cutom hook/localState';
import { UserSelector } from '../features/user/userSlice'
import { setUser } from '../features/user/userSlice'

function Login(props) {
    const dispatch = useDispatch()
    const { userName, loading: loadingUser } = useSelector(UserSelector);
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`/api/v1/auth/verify-user`);
            let tempData = data.user
            const favorite = await axios.post("/api/v1/favorite/check", { userId: tempData.userId })
            tempData.favorites = favorite.data.favorites

            localStorage.setItem('user', JSON.stringify(tempData));
            dispatch(setUser(tempData));
            console.log(tempData)
            navigate('/Home')
        } catch (error) {
            console.log(error)
            // dispatch(setUser(null));
        }
    };
    useEffect(() => {
        //    const refreshToken= cookies.getItem("refreshToken")
        //    const accessToken= cookies.getItem("accessToken")

        //     if (refreshToken && accessToken)
        if (localStorage.getItem('user'))
            fetchUser()
    })
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        hideAlert();
        setLoading(true);
        const { email, password } = values;
        const loginUser = { email, password };
        try {
            const { data } = await axios.post(`/api/v1/auth/login`, loginUser);
            setValues({ name: '', email: '', password: '' });
            showAlert({
                text: `Welcome, ${data.user.name}. Redirecting to dashboard...`,
                type: 'success',
            });
            setLoading(false);
            let tempData = data.user
            // saveUser(data);
            const favorite = await axios.post("/api/v1/favorite/check", { userId: tempData.userId })
            tempData.favorites = favorite.data.favorites

            localStorage.setItem('user', JSON.stringify(tempData));
            dispatch(setUser(tempData));
            await axios.get("/api/v1/cookies", { withCredentials: true })
            // console.log(all)
            console.log(tempData)

            navigate('/Home')
        } catch (error) {
            showAlert({ text: error.response.data.msg });
            setLoading(false);
        }
    };
    return (
        <Wrapper background={login} >
            <Link to={userName ? '/Home' : '/'}>
                <img className='logoNetflix' src={logo} alt="" />
            </Link>
            <div className='block'></div>
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>{alert.text}</div>
            )}
            <form
                className={loading ? 'form form-loading' : 'form'}
                onSubmit={onSubmit}
            >
                <h3 style={{ color: "white" }}>Sign In</h3>

                {/* single form row */}
                <FormRow
                    type='email'
                    name='email'
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* end of single form row */}
                {/* single form row */}
                <FormRow
                    type='password'
                    name='password'
                    value={values.password}
                    handleChange={handleChange}
                />
                {/* end of single form row */}
                <button type='submit' className='btn btn-block' disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <p style={{ color: "#737373" }}>
                    Don't have an account?
                    <Link style={{ color: "white" }} to='/register' className='register-link'>
                        Register
                    </Link>
                </p>
                <p style={{ color: "#737373" }}>
                    Forgot your password?{' '}
                    <Link style={{ color: "white" }} to='/forgot-password' className='reset-link'>
                        Reset Password
                    </Link>
                </p>
            </form>
        </Wrapper>
    );
}
const Wrapper = styled.div` background-size: cover;
display: block;
height: 100%;
min-height: 100vh;
overflow: hidden;
position: absolute;
width: 100%;
z-index: -1;
background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),url(${({ background }) => background});
.block{
    width: 100%;
    height: 20%;
}
.alert {
    margin-top: 2rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    text-align: center;
  }
  .btn {
    margin-bottom: 1.5rem;
    background:red;
  }
  .register-link,
  .reset-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
  .reset-link {
    margin-top: 0.25rem;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
.logoNetflix {
	position: absolute;
	top: 15px;
	margin-left: 50px;
	margin-right: 30px;

	width: 120px;
	z-index: 1;
}

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

@media only screen and (max-width: 0400px) {
	.logoNetflix {
		position: absolute;

		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 0.1rem;
		width: 80px;
		z-index: 1;

	}
}

`
export default Login;