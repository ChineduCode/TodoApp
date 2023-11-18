import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import User from '@/Models/User';
import connectDatabase from '@/connectDB';
import bcrypt from 'bcryptjs'

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

                    console.log(user)
            
                    return user;
            
                } catch (error) {
                    console.log(error)
                }
            },
        }),   
    ],

    pages: {
        signIn: '/login',
    },
})

export {handler as GET, handler as POST}