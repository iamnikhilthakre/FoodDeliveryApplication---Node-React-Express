import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Eye, RefreshCw } from 'lucide-react';
import Loader from '../../components/Loader';
import orderService from '../../services/orderService';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getUserOrders();
      // Sort newest first
      const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sorted);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert(err.response?.data?.message || "Failed to update order status.");
      // Refresh to sync back correct state
      fetchOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-500 bg-green-500/5';
      case 'Out For Delivery': return 'text-blue-500 bg-blue-500/5';
      case 'Preparing': return 'text-premium-accent bg-premium-accent/5';
      default: return 'text-premium-dark/40 bg-premium-dark/5';
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      (order.user?.name && order.user.name.toLowerCase().includes(search.toLowerCase())) ||
      (order.address && order.address.toLowerCase().includes(search.toLowerCase()));
    
    const matchesStatus = statusFilter === '' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
            Operations
          </span>
          <h1 className="text-4xl font-serif font-bold text-premium-dark">Order Logistics</h1>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <button 
            onClick={fetchOrders}
            className="p-3 bg-white border border-gray-100 text-premium-dark/40 hover:text-premium-dark transition-colors flex items-center justify-center"
            title="Refresh Orders"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-100 px-4 py-3 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-premium-accent"
          >
            <option value="">All Statuses</option>
            <option value="Preparing">Preparing</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-premium-dark/20 group-focus-within:text-premium-accent transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Find Transaction..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-gray-100 pl-10 pr-6 py-3 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-premium-accent transition-all w-64"
            />
          </div>
        </div>
      </div>

      {loading && orders.length === 0 ? (
        <Loader />
      ) : (
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-premium-light border-b border-gray-100">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">ID</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Client</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Address</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Items</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Status Control</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Amount</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-xs uppercase tracking-widest text-premium-dark/30">
                    No orders matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-premium-light/30 transition-colors group">
                    <td className="p-6 text-[10px] font-bold text-premium-accent">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="p-6 text-[10px] uppercase tracking-widest font-bold text-premium-dark">
                      {order.user?.name || "Anonymous"}
                    </td>
                    <td className="p-6 text-[10px] uppercase tracking-widest font-bold text-premium-dark/60 max-w-[150px] truncate">
                      {order.address || "No address"}
                    </td>
                    <td className="p-6 text-[10px] uppercase tracking-widest font-bold text-premium-dark/60 max-w-[200px] truncate">
                      {order.items?.map(i => `${i.food?.name || 'Dish'} (x${i.quantity})`).join(', ') || "No Items"}
                    </td>
                    <td className="p-6">
                      {updatingId === order._id ? (
                        <span className="text-[8px] uppercase tracking-widest font-bold text-premium-dark/40">Updating...</span>
                      ) : (
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`px-3 py-1 text-[8px] uppercase tracking-widest font-bold border-0 outline-none cursor-pointer ${getStatusStyle(order.status)}`}
                        >
                          <option value="Preparing" className="bg-white text-premium-dark">Preparing</option>
                          <option value="Out For Delivery" className="bg-white text-premium-dark">Out For Delivery</option>
                          <option value="Delivered" className="bg-white text-premium-dark">Delivered</option>
                        </select>
                      )}
                    </td>
                    <td className="p-6 text-[10px] font-bold text-premium-dark">${(order.totalPrice || 0).toFixed(2)}</td>
                    <td className="p-6 text-[10px] font-bold text-premium-dark/40">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
