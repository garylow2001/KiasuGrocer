import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const ViewProduct = () => {
  const location = useLocation();
  const { vid, id } = useParams();
  const product = location.state; 

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
      <Link 
        to={`edit`}
        key={product.id}
        state={product}
        >
        Edit Product
      </Link>
    </div>
  );
};

export default ViewProduct;

