import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import { Route, Routes } from 'react-router-dom';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Auth from './Auth/Auth';

const Main = props => {
    return (
        <div>
            <Header/>
            <div className="container">
                <Routes>
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/checkout" element={<Checkout />} /> 
                    <Route path="/login" element={<Auth />} /> 
                    <Route path="/" element={<BurgerBuilder /> } />
                </Routes>
             </div>
            
        </div>
    )
}

export default Main;