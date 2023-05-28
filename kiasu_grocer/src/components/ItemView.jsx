import React from 'react'

function ItemView(props) {
    return (
        <div className='box w-full flex my-4 border-2 border-black shadow-sm
        shadow-black rounded-lg px-4 py-4 bg-orange-200'>

            <div className='justify-center mx-24 my-auto bg-white'>
                IMAGE OF ITEM
            </div>
            <div className='text-left'>


                <h1 className='font-bold text-2xl'>
                    {props.item}
                </h1>
                <h2>
                    Category: Category
                </h2>
                <p>
                    Date of Expiry: dateofexpiry
                </p>
                <p>
                    Available until: dateoflisting
                </p>
                <div className='space-x-5 justify-center'>
                    <button className='box border-2 rounded-md px-5 py-auto bg-white'>
                        Buy Now
                    </button>
                    <button className='box border-2 rounded-md px-5 py-auto bg-white'>
                        Add to Cart
                    </button>
                </div>


            </div>
        </div>
    )
}

export default ItemView
