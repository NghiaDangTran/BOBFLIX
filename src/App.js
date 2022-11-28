import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing, Home, Movies, List, New } from './pages'
import { Footer, Header } from './components/common'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NormSelector, setCurrHeight } from './features/common/normSlice';
function App() {

  const dispatch = useDispatch()
  const { currHeight } = useSelector(NormSelector)
  const handleScroll = () => {
    const at = window.pageYOffset;
    // console.log(at,currHeight)
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
      <Header></Header>

      <Routes>
        <Route path='/' element={<Home></Home>} ></Route>
        <Route path='/Movies' element={<Movies></Movies>} ></Route>
        <Route path='/List' element={<List></List>} ></Route>
        <Route path='/landing' element={<Landing></Landing>} ></Route>


      </Routes>
   

      <Footer></Footer>

    </Router>


    // </Lading>
  );
}

export default App;
