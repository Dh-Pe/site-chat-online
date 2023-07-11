import React, { useRef } from 'react'
import io from 'socket.io-client'

export default function Login({ setSocket, setChatVisibility }) {
    const nameRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()
    const phoneNumberRef = useRef()
    const birthRef = useRef()

    const handleSubmit = async () => {
        const userInfo = {
            name: nameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            birth: birthRef.current.value
        }

        const socket = await io.connect('http://localhost:3001')
        socket.emit('registerUser', userInfo)
        setSocket(socket)

        socket.on('registeredUser', value => {
            if (value) setChatVisibility(true)
            else setChatVisibility(false)
        })
    }

    return (
        <div>
            <h1>Register</h1>
            <input type='text' ref={nameRef} placeholder='Insira seu nome e sobrenome' />
            <input type='text' ref={usernameRef} placeholder='Nome de usuário' />
            <input type='password' ref={passwordRef} placeholder='Insira sua senha' />
            <input type='email' ref={emailRef} placeholder='Insira seu e-mail' />
            <input type='number' ref={phoneNumberRef} placeholder='Insira seu número de telefone' />
            <input type='date' ref={birthRef} />
            <button onClick={() => handleSubmit()}>Registrar</button>
        </div>
    )
}
