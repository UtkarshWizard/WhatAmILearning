import { WebSocket,  WebSocketServer } from "ws";

// Creating a server -> This helps to create a server: ws://localhost:8000
const ws = new WebSocketServer({
    port: 8000
});

const Clients = new Set();

// Whenever a connection is established run this. Socket represents that particular client's WebSocket connection. 
ws.on("connection", (socket) => {
    console.log("Client connected");
    
    Clients.add(socket);

    console.log(`Clients connected - ${Clients.size} ` );
    socket.on("message", (message) => {
        console.log("Received", message.toString());

        Clients.forEach( function each(client) {
            if(client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(`Echo: ${message.toString()}`);
            }
        });

    });

    socket.on("close", () => {
        console.log("Connection closed");
        Clients.delete(socket);

        console.log(`Clients still connected - ${Clients.size} ` );
    })

});

