import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/user/Home';
import Restaurants from '../pages/user/Restaurants';
import FoodDetails from '../pages/user/FoodDetails';
import Cart from '../pages/user/Cart';
import Checkout from '../pages/user/Checkout';
import Login from '../pages/user/Login';
import Register from '../pages/user/Register';
import Profile from '../pages/user/Profile';
import Orders from '../pages/user/Orders';
import About from '../pages/user/About';
import Contact from '../pages/user/Contact';
import Offers from '../pages/user/Offers';
import Cuisines from '../pages/user/Cuisines';
import Addresses from '../pages/user/Addresses';
import Settings from '../pages/user/Settings';
import Careers from '../pages/user/Careers';
import FAQ from '../pages/user/FAQ';
import Privacy from '../pages/user/Privacy';
import Terms from '../pages/user/Terms';
import ProtectedRoute from '../components/ProtectedRoute';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AddFood from '../pages/admin/AddFood';
import ManageOrders from '../pages/admin/ManageOrders';
import AdminRestaurants from '../pages/admin/Restaurants';
import AdminUsers from '../pages/admin/Users';
import AdminLayout from '../layouts/AdminLayout';

// Delivery Pages
import DeliveryDashboard from '../pages/delivery/DeliveryDashboard';
import ActiveOrders from '../pages/delivery/ActiveOrders';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurant/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/cuisines" element={<Cuisines />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      {/* User Protected Routes */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/addresses" 
        element={
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute role="admin">
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/add-food" 
        element={
          <ProtectedRoute role="admin">
            <AdminLayout><AddFood /></AdminLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/orders" 
        element={
          <ProtectedRoute role="admin">
            <AdminLayout><ManageOrders /></AdminLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/restaurants" 
        element={
          <ProtectedRoute role="admin">
            <AdminLayout><AdminRestaurants /></AdminLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute role="admin">
            <AdminLayout><AdminUsers /></AdminLayout>
          </ProtectedRoute>
        } 
      />

      {/* Delivery Routes */}
      <Route 
        path="/delivery" 
        element={
          <ProtectedRoute role="delivery">
            <DeliveryDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/delivery/active" 
        element={
          <ProtectedRoute role="delivery">
            <ActiveOrders />
          </ProtectedRoute>
        } 
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
