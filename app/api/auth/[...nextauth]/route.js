import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import User from '@/Models/User';
import connectDatabase from '@/connectDB';
import { NextResponse } from 'next/server';

const handler =  NextAuth({
    providers: [ 
        Credentials({
            name: 'Credentials',

            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize (credentials, req) {
                if(!credentials?.username || !credentials?.password) return null

                const { username, password } = credentials

                try {
                    //connect to database
                    await connectDatabase()
            
                    //transform username to lowercase
                    //username = username.toLowerCase()
            
                    const user = await User.findOne({username})
            
                    //check if user does not exist
                    if(!user){
                        console.log('User does not exist')
                        return new Response(`User does not exist`, {status : 401})
                    }
            
                    //check if password is correct
                    const validPassword = await bcrypt.compare(password, user.password)
                    if(!validPassword){
                        console.log('Incorrect password')
                        return new Response('Incorrect password', {status : 401})
                    }
            
                    return NextResponse.json(user)
            
                } catch (error) {
                    console.error(error)
                }
            },
        }),   
    ],

    // pages: {
    //     signIn: '/login',
    // },

    // callbacks: {
    //     async jwt(token, user) {
    //         if (user) {
    //             token.id = user._id;
    //         }
    //         return token;
    //     },
    //     async session(session, token) {
    //         session.user.id = token.id;
    //         return session;
    //     },
    // },

    // session: {
    //     jwt: true
    // }
})

export {handler as GET, handler as POST}