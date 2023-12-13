
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';
import { useLoaderData, useParams } from 'react-router-dom';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_API);
const Payment = () => {
    const product = useLoaderData()
    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm product={product.data} />
            </Elements>
        </>
    )
}

export default Payment
