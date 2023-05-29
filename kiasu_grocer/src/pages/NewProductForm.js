import React, { useState } from 'react';
//import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


function ProductForm() {
  const { id } = useParams();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [image, setImage] = useState(null);
  const [discount, setDiscount] = useState('0');
  const history = useNavigate();

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
      // Create a FormData object to send the form data
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('expiry_date', expiryDate);
      formData.append('image', image);
      formData.append('discount', discount);

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        vendor_id: id,
        name: productName,
        description: description,
        price: price,
        quantity: quantity,
        expiry_date: expiryDate,
        image: image,
        discount: discount,
      };

      // Send the POST request to the database URL
      const response = await fetch(
        'http://localhost:5000/api/products/create', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

      if (response.ok) {
        // Handle the successful response, e.g., show a success message
        console.log('Product created successfully!');
        // Reset form fields
        setProductName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setExpiryDate('');
        setImage(null);
        setDiscount('0');
      } else {
        // Handle the error response, e.g., show an error message
        console.log('Failed to create product.');
      }
    } catch (error) {
      // Handle any network or other errors
      console.log('Error:', error.message);
    }

    history(`/vendor/${id}/products`);
  };

  return (
    <div>
      <h1>Product Form</h1>
      <Link to={`/vendor/${id}/products`} class="clickable-cell">Back to Products</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={handleProductNameChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange}></textarea>
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={handlePriceChange} />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={handleQuantityChange} />
        </label>
        <br />
        <label>
          Expiry Date:
          <input type="date" value={expiryDate} onChange={handleExpiryDateChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <br />
        <label>
          Discount:
          <input type="number" value={discount} onChange={handleDiscountChange} />
        </label>
        <br />
        <button type="submit" class='clickable-cell'>Submit</button>
      </form>
    </div>
  );
}

export default ProductForm;

