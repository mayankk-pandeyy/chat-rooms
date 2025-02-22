"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8000 });
let allSockets = {};
ws.on("connection", (socket) => {
    socket.on("message", (message) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            console.log(socket);
            if (!allSockets[data.payload.roomId]) {
                allSockets[data.payload.roomId] = [];
                allSockets[data.payload.roomId].push(socket);
            }
            else {
                allSockets[data.payload.roomId].push(socket);
            }
        }
        if (data.type === "chat") {
            // Find the user room
            let currentUserRoom = "";
            for (let room in allSockets) {
                const found = allSockets[room].find((s) => s === socket);
                if (found) {
                    currentUserRoom = room;
                    break;
                }
            }
            allSockets[currentUserRoom].forEach((s) => {
                console.log(data.payload);
                s.send(data.payload.message);
            });
        }
    });
});
