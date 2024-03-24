import React, { Component } from 'react';
import { Formik } from 'formik';


class Auth extends Component {
    state = {
        mode: "Sign Up"
    }
    render() {
        return (
            <div>
                <Formik
                   initialValues={
                    {
                    email: "",
                    password: "",
                    passwordConfirm: "",
                  }
                }
                 
                onSubmit={
                    (values) => {
                        console.log("Values:", values);
                    }
                }
                
                validate={(values) => {
                    const errors = {};

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (values.password.length < 4) {
                        errors.password = 'Must be at least 4 characters!';
                    }

                    if (!values.passwordConfirm) {
                        errors.passwordConfirm = 'Required';
                    } else if (values.password.length !== values.passwordConfirm){
                        errors.passwordConfirm = 'Must be at least 4 characters!';
                    }
                    
                    console.log("Errors:", errors)
                    return errors;
                }}

                >
                {({ values, handleChange, handleSubmit, errors }) => (<div
                   style={{
                    border: "1px grey solid",
                    padding: "15px",
                    borderRadius: "7px",
                }}> 
                    <button>Switch To {this.state.mode==="Sign Up"} </button>
                    <form onSubmit={handleSubmit}>
                    <input 
                    name="email"
                    placeholder="Enter Your Email"
                    className="form-control"
                    value={values.email}
                    onChange = {handleChange}
                    />
                    <span style={{ color: "red"}}>{errors.email}</span>
                    <br />
                    <input 
                    name="password"
                    placeholder="password"
                    className="form-control"
                    value={values.password}
                    onChange = {handleChange}
                    />
                      <span style={{ color: "red"}}>{errors.password}</span>
                    <br />
                    <input 
                    name="passwordConfirm"
                    placeholder=" Confirm Password"
                    className="form-control"
                    value={values.passwordConfirm}
                    onChange = {handleChange}
                    />
                     <span style={{ color: "red"}}>{errors.passwordConfirm}</span>
                    <br />
                    <button type="submit" className="btn btn-success">Sign Up</button>
                    </form>
                    </div>)}
                
                </Formik>
            </div>
        )
    }
}

export default Auth;