'use client'

import { useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage(){
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    let [passwordType, setPasswordType] = useState('password')
    let [passwordVisible, setPasswordVisible] = useState(false)
    let [error, setError] = useState(null)

    const router = useRouter()
    
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

    
    //Handle Registration
    async function handleRegistration(e){
        e.preventDefault()
        
        //Check for the validity of the credential added
        if(!username || !password || !confirmPassword){
            //setError('Please fill in all fields')
            await clearErrorMsg('Please fill in all fields', setError)
            return
        }
        if(password.length < 8){
            //setError('Password must contain more than eight characters')
            await clearErrorMsg('Password must contain more than eight characters', setError)
            return
        }
        if(password !== confirmPassword){
            //setError('Passwords do not match')
            await clearErrorMsg('Passwords do not match', setError)
            return
        }

        try { 
            //Post to the api/register
            const res = await fetch('/api/register', {
                headers : {'Content-Type' : 'Application.json'},
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    confirmPassword
                })
            })

            if(res.ok){
                setUsername('')
                setPassword('')
                setConfirmPassword('')
                router.push('/login')
            }else{
                await clearErrorMsg('An error occured, try again later', setError)
                throw new Error('An error occured, try again later')
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    async function clearErrorMsg(error, setError){
        setError(error)
        await new Promise(resolve => setTimeout(resolve, 5000))
        setError('')
    }

    return(
        <main className="register">
            <form className="container" onSubmit={handleRegistration}>
                <h2 className="heading">Register</h2>
                <div className="error">{error}</div>
                <div className="form-control">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        name="username"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value.trim())}
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