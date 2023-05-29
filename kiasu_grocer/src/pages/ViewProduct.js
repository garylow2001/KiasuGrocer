import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ViewProduct = () => {
  const location = useLocation();
  const { id } = useParams();
  const product = location.state; 
  console.log("location: ", product);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, price, quantity, expiryDate, image } = product;

  return (
    <div>
      <h1>View Product</h1>
      <h2>Product ID: {id}</h2>
      <p>Product Name: {name}</p>
      <p>Description: {description}</p>
      <p>Price: {price}</p>
      <p>Quantity: {quantity}</p>
      <p>Expiry Date: {expiryDate}</p>
      <p>Image: {image}</p>
    </div>
  );
};

export default ViewProduct;

