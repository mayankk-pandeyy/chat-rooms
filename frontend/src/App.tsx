import { Route, Routes } from "react-router-dom"
import JoinRoom from "./components/JoinRoom"
import Room from "./components/Room"

const App = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex bg-[#0D1317]">
      <Routes>
        <Route path="/" element={<JoinRoom/>}/>
        <Route path="/rooms" element={<Room/>}/>
      </Routes>
    </div>
  )
}

export default App