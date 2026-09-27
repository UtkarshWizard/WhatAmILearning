import webSocket from "ws";

// Creating a server -> This helps to create a server: ws://localhost:8000
const ws = new webSocket.Server({
    port: 8000
});