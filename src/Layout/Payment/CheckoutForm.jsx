import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CheckoutForm = ({ product, currentUser, adressstate }) => {
    const { brand, category, date, description, price, productImage, productName, quantity, rating, review, totalSold, _id } = product
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')
    const [clientSecret, setclientSecret] = useState(null)

    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    useEffect(() => {
        if (!price) {
            return
        }
        axiosSecure.post('/create-payment-intent', { price })
            .then((res) => {
                setclientSecret(res.data.clientSecret)
            })
    }, [price])
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
            seterror(error?.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: currentUser?.useremail || 'anonymous',
                        name: currentUser?.username || 'anonymous'
                    }
                }
            })

            if (confirmError) {
                setloading(false)
                seterror(confirmError?.message)
            }
            else {
                if (paymentIntent.status === 'succeeded') {
                    const data = {
                        useremail: currentUser?.useremail,
                        itemId: _id,
                        amount: price,
                        transitionId: paymentIntent?.id,
                        status: 'pending',
                        address: adressstate?.address ? currentUser?.address : adressstate?.address
                    }
                    axiosSecure.post('/order', data)
                        .then((res) => {
                            navigate('/dashboard/order')
                            console.log(res.data);
                        })
                }
            }
        }
    }
    return (
        <>
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
                <button className=" mt-10 mx-auto block px-16 border-2 border-black transition-all" type="submit" disabled={!stripe || (!currentUser?.address && adressstate)}>
                    Pay ${price}
                </button>
            </form>
        </>
    )
}

export default CheckoutForm
