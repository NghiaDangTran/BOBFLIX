import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';
import { setUser, UserSelector } from '../features/user/userSlice'
function PrivateRoute({ children }) {
    // console.log(children)
    const { userName, loading } = useSelector(UserSelector);
   if (localStorage.getItem('user'))
   {
    return children
   }
    if (loading) {
        return <h1>Loading...</h1>;
    }
    return userName ? (
        children
    ) : (
        <Navigate to="/" />
    );
}

export default PrivateRoute;