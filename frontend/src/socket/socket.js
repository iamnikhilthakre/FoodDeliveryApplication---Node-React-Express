import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.io.opts.query = { userId };
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const subscribeToOrderUpdates = (callback) => {
  socket.on('orderUpdate', (data) => {
    callback(data);
  });
};

export const subscribeToDeliveryUpdates = (callback) => {
  socket.on('deliveryUpdate', (data) => {
    callback(data);
  });
};

export default socket;
