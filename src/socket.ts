import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_WS_URL as string, {
  autoConnect: false,
  withCredentials: true,
  reconnection: true,
  reconnectionDelay: 5000,
});

export const SocketContext = createContext(socket);
