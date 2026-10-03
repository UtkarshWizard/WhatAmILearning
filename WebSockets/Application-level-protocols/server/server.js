import { WebSocket, WebSocketServer } from "ws";

const ws = new WebSocketServer({
  port: 8000,
});

const clients = new Set();

ws.on("connection", (socket) => {
  console.log("Connection created");

  clients.add(socket);

  console.log("Client currently connected - ", clients.size);

  socket.on("message", (message) => {
    try {
      const ReceivedMessage = JSON.parse(message);
      console.log("Message received", ReceivedMessage);

      if (ReceivedMessage.type === "chat.message") {
        clients.forEach((client) => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "chat.message",
                payload: {
                    text: `Message from client - ${ReceivedMessage.payload.text}`
                }
            }));
          }
        });
      } else if (ReceivedMessage.type === "typing.start") {
        console.log("user started typing")
      } else {
        socket.send(JSON.stringify({
            type: "error",
            payload: {
                code: "Unknown_Event",
                message: "Unknown Message"
            }
        }));
      }
    } catch (e) {
      console.log("Error parsing the message");
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");

    clients.delete(socket);

    console.log("Client currently connected - ", clients.size);
  });
});
