/**
 * Socket Service Placeholder for Real-Time Order & Kitchen Updates
 * When a backend Socket.io server is attached at VITE_SOCKET_URL, this client handles
 * persistent bidirectional event streaming.
 */

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    const socketUrl = import.meta.env.VITE_SOCKET_URL;
    console.log(`[SocketService] Connecting to ${socketUrl || 'mock local event bus'}...`);
    // Future Socket.io initialization:
    // this.socket = io(socketUrl, { auth: { token: localStorage.getItem('ember_token') } });
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);

    // Fallback: Listen to browser CustomEvent during frontend-only mode
    const handler = (e) => callback(e.detail);
    window.addEventListener(`socket_${event}`, handler);
    return () => window.removeEventListener(`socket_${event}`, handler);
  }

  emit(event, data) {
    // In production: this.socket.emit(event, data);
    window.dispatchEvent(new CustomEvent(`socket_${event}`, { detail: data }));
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const socketService = new SocketService();
