import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';

import { Routes, Route, Navigate } from 'react-router-dom'; // Import Routes and Navigate

import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component {
    componentDidMount() {
        this.props.authCheck();
    }

    render() {
        const { token } = this.props;

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
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/" element={<BurgerBuilder />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
