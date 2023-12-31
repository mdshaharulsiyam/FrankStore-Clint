import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FrankStoreData } from "../../Context/FrankStoreContext";

const CheckoutForm = ({ product }) => {
    const {currentUser}=useContext(FrankStoreData)
    const { brand, category, date, description, price, productImage, productName, quantity, rating, review, totalSold, _id } = product
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')
    const [clientSecret, setclientSecret] = useState(null)
    const axiosSecure = useAxiosSecure()
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
                    //upload to backend payment succed
                    const data = {
                        useremail: currentUser?.useremail,
                        itemId : _id,
                        amount : price,
                        transitionId : paymentIntent?.id,
                        status : 'pending'
                    }
                    axiosSecure.post('/order',data)
                    .then((res)=>{
                        console.log(res.data);
                    })
                }
            }
        }
    }
    return (
        <>
            <div className="sm:flex flex-wrap gap-2 items-center justify-start container mx-auto py-6">
                <img className="w-20 h-20 rounded" src={productImage} alt="" />
                <span>
                    <p className="text-lg font-semibold">{productName}</p>
                    <p>brand : {brand}</p>
                </span>
            </div>
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
                    Pay ${price}
                </button>
            </form>
        </>
    )
}

export default CheckoutForm
