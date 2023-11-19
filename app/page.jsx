import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from 'next/link'

export default async function WelcomePage(){
    const session = await getServerSession()

    if(session) redirect('/todo')

    return(
        <main className="welcome">
            <section className="container">
                <h2 className="welcome heading">Welcome</h2>
                <div className="description">Track Your Day-to-Day Activities with Our Amazing Platform</div>

                <div className="register-and-login-link">
                    <Link 
                        href={`/register`}
                        className='register-link'
                    >
                        Register
                    </Link>

                    <Link 
                        href={`/login`}
                        className='login-link'
                    >   
                        Login
                    </Link>
                </div>
            </section>
        </main>
    )
}