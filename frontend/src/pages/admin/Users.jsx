import React, { useState, useEffect } from 'react';
import { Search, Shield, User, Trash2 } from 'lucide-react';
import Loader from '../../components/Loader';
import userService from '../../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    try {
      await userService.updateUserRole(userId, newRole);
      setUsers(prev => 
        prev.map(u => u._id === userId ? { ...u, role: newRole } : u)
      );
    } catch (err) {
      console.error("Failed to update role:", err);
      alert(err.response?.data?.message || "Failed to update user privilege.");
      fetchUsers();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await userService.deleteUser(userId);
      setUsers(prev => prev.filter(u => u._id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert(err.response?.data?.message || "Failed to delete user.");
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Shield size={12} className="text-premium-accent" />;
      case 'delivery': return <User size={12} className="text-blue-500" />;
      default: return <User size={12} className="text-premium-dark/30" />;
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
            Governance
          </span>
          <h1 className="text-4xl font-serif font-bold text-premium-dark">User Directory</h1>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-premium-dark/20 group-focus-within:text-premium-accent transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border border-gray-100 pl-10 pr-6 py-3 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-premium-accent transition-all w-80"
          />
        </div>
      </div>

      {loading && users.length === 0 ? (
        <Loader />
      ) : (
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-premium-light border-b border-gray-100">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Identity</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Email</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Privilege</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Phone</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-xs uppercase tracking-widest text-premium-dark/30">
                    No users matching search query.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((userObj) => (
                  <tr key={userObj._id} className="hover:bg-premium-light/30 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-premium-dark/5 flex items-center justify-center text-premium-dark text-[10px] font-bold">
                          {userObj.name ? userObj.name.split(' ').map(n => n[0]).join('') : "U"}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-premium-dark">{userObj.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-[10px] font-bold text-premium-dark/60">{userObj.email}</td>
                    <td className="p-6">
                      {updatingId === userObj._id ? (
                        <span className="text-[8px] uppercase tracking-widest font-bold text-premium-dark/40">Updating...</span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(userObj.role)}
                          <select
                            value={userObj.role}
                            onChange={(e) => handleRoleChange(userObj._id, e.target.value)}
                            className="bg-transparent text-[10px] uppercase tracking-widest font-bold text-premium-dark/60 outline-none border-0 cursor-pointer"
                          >
                            <option value="user">Customer</option>
                            <option value="delivery">Courier</option>
                            <option value="admin">Administrator</option>
                          </select>
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-[10px] font-bold text-premium-dark/40">
                      {userObj.phone || "Not provided"}
                    </td>
                    <td className="p-6">
                      <button 
                        onClick={() => handleDeleteUser(userObj._id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
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

export default Users;
