import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { Landing, Home, Movies, List, Search, PrivateRoute, LayOut, Login, Register, ForgotPass, VerifyEmail, ResetPassword } from './pages'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrHeight } from './features/common/normSlice';
import { NotFound } from '../src/components/common'
import { HeroSelector } from './features/hero/heroSlice'
import { Hero } from './components/common'
import styled from 'styled-components';
import VideoPlayer from './pages/Player';
import { UserSelector, setUser } from './features/user/userSlice';
import axios from 'axios';

function App() {
  const { openHero } = useSelector(HeroSelector)
  const [showHero, setShowHero] = useState(false)
  const dispatch = useDispatch()
  const { userName, loading: loadingUser } = useSelector(UserSelector);
  const fetchUser = async () => {
    // try {
    //   const { data } = await axios.get(`/api/v1/auth/verify-user`);
    //   console.log(data)
    //   // saveUser(data);
    //   dispatch(setUser(data.user));
    // } catch (error) {
    //   console.log(error)
    //   // dispatch(setUser(null));
    // }
  };
  useEffect(() => { fetchUser() })
  useEffect(() => {
    if (openHero) {
      setShowHero(true)

    }
    let timerId;
    if (showHero && !openHero) {
      timerId = setTimeout(() => {
        setShowHero(
          false
        );
        document.body.style.overflowY = "scroll";
      }, 900);

    }
    return () => clearTimeout(timerId);
  }, [openHero])
  const handleScroll = () => {
    const at = window.pageYOffset;
    dispatch(setCurrHeight(at))
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    // <Lading>
    <Router>
      <Wrapper >

        {showHero && <Hero></Hero>}
      </Wrapper>


      <Routes>
        <Route path='/Home' element={

          <PrivateRoute >
            <LayOut>

              <Home />


            </LayOut>
          </PrivateRoute>
        } ></Route>
        <Route path='/Movies' element={


          <PrivateRoute >
            <LayOut>

              <Movies />


            </LayOut>
          </PrivateRoute>

        } ></Route>
        <Route path='/List' element={

          <PrivateRoute >
            <LayOut>

              <List></List>



            </LayOut>
          </PrivateRoute>

        } ></Route>

        <Route path='/search/:term' element={

          <PrivateRoute>
            <LayOut>

              <Search></Search>
            </LayOut>

          </PrivateRoute>

        } ></Route>
        <Route path='/cookies' element={
          <PrivateRoute>
            <LayOut>

              <></>
            </LayOut>

          </PrivateRoute>

        } ></Route>
        <Route path='/video' element={
          <VideoPlayer src={""}></VideoPlayer>


        } ></Route>
        <Route path='/' element={<Landing></Landing>} ></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/forgot-password' element={<ForgotPass></ForgotPass>}></Route>
        <Route path='/user/verify-email' element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path='/user/reset-password' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='*' element={<NotFound></NotFound>} ></Route>


      </Routes>


    </Router>


    // </Lading>
  );
}

const Wrapper = styled.div`
z-index: auto;
 
 color:white;
 .showHero{    
     opacity: 1;
transition: ease-in-out 0.3s;
}
 .hideHero{
     opacity: 0;
transition: ease-in-out 0.8s;
 }
`
{/* <PrivateRoute>
            <LayOut>

            </LayOut>

          </PrivateRoute> */}

export default App;
