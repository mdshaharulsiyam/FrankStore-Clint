
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_API);
const Payment = () => {
    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    )
}

export default Payment
