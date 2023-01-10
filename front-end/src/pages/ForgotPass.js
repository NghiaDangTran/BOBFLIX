import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormRow from '../components/common/FormRow';
import axios from 'axios';
import useLocalState from '../components/cutom hook/localState';
import login from '../../src/assets/login.jpg'
import logo from '../../src/assets/logo-no-background.svg'
import { UserSelector } from '../features/user/userSlice';
import { useSelector } from 'react-redux';

function ForgotPass() {
    const { userName, loading: loadingUser } = useSelector(UserSelector);
    const [email, setEmail] = useState('');

    const {
        alert,
        showAlert,
        loading,
        setLoading,
        success,
        setSuccess,
        hideAlert,
    } = useLocalState();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        hideAlert();
        if (!email) {
            showAlert({
                text: 'Please provide email',
            });
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.post('/api/v1/auth/forgot-password', {
                email,
            });
            showAlert({ text: data.msg, type: 'success' });
            setSuccess(true);
        } catch (error) {
            showAlert({
                text: 'Something went wrong, please try again',
            });
            setSuccess(true);
        }
        setLoading(false);
    };

    return (
        <>
            <Wrapper background={login}>
                <Link to={userName ? '/Home' : '/'}>
                    <img className='logoNetflix' src={logo} alt="" />
                </Link>

                <div className='block'></div>
                {alert.show && (
                    <div className={`alert alert-${alert.type}`}>{alert.text}</div>
                )}
                {!success && (
                    <form
                        className={loading ? 'form form-loading' : 'form'}
                        onSubmit={handleSubmit}
                    >
                        <h4>Forgot password</h4>
                        {/* single form row */}
                        <FormRow
                            type='email'
                            name='email'
                            value={email}
                            handleChange={handleChange}
                        />
                        {/* end of single form row */}
                        <button type='submit' className='btn btn-block' disabled={loading}>
                            {loading ? 'Please Wait...' : 'Get Reset Password Link'}
                        </button>
                        <p style={{ color: "#737373" }}>
                            Already a have an account?
                            <Link style={{ color: "white" }} to='/login' className='login-link'>
                                Log In
                            </Link>
                        </p>
                    </form>
                )}
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
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
    height: 10%;
}
h4{
    color: white;
}
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
  .btn{
    background-color: red;
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

export default ForgotPass;
