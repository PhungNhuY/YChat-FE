import { createContext } from 'react';
import { io } from 'socket.io-client';
import { EventEmitter } from '../utils/event-emitter';

export const socket = io(import.meta.env.VITE_WS_URL as string, {
  autoConnect: false,
  withCredentials: true,
  reconnection: true,
  reconnectionDelay: 5000,
});

export const tokenRefreshedEventEmitter = new EventEmitter();
tokenRefreshedEventEmitter.on('tokenRefreshed', () => {
  if (!socket.connected) {
    socket.connect();
  }
});

export const SocketContext = createContext(socket);
