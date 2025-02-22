import { useEffect, useRef, useState } from "react"
import Avatar from "./Avatar"
import { useNavigate } from "react-router-dom";


const JoinRoom = () => {

    const nameRef = useRef<HTMLInputElement>(null);
    const roomIdRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLInputElement>(null);
    const wsRef = useRef(null);

    const navigate = useNavigate();

    const avatarLinks = [
        "https://res.cloudinary.com/decode/image/upload/v1740178620/happy-smiling-red-tomato-with-green-leaf-isolated-grey-background-vector-illustration_t4mdlq.jpg",
        "https://res.cloudinary.com/decode/image/upload/v1740178620/happy-smiling-red-tomato-with-green-leaf-isolated-grey-background-vector-illustration_t4mdlq.jpg",
        "https://res.cloudinary.com/decode/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1740179307/surreal-fruit-studio_smowlc.jpg",
        "https://res.cloudinary.com/decode/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1740179325/47nx_owk3_220118_stalwr.jpg",
        "https://res.cloudinary.com/decode/image/upload/v1740178620/happy-smiling-red-tomato-with-green-leaf-isolated-grey-background-vector-illustration_t4mdlq.jpg",
    ]

    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:8000");
        
        ws.onopen = () => console.log("Connected to server");
        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onclose = () => console.log("Disconnected from WebSocket server");

        wsRef.current = ws;

    })

    function createRoomHandler(){
        let name = nameRef.current?.value;
        let roomId = roomIdRef.current?.value;
        let avatar = avatarRef.current?.src;

        wsRef.current.send(JSON.stringify({
            type : "join",
            payload : {
                name : name,
                roomId : roomId,
                avatar : avatar
            }
        }))

        navigate("/rooms");
    }



  return (
    <div className="w-full h-[100%] flex overflow-hidden">
        {/* Left */}
        <div className="border-r-[1px] border-[#8D8D92] w-[50%] flex items-center justify-center">
            <div className="text-5xl text-white font-mono py-5">
                Join A Chat Room
            </div>
        </div>


        {/* Right */}
        <div className="border w-[50%] flex justify-center items-center">
            <div className="w-[60%] h-[60%] flex flex-col justify-between gap-2 border-[1px] rounded-2xl text-white py-5">
                {/* Chats */}
                <div className="px-5 font-mono">
                    Enter Your Details
                </div>

                <div className="flex flex-col gap-5">
                    <div className="w-[100%] px-5 font-mono">
                        <label>Full Name</label>
                        <br/>
                        <input type="text" placeholder="Mayank Pandey" className="w-full border border-[#E8E9ED] text-[#E8E9ED] rounded-2xl outline-0 flex-grow px-3 py-2" ref={nameRef}/>
                    </div>

                    <div className="w-[100%] px-5 font-mono">
                        <label>Create a room id</label>
                        <br/>
                        <input type="text" placeholder="Room ID" className="w-full border border-[#E8E9ED] text-[#E8E9ED] rounded-2xl outline-0 flex-grow px-3 py-2" ref={roomIdRef}/>
                    </div>

                    <div className="w-[100%] px-5 font-mono">
                        <label>Select Your Avatar</label>
                        <br/>
                        <div className=" flex gap-3">
                            {
                                avatarLinks.map(avatar => {return <Avatar avatarLink={avatar} avatarRef={avatarRef}/>})
                            }
                        </div>
                    </div>
                </div>

                    {/* Firm */}
                <div className="w-[100%] flex gap-2 px-5 font-mono">
                    <button className="w-full cursor-pointer bg-[#2D3142] hover:bg-[#E8E9ED] transition-all duration-300 hover:text-[#000] px-5 py-2 rounded-xl" onClick={createRoomHandler}>Create Room</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default JoinRoom