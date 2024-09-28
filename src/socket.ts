import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_WS_URL as string, {
  autoConnect: true,
  withCredentials: true,
});

export const SocketContext = createContext(socket);
