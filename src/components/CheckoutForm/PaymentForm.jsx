import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout, timeout}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
    } else {
        console.log(
            shippingData.address1, shippingData.city, shippingData.shippingSubdivision, shippingData.zip, shippingData.shippingCountry
        );

        const orderData = {
            line_items: checkoutToken.live.line_items,
            customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
            shipping: { name: 'primary', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
            fulfillment: { shipping_method: shippingData.shippingOption },
            payment: {
            gateway: 'stripe',
            stripe: {
                payment_method_id: paymentMethod.id,
            },
            },
        };

      onCaptureCheckout(checkoutToken.id, orderData);

      timeout();

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;

// import React from 'react'
// import {Typography, Button, Divider} from '@material-ui/core';
// import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js'

// import Review from './Review';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// const PaymentForm = ({checkoutToken, shippingData, prevStep, nextStep, onCaptureCheckout}) => {
//     const handleSubmit = async (event, elements, stripe) => {
//         console.log(1);
//         event.preventDefault();
//         console.log(2);
//         if(!stripe || !elements) return; 
//         console.log(3);
//         const cardElement = elements.getElement(CardElement);
//         console.log(4);

//         const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});
//         console.log(5);

//         if(error) {
//             console.log(6);
//             console.log(error);
//         } else {
//             console.log(7);

//             const orderData = {
//                 line_items: checkoutToken.live.line_items,
//                 customer: {firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
//                 shipping: {
//                     name: 'Primary',
//                     street: shippingData.address1,
//                     town_city: shippingData.city,
//                     county_state: shippingData.shippingSubdivision,
//                     postal_zip_code: shippingData.zip,
//                     country: shippingData.shippingCountry
//                 },
//                 fulfillment: {shipping_method: shippingData.shippingOption},
//                 payment: {
//                     gateway: 'stripe',
//                     stripe: {
//                         payment_method_id: paymentMethod.id
//                     }
//                 }
//             }

//             // const orderData = {
//             //     line_items: checkoutToken.live.line_items,
//             //     customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
//             //     shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
//             //     fulfillment: { shipping_method: shippingData.shippingOption },
//             //     payment: {
//             //       gateway: 'stripe',
//             //       stripe: {
//             //         payment_method_id: paymentMethod.id,
//             //       },
//             //     },
//             //   };
//             console.log(8);


//             onCaptureCheckout(checkoutToken.id, orderData);
//             console.log(9);

//             nextStep();
//             console.log(10);

//         }
//     }
//     return (
//         <>
//             <Review checkoutToken = {checkoutToken} />
//             <Divider />
//             <Typography variant = "h6" gutterBottom style={{margin: "20px 0"}}>Payment method</Typography>

//             <Elements stripe = {stripePromise}>
//                 <ElementsConsumer>
//                     {
//                         (({elements, stripe}) => (
//                             <form onSubmit = {e => handleSubmit(e, elements, stripe)}>
//                                 <CardElement />
//                                 <br /><br />

//                                 <div style = {{display: "flex", justifyContent: "space-between"}}>
//                                     <Button variant = "outlined" onClick = {prevStep}>Back</Button>
//                                     <Button type = "submit" variant = "contained" disabled = {!stripe} color = "primary">
//                                         Pay {checkoutToken.live.subtotal.formatted_with_symbol}
//                                     </Button>
//                                 </div>
//                             </form>
//                         ))
//                     }
//                 </ElementsConsumer>
//             </Elements>
//         </>
//     )
// }

// export default PaymentForm
