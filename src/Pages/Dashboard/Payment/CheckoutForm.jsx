import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import React, { useEffect, useState } from 'react';

import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

import UseCart from '../../../Hooks/UseCart';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')


    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = UseAxiosSecure();
    const [cart, refetch] = UseCart();
    const {user} = useAuth()
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() =>{
     if(totalPrice > 0){
      axiosSecure.post('/create-payment-intent', {price: totalPrice})
      .then(res =>{
        console.log(res.data.clientSecret); 
        setClientSecret(res.data.clientSecret)
      })
     }


    },[])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        // console.log(event)

        if(!stripe || !elements ){
            return

        }

        const card = elements.getElement(CardElement)


        if(card == null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log('payment error', error);
            setError(error.message);
        }

        else{
            console.log('payment method', paymentMethod)
            setError('')
        }


        // confirm payments

        const {paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card: card,
            billing_details: {
              email: user?.email || 'anonymous'

            }
          }
        })
        if(confirmError){
          console.log('confirm error')
        }

        else{
          console.log('payment intent', paymentIntent)
          if(paymentIntent.status === 'succeeded'){
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);

            // now save the payment in the database

            const payment = {
              email: user.email,
              price: totalPrice,
              transactionId: paymentIntent.id,
              date: new Date() , //utc date convert.use moment js to
              cartIds: cart.map(item => item._id),
              menuIds: cart.map(item => item.menuId),
              status: 'pending'
            }

           const res = await axiosSecure.post('/payments', payment)
           console.log('payment saved',res.data);
           refetch();
           if(res.data?.paymentResult?.insertedId){
            Swal.fire("Thank you");
            
           }

          }
          navigate('/dashboard/paymentHistory')
        }



    } 
    // console.log(stripe)
    return (
      <form onSubmit={handleSubmit}>
        
             <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
        <button className='btn btn-primary my-5' type="submit" disabled={!stripe || !clientSecret}>

        Pay
      </button>
      <p className='text-red-600'>{error}</p>
      {transactionId && <p className='text-green-600'>Your transaction id: {transactionId}</p>}

      </form>
    );
};

export default CheckoutForm;