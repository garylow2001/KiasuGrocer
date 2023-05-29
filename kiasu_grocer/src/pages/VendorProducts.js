import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';


const VendorProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div>
      <h1>Product Page</h1>
      <button>
        <Link to="/ProductEdit">Create Product</Link>
      </button>
      <h2>Products</h2>
      <div className="product-container">
        {data.map((product) => (
          console.log("product: ", product),
          <Link
            to={ `/viewproduct/${product.id}`}
            state = {product} 
              //{
              //  name: product.name,
              //  description: product.description,
              //  price: product.price,
              //  quantity: product.quantity,
              //  image: product.image,
              //  expiry_date: product.expiry_date,
              //},
            className="product-cell"
          >
            {product.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VendorProduct;
