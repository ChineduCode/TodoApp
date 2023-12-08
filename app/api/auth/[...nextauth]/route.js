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
                    //await connectDatabase()
            
                    //transform username to lowercase
                    username = username.toLowerCase()
            
                    // const user = await User.findOne({username})
            
                    // //check if user does not exist
                    // if(!user){
                    //     throw new Error('User does not exist')
                    // }
            
                    // //check if password is correct
                    // const validPassword = await bcrypt.compare(password, user.password)
                    // if(!validPassword){
                    //     throw new Error('Incorrect password')
                    // }
            
                    // return user;

                    const user = {
                        name : 'chineducode',
                        address: 'no.6 Isingwu street, nkpor-agu',
                        postalCode: 40411
                    }

                    if(username === user.name){
                        return user
                    }else{
                        return null
                    }
            
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
        // async jwt({ token, user, session }) {
        //     console.log('jwt callback ', { token, user, session })

        //     if(user){
        //         return {
        //             ...token,
        //             id: user.id,
        //             username: user.username
        //         }
        //     }
        //     return token
        // },

        // async session({ session, token, user }){
        //     console.log('session callback', {session, token, user})
            
        //     return {
        //         ...session,
        //         user: {
        //             ...session.user,
        //             id: token.id,
        //             username: token.username
        //         }
        //     }
        
        // }

        async jwt({token, user}){
            console.log('jwt callback', {token, user})
            return({...token, ...user})
        },

        async session({session, token, user}){
            session.user = token
            console.log('session callback', {session, token, user})
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}