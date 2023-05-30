import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NewVendorForm = () => {
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPasscode, setVendorPasscode] = useState('');
  const history = useNavigate();

  const handleVendorNameChange = (e) => {
    setVendorName(e.target.value);
  }

  const handleVendorEmailChange = (e) => {
    setVendorEmail(e.target.value);
  }

  const handleVendorPasscodeChange = (e) => {
    setVendorPasscode(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: vendorName,
        email: vendorEmail,
        passcode: vendorPasscode
      }
      const response = await fetch(
      'http://localhost:5000/api/vendors/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        console.log('Vendor created successfully!');
        setVendorName('');
        setVendorEmail('');
        setVendorPasscode('');
      } else {
        console.log('Vendor creation failed!');
      }
    } catch (err) {
      console.log("Error: ",err);
    }
   history('/vendors/1'); // Temporary, will change 
  }

return (
  <div>
    <h1>Create a new vendor</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="vendorName">Vendor Name</label>
      <input type="text" id="vendorName" value={vendorName} onChange={handleVendorNameChange} />
      
      <label htmlFor="vendorEmail">Vendor Email</label>
      <input type="text" id="vendorEmail" value={vendorEmail} onChange={handleVendorEmailChange} />
      
      <label htmlFor="vendorPasscode">Vendor Passcode</label>
      <input type="text" id="vendorPasscode" value={vendorPasscode} onChange={handleVendorPasscodeChange} />
      <br />
      <button type="submit" className="group relative flex w-1/2 m-auto justify-center rounded-md 
                 bg-black py-2 px-4 
                text-sm font-coolvetica text-white hover:bg-darkgrey mb-5">
        Create Vendor
      </button>
    </form>
  </div>
);
}

export default NewVendorForm;
