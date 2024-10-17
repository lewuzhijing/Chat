let socket;

export function connectWebSocket(userId,method) {
  socket = new WebSocket(`ws://47.121.140.11:8889/webSocketServer/${userId}`);
  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    console.log('WebSocket message received:', event.data);
    method(event.data)
    // Handle incoming messages if needed
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
 
}

export function sendMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error('WebSocket connection is not open');
  }
}