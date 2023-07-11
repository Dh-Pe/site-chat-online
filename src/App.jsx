import './App.css'
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'
import Register from './components/Register/Register'
import { useState } from 'react'

function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div>
      {
        chatVisibility ? <Chat socket={socket}/> : <Register setChatVisibility={setChatVisibility} setSocket={setSocket}/>
      }
    </div>
  )
}

export default App
