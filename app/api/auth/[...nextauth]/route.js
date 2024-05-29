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
            
                    const user = await User.findOne({username: { $regex: new RegExp('^' + username + '$', 'i') }})
            
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
            
            if(user){ 
                return{
                    ...token,
                    id: user._id,
                    username: user.username
                }
            }
            return token
        },
        
        async session({session, token, user}){
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username
                }
            }
        }
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}