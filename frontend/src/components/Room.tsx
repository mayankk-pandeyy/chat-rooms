import { SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Room = () => {

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [userMessage, setUserMessage] = useState<string>("");
    const [sender, setSender] = useState<string>("");
    const [leaveRoom , setLeaveRoom] = useState(false);
    const navigate = useNavigate();


    // User Data
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if(!user.name || !user.roomId){
        navigate("/");
    }

    useEffect(()=>{
        const ws = new WebSocket("http://localhost:8000"); // Connect on backend server
        setSocket(ws);

        ws.onopen = () => {
            console.log("Connected to websocket server");
            ws.send(JSON.stringify({
                type : "join",
                // @ts-ignore
                payload : localStorage.getItem("user")
            }))
        }

        ws.onmessage = (event)=>{
            const imp = JSON.parse(event.data);
            setSender(imp.payload.sender);
            const message = imp.payload.message;
            setMessages((prev)=>[...prev, message]);
        }

        return () => ws.close();
    }, [leaveRoom])



    function sendMessageHandler(){

        if(!userMessage.trim() || !socket){
            return;
        }
        
        socket.send(
            JSON.stringify({
                type : "chat",
                payload : {
                    message : userMessage,
                    user : user
                }
            })
        )
        setUserMessage("");
    }

    function leaveRoomHandler(){
        localStorage.removeItem("user");
        setLeaveRoom(true);
    }

  return (
    <div className="w-full h-[100%] flex overflow-hidden">
        {/* Left */}
        <div className="w-[50%] flex flex-col items-center justify-center font-mont bg-[#212227]">
            <div className="text-3xl text-white py-5">
                Chat Room : {user.roomId}
            </div>

            <div onClick={leaveRoomHandler} className="text-white bg-gradient-to-r from-[#000] to-[#F18805] px-3 py-2 cursor-pointer">
                Leave Chat Room
            </div>
        </div>


        {/* Right */}
        <div className="w-[50%] flex flex-col justify-center items-center py-4 bg-[#0A0A0A]">
            <div className="h-[10%] flex items-center justify-center text-white font-mont text-2xl">
                <div>
                    Chat Room : {user.name}
                </div>
            </div>
            <div className="w-[90%] h-[90%] flex flex-col gap-2 justify-between border-[1px] text-white py-5">
                {/* Chats */}
                <div className="px-5 font-mono overflow-scroll flex flex-col gap-2">
                    {
                        messages.map((message, index)=> <div key={index} className="w-full">{user.name === sender ? <div className="w-full flex justify-end"><div className="bg-amber-400 w-fit text-right">{message}</div></div> : <div><div className="bg-blue-500 inline-block">{message}</div></div>}</div>)
                    }
                </div>

                    {/* Firm */}
                <div className="w-[100%] flex gap-2 px-5 font-mono">
                    <input type="text" placeholder="Enter your message" className="border border-[#E8E9ED] text-[#E8E9ED] rounded-xl outline-0 flex-grow px-3 py-2" onChange={(e)=> setUserMessage(e.target.value)} value={userMessage}/>
                    <button className="cursor-pointer bg-[#2D3142] hover:bg-[#E8E9ED] transition-all duration-300 hover:text-[#000] px-5 py-2" onClick={sendMessageHandler}>Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Room