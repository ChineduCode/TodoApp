'use client'

import { useState, useRef } from "react"

export default function RegisterPage(){
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    let [passwordType, setPasswordType] = useState('password')
    let [passwordVisible, setPasswordVisible] = useState(false)

    function passwordVisibility(){
        setPasswordVisible(passwordVisible = !passwordVisible)
        console.log(passwordVisible)
        if(passwordVisible){
            setPasswordType('text')
        }else{
            setPasswordType('password')
        }
    }

    return(
        <main className="register">
            <form className="container">
                <h2 className="heading">Register</h2>
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
                    <label htmlFor="password visibility">See Password</label>
                </div>

                <button type="submit">Register</button>
            </form>
        </main>
    )
}