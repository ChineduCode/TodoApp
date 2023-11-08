import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'JohnDoe' },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials){
                const apiUrl = process.env.API_URL

                const res = await fetch(`${apiUrl}/api/login`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    })
                })

                const user = await res.json()

                if(user){
                    return user
                }else{
                    return null
                }
            }
        })
    ],

    pages : {
        signIn : '/login'
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}