import { useLocation } from 'react-router-dom';

const ProductEdit = () => {
  const location = useLocation();
  const { name, description, price, quantity, expiryDate, image } = location.state;

  return (
    <div>
      <h2>Item Name: {name}</h2>
      <p>Description: {description}</p>
      <p>Price: {price}</p>
      <p>Quantity: {quantity}</p>
      <p>Expiry Date: {expiryDate}</p>
      {/* Render the rest of the page */}
    </div>
  );
};

export default ProductEdit;

