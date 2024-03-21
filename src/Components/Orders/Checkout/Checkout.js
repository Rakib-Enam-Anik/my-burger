import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import { useNavigate } from "react-router-dom";



import axios from 'axios';


const mapStateTopProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}


class Checkout extends Component  {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        }
    }
     
    goBack = () => {
        
        //this.props.history.goBack("/");
        const navigate = useNavigate();
        navigate("-1");
    }

    inputChangerHandler = (e) => {
        this.setState({
           values: {
            ...this.state.values,
            [e.target.name]: e.target.value,
           }
        })
    }

    submitHandler = () => {
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        axios.post("https://burger-builder-40852-default-rtdb.firebaseio.com/orders.json", order)
        .then(response=> console.log(response))
        .catch(err => console.log(err))
       
    }

    render() {
        return (
            <div>

                <h4 style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    padding: "20px",
                    margin: "20px",
                }}>Payment:{this.props.totalPrice} BDT </h4>
                <form style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    padding: "20px",
                    margin: "20px",
                }}>
                    <textarea name="deliveryAddress" value={this.state.values.deliveryAddress}
                    className='form-control' placeholder="Your Delivery Address"
                    onChange={(e)=> this.inputChangerHandler(e)}></textarea>
                    <br />
                    <input name="phone" className="form-control" value={this.state.values.phone} 
                    placeholder="Your Phone Number" onChange={(e)=> this.inputChangerHandler(e)} />
                    <br />
                    <select name="paymentType" className="form-control" value={this.state.values.paymentType}
                    onChange={(e)=> this.inputChangerHandler(e)}>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button style={{backgroundColor:"#D70F64"}} className="mr-auto" onClick={this.submitHandler}> Place Order </Button>
                    <Button color="secondary" className="ml-1" onClick={this.goBack}> Cancel </Button>
                </form>
            </div>
        )
        
    }
}

export default connect(mapStateTopProps)(Checkout);

