import { useRef } from "react"
import Avatar from "./Avatar"
import { useNavigate } from "react-router-dom";


const JoinRoom = () => {

    const nameRef = useRef<HTMLInputElement>(null);
    const roomIdRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const avatarLinks = [
        "https://res.cloudinary.com/decode/image/upload/v1740178620/happy-smiling-red-tomato-with-green-leaf-isolated-grey-background-vector-illustration_t4mdlq.jpg",
        "https://res.cloudinary.com/decode/image/upload/v1740178620/happy-smiling-red-tomato-with-green-leaf-isolated-grey-background-vector-illustration_t4mdlq.jpg",
        "https://res.cloudinary.com/decode/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1740179307/surreal-fruit-studio_smowlc.jpg",
        "https://res.cloudinary.com/decode/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1740179325/47nx_owk3_220118_stalwr.jpg",
        "https://res.cloudinary.com/decode/image/upload/v1740178620/happy-smiling-red-tomato-with-green-leaf-isolated-grey-background-vector-illustration_t4mdlq.jpg",
    ]

    

    function createRoomHandler(){
        let name = nameRef.current?.value;
        let roomId = roomIdRef.current?.value;
        let avatar = avatarRef.current?.src;

        if(!name || !roomId || !avatar){
            alert("Please enter all the fields");
            return;
        }

        localStorage.setItem("user", JSON.stringify({name, roomId, avatar}));

        navigate("/rooms");
    }



  return (
    <div className="w-full h-[100%] flex overflow-hidden">
        {/* Left */}
        <div className="w-[50%] bg-[#212227] flex items-center justify-center">
            <div className="text-5xl text-[#E8E9ED] font-mont py-5">
                Join A Chat Room
            </div>
        </div>


        {/* Right */}
        <div className="w-[50%] flex justify-center items-center bg-[#0A0A0A]">
            <div className="w-[60%] flex flex-col justify-between gap-5 border-[1px] text-white py-8 px-3">
                {/* Chats */}
                <div className="px-5 font-mont text-center text-2xl">
                    Enter Your Details
                </div>

                <div className="flex flex-col gap-7">
                    <div className="w-[100%] px-5 font-mont flex flex-col gap-3">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your name" className="w-full border border-[#E8E9ED] text-[#E8E9ED] outline-0 flex-grow px-3 py-2" ref={nameRef}/>
                    </div>

                    <div className="w-[100%] px-5 font-mont flex flex-col gap-3">
                        <label>Create a Room /Join Room</label>
                        <input type="text" placeholder="Room ID" className="w-full border border-[#E8E9ED] text-[#E8E9ED] outline-0 flex-grow px-3 py-2" ref={roomIdRef}/>
                    </div>

                    <div className="w-[100%] px-5 font-mont flex flex-col gap-3">
                        <label>Select Your Avatar</label>
                        <div className=" flex gap-3">
                            {
                                avatarLinks.map(avatar => {return <Avatar avatarLink={avatar} avatarRef={avatarRef}/>})
                            }
                        </div>
                    </div>
                </div>

                    {/* Firm */}
                <div className="w-[100%] flex gap-2 px-5 font-mont">
                    <button className="w-full cursor-pointer bg-[#2D3142] hover:bg-[#E8E9ED] transition-all duration-300 hover:text-[#000] px-5 py-2" onClick={createRoomHandler}>Create Room</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default JoinRoom