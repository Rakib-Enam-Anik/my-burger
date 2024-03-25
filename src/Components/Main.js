import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Auth from './Auth/Auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const Main = ({ token }) => {
    return (
        <div>
            <Header />
            <div className="container">
                <Routes>
                    {token === null ? (
                        <>
                            <Route path="/login" element={<Auth />} />
                            <Route path="/" element={<Navigate to="/login" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/" element={<BurgerBuilder />} />
                            <Route path="/" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Main);
