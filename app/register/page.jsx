'use client'

import { useState, useRef } from "react"
import Link from "next/link"

export default function RegisterPage(){
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    let [passwordType, setPasswordType] = useState('password')
    let [passwordVisible, setPasswordVisible] = useState(false)
    let [error, setError] = useState(null)
    
    //Show and Hide password
    function passwordVisibility(){
        setPasswordVisible(passwordVisible = !passwordVisible)
        console.log(passwordVisible)
        if(passwordVisible){
            setPasswordType('text')
        }else{
            setPasswordType('password')
        }
    }

    //Check for the validity of the credential added
    if(!username || !password || confirmPassword){
        setError('Please fill in all fields')
        return
    }
    if(password.length < 8){
        setError('Password must contain more than eight characters')
        return
    }
    if(password === confirmPassword){
        setError('Passwords do not match')
    }

    return(
        <main className="register">
            <form className="container">
                <h2 className="heading">Register</h2>
                <div className="err">{error}</div>
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
                    <label htmlFor="password">Password:</label>
                    <input 
                        type={passwordType}
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="password"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm password">Confirm Pasword:</label>
                    <input 
                        type={passwordType}
                        name="confirm password"
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        className="confirm-password"
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

                <button type="submit">Register</button>

                <div className="login-link">
                    Have an account already? 
                    &nbsp;<Link href={'/login'}>Login</Link>
                </div>
            </form>
        </main>
    )
}