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

function Register() {
    const { userName, loading: loadingUser } = useSelector(UserSelector);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

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
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        hideAlert();
        setLoading(true);
        const { name, email, password } = values;
        const registerNewUser = { name, email, password };

        try {
            const { data } = await axios.post(
                `/api/v1/auth/register`,
                registerNewUser
            );

            setSuccess(true);
            setValues({ name: '', email: '', password: '' });
            showAlert({ text: data.msg, type: 'success' });
        } catch (error) {
            const { msg } = error.response.data;
            showAlert({ text: msg || 'there was an error' });
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
                        onSubmit={onSubmit}
                    >
                        {/* single form row */}
                        <h3 style={{ color: "white" }}>Register</h3>

                        <FormRow
                            type='name'
                            name='name'
                            value={values.name}
                            handleChange={handleChange}
                        />

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
                            {loading ? 'Loading...' : 'Register'}
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
  .alert {
    margin-top: 3rem;
    margin-bottom: -1.5rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
  .btn:disabled {
    cursor: not-allowed;
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
`;

export default Register;
