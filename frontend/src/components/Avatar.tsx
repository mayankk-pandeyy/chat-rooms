import { useState } from "react";

interface AvatarType{
    avatarLink : string,
    avatarRef : any;
}

const Avatar = ({avatarLink, avatarRef} : AvatarType) => {



    

  return (
    <div >
        <img src={avatarLink} className={`w-[50px] h-[50px] rounded-full bg-amber-200 cursor-pointer`} ref={avatarRef}/>
    </div>
  )
}

export default Avatar