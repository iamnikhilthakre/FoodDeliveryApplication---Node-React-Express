// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: JSON.parse(localStorage.getItem('user')) || null,
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: !!localStorage.getItem('token'),
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       localStorage.setItem('user', JSON.stringify(action.payload.user));
//       localStorage.setItem('token', action.payload.token);
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//     },
//     updateUser: (state, action) => {
//       state.user = { ...state.user, ...action.payload };
//       localStorage.setItem('user', JSON.stringify(state.user));
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const getStoredUser = () => {
  try {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    return user && user !== 'undefined' ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing stored user:", error);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    return null;
  }
};

const getStoredToken = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token && token !== 'undefined' ? token : null;
};

const storedUser = getStoredUser();
const storedToken = getStoredToken();

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.user;
      state.token = action.payload?.token;

      const storage = action.payload?.rememberMe ? localStorage : sessionStorage;

      if (action.payload?.user) {
        storage.setItem(
          'user',
          JSON.stringify(action.payload.user)
        );
      }

      if (action.payload?.token) {
        storage.setItem(
          'token',
          action.payload.token
        );
      }
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },

    updateUser: (state, action) => {
      state.user = state.user
        ? { ...state.user, ...action.payload }
        : action.payload;

      if (state.user) {
        const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
        storage.setItem(
          'user',
          JSON.stringify(state.user)
        );
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;