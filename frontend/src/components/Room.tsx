import { useEffect, useRef, useState } from "react";

const Room = () => {

    const [messages, setMessages] = useState(["Welcome to the chat!"]);
    const inputRef = useRef(null);
    const userMessageRef = useRef("");
    const wsRef = useRef(null);

    useEffect(()=>{
        const ws = new WebSocket("http://localhost:8000");
        ws.onmessage = (event)=>{
            console.log(event);
            setMessages(m => [...m, event.data])
        }
        // @ts-ignore
        wsRef.current = ws;

        ws.onopen=()=>{
            ws.send(JSON.stringify({
                type : "join",
                payload : {
                    roomId : "123"
                }
            }))
        }
    }, [])

    function sendMessageHandler(){
        
        // @ts-ignore
        let message = inputRef.current.value;
        // @ts-ignore
        userMessageRef.current = inputRef.current.value;

        // @ts-ignore
        wsRef.current.send(JSON.stringify({
            type : "chat",
            payload : {
                message : message
            }
        }))

        // @ts-ignore
        inputRef.current.value = "";
    }

  return (
    <div className="w-full h-[100%] flex overflow-hidden">
        {/* Left */}
        <div className="border-r-[1px] border-[#8D8D92] w-[50%] flex items-center justify-center">
            <div className="text-5xl text-white font-mono py-5">
                Chat Room
            </div>
        </div>


        {/* Right */}
        <div className="border w-[50%] flex justify-center items-center">
            <div className="w-[90%] h-[90%] flex flex-col gap-2 justify-between border-[1px] rounded-2xl text-white py-5">
                {/* Chats */}
                <div className="px-5 font-mono overflow-scroll">
                    {
                        messages.map((message)=> <div>{message === userMessageRef.current ? <div className="bg-amber-400">{message}</div> : <div className="bg-blue-500">{message}</div>}</div>)
                    }
                </div>

                    {/* Firm */}
                <div className="w-[100%] flex gap-2 px-5 font-mono">
                    <input type="text" placeholder="Enter your message" className="border border-[#E8E9ED] text-[#E8E9ED] rounded-2xl outline-0 flex-grow px-3 py-2" ref={inputRef}/>
                    <button className="cursor-pointer bg-[#2D3142] hover:bg-[#E8E9ED] transition-all duration-300 hover:text-[#000] px-5 py-2 rounded-xl" onClick={sendMessageHandler}>Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Room