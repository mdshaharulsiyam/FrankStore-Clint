import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    }

    return (
        <form className="my-11 max-w-2xl container mx-auto bg-[#e8e8e8] p-5" onSubmit={handleSubmit}>
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
            <button className="border-green-600 bg-green-500 mt-10 mx-auto block px-16 hover:bg-green-300 transition-all active:scale-90" type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    )
}

export default CheckoutForm
