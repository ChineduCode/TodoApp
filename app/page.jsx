import Link from 'next/link'

export default function WelcomePage(){

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