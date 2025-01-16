import { createContext } from 'react';
import { io } from 'socket.io-client';
import { EventEmitter } from '../utils/event-emitter';
import { WS_URL } from '../constants';

export const socket = io(WS_URL, {
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
