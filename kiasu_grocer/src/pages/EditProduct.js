import React, { useState } from 'react';
//import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';


function EditProduct() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state;
  console.log(product.name); 
  //const { name, description, price, quantity, expiryDate, image } = product;

  const [productName, setProductName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [expiryDate, setExpiryDate] = useState(product.expiry_date);
  const [image, setImage] = useState(product.image);
  const [discount, setDiscount] = useState(product.discount);

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
        'http://localhost:5000/api/products/update/' + id, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

      if (response.ok) {
        // Handle the successful response, e.g., show a success message
        console.log('Product updated successfully!');
        // Reset form fields
        setProductName(productName);
        setDescription(description);
        setPrice(price);
        setQuantity(quantity);
        setExpiryDate(expiryDate);
        setImage(image);
        setDiscount(discount);
      } else {
        // Handle the error response, e.g., show an error message
        console.log('Failed to update product.');
      }
    } catch (error) {
      // Handle any network or other errors
      console.log('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={handleProductNameChange} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange}></textarea>
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={handlePriceChange} />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={handleQuantityChange} />
        </label>
        <label>
          Expiry Date:
          <input type="date" value={expiryDate} onChange={handleExpiryDateChange} />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <label>
          Discount:
          <input type="number" value={discount} onChange={handleDiscountChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditProduct;

