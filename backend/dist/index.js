"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8000 });
let allSockets = {};
ws.on("connection", (socket) => {
    socket.on("message", (message) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            const payload = JSON.parse(data.payload);
            const { name, avatar, roomId } = payload;
            console.log(`User Joined: ${name} in the Room ${roomId}`);
            if (!allSockets[roomId]) {
                allSockets[roomId] = [];
            }
            allSockets[roomId].push({ name, avatar, socket });
            // broadcastUsers(roomId);
        }
        if (data.type === "chat") {
            const message = data.payload.message;
            // Data.payload looks like:
            // {
            //     message: 'Hiii',
            //     user: {
            //       name: 'Tanu',
            //       roomId: '1w2',
            //       avatar: 'https://res.cloudinary.com/decode/image/upload/v1740178620/happy-smiling-red-tomato-with-green-leaf-isolated-grey-background-vector-illustration_t4mdlq.jpg'
            //     }
            //   }
            // Find Room
            let currentUserRoom = "";
            for (let room in allSockets) {
                const found = allSockets[room].find((user) => user.socket === socket);
                if (found) {
                    currentUserRoom = room;
                    break;
                }
            }
            console.log(currentUserRoom);
            if (currentUserRoom) {
                allSockets[currentUserRoom].forEach((user) => {
                    var _a, _b;
                    user.socket.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            message: message,
                            sender: ((_a = allSockets[currentUserRoom].find((user) => user.socket === socket)) === null || _a === void 0 ? void 0 : _a.name) || "Anonymous",
                            avatar: ((_b = allSockets[currentUserRoom].find((user) => user.socket === socket)) === null || _b === void 0 ? void 0 : _b.avatar) || ""
                        }
                    }));
                });
            }
        }
    });
    socket.on("close", () => {
        // Remove the user from all rooms
        for (let room in allSockets) {
            let user = allSockets[room].find((user) => user.socket === socket);
            if (user) {
                allSockets[room] = allSockets[room].filter((user) => user.socket !== socket);
            }
            // broadcastUsers(room);
        }
    });
});
// function broadcastUsers(roomId : string){
//     const usersInRoom = allSockets[roomId].map((user)=>({
//         name : user.name,
//         avatar : user.avatar
//     }))
//     allSockets[roomId].forEach((user) => {
//         user.socket.send(
//             JSON.stringify({
//                 type: "updateUsers",
//                 payload: { users: usersInRoom },
//             })
//         );
//     });
// }
