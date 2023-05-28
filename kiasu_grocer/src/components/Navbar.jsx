import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    //change ^
    var username = props.username;
    const navigate = useNavigate();
    const goToAuthCustomer = () => navigate('/authcustomer');
    const goToAuthVendor = () => navigate('/authvendor');
    const LoginComponent = () => {
        if (username != null) {
            return <ul className='flex'>
                <li>
                    <h2>Logged in as {username}</h2>
                </li>
                <li>
                    <button onClick={() => {
                        username = null;
                        navigate('/')
                    }}
                        className='hover:text-red-700 font-semibold justify-center align-middle pt-3'>Logout</button>
                </li>
            </ul>
        } else {
            return <ul className='flex'>
                <li>
                    <button onClick={goToAuthCustomer}
                        className='hover:text-red-700 font-semibold'>Sign In as Customer</button>
                </li>
                <li>
                    <button onClick={goToAuthVendor}
                        className='hover:text-red-700 font-semibold'>Sign In as Vendor</button>
                </li>
            </ul>
        }
    }
    return (
        <div className='absolute inset-y-0 left-0 flex justify-between items-center h-24 mx-auto w-full px-4 text-white bg-black'>
            <h1 className='w-full text-3xl font-bold'>Welcome to Kiasu Grocer</h1>
            <LoginComponent />
        </div>
    )
}

export default Navbar
