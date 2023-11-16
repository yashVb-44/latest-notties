import React from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const orderAmount = 100; // Set your order amount here

    const redirectToBackend = () => {
        axios
            .post('http://localhost:8000/processPayment', { amount: orderAmount })
            .then((response) => {

                console.log(response?.data, "res")
                window.location.href = response.data.url;
            })
            .catch((error) => {
                console.log(error)
                console.error(error);
            });
    };

    return (
        <div>
            <h1>CCAvenue Payment Gateway Demo</h1>
            <button onClick={redirectToBackend}>Pay Now</button>
        </div>
    );
};

export default PaymentForm;
