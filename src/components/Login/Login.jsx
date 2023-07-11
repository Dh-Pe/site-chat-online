import React, { useRef } from 'react'
import io from 'socket.io-client'

export default function Login({ setChatVisibility, setSocket }) {
  const usernameRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async () => {
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    if (!username.trim()) return
    if (!password.trim()) return
    
    const socket = await io.connect('http://localhost:3001')
    socket.emit('login', { username, password })
    setSocket(socket)

    socket.on('authentication', value => {
      if (value) {
        setChatVisibility(true)
      } else {
        setChatVisibility(false)
      }
    })

  }

  return (
    <div>
      <h1>Login</h1>
      <input type='text' ref={usernameRef} placeholder='Nome de usuário' />
      <input type='password' ref={passwordRef} placeholder='Insira sua senha' /> 
      <button onClick={() => handleSubmit()}>Entrar</button>
    </div>
  )
}
