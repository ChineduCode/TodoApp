import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import User from '@/Models/User';
import connectDatabase from '@/connectDB';
import bcrypt from 'bcryptjs'

export const authOptions = {
    providers: [ 
        Credentials({
            name: 'Credentials',

            credentials: {
                username: { },
                password: { },
            },

            async authorize (credentials) {
                if(!credentials?.username || !credentials?.password) return null

                let { username, password } = credentials
 
                try { 
                    //connect to database
                    await connectDatabase()
            
                    //transform username to lowercase
                    username = username.toLowerCase()
            
                    const user = await User.findOne({username})
            
                    //check if user does not exist
                    if(!user){
                        throw new Error('User does not exist')
                    }
            
                    //check if password is correct
                    const validPassword = await bcrypt.compare(password, user.password)
                    if(!validPassword){
                        throw new Error('Incorrect password')
                    }
            
                    return user;
            
                } catch (error) {
                    console.log(error.message)
                }
            },
        }),   
    ],

    pages: {
        signIn: '/login',
    },

    callbacks: {
        async jwt({token, user}){
            return({...token, ...user})
        },

        async session({session, token, user}){
            session.user = token
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}