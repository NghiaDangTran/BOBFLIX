import React from 'react';
import { Footer, Header } from '../components/common'

function LayOut({ children }) {
    const location = window.location.pathname
    const pattern = /^\/(|Movies|List|Home|search\/.*)$/

    return (
        <>
            {pattern.test(location) && <Header></Header>}
            {children}

            {pattern.test(location) && <Footer></Footer>}        </>
    );
}

export default LayOut;