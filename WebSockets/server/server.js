import { WebSocketServer } from "ws";

// Creating a server -> This helps to create a server: ws://localhost:8000
const ws = new WebSocketServer({
    port: 8000
});

// Whenever a connection is established run this. Socket represents that particular client's WebSocket connection. 
ws.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", (message) => {
        console.log("Received", message.toString());
        
        socket.send(`Echo: ${message.toString()}`);
    });
});