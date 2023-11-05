'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function LoginPage(){
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [passwordType, setPasswordType] = useState('password')
    let [passwordVisible, setPasswordVisible] = useState(false)

    const router = useRouter()
    
    function passwordVisibility(){
        setPasswordVisible(passwordVisible = !passwordVisible)

        if(passwordVisible){
            setPasswordType('text')
        }else{
            setPasswordType('password')
        }
    } 
    
    //Handling Login
    async function handleLogin(e){
        e.preventDefault()

        if(!username || !password){
            console.log('Please fill all fields')
            return
        }

        const res  = await fetch('/api/login', {
            headers : {'Content-Type' : 'Application.json'},
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        })

        if(res.ok){
            router.push('/todo')
            return new Response('Login successful', {status: 200})
        }else{
            return new Response('Login Error, Invalid crendentials', {status : 400})
        }
    }

    return(
        <main className="login">
            <form className="container" onSubmit={handleLogin}>
                <h2 className="heading">Log In</h2>
                <div className="form-control">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text" 
                        name="username"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)} 
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="username">Password:</label>
                    <input
                        type={passwordType} 
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control checkbox">
                    <input 
                        type="checkbox"  
                        onChange={passwordVisibility}
                        className="checkbox"
                    />
                    <label htmlFor="password visibility">Show Password</label>
                </div>

                <button type="submit">Log In</button>

                <div className="register-link">
                    Don't have an account? 
                    &nbsp;<Link href={'/register'}>Register</Link>
                </div>
            </form>
        </main>
    )
}