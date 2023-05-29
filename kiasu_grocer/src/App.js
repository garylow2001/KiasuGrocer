import React from 'react';
import AuthCustomer from './pages/AuthCustomer';
import AuthVendor from './pages/AuthVendor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DashboardCustomer from './pages/DashboardCustomer';
import VendorProducts from './pages/VendorProducts';
import ViewProduct from './pages/ViewProduct';
import NewProductForm from './pages/NewProductForm'
import CreateVendor from './pages/NewVendorForm';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <main className="App bg-cream text-center
       flex bg-contain text-black min-h-screen text-xl 
       justify-center items-center w-full h-full align-top">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/authcustomer" element={<AuthCustomer />} />
          <Route path="/authvendor" element={<AuthVendor />} />
          <Route path="/dashboardcustomer" element={<DashboardCustomer/>} />
          <Route exact path="/vendor/:id/products" element={<VendorProducts/>} />
          <Route path="/vendor/:vid/product/:id" element={<ViewProduct/>} />
          <Route path="/vendor/:id/newproduct" element={<NewProductForm/>} />
          <Route path="/vendor/:vid/product/:id/edit" element={<EditProduct/>} />
          <Route path="/vendorsignup" element={<CreateVendor />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
