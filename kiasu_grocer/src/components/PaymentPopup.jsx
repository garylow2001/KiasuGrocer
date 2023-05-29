import React from 'react'

function PaymentPopup(props) {
  return (props.trigger) ? (
    <div className='fixed top-0 left-0 w-full h-4/5 bg-red-500
    flex justify-items-center justify-center align-middle'>
      <div className='relative p-{32px} w-full bg-white'>
        PAYMENT
        <button className='absolute top-4 right-4'>x</button>
        <button className='absolute bottom-4 left-1/2 justify-center'>pay</button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default PaymentPopup
