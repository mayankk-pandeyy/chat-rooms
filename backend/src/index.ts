import { WebSocket, WebSocketServer } from "ws";

const ws = new WebSocketServer({port : 8000});

interface User {
    "name" : string,
    "avatar" : string,
    "socket" : WebSocket
}

let allSockets : Record<string, User[]> = {};

ws.on("connection", (socket)=>{
    
    socket.on("message", (message)=>{
        const data = JSON.parse(message.toString());

        if(data.type === "join"){
            const payload = JSON.parse(data.payload);
            const {name, avatar, roomId} = payload;

            console.log(`User Joined: ${name} in the Room ${roomId}`);

            if(!allSockets[roomId]){
                allSockets[roomId] = [];
            }

            allSockets[roomId].push({name, avatar, socket});

            // broadcastUsers(roomId);
        }
        

        if(data.type === "chat"){
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
            for(let room in allSockets){
                const found = allSockets[room].find((user)=> user.socket === socket);
                if(found){
                    currentUserRoom = room;
                    break;
                }
            }

            console.log(currentUserRoom);

            if(currentUserRoom){
                allSockets[currentUserRoom].forEach((user)=>{
                    user.socket.send(JSON.stringify({
                        type : "chat",
                        payload : {
                            message : message,
                            sender : allSockets[currentUserRoom].find((user)=> user.socket === socket)?.name || "Anonymous",
                            avatar : allSockets[currentUserRoom].find((user)=> user.socket === socket)?.avatar || ""
                        }
                    }))
                })
            }
        }

    })

    socket.on("close", ()=>{
        // Remove the user from all rooms
        for(let room in allSockets){
            let user = allSockets[room].find((user)=> user.socket===socket);
            if(user){
                allSockets[room] = allSockets[room].filter((user)=> user.socket !== socket);
            }
            // broadcastUsers(room);
        }
    })

})



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