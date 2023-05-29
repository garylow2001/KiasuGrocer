import React, { useState, useEffect } from 'react'; 
import { Link, useParams } from 'react-router-dom';


const VendorProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/vendor/${id}`);
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
        <Link to={`/vendor/${id}/newproduct`}>Create Product</Link>
      </button>
      <h2>Products</h2>
      <p> ----------------------------------------</p>
      <p>Click on a product to view it.</p>
      <p> ----------------------------------------</p>
      <div className="product-container">
        {data.map((product) => (
          <Link
            to={ `/vendor/${id}/product/${product.id}`}
            key={product.id}
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
            Product: {product.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VendorProduct;
