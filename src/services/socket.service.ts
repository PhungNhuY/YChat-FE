import { createContext } from 'react';
import { io } from 'socket.io-client';
import { EventEmitter } from '../utils/event-emitter';
import { WS_PREFIX, WS_URL } from '../constants';

export const socket = io(WS_URL, {
  autoConnect: false,
  withCredentials: true,
  reconnection: true,
  reconnectionDelay: 5000,
  transports: ['websocket'],
  path: `${WS_PREFIX}/socket.io/`,
});

socket.on('connect_error', (err) => {
  console.error('WebSocket connection error:', err);
});

export const tokenRefreshedEventEmitter = new EventEmitter();
tokenRefreshedEventEmitter.on('tokenRefreshed', () => {
  if (!socket.connected) {
    socket.connect();
  }
});

export const SocketContext = createContext(socket);
