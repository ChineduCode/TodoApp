'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function LoginPage(){
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [passwordType, setPasswordType] = useState('password')
    let [passwordVisible, setPasswordVisible] = useState(false)
    let [error, setError] = useState(null)

    const router = useRouter()
    
    //show and hide password
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
            await clearErrorMsg('Please fill in all fields', setError)
            return
        }

        // const res  = await fetch('/api/login', {
        //     headers : {'Content-Type' : 'application/json'},
        //     method: 'POST',
        //     body: JSON.stringify({
        //         username,
        //         password
        //     })
        // })

        // if(res.ok){
        //     setUsername('')
        //     setPassword('')
        //     router.push('/todo')
        //     return new Response('Login successful', {status: 200})
        // }else{
        //     await clearErrorMsg('Invalid credentials', setError)
        //     return new Response('Login Error, Invalid crendentials', {status : 400})
        // }

        const result = await signIn('credentials', {
            username,
            password,
            redirect: false, // Prevent auto-redirect after login
        });

        if (result) {
            setUsername('')
            setPassword('')
            router.push('/todo')

        }else{
            //console.log(result.error)
            throw new Error('Invalid credentials')
        }
    }

    async function clearErrorMsg(error, setError){
        setError(error)
        await new Promise(resolve => setTimeout(resolve, 8000))
        setError('')
    }

    return(
        <main className="login">
            <form className="container" onSubmit={handleLogin}>
                <h2 className="heading">Log In</h2>
                <div className="error">{error}</div>
                <div className="form-control">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text" 
                        name="username"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value.trim())} 
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="username">Password:</label>
                    <input
                        type={passwordType} 
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
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