import { useSelector, useDispatch } from 'react-redux';
import { logout, loginSuccess } from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const setAuthData = (userData, tokenData) => {
    dispatch(loginSuccess({ user: userData, token: tokenData }));
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    logout: handleLogout,
    setAuthData,
    isAdmin: user?.role === 'admin',
    isDelivery: user?.role === 'delivery'
  };
};

export default useAuth;
