import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Products from '../pages/public/Products';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ProductDetails from '../pages/public/ProductDetail';
import Cart from '../pages/buyer/Cart';
import Checkout from '../pages/buyer/Checkout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import BecomeSeller from '../pages/seller/BecomeSeller';
import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import SellerApprovals from '../pages/admin/SellerApprovals';
import OrdersManage from '../pages/admin/OrdersManage';
import ProductApprovals from '../pages/admin/ProductApprovals';
import UserManage from '../pages/admin/UserManage';
import SellerLayout from '../components/layout/SellerLayout';
import MyOrders from '../pages/seller/MyOrders';
import MyProducts from '../pages/seller/MyProducts';
import SellerDashboard from '../pages/seller/SellerDashboard';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/:id" element={<Checkout />} />

        {/* Protected Routes for any logged in user */}
        <Route element={<ProtectedRoute />}>
          <Route path="/become-seller" element={<BecomeSeller />} />
        </Route>

        {/* Protected Routes for admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="sellers" element={<SellerApprovals />} />
            <Route path="products" element={<ProductApprovals />} />
            <Route path="orders" element={<OrdersManage />} />
            <Route path="users" element={<UserManage />} />
          </Route>
        </Route>

        {/* Protected Routes for seller */}
        <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<SellerDashboard />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="products" element={<MyProducts />} />
            {/* Seller routes placeholder */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
