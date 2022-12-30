import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import MyNav from './MyNav';

const Main = () => {
    return (
        <div>
            <MyNav></MyNav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;