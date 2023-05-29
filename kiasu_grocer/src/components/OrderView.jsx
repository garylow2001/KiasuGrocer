import React from 'react'

function OrderView(props) {
    const handleClick = (s) => {
        props.handleClick(s);
    }
    return (
        <div className='box w-full flex my-4 border-2 border-black shadow-sm
        shadow-black rounded-lg px-4 py-4 bg-orange-200'>

            <div className='justify-center mx-24 my-auto bg-white'>
                {
                    props.data.name === 'Apple' ? <img src={require('../assets/apple.jpg')} height={250} width={250} /> :
                    props.data.name === 'Banana' ? <img src={require('../assets/bananas.jpg')} height={250} width={250} /> :
                    props.data.name === 'Milo 3L' ? <img src={require('../assets/milo.jpg')} height={250} width={250} /> :
                    props.data.name === 'Vitamin C 100g' ? <img src={require('../assets/vitaminc.jpg')} height={250} width={250} /> :
                    props.data.name === 'Shampoo' ? <img src={require('../assets/shampoo.jpg')} height={250} width={250} /> :
                    "IMAGE"
                }
            </div>
            <div className='text-left'>


                <h1 className='font-bold text-2xl'>
                    {props.data.name}
                </h1>
                <h2>
                    Price: {props.data.price}
                </h2>
                <p>
                    Vendor: {props.data.vendor}
                </p>
                <p>
                    Date of Expiry: {props.data.expiry_date}
                </p>
                <p>
                    Available until: {props.data.listing_end}
                </p>
                <div onClick={() => handleClick(props.data.id)} className='space-x-5 justify-center'>
                    <button className='box border-2 rounded-md px-5 py-auto bg-white'>
                        Cancel
                    </button>
                </div>


            </div>
        </div>
    )
}

export default OrderView
