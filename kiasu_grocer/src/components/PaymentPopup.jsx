import React from 'react'

function PaymentPopup(props) {
  return (props.trigger) ? (
    <div className=''>
      <div className=''>
        <button>close</button>
        { props.children }
      </div>
    </div>
  ) : "";
}

export default PaymentPopup
