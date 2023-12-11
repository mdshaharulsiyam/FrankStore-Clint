import React from 'react'
import SectionHeading from '../../../Components/SectionHeading/SectionHeading'
import SupportCards from '../../../Components/SupportCards/SupportCards'

const Supports = () => {
    return (
        <div className='container mx-auto py-12'>
            <SectionHeading topheadin='supports' heading='Customer Benefits' />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-12">
                <SupportCards heading='FREE AND FAST DELIVERY' peragraph='Free delivery for all orders over $140' logo='/icon-delivery.png' />
                <SupportCards heading='24/7 CUSTOMER SERVICE' peragraph='Friendly 24/7 customer support' logo='/Icon-Customer service.png' />
                <SupportCards heading='MONEY BACK GUARANTEE' peragraph='We reurn money within 30 days' logo='/shield-tick.png' />
            </div>
        </div>
    )
}

export default Supports
