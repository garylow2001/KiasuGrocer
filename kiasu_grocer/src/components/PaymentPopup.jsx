import React from 'react';

function PaymentPopup(props) {
  return (props.trigger) ? (
    <div className='fixed top-0 left-0 w-full h-4/5 bg-red-500
    flex justify-items-center justify-center align-middle'>
      <div className='relative p-8 w-full bg-white'>
        <h1>PAYMENT</h1>
        <h2>Total: ${props.totalPrice}</h2>
        <img className='mx-auto' src={require('../assets/fakeQRcode.png')} height={400} width={400} />
        <button className='absolute top-4 right-4'
          onClick={() => props.setTrigger()}>x</button>
        <button className='absolute bottom-4 left-1/2 -translate-x-1/2 box border-2 rounded-md px-5 py-2 bg-red-500 text-white'
          onClick={() => props.setPaid()}>Confirm payment</button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default PaymentPopup
