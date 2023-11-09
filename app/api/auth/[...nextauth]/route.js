import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import mongoose from 'mongoose';
import User from '@/Models/User';
import connectDatabase from '@/connectDB';

const handler =  NextAuth({
    providers: [ 
        Credentials({
            name: 'Credentials',

            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize (credentials, req) {
                try {
                    await connectDatabase()

                    const user = await User.findOne({ username: credentials.username });

                    if (!user || user.password !== credentials.password) {
                        mongoose.connection.close();
                        return Promise.resolve(null);
                    }

                    return Promise.resolve(user);

                } catch (error) {
                    throw error;
                }
            },
        }),   
    ],

    pages: {
        signIn: '/login',
    },

    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user._id;
            }
            return token;
        },
        async session(session, token) {
            session.user.id = token.id;
            return session;
        },
    },

    session: {
        jwt: true
    }
})

export {handler as GET, handler as POST}