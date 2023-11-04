'use client'

import { useState } from "react"

export default function LoginPage(){
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
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
        <main className="login">
            <form className="container">
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
            </form>
        </main>
    )
}