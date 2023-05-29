import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const NewVendorForm = () => {
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPasscode, setVendorPasscode] = useState('');

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
      
      <button type="submit">Create Vendor</button>
    </form>
  </div>
);
}

export default NewVendorForm;
